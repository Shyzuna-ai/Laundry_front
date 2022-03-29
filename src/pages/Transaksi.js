import React from "react";
import axios from "axios";
import { authorization, formatNumber } from "../config";
import ReactToPdf from "react-to-pdf"
import domToPdf from "dom-to-pdf"

export default class Transaksi extends React.Component {
    constructor() {
        super()
        this.state = {
            transaksi: []
        }
        if (!localStorage.getItem("token")) {
            window.location.href = "/login"
        }
    }

    getData() {
        let endpoint = "http://localhost:8000/transaksi"
        axios.get(endpoint, authorization)
            .then(response => {
                let dataTransaksi = response.data
                for (let i = 0; i < dataTransaksi.length; i++) {
                    let total = 0;
                    for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                        let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                        let qty = dataTransaksi[i].detail_transaksi[j].qty

                        total += (harga * qty)
                    }

                    //tambahkan key total
                    dataTransaksi[i].total = total
                }
                this.setState({ transaksi: dataTransaksi })
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getData()
    }

    convertStatus(id_transaksi, status) {
        if (status === 1) {
            return (
                <div className="badge bg-info text-white">
                    Transaksi Baru
                    <br></br>
                    <a onClick={() => this.changeStatus(id_transaksi, 2)} className="text-danger">
                        klik untuk ganti
                    </a>
                </div>
            )
        } else if (status === 2) {
            return (
                <div className="badge bg-warning text-white">
                    Sedang diproses

                    <br></br>
                    <a onClick={() => this.changeStatus(id_transaksi, 3)} className="text-danger">
                        klik untuk ganti
                    </a>
                </div>
            )
        } else if (status === 3) {
            return (
                <div className="badge bg-secondary text-white">
                    Siap diambil
                    <br></br>
                    <a onClick={() => this.changeStatus(id_transaksi, 4)} className="text-danger">
                        klik untuk ganti
                    </a>
                </div>
            )
        } else if (status === 4) {
            return (
                <div className="badge bg-success text-white">
                    Telah Diambil
                </div>
            )
        }
    }

    changeStatus(id, status) {
        if (window.confirm(`Apakah anda yakin ingin mengganti statusnya?`)) {
            let endpoint = `http://localhost:8000/transaksi/status/${id}`
            let data = {
                status: status
            }

            axios.post(endpoint, data, authorization)
                .then(response => {
                    window.alert(`Status telah diubah`)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    convertStatusBayar(id_transaksi, dibayar) {
        if (dibayar == 0) {
            return (
                <div className="badge bg-danger text-white">



                    <a onClick={() => this.changeStatusBayar(id_transaksi, 1)} className="text-white">
                        belum dibayar
                    </a>
                </div>
            )
        } else if (dibayar == 1) {
            return (
                <div className="badge bg-success text-white">
                    Sudah dibayar
                </div>
            )
        }
    }

    changeStatusBayar(id, status) {
        if (window.confirm(`Apakah yakin mngubah status bayar?`)) {
            let endpoint = `http://localhost:8000/transaksi/bayar/${id}`

            axios.get(endpoint, authorization)
                .then(response => {
                    window.alert(`status bayar berhasil diubah`)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }
    deleteTransaksi(id) {
        if (window.confirm(`Apakah anda yakin menghapus data tersebut?`)) {
            let endpoint = `http://localhost:8000/transaksi/${id}`
            axios.delete(endpoint, authorization)
                .then(response => {
                    window.alert(response.data.message)
                    this.getData()
                })
                .catch(error => console.log(error))
        }
    }

    convertPdf() {
        // ambil element yang akan diconvert ke PDF
        let element = document.getElementById(`target`)
        let options = {
            filename: "Coba laundry.pdf"
        }

        domToPdf(element, options, () => {
            window.alert("File will donwloading soon")
        })
    }

    printStruk(id) {
        var element = document.getElementById(`struk${id}`);
        var options = {
            filename: `struk-${id}.pdf`
        };
        domToPdf(element, options, function (pdf) {
            window.alert('Struck will donwload soon')
        })
    }


    render() {
        const target = React.createRef()
        return (
            <div className="container-felx m-5">
                <p></p>
                <br></br>
                <p></p>
                <br></br>
                <div className="card">
                    <div className="card-header text-center" style={{backgroundColor:'#ffb7c5'}}>
                        <h4 className="text-white">List Transaksi</h4>
                    </div>
                    <div>
                        <p></p>
                    </div>

                    <ReactToPdf targetRef={target} filename="Coba.pdf"
                        scale={0.8}>
                        {({ toPdf }) => (
                            <button className="btn"
                                style={{backgroundColor:'#562135',color:'white'}}
                                onClick={toPdf}>
                                Generate PDF
                            </button>

                        )}
                    </ReactToPdf>
                    <div className="card-body">




                        <ul ref={target} className="list-group">
                            {this.state.transaksi.map(trans => (
                                <li className="list-group-item">
                                    <div className="row">
                                        {/* this is member area */}
                                        <div className="col-lg-3">
                                            <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>
                                                Member
                                            </small><br />
                                            {trans.member.nama}
                                        </div>

                                        {/* this is transaksi area */}
                                        <div className="col-lg-3">
                                            <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>
                                                Tanggal
                                            </small><br />
                                            {trans.tgl}
                                        </div>

                                        {/* this is batas waktu area */}
                                        <div className="col-lg-3">
                                            <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>
                                                Batas Waktu
                                            </small><br />
                                            {trans.batas_waktu}
                                        </div>

                                        {/* this is transaksi area */}
                                        <div className="col-lg-3">
                                            <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>
                                                Tgl Bayar
                                            </small><br />
                                            {trans.tgl_bayar}
                                        </div>

                                        {/* this is status area */}
                                        <div className="col-lg-3">
                                            <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>
                                                Status
                                            </small><br />
                                            <h6>{this.convertStatus(trans.id_transaksi, trans.status)}</h6>
                                        </div>


                                        {/* this is status bayar area */}
                                        <div className="col-lg-3">
                                            <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>
                                                Status Bayar
                                            </small><br />
                                            <h6>{this.convertStatusBayar(trans.id_transaksi, trans.dibayar)}</h6>
                                        </div>

                                        {/* total */}
                                        <div className="col-lg-3">
                                            <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>
                                                Total
                                            </small>
                                            <br></br>
                                            Rp {trans.total}
                                        </div>

                                        {/* delete button */}
                                        <div className="col-lg-3">
                                            <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>
                                               Action
                                            </small>
                                            <br></br>
                                            <button className="btn btn-sm btn-danger" onClick={() => this.deleteTransaksi(trans.id_transaksi)}>
                                                Hapus
                                            </button>
                                        </div>
                                    </div>


                                    {/* this struck area col-3*/}
                                    <div className="col-lg-1">
                                        <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>
                                            Struk
                                        </small>
                                        <br></br>
                                        <button className="btn btn-sm" style={{backgroundColor:'#ffb7c5',color:'562135'}}
                                            onClick={() => this.printStruk(trans.id_transaksi)}>
                                            Struck
                                        </button>
                                    </div>

                                    <div style={{ display: 'none' }}>
                                        <div className="col-lg-12 p-3"
                                            id={`struk${trans.id_transaksi}`}>
                                            <h3 className="text-secondary text-center">
                                                Rycle's
                                            </h3>
                                            <h5 className="text-center">
                                                
                                                <br />
                                                Telp.9982310234 |

                                            </h5>

                                            <h4 className="">Member:  {trans.member.nama}</h4>
                                            <h4 className="">Tanggal: {trans.tgl}</h4>

                                            <div className="row mt-3"
                                                style={{ borderBottom: `1px dotted black` }}>
                                                <div className="col-4">
                                                    paket
                                                </div>
                                                <div className="col-2">
                                                    Qty
                                                </div>
                                                <div className="col-3">
                                                    Harga Satuan
                                                </div>
                                                <div className="col-3">
                                                    Total
                                                </div>
                                            </div>

                                            {trans.detail_transaksi.map(detail => (
                                                <div className="row mt-3"
                                                    style={{ borderBottom: `1px dotted Black` }}>
                                                    <div className="col-4">
                                                        {detail.paket.jenis_paket}
                                                    </div>
                                                    <div className="col-2">
                                                        {detail.qty}
                                                    </div>
                                                    <div className="col-3">
                                                        Rp {formatNumber(detail.paket.harga)}
                                                    </div>
                                                    <div className="col-3">
                                                        Rp {formatNumber(detail.paket.harga * detail.qty)}
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="row mt-2">
                                                <div className="col-lg-9"></div>
                                                <div className="col-lg-3">
                                                    <h5> Rp {formatNumber(trans.total)}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <br />
                                    {/* area detail transaksi */}
                                    <div style={{ borderBottom: `1px solid Grey` }}>
                                        <h5>Detail Transaksi</h5>
                                        {trans.detail_transaksi.map(detail => (
                                            <div className="row" >
                                                {/* area nama paket */}
                                                <div className="col-lg-3">
                                                    {detail.paket.jenis_paket}
                                                </div>
                                                {/* area quantity paket */}
                                                <div className="col-lg-3">
                                                    Qty:
                                                    {detail.qty}
                                                </div>
                                                {/* area harga paket */}
                                                <div className="col-lg-3">
                                                    @ Rp
                                                    {detail.paket.harga}
                                                </div>
                                                {/* area harga total */}
                                                <div className="col-lg-3">
                                                    Rp
                                                    {detail.paket.harga * detail.qty}

                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/*area jumlah harga paket*/}
                                    <div className="row" >

                                        <div className="col-lg-3">
                                            Jumlah
                                        </div>

                                        <div className="col-lg-3">

                                        </div>

                                        <div className="col-lg-3">

                                        </div>

                                        <div className="col-lg-3">
                                            Rp{formatNumber(trans.total)}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <p></p>
                <br></br>
                <p></p>
                <br></br>
                <p></p>
                <br></br>
            </div>
        )
    }
}
