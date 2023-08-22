import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);
  store.isloged ? navigate('/private'):null
  store.signup ? actions.changeSignUpStatus(false):null
  !store.hiddenLogout ? actions.changeLogoutButton(true): null 

  return (
    <>
      <div className='text-center mt-5'>
        <form className="text-center" noValidate onSubmit={e=>{e.preventDefault(); actions.logInUser()}}>
          <label className="text-dark">Enter your email and password</label>
          <input name='email' type='email' className='form-control' placeholder='Email' id='validationFirstCustom' required onChange={(e)=>actions.handleChange(e, "login")} ></input>
          <input name='password' type='password' className='form-control' placeholder='Password' id='validationSecondCustom' required onChange={(e)=>actions.handleChange(e, "login")} ></input>
          <button className="btn border text-dark" type="submit" onClick={()=>{actions.logInUser()}}>Log In</button>
        </form>
      </div>
      <div className="links d-flex justify-content-center">
        <div>
          <label>Don't you have an account?</label>
          <Link to="/signup">
            <p>SignUp</p>
          </Link>
        </div>
        <Link to="/">
            <p>Back Home</p>
          </Link>
      </div>
    </>
  )
}

