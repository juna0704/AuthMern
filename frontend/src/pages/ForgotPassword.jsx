import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, reset } from "../features/auth/authSlice.js";
import Spinner from "../components/Spinner";

function ForgotPassword() {
  const [formData, setFormData] = useState({ emailOrPhone: "" });
  const { emailOrPhone } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message, passwordResetSent } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      const errorMsg =
        message && message.trim() !== "" ? message : "Something went wrong";
      toast.error(errorMsg);
      dispatch(reset());
    }

    if (isSuccess && passwordResetSent) {
      toast.success(
        message || "Password reset instructions sent successfully!"
      );
      dispatch(reset());
      // Optionally redirect to login page after a delay
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [isError, isSuccess, message, passwordResetSent, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!emailOrPhone.trim()) {
      toast.error("Please enter your email or phone number");
      return;
    }

    dispatch(forgotPassword(emailOrPhone));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-sm w-full bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="emailOrPhone"
          value={emailOrPhone}
          onChange={onChange}
          placeholder="Email or Mobile Number"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
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

export default ForgotPassword;
