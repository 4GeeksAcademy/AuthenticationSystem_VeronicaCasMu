import "../../styles/home.css";
import React from 'react'
import { Link } from "react-router-dom";

export const Home = () => {


	return (
		<>
			<div className="text-center mt-5">
				<h1>Home</h1>
				<img src="https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/house-icon.png" />
			</div>
			<div className="d-flex justify-content-center">
				<Link to="/login">
					<p className="me-3">Login</p>
				</Link>
				<Link to="/signup">
					<p className="ms-3">Signup</p>
				</Link>
			</div>
		</>
	);

};
