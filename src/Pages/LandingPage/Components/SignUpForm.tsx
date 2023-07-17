import React, { useEffect, useState } from 'react'
import "./Components.css"

interface Props {
  setShowSignUpForm: React.Dispatch<React.SetStateAction<boolean>>
  setShowSignInForm: React.Dispatch<React.SetStateAction<boolean>>
}

const SignUpForm: React.FC<Props> = ({setShowSignInForm, setShowSignUpForm}) => {

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [transitionState, setTransitionState] = useState<String>("entering")

  const handleClose = (): void => {
    setTransitionState("leaving")
    setTimeout(()=>{
      setShowSignUpForm(false)
    },600)
  }

  useEffect((): void => {
    setTransitionState("entered")
  },[])

  return (
    <div className='modal-wrapper'>
    <div className={`modal-backdrop ${transitionState}`} onClick={handleClose}>
      </div>
    <form className={`sign-in-form modal ${transitionState}`}>
      <h2 className='heading-sign-in-up f-ll'>Sign Up</h2>
      <label className='f-ssm'>
        Name:
        <input type='text' placeholder='username' required/>
      </label>  
      <label className='f-ssm'>
        Username:
        <input type='text' placeholder='username' required/>
      </label>
      <label className='f-ssm'>
        Password:
        <input type={showPassword? "text" : "password"} placeholder='password' required/>
        {/* <button className='show-hide--button' title='show password' onClick={()=>setShowPassword(prev=>!prev)}>
          show
        </button> */}
      </label>
      <button className='btn-submit'>
        Sign In
      </button>
      <button className='text-button' type='button' onClick={()=> {
        setShowSignInForm(true) 
        handleClose() }}>
        Already a user? Sign In
      </button>
    </form>
    </div>
  )
}

export default SignUpForm
