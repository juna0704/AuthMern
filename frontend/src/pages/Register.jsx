import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice.js";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    securityQuestion: "",
  });

  const { name, email, password, password2, securityQuestion } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    console.log("Message:", message); // for debugging

    if (isError) {
      // Show a fallback message if message is empty
      const errorMsg =
        message && message.trim() !== "" ? message : "Something went wrong";
      toast.error(errorMsg);
      dispatch(reset());
    }

    if (isSuccess) {
      toast.success("Registered successfully! Please login.");
      dispatch(reset());
      navigate("/login");
    }
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else if (!formData.securityQuestion.trim()) {
      toast.error("Security question is required for password recovery");
    } else {
      const userData = {
        name,
        email,
        password,
        securityQuestion: formData.securityQuestion,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-sm w-full bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChange}
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Email address"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={onChange}
          placeholder="Password (confirm)"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="text"
          name="securityQuestion"
          value={securityQuestion}
          onChange={onChange}
          placeholder="Security Question (e.g., What was your first pet's name?)"
          className="w-full p-2 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
