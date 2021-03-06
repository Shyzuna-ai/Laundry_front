import React from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import { authorization } from "../config";
import '../Bg.css';
import {
  MDBInput,
  MDBCardBody,
} from "mdb-react-ui-kit";


class Member extends React.Component {
  constructor() {
    super();
    this.state = {
      id_member: "",
      nama: "",
      alamat: "",
      jenis_kelamin: "",
      telepon: "",
      action: "",
      role: "",
      visible: true,
      members: [
        {
          id_member: "1",
          nama: "Brian",
          alamat: "Denpasar",
          jenis_kelamin: "Pria",
          telepon: "0812345678",
        },
        {
          id_member: "2",
          nama: "Bismo",
          alamat: "Jombang",
          jenis_kelamin: "Pria",
          telepon: "0812456789",
        },
        {
          id_member: "3",
          nama: "Eksa",
          alamat: "Turen",
          jenis_kelamin: "Pria",
          telepon: "0897654321",
        },
      ],
    };
    if (!localStorage.getItem("token")) {
      window.location.href = "/login"
    }
  }
  tambahData() {
    this.modalMember = new Modal(document.getElementById("modal_member"));
    this.modalMember.show(); //menmpilkan modal

    //reset state untuk form member
    this.setState({
      action: "tambah",
      id_member: Math.random(1, 10000),
      nama: "",
      alamat: "",
      jenis_kelamin: "Wanita",
      telepon: "",
    });
  }
  simpanData(event) {
    event.preventDefault(); //preventdefault untuk mencegah aksi default dari form submit

    if (this.state.action === "tambah") {
      let endpoint = "http://localhost:8000/member";
      //menampung data isian dari user
      let data = {
        id_member: this.state.id_member,
        nama: this.state.nama,
        alamat: this.state.alamat,
        jenis_kelamin: this.state.jenis_kelamin,
        telepon: this.state.telepon,
      };

      //tambah ke state members (arrays)
      // let temp = this.state.members
      // temp.push(data) //menambah data pada array
      // this.setState({members: temp})

      axios
        .post(endpoint, data, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));

      //menghilangkan modal
      this.modalMember.hide();
    } else if (this.state.action === "ubah") {
      // let temp = this.state.members
      // let index = temp.findIndex(member => member.id_member === this.state.id_member)
      // temp[index].nama = this.state.nama
      // temp[index].alamat = this.state.alamat
      // temp[index].jenis_kelamin = this.state.jenis_kelamin
      // temp[index].telepon = this.state.telepon

      // this.setState({members: temp})
      let endpoint = "http://localhost:8000/member/" + this.state.id_member;

      let data = {
        id_member: this.state.id_member,
        nama: this.state.nama,
        alamat: this.state.alamat,
        jenis_kelamin: this.state.jenis_kelamin,
        telepon: this.state.telepon,
      };

      axios
        .put(endpoint, data, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
      this.modalMember.hide();
    }
  }
  ubahData(id_member) {
    this.modalMember = new Modal(document.getElementById("modal_member"));
    this.modalMember.show(); //menmpilkan modal

    //mencari index posisi dari data member yang akan diubah
    let index = this.state.members.findIndex(
      (member) => member.id_member === id_member
    );
    //reset state untuk form member
    this.setState({
      action: "ubah",
      id_member: id_member,
      nama: this.state.members[index].nama,
      alamat: this.state.members[index].alamat,
      jenis_kelamin: this.state.members[index].jenis_kelamin,
      telepon: this.state.members[index].telepon,
    });
  }
  hapusData(id_member) {
    if (window.confirm("Apakah anda yakin menghapus data ini?")) {
      // posisi index data yang akan dihapus
      // let temp = this.state.members
      // let index = temp.findIndex(member => member.id_member === id_member)

      // // dihapus data array
      // temp.splice(index,1)

      // this.setState({members: temp})
      let endpoint = "http://localhost:8000/member/" + id_member;

      axios
        .delete(endpoint, authorization)
        .then((response) => {
          window.alert(response.data.message);
          this.getData();
        })
        .catch((error) => console.log(error));
    }
  }

