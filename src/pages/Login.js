import React from "react";
import axios from "axios";
import '../login.css';

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
                username: "",
                password: ""
        }
    }

    loginProcess(event){
        event.preventDefault()
        let endpoint = "http://localhost:8000/login"
        let request = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post(endpoint, request)
        .then(result => {
            if (result.data.logged) {
                //store token in local storage
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("user", JSON.stringify(result.data.user))
                window.alert("Successfuly Logged In")
            }
            else {
                window.alert("Username Or Password Incorrect")
            }
        })
        .catch(error => console.log(error))
    }


    render(){
        return (
            <div className="container">
                <div className="body d-md-flex align-items-center justify-content-between">
                <div class="box-1 mt-md-0 mt-5"><img src="https://images.pexels.com/photos/2033997/pexels-photo-2033997.jpeg" class="" alt=""></img></div>
                <div class=" box-2 d-flex flex-column h-100">
                    <div className="mt-5">
                        <p className="mb-3 h-1">Login Account</p>
                        <div className="card-body">
                            <form onSubmit={ev => this.loginProcess(ev)}>
                                Username
                                <input type="text" className="form-control mb-2"
                                required value={this.state.username}
                                onChange={ev => this.setState({username: ev.target.value})}/>

                                Password
                                <input type="password" className="form-control mb-2"
                                required value={this.state.password}
                                onChange={ev => this.setState({password: ev.target.value})}/>
                                
                                <button type="submit" className="btn btn-primary mt-2">
                                    Log In   
                                </button>
                            </form>        
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login