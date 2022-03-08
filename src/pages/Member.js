import React from "react"
import {Modal} from "bootstrap";
import axios from "axios"


class Member extends React.Component {
    constructor() {
        super()
        this.state = {
            members: [
                {
                    id_member: '1',
                    nama: 'My Self',
                    alamat: 'Home',
                    jenis_kelamin: 'Male',
                    telepon: '082264134484',
                },
            ],
            id_member: "",
            nama: "",
            alamat: "",
            telepon: "",
            jenis_kelamin: "",
            action: "",
        }
    }

    createData() {
        //show create modal
        this.modalMember = new Modal(document.getElementById("modal-member"))
        this.modalMember.show()

        //empty modal input
        this.setState({
            id_member: Math.random(1, 1000),
            nama: "",
            alamat: "",
            telepon: "",
            jenis_kelamin: "Pria",
            action: "create",
        })
    }

    editData(id_member) {
        this.modalMember = new Modal(document.getElementById("modal-member"))
        this.modalMember.show()
        
        // find index from member's data  based on their ids in member's array
        let index = this.state.members.findIndex(member => member.id_member === id_member)

        this.setState({
            id_member: this.state.members[index].id_member,
            nama: this.state.members[index].nama,
            alamat: this.state.members[index].alamat,
            jenis_kelamin: this.state.members[index].jenis_kelamin,
            telepon: this.state.members[index].telepon,
            action: "edit",
        })
    }

    storeData(event) {
        event.preventDefault()
        //mencegah berjalannya aksi default dari form submit

        //menghilangkan modal
        this.modalMember.hide()

        //cek aksi tambah atau ubah
        if (this.state.action === "create") {
            let endpoint = "http://localhost:8000/member"
            let data = {
                id_member: this.state.id_member,
                nama: this.state.nama,
                alamat : this.state.alamat,
                telepon: this.state.telepon,
                jenis_kelamin: this.state.jenis_kelamin
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
            this.modalMember.hide()
            let endpoint = "http://localhost:8000/member/" +
                this.state.id_member

                let data = {
                    id_member: this.state.id_member,
                    nama: this.state.nama,
                    alamat: this.state.alamat,
                    jenis_kelamin: this.state.jenis_kelamin,
                    telepon: this.state.telepon
                }
    
                axios.put(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
    
                this.modalMember.hide()
            }
            this.getdata()
        }
    deleteData(id_member){
        if (window.confirm("Are you sure to delete this data?")){}
        let endpoint = "http://localhost:8000/member/" + id_member
        axios.delete(endpoint)
        .then(response => {
            window.alert(response.data.message)
            this.getData()
        })
        .catch(error => console.log(error))
    }
    getdata(){
        let endpoint = "http://localhost:8000/member"
        axios.get(endpoint)
            .then(response =>{
                this.setState({members: response.data})
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
                    <h4 className="text-white">List Daftar Member</h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.members.map(member => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-2">
                                        <small className="text-info">Nama</small>
                                        <br />
                                        {member.nama}
                                    </div>
                                    <div className="col-lg-2">
                                        <small className="text-info">Gender</small>
                                        <br />
                                        {member.jenis_kelamin}
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-info">Telepon</small>
                                        <br />
                                        {member.telepon}
                                    </div>
                                    <div className="col-lg-3">
                                        <button type="button" className="btn btn-warning me-2" onClick={() => this.editData(member.id_member)}>Ubah</button>
                                        <button type="button" className="btn btn-danger" onClick={() => this.deleteData(member.id_member)}>Hapus</button>
                                    </div>
                                    <div className="col-lg-12">
                                        <small className="text-info">Alamat</small>
                                        <br />
                                        {member.alamat}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button type="button" className="btn btn-success mt-3" onClick={() => this.createData()}>
                        Tambah Member
                    </button>
                </div>
                {/* Create Member Modal */}
                <div className="modal" id="modal-member">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form Member
                                </h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.storeData(ev)}>
                                    Nama
                                    <input type="text" className="form-control mb-2" value={this.state.nama} onChange={ev => this.setState({ nama: ev.target.value })} required />

                                    Alamat
                                    <input type="text" className="form-control mb-2" value={this.state.alamat} onChange={ev => this.setState({ alamat: ev.target.value })} required />

                                    Telepon
                                    <input type="text" className="form-control mb-2" value={this.state.telepon} onChange={ev => this.setState({ telepon: ev.target.value })} required />

                                    Jenis Kelamin
                                    <select className="form-control mb-2" value={this.state.jenis_kelamin} onChange={ev => this.setState({ jenis_kelamin: ev.target.value })}>
                                        <option value="pria">Pria</option>
                                        <option value="wanita">Wanita</option>
                                    </select>

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

export default Member