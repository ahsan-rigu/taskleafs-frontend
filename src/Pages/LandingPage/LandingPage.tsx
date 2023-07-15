import React from 'react'
import { BsLinkedin, BsGithub, BsGlobe, BsFillFilePersonFill} from "react-icons/bs";
import "./LandingPage.css"

const LandingPage = () => {

  return (
    <div className='landing-page'>
      <section className='hero-container'>
          <h1 className='f-ll'>Revolutionize your projects with TaskLeafs™.</h1>
          <span>
          
          <button className='btn-signin'>
            Log In
          </button>
          <button className='btn-signup'>
            Get Started
          </button>
          </span>
      </section>
      <section className='why-us-container'>
        <h2 className='f-ll'>Get Organized, Stay on Track</h2>
        <p className='f-ssm'>
        Imagine all your projects and tasks efficiently managed in a single system, completely free. No more chaos!
        </p>
      </section>
      <section className='client-stats-container'>
        
        <article className='stats-card'>
            <img src={`${process.env.PUBLIC_URL}/assets/stat-1.png`} alt='stat 1'/>
            <h2 className='f-ll'>50</h2>
            <b className='f-ssm'>Happy Clients</b>
        </article>
        <article className='stats-card'>
            <img src={`${process.env.PUBLIC_URL}/assets/stat-2.png`} alt='stat 2'/>
            <h2 className='f-ll'>5</h2>
            <b className='f-ssm'>Countries Served</b>
        </article>
        <article className='stats-card'>
            <img src={`${process.env.PUBLIC_URL}/assets/stat-3.png`} alt='stat 3'/>
            <h2 className='f-ll'>5K</h2>
            <b className='f-ssm'>Projects Delivered</b>
        </article>
      </section>
      <section className='second-container '>
          <h2 className='f-ll'>Say goodbye to project incompleteness. Join TaskLeafs™ now!</h2>
          <span>
          <button className='btn-signin'>
            Log In
          </button>
          <button className='btn-signup'>
            Get Started
          </button>
          </span>
      </section>
      <section className='image-row'>
        <img src={`${process.env.PUBLIC_URL}/assets/stat-1.png`} alt="deco" />
        <img className={"no-mobile no-tablet"} src={`${process.env.PUBLIC_URL}/assets/stat-2.png`} alt="deco" />
        <img className={"no-mobile"} src={`${process.env.PUBLIC_URL}/assets/stat-3.png`} alt="deco" />
        <img className={"no-mobile"} src={`${process.env.PUBLIC_URL}/assets/hero.png`} alt="deco" />
        <img src={`${process.env.PUBLIC_URL}/assets/client-1.png`} alt="deco" />
        <img className={"no-mobile no-tablet"} src={`${process.env.PUBLIC_URL}/assets/client-2.png`} alt="deco" />
      </section>
      <section className='testimonials-container'>
        <article className='testimonial-card' >
        <img src={`${process.env.PUBLIC_URL}/assets/client-1.png`} alt="deco" />
        <p className='f-ssm'>Switching to TaskLeafs™ was the best decision we’ve ever made! Projects are running smoothly and meeting deadlines.</p>
        <span className='f-ssm'>
          Touter
        </span>
        </article>
        <article className='testimonial-card' >
        <img src={`${process.env.PUBLIC_URL}/assets/client-2.png`} alt="deco" />
        <p className='f-ssm'>With TaskLeafs™, our team is more connected and efficient than ever. It’s a true game-changer in project management.</p>
        <span className='f-ssm'>
          Timeless
        </span>
        </article>
      </section>
      <footer>
        <img src={`${process.env.PUBLIC_URL}/assets/hero.png`} alt='footer-img'/>
        <span>
          <a href='google.com'><BsLinkedin /></a>
          <a href='google.com'><BsGithub/></a>
          <a href='google.com'><BsGlobe/></a>
          <a href='google.com'><BsFillFilePersonFill/></a>
        </span>
        <p>
        © TaskLeafs™ 2023. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

export default LandingPage
