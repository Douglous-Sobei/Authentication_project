import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BiUser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/navigation/Spinner";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  const { first_name, last_name, email, password, re_password } = formData;

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

    if (!first_name || !last_name || !email || !password || !re_password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== re_password) {
      toast.error("Passwords do not match.");
      return;
    }

    const userData = {
      first_name,
      last_name,
      email,
      password,
      re_password,
    };

    dispatch(register(userData));
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }

    if (isSuccess || user) {
      toast.success(
        "An activation email has been sent to your email. Please check your inbox."
      );
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]); // Added `message` to dependencies

  return (
    <div className="container auth__container">
      <h1 className="main__title">
        Register <BiUser />
      </h1>

      {isLoading && <Spinner />}

      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          onChange={handleChange}
          value={first_name}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          onChange={handleChange}
          value={last_name}
          required
        />
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
        <input
          type="password"
          placeholder="Retype Password"
          name="re_password"
          onChange={handleChange}
          value={re_password}
          required
        />

        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
