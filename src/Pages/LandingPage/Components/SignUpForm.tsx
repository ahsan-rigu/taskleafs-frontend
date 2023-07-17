import React, { useContext, useEffect, useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import "./Components.css";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Contexts/AuthContext";

interface Props {
  setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUpForm: React.FC<Props> = ({
  setShowSignInForm,
  setShowSignUpForm,
}) => {
  const { signUp } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [transitionState, setTransitionState] = useState<String>("entering");

  const handleSignUp = (event: any) => {
    event.preventDefault();
    toast.promise(
      signUp(
        event.target[0].value,
        event.target[1].value,
        event.target[2].value
      ),
      {
        loading: "Loading",
        success: "Got the data",
        error: "Error when fetching",
      }
    );
    handleClose();
  };

  const handleClose = (): void => {
    setTransitionState("leaving");
    setTimeout(() => {
      setShowSignUpForm(false);
    }, 600);
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
        onSubmit={handleSignUp}
      >
        <h2 className="heading-sign-in-up f-ll">Sign Up</h2>
        <label className="f-ssm">
          Name:
          <input type="text" placeholder="username" required />
        </label>
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
        <button className="btn-submit">Sign Up</button>
        <button
          className="text-button"
          type="button"
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