  getData() {
    let endpoint = "http://localhost:8000/member";
    axios
      .get(endpoint, authorization)
      .then((response) => {
        this.setState({ members: response.data });
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    //FUNGSI INI DIJALANKAN SETELAH FUNGSI RENDER DIJALANKAN
    this.getData();
    let user = JSON.parse(localStorage.getItem("user"))
    //cara pertama
    this.setState({
      role: user.role
    })
    //cara kedua
    if (user.role === 'admin' || user.role === 'kasir') {
      this.setState({
        visible: true
      })
    } else {
      this.setState({
        visible: false
      })
    }
  }

  showAddButton() {
    if (this.state.role === 'admin' || this.state.role === 'kasir') {
      return (
        <div className="py-2 mt-1">
          <button
            className="btn btn-sm text-dark text-center py-2 mt-1"
            onClick={() => this.tambahData()}
            style={{backgroundColor:'#ffb7c5',color:'562135'}}
          >
            Tambah data Member
          </button>
        </div>
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
            
          <div className="card-header " style={{backgroundColor:'#ffb7c5'}}>
            
            <h3 className="text-white text-center">List Member Laundry</h3>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {this.state.members.map((member) => (
                <li className="list-group-item "style={{color:'#562135'}}>
                  <div className="row">
                    <div className="col-lg-2 ">
                      <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>NAMA</small>
                      <br></br> <h6>{member.nama}</h6>
                    </div>
                    <div className="col-lg-2">
                      <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>JENIS KELAMIN</small>
                      <br></br> <h6>{member.jenis_kelamin}</h6>
                    </div>
                    <div className="col-lg-2">
                      <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>TELEPON</small>
                      <br></br> <h6>{member.telepon}</h6>
                    </div>
                    <div className="col-lg-4">
                      <small className="text-white badge text-wrap" style={{backgroundColor:'#ffb7c5'}}>ALAMAT</small>
                      <br></br> <h6>{member.alamat}</h6>
                    </div>
                    <div className="col-lg-2">
                      <div>
                        <button
                          className={`btn btn-sm mx-2 ${this.state.visible ? `` : `d-none`}`}
                          style={{backgroundColor:'#ffb7c5',color:'562135'}}
                          onClick={() => this.ubahData(member.id_member)}
                        >
                          Edit
                        </button>
                        <button
                          className={`btn btn-sm btn-danger mx-2 ${this.state.visible ? `` : `d-none`}`}
                          onClick={() => this.hapusData(member.id_member)}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {this.showAddButton()}
          </div>
        </div>
        <p></p>
        <br></br>
        <p></p>
        <br></br>
        <p></p>
        <br></br>
        <br></br>
        <br></br>

        {/* form modal data member */}
        <div className="modal" id="modal_member">
          <div className="modal-dialog modal-md">
            <div className="modal-content">
              <MDBCardBody className="modal-body">
                <form onSubmit={(ev) => this.simpanData(ev)}>
                  <p className="h4 text-center py-4">Form Data Member</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Nama"
                      className="form-control mb-2"
                      type="text"
                      required
                      value={this.state.nama}
                      onChange={(ev) => this.setState({ nama: ev.target.value })}
                    />

                    <MDBInput
                      label="Telepon"
                      validate
                      group
                      type="text"
                      className="form-control mb-2"
                      value={this.state.telepon}
                      onChange={(ev) =>
                        this.setState({ telepon: ev.target.value })
                      }
                      required
                    />

                    <MDBInput
                      label="Alamat"
                      validate
                      group
                      required
                      type="text"
                      className="form-control mb-2"
                      value={this.state.alamat}
                      onChange={(ev) =>
                        this.setState({ alamat: ev.target.value })
                      }
                    />

                    <select
                      label="Jenis Kelamin"
                      type="text"
                      group
                      className="form-control mb-2"
                      value={this.state.jenis_kelamin}
                      onChange={(ev) =>
                        this.setState({ jenis_kelamin: ev.target.value })
                      }
                    >
                      <option value="Wanita">Wanita</option>
                      <option value="Pria">Pria</option>
                    </select>
                  </div>
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

export default Member;
