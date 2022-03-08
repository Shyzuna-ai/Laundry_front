import React from "react"
import {Modal} from "bootstrap";
import axios from "axios"


class User extends React.Component {
    constructor() {
        super()
        this.state = {
            users: [
                {
                    id_user: '1',
                    nama: 'My Self',
                    username: 'MyMe',
                    role: 'admin',
                    password: 'MyMe123',
                },
            ],
            id_user: '1',
            nama: 'My Self',
            username: 'MyMe',
            role: 'admin',
            password: 'MyMe123',
        }
    }

    createData() {
        //show create modal
        this.modalUser = new Modal(document.getElementById("modal-user"))
        this.modalUser.show()

        //empty modal input
        this.setState({
            id_user: Math.random(1, 1000),
            nama: "",
            username: "",
            role: "Member",
            password: "",
        })
    }

    editData(id_user) {
        this.modalUser = new Modal(document.getElementById("modal-user"))
        this.modalUser.show()
        
        // find index from member's data  based on their ids in member's array
        let index = this.state.users.findIndex(user => user.id_user === id_user)

        this.setState({
            id_user: this.state.users[index].id_user,
            nama: this.state.users[index].nama,
            username: this.state.users[index].username,
            role: this.state.users[index].role,
            password: this.state.users[index].password,
            action: "edit",
        })
    }

    storeData(event) {
        event.preventDefault()
        //mencegah berjalannya aksi default dari form submit

        //menghilangkan modal
        this.modalUser.hide()

        //cek aksi tambah atau ubah
        if (this.state.action === "create") {
            let endpoint = "http://localhost:8000/users"
            let data = {
                id_user: this.state.id_user,
                nama: this.state.nama,
                username : this.state.username,
                role: this.state.role,
                password: this.state.password
            }

            //let temp = this.state.members
            //temp.push(newMember)

            //this.setState({members: temp})
            axios.post(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
        else if (this.state.action === "edit"){
            this.modalUser.hide()
            let endpoint = "http://localhost:8000/users/" +
                this.state.id_user

                let data = {
                    id_user: this.state.id_member,
                    nama: this.state.nama,
                    username: this.state.username,
                    role: this.state.role,
                    password: this.state.password
                }
    
                axios.put(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
    
                this.modalUser.hide()
            }
            this.getdata()
        }
    deleteData(id_user){
        if (window.confirm("Are you sure to delete this data?")){}
        let endpoint = "http://localhost:8000/users/" + id_user
        axios.delete(endpoint)
        .then(response => {
            window.alert(response.data.message)
            this.getData()
        })
        .catch(error => console.log(error))
    }
    getdata(){
        let endpoint = "http://localhost:8000/users"
        axios.get(endpoint)
            .then(response =>{
                this.setState({users: response.data})
            })
            .catch(error => console.log(error))
    }
    componentDidMount(){
        //fungsi ini dijalankan setelah fungsi render berjalan
        this.getdata()
    }
    render() {
        return (
            <div className="card">
                <div className="card-header bg-primary">
                    <h4 className="text-white">List Daftar User</h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.users.map(user => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-2">
                                        <small className="text-info">Nama</small>
                                        <br />
                                        {user.nama}
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="text-info">Username</small>
                                        <br />
                                        {user.username}
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-info">Role</small>
                                        <br />
                                        {user.role}
                                    </div>
                                    <div className="col-lg-3">
                                        <button type="button" className="btn btn-warning me-2" onClick={() => this.editData(user.id_user)}>Ubah</button>
                                        <button type="button" className="btn btn-danger" onClick={() => this.deleteData(user.id_user)}>Hapus</button>
                                    </div>
                                    <div className="col-lg-12">
                                        <small className="text-info">Password</small>
                                        <br />
                                        {user.password}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button type="button" className="btn btn-success mt-3" onClick={() => this.createData()}>
                        Tambah User
                    </button>
                </div>
                {/* Create Member Modal */}
                <div className="modal" id="modal-user">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form User
                                </h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.storeData(ev)}>
                                    Nama
                                    <input type="text" className="form-control mb-2" value={this.state.nama} onChange={ev => this.setState({ nama: ev.target.value })} required />

                                    Username
                                    <input type="text" className="form-control mb-2" value={this.state.username} onChange={ev => this.setState({ username: ev.target.value })} required />

                                    Role
                                    <select className="form-control mb-2" value={this.state.role} onChange={ev => this.setState({ role: ev.target.value })}>
                                        <option value="admin">Admin</option>
                                        <option value="member">Member</option>
                                    </select>
                                    
                                    Password
                                    <input type="text" className="form-control mb-2" value={this.state.password} onChange={ev => this.setState({ password: ev.target.value })} required />


                                    <button className="btn btn-success btn-sm" type="submit" >Simpan</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default User