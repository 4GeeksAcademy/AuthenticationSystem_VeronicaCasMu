import React, {useContext} from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate()
  const { store, actions } = useContext(Context);

  return (
    <>
    <div className='text-center mt-5'>
      <form className='text-center' noValidate onSubmit={e=>{e.preventDefault(); actions.signUpUser(), e.target.reset()}}>
      <h1>SignUp</h1>
      <input name='username' type='text' className='form-control' id='input_username' placeholder='Username'  onChange={(e)=>actions.handleChange(e, "signup")}/>
      <input name='first_name' type='text' className='form-control' id='input_first_name' placeholder='First Name'  onChange={(e)=>actions.handleChange(e, "signup")}/>
      <input name='last_name' type='text' className='form-control' id='input_last_name' placeholder='LastName'  onChange={(e)=>actions.handleChange(e, "signup")}/>
      <input name='email' type='text' className='form-control' id='input_email' placeholder='Email'  onChange={(e)=>actions.handleChange(e, "signup")}/>
      <input name='password' type='text' className='form-control' id='input_password' placeholder='Password'  onChange={(e)=>actions.handleChange(e, "signup")}/>
      <button className="btn border text-dark" type="button" onClick={()=>{actions.signUpUser()}}>Sign Up</button>
      </form>
    </div>
    <Link to="/">
    <p>Back Home</p>
    </Link>
    </>

  )
}

