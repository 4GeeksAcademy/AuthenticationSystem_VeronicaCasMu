import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Private = () => {
  const { store, actions } = useContext(Context);


  store.hiddenLogout ? actions.changeLogoutButton(false): null 

  
  if (store.isloged) {
		return (
			<div className="container private mt-5 text-white">
				<img src="https://cdn-icons-png.flaticon.com/512/1026/1026658.png"/>
			</div>
		);
    }
    
    else{
      return (
        <div className="container">
          <img src="https://png.pngtree.com/png-clipart/20220823/original/pngtree-login-access-denied-vector-illustration-png-image_8480029.png"/>
        </div>
      )
    }
		

};

