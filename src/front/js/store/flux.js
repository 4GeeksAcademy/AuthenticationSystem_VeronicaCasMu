const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			hiddenLogout: null,
			hiddenLogin: false,
			message: null,
			token_user: null,
			signup: false,
			isloged: false,
			passwordIsCorrect: false,
			go: true,
			user_loged: {},
			user_data: {
				username: null,
				first_name: null,
				last_name: null,
				email: null,
				password: null
			},

			login_user:{
               email: null,
			   password: null
			}
		},
		actions: {
			isPropertyEmpty : (obj)=> {
				for(const key in obj){
					if(obj[key] === "" || obj[key]==null || obj[key]===undefined){
                          return true;
					}
				}
				return false;
			},
			signUpUser: async () => {
				const store = getStore()
				const actions = getActions()
				try {

					if (actions.isPropertyEmpty(store.user_data)) {
						alert("Le falta llenar algunos datos");
						return;
					}

					const response = await fetch(process.env.BACKEND_URL + "/signup", {
						method: 'POST',
						body: JSON.stringify(store.user_data),
						headers: {
							'Content-Type': 'application/json'
						}
					})

					const result = await response.json()
					if (response.status == 400) {
						setStore({ signup: false })
						alert(result.message)

					}


					if (response.ok) {
						setStore({ signup: true })
						alert("User add success")
						setStore({ hiddenLogin: true })
					}


				} catch (error) {
					console.error(error + " Error loading message from backend");
					setStore({ signup: false })
				}
			},
			logInUser: async () => {
				const store = getStore()
				const actions = getActions()
				try {
					if (actions.isPropertyEmpty(store.login_user)) {
						alert("Le falta llenar algunos datos");
						return;
					}

					const response = await fetch(process.env.BACKEND_URL + "/login", {
						method: 'POST',
						body: JSON.stringify(store.login_user),
						headers: {
							'Content-Type': 'application/json'
						}
					})
					const result = await response.json()
					console.log(result);

					if(response.status==400){
                        setStore({isloged: false})
						setStore({passwordIsCorrect: false})
						alert(result.message)
						alert("No se pudo iniciar sesion")
					}

					if (response.ok) {
						localStorage.setItem("jwt-token", result.token);
						alert("User add success");
						setStore({ isloged: true });
						setStore({passwordIsCorrect: true})
					} else {
						alert(result.message)
					}

				} catch (error) {
					console.log(error + " Error loading message from backend")
					setStore({ isloged: false })
				}

			},
			private: async () => {
				const token = localStorage.getItem('jwt-token')
				const store = getStore()
				setStore({ token_user: token})
				try {
					const response = await fetch(process.env.BACKEND_URL + "/private", {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							'Authorization': 'Bearer ' + token // ⬅⬅⬅ authorization token
						}
					})
					const result = await response.json()
					setStore({ user_loged: result })
					console.log(store.user_loged);

				} catch (error) {
					console.log(error + " Error loading message from backend");
				}
			},
			changeLogoutButton: (value) => {
				setStore({ hiddenLogout: value })
			},
			changeLogInStatus: (value) => {
				setStore({ isloged: value })
			},
			changeLoginButton: (value) => (
				setStore({ hiddenLogin: value })
			),
			changeSignUpStatus: (value) => {
				setStore({ signup: value })
			},
			logout: () => {
				setStore({ isloged: false })
				localStorage.clear();
			},
			handleChange: (e, type) => {
				const store = getStore()
				if(type=="login"){
					const newUserData = {...store.login_user}
					newUserData[e.target.name] = e.target.value
					setStore({login_user: newUserData})
				}else if(type=="signup"){
					const newUserData = {...store.user_data}
					newUserData[e.target.name] = e.target.value
					setStore({user_data: newUserData})
				}
			}
		}
	};
};

export default getState;
