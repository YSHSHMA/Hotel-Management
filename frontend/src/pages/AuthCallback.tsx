import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryClient } from "react-query";
import useAppContext from "../hooks/useAppContext";
import * as apiClient from "../api-client";
import { Loader2 } from "lucide-react";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const hasStarted = useRef(false);

  useEffect(() => {
    if (hasStarted.current) {
      return;
    }
    hasStarted.current = true;

    const completeSignIn = async () => {
      const error = searchParams.get("error");
      if (error) {
        showToast({
          title: "Sign-in failed",
          description: "Google sign-in could not be completed. Please try again.",
          type: "ERROR",
        });
        navigate("/sign-in", { replace: true });
        return;
      }

      try {
        // Google authentication is carried in an HttpOnly cookie, not in the URL.
        localStorage.removeItem("session_id");
        const user = await apiClient.fetchCurrentUser();

        localStorage.setItem("user_id", user._id);
        localStorage.setItem("user_email", user.email);
        const name = [user.firstName, user.lastName].filter(Boolean).join(" ");
        if (name) {
          localStorage.setItem("user_name", name);
        }
        if (user.image) {
          localStorage.setItem("user_image", user.image);
        }

        await queryClient.invalidateQueries("validateToken");
        await queryClient.invalidateQueries("fetchCurrentUser");
        showToast({
          title: "Signed in successfully",
          description: "Welcome! You have been signed in with Google.",
          type: "SUCCESS",
        });
        navigate("/", { replace: true });
      } catch {
        showToast({
          title: "Sign-in failed",
          description: "Could not verify your Google session. Please try again.",
          type: "ERROR",
        });
        navigate("/sign-in", { replace: true });
      }
    };

    void completeSignIn();
  }, [searchParams, navigate, queryClient, showToast]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
        <p className="text-gray-600">Completing sign-in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
