import React from "react"
import axios from "axios"
import { Modal } from "bootstrap";

export default class FormTransaksi extends React.Component {
    constructor(){
        super()
        this.state = {
            id_member: "",
            tgl: "",
            batas_waktu: "",
            tgl_bayar: "",
            dibayar: false,
            id_user: "",
            detail_transaksi: [],
            members: [],
            pakets: [],
            id_paket: "",
            qty: 0,
            jenis_paket:"",
            harga: 0
        }
    }

    getMember(){
        let endpoint = "http://localhost:8000/member"
        axios.get(endpoint)
        .then(response => {
            this.setState({members: response.data})
        })
        .catch(error => console.log(error))
    }

    getPaket(){
        let endpoint = "http://localhost:8000/paket"
        axios.get(endpoint)
        .then(response => {
            this.setState({pakets: response.data})
        })
        .catch(error => console.log(error))
    }

    componentDidMount(){
        this.getMember()
        this.getPaket()
    }

    tambahPaket(e){
        e.preventDefault()
        this.modal.hide()
        //untuk menyimpan data paket yang dipilih beserta jumlahnya kedalam array detail_transaksi
        let idPaket = this.state.id_paket
        let selectedPaket = this.state.pakets.find(
            paket => paket.id_paket == idPaket
        )
        let newPaket = {
            id_paket: this.state.id_paket,
            qty: this.state.qty,
            jenis_paket: selectedPaket.jenis_paket,
            harga: selectedPaket.harga
        }

        //ambil array detail_transaksinya
        let temp = this.state.detail_transaksi
        temp.push(newPaket)
        this.setState({detail_transaksi: temp})
    }

    addPaket(){
        //menampilkan form untuk modal memilih paket
        this.modal = new Modal(document.getElementById('modal_paket')
        )
        this.modal.show()

        //kosongkan form nya
        this.setState({
            id_paket: "",
            qty:0,
            jenis_paket:"",
            harga:0
        })
    }

    simpanTransaksi(){
        let endpoint = "http://localhost:8000/transaksi"
        let user = JSON.parse(localStorage.getItem("user"))
        let newData = {
            id_member: this.state.id_member,
            batas_waktu: this.state.batas_waktu,
            tgl: this.state.tgl,
            tgl_bayar: this.state.tgl_bayar,
            dibayar: this.state.dibayar,
            id_user: user.id_user
        }
        axios.post(endpoint, newData)
        .then(response => {window.alert(response.data.message)})
        .catch(error => console.log(error))
    }

    render(){
        return (
            <div className="card">
                <div className="card-header bg-primary">
                    <h4 className="text-white">
                        Form Transaksi
                    </h4>
                </div>

                <div className="card-body">
                    Member
                    <select className="form-control mb-2"
                        value={this.state.id_member}
                        onChange={e => this.setState({id_member: e.target.value})}>
                            {this.state.members.map(member => (
                                <option value={member.id_member}>
                                    {member.nama}
                                </option>
                            ))}
                    </select>

                    Tanggal Transaksi
                    <input type="date" className="form-control mb-2"
                    value={this.state.tgl} 
                    onChange={e => this.setState({tgl: e.target.value})}/>

                    Batas Waktu
                    <input type="date" className="form-control mb-2"
                    value={this.state.batas_waktu} 
                    onChange={e => this.setState({batas_waktu: e.target.value})}/>

                    Tanggal Bayar
                    <input type="date" className="form-control mb-2"
                    value={this.state.tgl_bayar} 
                    onChange={e => this.setState({tgl_bayar: e.target.value})}/>

                    Status Bayar
                    <select className="form-control mb-2"
                    value={this.state.dibayar}
                    onChange={e => this.setState({dibayar: e.target.value})}>
                        <option value={true}>Sudah Dibayar</option>
                        <option value={false}>Belum Dibayar</option>
                    </select>

                    <button className="btn btn-success" onClick={() => this.addPaket()}>
                        Tambah Paket
                    </button>

                    <h5>Detail Transaksi</h5>
                                {this.state.detail_transaksi.map(detail => (
                                    <div className="row">
                                        {/* area nama paket col-3 */}
                                        <div className="col-lg-2">
                                            {detail.jenis_paket}
                                        </div>
                                        {/* area quantity col-2 */}
                                        <div className="col-lg-2">
                                            Qty: {detail.qty}
                                        </div>
                                        {/* area harga paket col-3 */}
                                        <div className="col-lg-3">
                                            @ Rp {detail.harga}
                                        </div>
                                        {/* area harga total col-4 */}
                                        <div className="col-lg-3">
                                            Rp {detail.harga * detail.qty}
                                        </div>
                                        <div className="col-lg-1">
                                        <button type="button" className="btn btn-danger">Hapus</button>
                                        </div>
                                    </div>
                                ))}

                    <button className="btn btn-success btn-sm" onClick={() => this.simpanTransaksi()}>Simpan Transaksi</button>

                    {/*modal utk pilihan paket */}
                    <div className="modal" id="modal_paket">
                        <div className="modal-dialog momdal-md">
                            <div className="modal-content">
                                <div className="modal-header bg-danger">
                                    <h4 className="text-white">
                                        Pilih Paket
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={(e) => this.tambahPaket(e)}>
                                        Pilih Paket
                                        <select className="form-control mb-2"
                                        value={this.state.id_paket}
                                        onChange={e => this.setState({id_paket: e.target.value})}>
                                            <option value="">Pilih Paket</option>
                                            {this.state.pakets.map(paket =>(
                                                <option value={paket.id_paket}>
                                                    {paket.jenis_paket}
                                                </option>
                                            ))}
                                        </select>

                                        jumlah (Qty)
                                        <input type="number" className="form-control mb-2"
                                        value={this.state.qty}
                                        onChange={e => this.setState({qty: e.target.value})}/>

                                        <button type="sumbit" className="btn btn-success">
                                            Tambah
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}