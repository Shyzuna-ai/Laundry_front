import React from "react"
import {Modal} from "bootstrap";
import axios from "axios"


class Paket extends React.Component {
    constructor() {
        super()
        this.state = {
            pakets: [
                {
                    id_paket: '1',
                    harga: '1000000',
                    jenis_paket: 'Baju'
                },
            ],
            id_paket: "",
            harga: "",
            jenis_paket: "",
            action: "",
        }
    }

    createData() {
        //show create modal
        this.modalPaket = new Modal(document.getElementById("modal-paket"))
        this.modalPaket.show()

        //empty modal input
        this.setState({
            id_paket: Math.random(1, 1000),
            harga: "",
            jenis_paket: "",
            action: "create",
        })
        this.getdata()
    }

    editData(id_paket) {
        this.modalPaket = new Modal(document.getElementById("modal-paket"))
        this.modalPaket.show()
        
        // find index from member's data  based on their ids in member's array
        let index = this.state.pakets.findIndex(Paket => Paket.id_paket === id_paket)

        this.setState({
            id_paket: this.state.pakets[index].id_paket,
            harga: this.state.pakets[index].harga,
            jenis_paket: this.state.pakets[index].jenis_paket,
            action: "edit",
        })
        this.getdata()
    }

    storeData(event) {
        event.preventDefault()
        //mencegah berjalannya aksi default dari form submit

        //menghilangkan modal
        this.modalPaket.hide()

        //cek aksi tambah atau ubah
        if (this.state.action === "create") {
            let endpoint = "http://localhost:8000/paket"
            let data = {
                id_paket: this.state.id_paket,
                harga: this.state.harga,
                jenis_paket: this.state.jenis_paket,
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
            this.modalPaket.hide()
            let endpoint = "http://localhost:8000/paket/" +
                this.state.id_paket

                let data = {
                    id_paket: this.state.id_paket,
                    harga: this.state.harga,
                    jenis_paket: this.state.jenis_paket,
                }
    
                axios.put(endpoint, data)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
    
                this.modalPaket.hide()
            }
            this.getdata()
        }
    deleteData(id_paket){
        if (window.confirm("Are you sure to delete this data?")){}
        let endpoint = "http://localhost:8000/paket/" + id_paket
        axios.delete(endpoint)
        .then(response => {
            window.alert(response.data.message)
            this.getData()
        })
        .catch(error => console.log(error))
    }
    getdata(){
        let endpoint = "http://localhost:8000/paket"
        axios.get(endpoint)
            .then(response =>{
                this.setState({pakets: response.data})
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
                    <h4 className="text-white">List Daftar Paket</h4>
                </div>
                <div className="card-body">
                    <ul className="list-group">
                        {this.state.pakets.map(paket => (
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <small className="text-info">harga</small>
                                        <br />
                                        {paket.harga}
                                    </div>
                                    <div className="col-lg-3">
                                        <small className="text-info">Jenis Paket</small>
                                        <br />
                                        {paket.jenis_paket}
                                    </div>
                                    <div className="col-lg-3">
                                        <button type="button" className="btn btn-warning me-2" onClick={() => this.editData(paket.id_paket)}>Ubah</button>
                                        <button type="button" className="btn btn-danger" onClick={() => this.deleteData(paket.id_paket)}>Hapus</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button type="button" className="btn btn-success mt-3" onClick={() => this.createData()}>
                        Tambah Paket
                    </button>
                </div>

                {/* Create Member Modal */}
                <div className="modal" id="modal-paket">
                    <div className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header bg-success">
                                <h4 className="text-white">
                                    Form Paket
                                </h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.storeData(ev)}>
                                    Harga
                                    <input type="text" className="form-control mb-2" value={this.state.harga} onChange={ev => this.setState({ harga: ev.target.value })} required />

                                    Jenis Paket
                                    <input type="text" className="form-control mb-2" value={this.state.jenis_paket} onChange={ev => this.setState({ jenis_paket: ev.target.value })} required />

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

export default Paket