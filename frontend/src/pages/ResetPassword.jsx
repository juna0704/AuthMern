import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword, reset } from "../features/auth/authSlice.js";
import Spinner from "../components/Spinner.jsx";

function ResetPassword() {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
    securityAnswer: "",
  });
  const [securityQuestion, setSecurityQuestion] = useState("");

  const { newPassword, confirmPassword, securityAnswer } = formData;
  const { token } = useParams(); // Get token from URL params

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Verify token and get security question on component mount
    const verifyToken = async () => {
      try {
        const response = await fetch("/api/users/verify-reset-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resetToken: token }),
        });

        const data = await response.json();

        if (response.ok) {
          setSecurityQuestion(data.securityQuestion);
        } else {
          toast.error(data.message || "Invalid or expired reset token");
          navigate("/login");
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again.");
        navigate("/login");
      }
    };

    if (token) {
      verifyToken();
    }
  }, [token, navigate]);

  useEffect(() => {
    if (isError) {
      const errorMsg =
        message && message.trim() !== "" ? message : "Something went wrong";
      toast.error(errorMsg);
      dispatch(reset());
    }

    if (isSuccess) {
      toast.success(message || "Password reset successfully!");
      dispatch(reset());
      navigate("/login");
    }
  }, [isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!securityAnswer.trim()) {
      toast.error("Please provide an answer to the security question");
      return;
    }

    const resetData = {
      resetToken: token,
      newPassword,
      securityAnswer,
    };

    dispatch(resetPassword(resetData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-sm w-full bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>

      {securityQuestion && (
        <div className="mb-4 p-3 bg-gray-100 rounded">
          <p className="text-sm font-medium text-gray-700">
            Security Question:
          </p>
          <p className="text-sm text-gray-600">{securityQuestion}</p>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={onChange}
          placeholder="New Password"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChange}
          placeholder="Confirm New Password"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="securityAnswer"
          value={securityAnswer}
          onChange={onChange}
          placeholder="Answer to security question"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
        <p className="text-center text-sm mt-4">
          Remember your password?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </p>
      </form>
    </div>
  );
}

export default ResetPassword;
