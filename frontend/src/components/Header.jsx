import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600">
        {user ? (
          <Link to="/">GoalSetter</Link>
        ) : (
          <span className="cursor-not-allowed text-gray-400">GoalSetter</span>
        )}
      </div>
      <ul className="flex space-x-6 text-gray-700 text-md font-medium">
        {user ? (
          <li
            className="flex items-center space-x-1 cursor-pointer hover:text-blue-500 transition-colors"
            onClick={onLogout}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </li>
        ) : (
          <>
            <li className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
              <FaSignInAlt />
              <Link to="/login">Login</Link>
            </li>
            <li className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
              <FaUser />
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
