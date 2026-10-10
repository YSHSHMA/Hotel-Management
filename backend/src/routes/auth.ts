import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import verifyToken from "../middleware/auth";

const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_SECRET;
// Local dev: Vite on 5174. OAuth success/error redirects use this origin (not a Google redirect URI).
const FRONTEND_URL = (process.env.FRONTEND_URL || "http://localhost:5174").replace(
  /\/$/,
  ""
);
// Google Console "Authorized redirect URI" must match exactly: {BACKEND_URL}/api/auth/callback/google
// Default PORT 5001 (5000 blocked on many Macs). Keep PORT, VITE_API_BASE_URL, Google redirect in sync.
const BACKEND_URL = (
  process.env.BACKEND_URL ||
  `http://localhost:${process.env.PORT || 5001}`
).replace(/\/$/, "");
const GOOGLE_STATE_COOKIE = "google_oauth_state";
const GOOGLE_CALLBACK_PATH = "/api/auth/callback/google";

const stateCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 10 * 60 * 1000,
  path: GOOGLE_CALLBACK_PATH,
};

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Initiate Google OAuth
 *     description: Redirects user to Google sign-in
 *     tags: [Authentication]
 */
router.get("/google", (req: Request, res: Response) => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return res.redirect(`${FRONTEND_URL}/sign-in?error=oauth_config`);
  }

  const state = crypto.randomBytes(32).toString("hex");
  const redirectUri = `${BACKEND_URL}${GOOGLE_CALLBACK_PATH}`;
  const authorizationUrl = new URL(
    "https://accounts.google.com/o/oauth2/v2/auth"
  );
  authorizationUrl.search = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
  }).toString();

  res.cookie(GOOGLE_STATE_COOKIE, state, stateCookieOptions);
  return res.redirect(authorizationUrl.toString());
});

/**
 * @swagger
 * /api/auth/callback/google:
 *   get:
 *     summary: Google OAuth callback
 *     description: Handles redirect from Google, creates/logs in user
 *     tags: [Authentication]
 */
router.get("/callback/google", async (req: Request, res: Response) => {
  const { code, error, state } = req.query;
  const storedState = req.cookies?.[GOOGLE_STATE_COOKIE];
  res.clearCookie(GOOGLE_STATE_COOKIE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: GOOGLE_CALLBACK_PATH,
  });

  if (error) {
    const errorCode =
      error === "access_denied" ? "oauth_cancelled" : "server_error";
    return res.redirect(`${FRONTEND_URL}/sign-in?error=${errorCode}`);
  }

  if (
    typeof state !== "string" ||
    typeof storedState !== "string" ||
    state.length !== storedState.length ||
    !crypto.timingSafeEqual(Buffer.from(state), Buffer.from(storedState))
  ) {
    return res.redirect(`${FRONTEND_URL}/sign-in?error=invalid_state`);
  }

  if (
    typeof code !== "string" ||
    !GOOGLE_CLIENT_ID ||
    !GOOGLE_CLIENT_SECRET
  ) {
    return res.redirect(`${FRONTEND_URL}/sign-in?error=oauth_config`);
  }

  try {
    const redirectUri = `${BACKEND_URL}${GOOGLE_CALLBACK_PATH}`;
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = (await tokenRes.json()) as {
      access_token?: string;
      error?: string;
    };
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error(
        "Google token exchange failed:",
        tokenData.error || tokenRes.status
      );
      return res.redirect(`${FRONTEND_URL}/sign-in?error=token_exchange`);
    }

    const userRes = await fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );
    if (!userRes.ok) {
      console.error("Google user profile request failed:", userRes.status);
      return res.redirect(`${FRONTEND_URL}/sign-in?error=token_exchange`);
    }

    const googleUser = (await userRes.json()) as {
      email?: string;
      email_verified?: boolean;
      name?: string;
      given_name?: string;
      family_name?: string;
      picture?: string;
    };
    if (!googleUser.email || !googleUser.email_verified) {
      return res.redirect(`${FRONTEND_URL}/sign-in?error=email_not_verified`);
    }

    const email = googleUser.email.toLowerCase();
    const nameParts = (googleUser.name || "").trim().split(/\s+/);
    const firstName = googleUser.given_name || nameParts[0] || "User";
    const lastName =
      googleUser.family_name || nameParts.slice(1).join(" ") || "Google";
    const image = googleUser.picture;

    let user = await User.findOne({ email });
    if (!user) {
      const randomPassword = crypto.randomBytes(32).toString("hex");
      user = new User({
        email,
        firstName,
        lastName,
        password: randomPassword,
        image,
        emailVerified: true,
        lastLogin: new Date(),
      });
      await user.save();
    } else {
      user.image = image;
      user.emailVerified = true;
      user.lastLogin = new Date();
      await user.save();
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("session_id", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res.redirect(`${FRONTEND_URL}/auth/callback`);
  } catch (err) {
    console.error("Google OAuth error:", err);
    return res.redirect(`${FRONTEND_URL}/sign-in?error=server_error`);
  }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user with email and password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: User ID
 *       400:
 *         description: Invalid credentials or validation error
 *       500:
 *         description: Server error
 */
router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      // Return JWT token in response body for localStorage storage
      res.status(200).json({
        userId: user._id,
        message: "Login successful",
        token: token, // JWT token in response body
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

/**
 * @swagger
 * /api/auth/validate-token:
 *   get:
 *     summary: Validate authentication token
 *     description: Validate the current user's authentication token
 *     tags: [Authentication]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: User ID
 *       401:
 *         description: Token is invalid or expired
 */
router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).send({ userId: req.userId });
});

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: User logout
 *     description: Logout user by clearing authentication cookie
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post("/logout", (req: Request, res: Response) => {
  res.cookie("session_id", "", {
    expires: new Date(0),
    maxAge: 0,
    httpOnly: false,
    secure: true,
    sameSite: "none",
    path: "/",
  });
  res.send();
});

export default router;
