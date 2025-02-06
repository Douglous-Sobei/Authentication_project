import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { resetPasswordConfirm } from "../features/auth/authSlice";
import { AiFillLock } from "react-icons/ai";
import Spinner from "../components/navigation/Spinner";

const ResetPasswordPageConfirm = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      uid,
      token,
      new_password,
      re_new_password,
    };

    dispatch(resetPasswordConfirm(userData));
  };

  // Effect for handling success or error messages
  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Your password was reset successfully.");
      navigate("/");
    }
  }, [isError, isSuccess, message, navigate]); // Removed `dispatch` from dependencies

  return (
    <div className="container auth__container">
      <h1 className="main__title">
        Reset Password here <AiFillLock />
      </h1>

      {isLoading && <Spinner />}

      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          name="new_password"
          onChange={handleChange}
          value={new_password}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          name="re_new_password"
          onChange={handleChange}
          value={re_new_password}
          required
        />
        <button className="btn btn-primary" type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPageConfirm;
