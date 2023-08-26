import React, { useContext, useEffect, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import "./Components.css";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { BsXLg } from "react-icons/bs";

interface Props {
  setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm = ({ setShowSignInForm, setShowSignUpForm }: Props) => {
  const navigate = useNavigate();
  const { signUp } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [transitionState, setTransitionState] = useState<String>("entering");
  const [disableButtons, setDisableButtons] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignUp = async (event: any) => {
    event.preventDefault();
    setDisableButtons(true);
    setShowLoader(true);
    try {
      await signUp!(
        event.target[1].value,
        event.target[2].value,
        event.target[3].value
      );
      navigate("/dashboard");
    } catch (error: any) {
      console.log(error);
      if (error.status === 409) setError(error.data.message);
      else toast.error(error.data.message);
      setDisableButtons(false);
      setShowLoader(false);
    }
  };

  const handleClose = (): void => {
    setTransitionState("leaving");
    setTimeout(() => {
      setShowSignUpForm(false);
    }, 600);
  };

  useEffect((): void => {
    setTransitionState("entered");
    setTimeout(() => {
      setDisableButtons(false);
    }, 600);
  }, []);

  return (
    <div className="modal-wrapper">
      <div
        className={`modal-backdrop ${transitionState}`}
        onClick={() => (disableButtons ? false : handleClose())}
      ></div>
      <form
        className={`sign-in-form modal ${transitionState}`}
        onSubmit={handleSignUp}
      >
        <button
          className="close-button"
          type="button"
          title="close"
          disabled={disableButtons}
          onClick={() => handleClose()}
        >
          <BsXLg size={"1.5rem"} />
        </button>
        <h2 className="heading-sign-in-up f-ll">Sign Up</h2>
        <label className="f-ssm">
          Name:
          <input type="text" placeholder="name" required />
        </label>
        <label className="f-ssm">
          <span>
            Username: {error && <span className="error-msg">{error}</span>}
          </span>
          <input type="text" placeholder="username" required />
        </label>
        <label className="f-ssm">
          Password:
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            required
          />
          <button
            className="show-hide-button"
            title="show password"
            onClick={() => setShowPassword((prev) => !prev)}
            type="button"
          >
            {!showPassword ? (
              <BiShow size={"1.5rem"} />
            ) : (
              <BiHide size={"1.5rem"} />
            )}
          </button>
        </label>
        <button className="btn-submit" disabled={disableButtons || showLoader}>
          {showLoader ? (
            <ClipLoader size={".9rem"} color="#FFFFFF" />
          ) : (
            "Sign Up"
          )}
        </button>
        <button
          className="text-button"
          type="button"
          disabled={disableButtons}
          onClick={() => {
            setShowSignInForm(true);
            handleClose();
          }}
        >
          Already a user? Sign In
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
