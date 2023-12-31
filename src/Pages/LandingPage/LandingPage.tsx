import React, { useContext, useState } from "react";
import {
  BsLinkedin,
  BsGithub,
  BsGlobe,
  BsFillFilePersonFill,
} from "react-icons/bs";
import "./LandingPage.css";
import ThemeButton from "../../Components/ThemeButton/ThemeButton";
import SignInForm from "./Components/SignInForm";
import SignUpForm from "./Components/SignUpForm";
import { AuthContext } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { token } = useContext(AuthContext);

  const [showSignUpForm, setShowSignUpForm] = useState<boolean>(false);
  const [showSignInForm, setShowSignInForm] = useState<boolean>(false);

  return (
    <>
      {showSignUpForm && (
        <SignUpForm
          setShowSignUpForm={setShowSignUpForm}
          setShowSignInForm={setShowSignInForm}
        />
      )}
      {showSignInForm && (
        <SignInForm
          setShowSignInForm={setShowSignInForm}
          setShowSignUpForm={setShowSignUpForm}
        />
      )}
      <div className="landing-page">
        <header>
          <span className="Logo">TaskLeafs</span>
          <ThemeButton />
        </header>
        <section className="hero-container">
          <h1 className="f-ll">Revolutionize your projects with TaskLeafs™.</h1>
          <span>
            {!token ? (
              <>
                <button
                  className="btn-signin"
                  onClick={() => setShowSignInForm(true)}
                >
                  Log In
                </button>
                <button
                  className="btn-signup"
                  onClick={() => setShowSignUpForm(true)}
                >
                  Get Started
                </button>
              </>
            ) : (
              <Link to={"/dashboard"} className="btn-link">
                {" "}
                Open Dashboard
              </Link>
            )}
          </span>
        </section>
        <section className="why-us-container">
          <h2 className="f-ll">Get Organized, Stay on Track</h2>
          <p className="f-ssm">
            Imagine all your projects and tasks efficiently managed in a single
            system, completely free. No more chaos!
          </p>
        </section>
        <section className="client-stats-container">
          <article className="stats-card">
            <img
              src={`${process.env.PUBLIC_URL}/assets/stat-1.png`}
              alt="stat 1"
            />
            <h2 className="f-ll">50</h2>
            <b className="f-ssm">Happy Clients</b>
          </article>
          <article className="stats-card">
            <img
              src={`${process.env.PUBLIC_URL}/assets/stat-2.png`}
              alt="stat 2"
            />
            <h2 className="f-ll">5</h2>
            <b className="f-ssm">Countries Served</b>
          </article>
          <article className="stats-card">
            <img
              src={`${process.env.PUBLIC_URL}/assets/stat-3.png`}
              alt="stat 3"
            />
            <h2 className="f-ll">5K</h2>
            <b className="f-ssm">Projects Delivered</b>
          </article>
        </section>
        <section className="second-container ">
          <h2 className="f-ll">
            Say goodbye to project incompleteness. Join TaskLeafs™ now!
          </h2>
          <span>
            {!token ? (
              <>
                <button
                  className="btn-signin"
                  onClick={() => setShowSignInForm(true)}
                >
                  Log In
                </button>
                <button
                  className="btn-signup"
                  onClick={() => setShowSignUpForm(true)}
                >
                  Get Started
                </button>
              </>
            ) : (
              <Link to={"/dashboard"} className="btn-link">
                {" "}
                Open Dashboard
              </Link>
            )}
          </span>
        </section>
        <section className="image-row">
          <img src={`${process.env.PUBLIC_URL}/assets/stat-1.png`} alt="deco" />
          <img
            className={"no-mobile no-tablet"}
            src={`${process.env.PUBLIC_URL}/assets/stat-2.png`}
            alt="deco"
          />
          <img
            className={"no-mobile"}
            src={`${process.env.PUBLIC_URL}/assets/stat-3.png`}
            alt="deco"
          />
          <img
            className={"no-mobile"}
            src={`${process.env.PUBLIC_URL}/assets/hero.png`}
            alt="deco"
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/client-1.png`}
            alt="deco"
          />
          <img
            className={"no-mobile no-tablet"}
            src={`${process.env.PUBLIC_URL}/assets/client-2.png`}
            alt="deco"
          />
        </section>
        <section className="testimonials-container">
          <article className="testimonial-card">
            <img
              src={`${process.env.PUBLIC_URL}/assets/client-1.png`}
              alt="deco"
            />
            <p className="f-ssm">
              Switching to TaskLeafs™ was the best decision we’ve ever made!
              Projects are running smoothly and meeting deadlines.
            </p>
            <span className="f-ssm">Touter</span>
          </article>
          <article className="testimonial-card">
            <img
              src={`${process.env.PUBLIC_URL}/assets/client-2.png`}
              alt="deco"
            />
            <p className="f-ssm">
              With TaskLeafs™, our team is more connected and efficient than
              ever. It’s a true game-changer in project management.
            </p>
            <span className="f-ssm">Timeless</span>
          </article>
        </section>
        <footer>
          <img
            src={`${process.env.PUBLIC_URL}/assets/hero.png`}
            alt="footer-img"
          />
          <span>
            <a href="google.com" title="LinkedIn Page">
              <BsLinkedin size={"2rem"} />
            </a>
            <a href="google.com" title="Github Page">
              <BsGithub size={"2rem"} />
            </a>
            <a href="google.com" title="My Portfolio">
              <BsGlobe size={"2rem"} />
            </a>
            <a href="google.com" title="My Resume">
              <BsFillFilePersonFill size={"2rem"} />
            </a>
          </span>
          <p className="f-ssm">© TaskLeafs™ 2023. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default LandingPage;
