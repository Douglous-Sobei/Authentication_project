import { useEffect } from "react";
import { BiUserCheck } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activate, reset } from "../features/auth/authSlice";
import { toast } from "react-toastify";
import Spinner from "../components/navigation/Spinner";

const ActivatePage = () => {
  const { uid, token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = { uid, token };
    dispatch(activate(userData));
  };

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }

    if (isSuccess) {
      toast.success("Your account has been activated! You can log in now.");
      navigate("/login");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]); // Ensure `message` is included to prevent ESLint warning

  return (
    <div className="container auth__container">
      <h1 className="main__title">
        Activate Account <BiUserCheck />
      </h1>

      {isLoading && <Spinner />}

      <button
        className="btn btn-accent btn-activate-account"
        type="button" // Changed from "submit" to "button" to prevent form submission behavior
        onClick={handleSubmit}
      >
        Activate Account
      </button>
    </div>
  );
};

export default ActivatePage;
