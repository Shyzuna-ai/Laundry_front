import { Modal } from "bootstrap";
import React from "react";
import axios from "axios";
import { authorization } from "../config";
import {
    MDBInput,
    MDBCardBody,
} from "mdb-react-ui-kit";

class Users extends React.Component {
    constructor() {
        super()
        this.state = {
            id_user: "",
            nama: "",
            username: "",
            password: "",
            role: "",
            visible: true,
            userss: [
                {
                    id_user: "1", nama: "Doni", username: "dodon", password: "12345", role: "admin"
                },
                {
                    id_user: "2", nama: "Rafli", username: "Rafl", password: "abcd", role: "admin"
                },
                {
                    id_user: "3", nama: "rehan", username: "reh", password: "12345", role: "admin"
                },
            ]
        }
        if (!localStorage.getItem("token")) {
            window.location.href = "/login"
        }
    }
    tambahData() {
        this.modalUsers = new Modal(document.getElementById("modal_users"));
        this.modalUsers.show();

        this.setState({
            action: "tambah",
            id_user: Math.random(1, 10000),
            nama: "",
            username: "",
            password: "",
            role: "",
            fillpassword: true,
        })
    }
    simpanData(event) {
        event.preventDefault();

        if (this.state.action === "tambah") {
            let endpoint = "http://localhost:8000/users"
            let data = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username: this.state.username,
                password: this.state.password,
                role: this.state.role
            }

            // let temp = this.state.userss
            // temp.push(data);
            // this.setState({userss:temp})

            axios.post(endpoint, data, authorization)
                .then(response => {
                    window.alert(response.data.message);
                    this.getData()
                })
                .error(error => console.log(error));
            this.modalUsers.hide();
        } else if (this.state.action === "ubah") {
            // let temp = this.state.userss
            // let index = temp.findIndex(
            //     (user) => user.id_user === this.state.id_user
            // )
            // temp[index].nama = this.state.nama
            // temp[index].username = this.state.username
            // temp[index].password = this.state.password
            // temp[index].role = this.state.role

            // this.setState({userss: temp})
            let endpoint = "http://localhost:8000/users/" + this.state.id_user;
            let data = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username: this.state.username,
                role: this.state.role
            }
            if (this.state.fillpassword === true) {
                data.password = this.state.password
            }
            axios.put(endpoint, data, authorization)
                .then((response) => {
                    window.alert(response.data.message);
                    this.getData();
                })
                .catch((error) => console.log(error));
            this.modalPaket.hide();
        }
    }
    ubahData(id_user) {
        this.modalUsers = new Modal(document.getElementById("modal_users"));
        this.modalUsers.show();

        let index = this.state.userss.findIndex(
            (user) => user.id_user === id_user
        )
        this.setState({
            action: "ubah",
            id_user: id_user,
            nama: this.state.userss[index].nama,
            username: this.state.userss[index].username,
            password: "",
            role: this.state.userss[index].role,
            fillpassword: false,
        })
    }
    hapusData(id_user) {
        if (window.confirm("Apakah anda yakin menghapus data ini?")) {

            // let temp = this.state.userss;
            // let index = temp.findIndex((user => user.id_user === id_user))

            // temp.splice(index, 1);

            // this.setState({userss: temp})
            let endpoint = "http://localhost:8000/users/" + id_user

            axios.delete(endpoint, authorization)
                .then((response) => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch((error) => console.log(error));
        }
    }

    getData() {
        let endpoint = "http://localhost:8000/users"
        axios.get(endpoint, authorization)
            .then(response => {
                this.setState({ userss: response.data })
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getData()
        let user = JSON.parse(localStorage.getItem("user"))
        if (user.role === 'admin') {
            this.setState({
                visible: true
            })
        } else {
            this.setState({
                visible: false
            })
        }
    }

    showpassword() {
        if (this.state.fillpassword === true) {
            return (
                <div>

                    <MDBInput
                        label="Password"
                        type="password"
                        className="form-control mb-2"
                        required
                        value={this.state.password}
                        onChange={ev => this.setState({ password: ev.target.value })}>
                    </MDBInput>
                </div>
            )
        } else {
            return (
                <button className="mb-1 btn btn-success"
                    onClick={() => this.setState({ fillpassword: true })} >
                    change password</button>
            )
        }
    }

    render() {
        return (
            <div className="container-flex m-5">
                <p></p>
                <br></br>
                <p></p>
                <br></br>
                <div className="card">
                    <div className="card-header" style={{ backgroundColor: '#ffb7c5' }}>
                        <h3 className="text-white text-center">List Users</h3>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {this.state.userss.map(user => (
                                <li className="list-group-item">
                                    <div className="row">
                                        <div className="col-lg-4">
                                            <small className="text-white badge text-wrap" style={{ backgroundColor: '#ffb7c5' }}>Nama</small>
                                            <br></br> <h6>{user.nama}</h6>
                                        </div>
                                        <div className="col-lg-4">
                                            <small className="text-white badge text-wrap" style={{ backgroundColor: '#ffb7c5' }}>Username</small>
                                            <br></br> <h6>{user.username}</h6>
                                        </div>
                                        <div className="col-lg-2">
                                            <small className="text-white badge text-wrap" style={{ backgroundColor: '#ffb7c5' }}>Role</small>
                                            <br></br> <h6>{user.role}</h6>
                                        </div>
                                        <div className="col-lg-2 justify-content-center align-self-center">
                                            <div>
                                                <button className={`btn btn-sm  mx-2 ${this.state.visible ? `` : `d-none`}`}
                                                    style={{ backgroundColor: '#ffb7c5', color: '#562135' }}
                                                    onClick={() => this.ubahData(user.id_user)}>
                                                    Edit
                                                </button>
                                                <button className={`btn btn-sm btn-danger mx-2 ${this.state.visible ? `` : `d-none`}`}
                                                    onClick={() => this.hapusData(user.id_user)}>
                                                    Hapus
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button
                            className={`btn btn-sm btn-info my-3 ${this.state.visible ? `` : `d-none`}`}
                            style={{ backgroundColor: '#ffb7c5', color: '#562135' }}
                            onClick={() => this.tambahData()}>
                            Tambah data User
                        </button>
                    </div>
                </div>
                <p></p>
                <br></br>
                <p></p>
                <br></br>
                <p></p>
                <br></br>

                {/* form modal data paket */}
                <div className="modal" id="modal_users">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <MDBCardBody className="modal-body">
                                <form onSubmit={(ev) => this.simpanData(ev)}>
                                    <p className="h4 text-center py-4">Form Data Member</p>
                                    <div className="grey-text">
                                        <MDBInput
                                            label="Nama"
                                            type="text"
                                            className="form-control mb-2"
                                            value={this.state.nama}
                                            onChange={(ev) => this.setState({ nama: ev.target.value })}
                                            required>
                                        </MDBInput>

                                        <MDBInput
                                            label="Username"
                                            type="text"
                                            className="form-control mb-2"
                                            value={this.state.username}
                                            onChange={(ev) => this.setState({ username: ev.target.value })}>
                                        </MDBInput>
                                        {this.showpassword()}
                                        <div></div>

                                        <select
                                            type="text"
                                            className="form-control mb-2"
                                            value={this.state.role}
                                            onChange={(ev) => this.setState({ role: ev.target.value })}>
                                            <option value="Admin">Admin</option>
                                            <option value="Kasir">Kasir</option>
                                        </select>
                                    </div>
                                    <div className="text-center py-4 mt-3">
                                        <button className="btn" type="submit" style={{ backgroundColor: '#ffb7c5' }}>
                                            Simpan
                                        </button>
                                    </div>
                                </form>
                            </MDBCardBody>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Users