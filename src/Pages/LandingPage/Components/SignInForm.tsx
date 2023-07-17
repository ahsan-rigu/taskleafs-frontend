import React, { useContext, useEffect, useState } from "react";
import "./Components.css";
import { BiHide, BiShow } from "react-icons/bi";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthContext";

interface Props {
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInForm: React.FC<Props> = ({
  setShowSignInForm,
  setShowSignUpForm,
}) => {
  const { signIn } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [transitionState, setTransitionState] = useState<String>("entering");

  const handleSignIn = (event: any) => {
    event.preventDefault();
    toast.promise(signIn(event.target[0].value, event.target[1].value), {
      loading: "Loading",
      success: "Got the data",
      error: "Error when fetching",
    });
    handleClose();
  };

  const handleClose = (): void => {
    setTransitionState("leaving");
    setTimeout(() => {
      setShowSignInForm(false);
    }, 1000);
  };

  useEffect((): void => {
    setTransitionState("entered");
  }, []);

  return (
    <div className="modal-wrapper">
      <div
        className={`modal-backdrop ${transitionState}`}
        onClick={handleClose}
      ></div>
      <form
        className={`sign-in-form modal ${transitionState}`}
        onSubmit={handleSignIn}
      >
        <h2 className="heading-sign-in-up f-ll">Sign In</h2>
        <label className="f-ssm">
          Username:
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
        <button className="btn-submit">Sign In</button>
        <button
          className="text-button"
          type="button"
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
