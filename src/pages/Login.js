import axios from "axios";
import '../login.css';
import React from "react";
import IMAGE from'../carrot.jpg';
import {
    MDBInput
  } from 'mdb-react-ui-kit';

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
                window.location.href = "/member"
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
                <div className="box-1 mt-md-0 mt-5"><img src={IMAGE} className="" alt=""></img></div>
                <div className=" box-2 d-flex flex-column h-100">
                    <div className="mt-5">
                        <p className="mb-3 h-1 text-center">Login Account</p>
                            
                        <div className="card-body">
                            <form onSubmit={ev => this.loginProcess(ev)}>
                                
                                <MDBInput type="text" className="form-control mb-2"
                                required value={this.state.username}
                                label="Username"
                                onChange={ev => this.setState({username: ev.target.value})}
                                />

                                
                                <MDBInput type="password" className="form-control mb-2"
                                required value={this.state.password}
                                label="Password"
                                onChange={ev => this.setState({password: ev.target.value})}
                                />
                                
                                <button type="submit" className="btn button btn-primary mt-2">
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