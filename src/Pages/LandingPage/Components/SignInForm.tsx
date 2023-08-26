import React, { useContext, useEffect, useState } from "react";
import "./Components.css";
import { BiHide, BiShow } from "react-icons/bi";
import { AuthContext } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { BsXLg } from "react-icons/bs";
import { ClipLoader } from "react-spinners";

interface Props {
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInForm = ({ setShowSignInForm, setShowSignUpForm }: Props) => {
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [transitionState, setTransitionState] = useState<String>("entering");
  const [disableButtons, setDisableButtons] = useState<boolean>(true);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    setDisableButtons(true);
    setShowLoader(true);
    try {
      await signIn(event.target.username.value, event.target.password.value);
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message);
      setDisableButtons(false);
      setShowLoader(false);
    }
  };

  const handleClose = (): void => {
    setTransitionState("leaving");
    setTimeout(() => {
      setShowSignInForm(false);
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
        onSubmit={handleSignIn}
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
        <h2 className="heading-sign-in-up f-ll">Sign In</h2>
        <label className="f-ssm">
          Username:
          <input type="text" placeholder="username" name="username" required />
        </label>
        <label className="f-ssm">
          Password:
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            name="password"
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
        {error && <span className="error-msg neg-margin">{error}</span>}
        <button className="btn-submit" disabled={disableButtons || showLoader}>
          {showLoader ? (
            <ClipLoader size={".9rem"} color="#FFFFFF" />
          ) : (
            "Sign In"
          )}
        </button>
        <button
          className="text-button"
          type="button"
          disabled={disableButtons}
          onClick={() => {
            setShowSignUpForm(true);
            handleClose();
          }}
        >
          Create an account?
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
