import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { login, reset, getUserInfo } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/navigation/Spinner";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const userData = { email, password };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
    if (user) {
      dispatch(getUserInfo());
    }
  }, [isError, isSuccess, user, message, navigate, dispatch]); // Added `message` to dependencies to fix ESLint warning

  return (
    <div className="container auth__container">
      <h1 className="main__title">
        Login <BiLogInCircle />
      </h1>

      {isLoading && <Spinner />}

      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={email}
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={password}
          required
        />
        <Link to="/reset-password">Forgot Password?</Link>

        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
