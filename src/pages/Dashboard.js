import React from "react";
import axios from "axios";
import { formatNumber, authorization } from "../config";
import PICTURE from '../123.png'

export default class Dashboard extends React.Component{
    constructor(){
        super()

        this.state = {
            jumlahMember: 0,
            jumlahPaket: 0,
            jumlahTransaksi: 0,
            income: 0
        }
        if(!localStorage.getItem("token")){
            window.location.href = "/login"
        }
    }

    getSummary(){
        let endpoint = `http://localhost:8000/member`
        axios.get(endpoint,authorization)
        .then(response => {
            this.setState({jumlahMember: response.data.length})
        })
        .catch(error => console.log(error))

        //paket
        endpoint = `http://localhost:8000/paket`
        axios.get(endpoint,authorization)
        .then(response => {
            this.setState({jumlahPaket: response.data.length})
        })
        .catch(error => console.log(error))

        //transaksi
        endpoint = `http://localhost:8000/transaksi`
        axios.get(endpoint, authorization)
        .then(response => {
            let dataTransaksi = response.data
            let income = 0
            for (let i = 0; i < dataTransaksi.length; i++) {
                let total  = 0;
                for (let j = 0; j < dataTransaksi[i].detail_transaksi.length; j++) {
                    let harga = dataTransaksi[i].detail_transaksi[j].paket.harga
                    let qty = dataTransaksi[i].detail_transaksi[j].qty
                    
                    total += (harga * qty)
                }

                income += total
            }
            this.setState({
                jumlahTransaksi: response.data.length,
                income: income
            })
        })
        .catch(error => console.log(error))
    }

    componentDidMount(){
        this.getSummary()
    }
    render(){
        return(
            <div>
                <div className="text-center">
                <img src={PICTURE} className="img-fluid" alt="Responsive image" style={{ width:'100%',height:'50%' }}></img>
                </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="card text-center bg-dark m-1">
                            <div className="card-body">
                                <h4 className="card-title text-white">Jumlah Member</h4>
                                <h2 className="" style={{color: '#ffb7c5'}}>{this.state.jumlahMember}</h2>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card text-center bg-dark m-1">
                            <div className="card-body">
                                <h4 className="card-title text-white" >Jumlah Paket</h4>
                                <h2 className="" style={{color: '#ffb7c5'}}>{this.state.jumlahPaket}</h2>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6">
                        <div className="card text-center bg-dark m-1">
                            <div className="card-body">
                                <h4 className="card-title text-white">Jumlah Transaksi</h4>
                                <h2 className="" style={{color: '#ffb7c5'}}>{this.state.jumlahTransaksi}</h2>
                                
                            </div>
                        </div>
                    </div>
                    <div>
                        <p></p>
                    </div>
                    <div className="col-lg-0 text-center">
                        <div className="card text-center  m-1" style={{backgroundColor:'#ffb7c5'}}>
                            <div className="card-body">
                                
                                <h4 className="card-title text-dark">Income</h4>
                                <h2 className="text-dark">Rp {formatNumber(this.state.income)}</h2>
                                
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
            </div>
        )
    }
}