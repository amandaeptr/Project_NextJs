import React, { useState, useEffect } from "react";
import axios from "axios";

const koneksiBuku = axios.create({
  baseURL: "http://127.0.0.1:5000/api/buku",
});

export default function FormBuku() {
  const [stateid_buku, setId_Buku] = useState("");
  const [statejudul_buku, setJudul_Buku] = useState("");
  const [statepenulis, setPenulis] = useState("");
  const [statepenerbit, setPenerbit] = useState("");
  const [statetahun_terbit, setTahun_Terbit] = useState("");
  const [statecover, setCover] = useState("");
  const [buku, setBuku] = useState(null);
  const [stateadd, setAdd] = useState("hide");
  const [statebutonadd, setbtnAdd] = useState("show");
  const [isEditVisible, setIsEditVisible] = useState(false); 
  const [editId, setEditId] = useState(null);

  const handleSubmitAdd = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    koneksiBuku
      .post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    const address = `/${event.target.id_buku.value}`;
    const formData = {
      id_buku: event.target.id_buku.value,
      judul_buku: event.target.judul_buku.value,
      penulis: event.target.penulis.value,
      penerbit: event.target.penerbit.value,
      tahun_terbit: event.target.tahun_terbit.value,
    };
    koneksiBuku
      .put(address, formData)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancelEdit = (event) => {
    setAdd("show");
    setbtnAdd("show");
    setIsEditVisible(false); 
    setId_Buku("");
    setJudul_Buku("");
    setPenulis("");
    setPenerbit("");
    setTahun_Terbit("");
    setCover("");
    setEditId(null);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const id_buku = event.target.value;
    koneksiBuku
      .delete(`/${id_buku}`)
      .then((response) => {
        console.log("Data berhasil dihapus:", response.data);
        window.location.reload();
        setBuku(buku.filter((buku) => buku.id_buku !== id_buku));
      })
      .catch((error) => {
        console.error("Gagal menghapus data:", error);
      });
  };

  const handleEdit = (id_buku) => {
    const bkEdit = buku.find((buku) => buku.id_buku === id_buku);
    if (bkEdit) {
      setEditId(id_buku);
      setId_Buku(bkEdit.id_buku);
      setJudul_Buku(bkEdit.judul_buku);
      setPenulis(bkEdit.penulis);
      setPenerbit(bkEdit.penerbit);
      setTahun_Terbit(bkEdit.tahun_terbit);
      setCover(bkEdit.cover);
    }
  };

  useEffect(() => {
    async function getBuku() {
      try {
        const response = await koneksiBuku.get("/");
        setBuku(response.data.data);
      } catch (error) {
        alert("Error from buku in API buku: " + error);
      }
    }
    getBuku();
  }, []);

  if (buku == null) {
  return <div>Waiting...</div>;
  } else {
    return (
      <div className="container-header">
        <header id="header">
        <h1>PERPUS'MAN</h1>
        </header>
        <center>
        {editId && (
            <div className="card-edit">
              <h1>Form Edit Data Buku</h1>
              <form id="formedit" onSubmit={handleSubmitEdit}>
          <table className="edit" border={0}>
            <tbody>
            <tr>
            <td><label> Id Buku:</label></td>
            <td><input type="text" id="id_buku"  value={stateid_buku} name="id_buku"/>
              {/* onChange={handleOnchangeid_buku}  /> */}
            </td>
            </tr>
            <tr>
            <td><label> Judul Buku:</label></td>
            <td><input type="text" id="judul_buku"  value={statejudul_buku} name="judul_buku"
               onChange={(e) => setJudul_Buku(e.target.value)}
               /></td>
            </tr>
            <tr>
            <td><label> Cover:</label></td>
            <td><img src={statecover} width="80"/> </td>
            </tr>
            <tr>
            <td><label> Penulis:</label></td>
            <td><input type="text" id="penulis"  value={statepenulis} name="penulis"
               onChange={(e) => setPenulis(e.target.value)}
               /></td>
            </tr>
            <tr>
            <td><label> Penerbit:</label></td>
            <td><input type="text" id="penerbit"  value={statepenerbit} name="penerbit"
               onChange={(e) => setPenerbit(e.target.value)}
               /></td>
            </tr>
            <tr>
            <td><label> Tahun Terbit :</label></td>
            <td><input type="text" id="tahun_terbit"  value={statetahun_terbit} name="tahun_terbit"
               onChange={(e) => setTahun_Terbit(e.target.value)}
               /></td>
            </tr>
            </tbody>
          </table>
          <button className="btn-submit" type="submit">Save</button>
          <button className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
          </form>  
        <br/>
        <br/>
            </div>
          )}
     </center>
      <center>
        <div>
          <table className="buku" border={1}>
            <thead>
              <tr>
                <td>
                  <b>Id Buku</b>
                </td>
                <td>
                  <b>Judul Buku</b>
                </td>
                <td>
                  <b>Cover</b>
                </td>
                <td>
                  <b>Penulis</b>
                </td>
                <td>
                  <b>Penerbit</b>
                </td>
                <td>
                  <b>Tahun Terbit</b>
                </td>
                <td colSpan={2}>
                  <b>Action</b>
                </td>
              </tr>
            </thead>
            <tbody>
              {buku.map((bk) => (
                <tr key={bk.id_buku}>
                  <td>{bk.id_buku}</td>
                  <td>{bk.judul_buku}</td>
                  <td>
                    <img src={bk.cover} width="80" alt="Buku Cover" />
                  </td>
                  <td>{bk.penulis}</td>
                  <td>{bk.penerbit}</td>
                  <td>{bk.tahun_terbit}</td>
                  <td>
                    <button className="btnac-edit"onClick={() => handleEdit(bk.id_buku)}>Edit</button>
                  </td>
                  <td>
                    <button className="btnac-delete"onClick={handleDelete} value={bk.id_buku}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
      </div>
    );
  }
}
