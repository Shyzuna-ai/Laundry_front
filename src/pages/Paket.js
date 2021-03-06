import { Modal } from "bootstrap";
import React from "react";
import axios from "axios";
import { authorization } from "../config";
import {
  MDBInput,
  MDBCardBody,
} from "mdb-react-ui-kit";

class Paket extends React.Component {
  constructor() {
    super();
    this.state = {
      id_paket: "",
      jenis_paket: "",
      harga: 0,
      visible: true,
      pakets: [
        {
          id_paket: "1",
          jenis_paket: "Cuci tok",
          harga: 5000,
        },
        {
          id_paket: "2",
          jenis_paket: "Cuci setrika",
          harga: 7000,
        },
        {
          id_paket: "3",
          jenis_paket: "Setrika tok",
          harga: 3000,
        },
      ],
    };
    if(!localStorage.getItem("token")){
      window.location.href = "/login"
    }
  }
  tambahData() {
    this.modalPaket = new Modal(document.getElementById("modal_paket"));
    this.modalPaket.show();

    this.setState({
      action: "tambah",
      id_paket: Math.random(1, 10000),
      jenis_paket: "",
      harga: 0,
    });
  }
  simpanData(event) {
    event.preventDefault();

    if (this.state.action === "tambah") {
      let endpoint = "http://localhost:8000/paket"
      let data = {
        id_paket: this.state.id_paket,
        jenis_paket: this.state.jenis_paket,
        harga: this.state.harga,
      };
      //tambah ke state paket (arrays)
      // let temp = this.state.pakets;
      // temp.push(data);
      // this.setState({ pakets: temp });

      axios.post(endpoint,data,authorization)
      .then(response => {
        window.alert(response.data.message)
        this.getData()
      })
      .catch(error => console.log(error))
      this.modalPaket.hide();
    } else if (this.state.action === "ubah") {
      // let temp = this.state.pakets;
      // let index = temp.findIndex(
      //   (paket) => paket.id_paket === this.state.id_paket
      // );
      // temp[index].jenis_paket = this.state.jenis_paket;
      // temp[index].harga = this.state.harga;

      // this.setState({ pakets: temp });
      let endpoint = "http://localhost:8000/paket/" + this.state.id_paket
      let data = {
        id_paket: this.state.id_paket,
        jenis_paket: this.state.jenis_paket,
        harga: this.state.harga,
      };

      axios.put(endpoint,data,authorization)
      .then((response) => {
        window.alert(response.data.message)
        this.getData()
      })
      .catch((error) => console.log(error))
      this.modalPaket.hide();
    }
  }
  ubahData(id_paket) {
    this.modalPaket = new Modal(document.getElementById("modal_paket"));
    this.modalPaket.show();

    let index = this.state.pakets.findIndex(
      (paket) => paket.id_paket === id_paket
    );
    this.setState({
      action: "ubah",
      id_paket: id_paket,
      jenis_paket: this.state.pakets[index].jenis_paket,
      alamat: this.state.pakets[index].alamat,
    });
  }
  hapusData(id_paket) {
    if (window.confirm("Apakahanda yakin?")) {
      // posisi index data yang akan dihapus
      // let temp = this.state.pakets;
      // let index = temp.findIndex((paket => paket.id_paket === id_paket));

      // // dihapus data array
      // temp.splice(index, 1);

      // this.setState({ pakets: temp });
      let endpoint = "http://localhost:8000/paket/" + id_paket;

      axios.delete(endpoint,authorization)
      .then((response) =>{
        window.alert(response.data.message)
        this.getData()
      })
      .catch((error) => console.log(error));
    }
  }
  getData(){
    let endpoint = "http://localhost:8000/paket"
    axios.get(endpoint,authorization)
    .then(response => {
      this.setState({pakets: response.data})
    })
    .catch(error => console.log(error))
  }

  componentDidMount(){
    this.getData()
    let user = JSON.parse(localStorage.getItem("user"))
    if(user.role === 'admin'){
      this.setState({
        visible:true
      })
    }else{
      this.setState({
        visible:false
      })
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

          <div className="card-header" style={{backgroundColor:'#ffb7c5'}}>

            <h3 className="text-white text-center">List Paket</h3>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {this.state.pakets.map((paket) => (
                <li className="list-group-item" style={{color:'#562135'}}>
                  <div className="row">
                    <div className="col-lg-5">
                      <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>Jenis Paket</small>
                      <br></br>
                      <h6>{paket.jenis_paket}</h6>
                    </div>
                    <div className="col-lg-5">
                      <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>Harga</small>
                      <br></br>
                      <h6>Rp {paket.harga}</h6>
                    </div>
                    <div className="col-lg-2 justify-content-center align-self-center">
                      <div>
                        <button
                          className={`btn btn-sm btn-warning mx-2 ${this.state.visible ? `` : `d-none`}`}
                          style={{backgroundColor:'#ffb7c5',color:'#562135'}}
                          onClick={() => this.ubahData(paket.id_paket)}
                        >
                          Edit
                        </button>
                        <button
                          className={`btn btn-sm btn-danger mx-2 ${this.state.visible ? `` : `d-none`}`}
                          onClick={() => this.hapusData(paket.id_paket)}
                        >
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
              onClick={() => this.tambahData()}
              style={{backgroundColor:'#ffb7c5',color:'#562135'}}
            >
              Tambah data Paket
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
        <div className="modal" id="modal_paket">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <MDBCardBody className="modal-body">
                <form onSubmit={(ev) => this.simpanData(ev)}>
                <p className="h4 text-center py-4">Form Data Paket</p>
                  <MDBInput
                    type="text"
                    label="Jenis Paket"
                    className="form-control mb-2"
                    value={this.state.jenis_paket}
                    required
                    onChange={(ev) =>
                      this.setState({ jenis_paket: ev.target.value })
                    }
                  ></MDBInput>
                  
                  <MDBInput
                    type="text"
                    label="Harga"
                    className="form-control mb-2"
                    value={this.state.harga}
                    required
                    onChange={(ev) => this.setState({ harga: ev.target.value })}
                  ></MDBInput>
                  <div className="text-center py-4 mt-3">
                    <button className="btn" type="submit" style={{backgroundColor:'#ffb7c5'}}>
                      Simpan
                    </button>
                  </div>
                </form>
              </MDBCardBody>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Paket;
