import { useState, useEffect } from "react";
import axios from "axios";
import {stat} from 'fs';
import Link from 'next/link';
import { Html, Head, Main, NextScript } from 'next/document'

const koneksiBuku = axios.create({
  // baseURL: "https://jsonplaceholder.typicode.com/posts"
  baseURL: "http://127.0.0.1:5000/api/buku"
  
  });

  export default function FormBuku() {
    const [stateid_buku, setId_Buku] = useState("");
    const [statejudul_buku, setJudul_Buku] = useState("");
    const [statepenulis, setPenulis] = useState("");
    const [statepenerbit, setPenerbit] = useState("");
    const [statetahun_terbit, setTahun_Terbit] = useState("");
    const [statecover, setCover] = useState("");
    const [buku, setBuku] =  useState(null);
    const [stateadd,setAdd]=useState("show");
    const [statebutonadd,setbtnAdd]=useState("show");

    const handleSubmitAdd =  (event) => {
    
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
   }

   useEffect(() => {
    async function getBuku() {
      const response = await koneksiBuku.get("/").then(function (axiosResponse) {
          setBuku(axiosResponse.data.data); 
       })
       .catch(function (error) {   
        alert('error from buku in api buku: '+error);
       });;
        }
    getBuku();
  }, []);

 
if(buku==null){
return(
<div>
  waiting...
</div>
)
}else{

return (
  <div>
  <header id="header">
  <h1>PERPUS'MAN</h1>
  </header>
    <center>
      <div className="card-input">
        <h1>Form Input Data Buku</h1>
        <form id="formadd" className={stateadd} onSubmit={handleSubmitAdd}>
        <table>
            <tbody>
              <tr>
                <td><label> Id Buku:</label></td>
                <td><input type="text" id="id_buku" name="id_buku" /></td>
              </tr>
              <tr>
                <td><label> Judul Buku:</label></td>
                <td><input type="text" id="judul_buku" name="judul_buku" /></td>
              </tr>
              <tr>
                <td><label> Cover:</label></td>
                <td><input type="file" name="image" /></td>
              </tr>
              <tr>
                <td><label> Penulis:</label></td>
                <td><input type="text" id="penulis" name="penulis" /></td>
              </tr>
              <tr>
                <td><label> Penerbit:</label></td>
                <td><input type="text" id="penerbit" name="penerbit" /></td>
              </tr>
              <tr>
                <td><label> Tahun Terbit:</label></td>
                <td><input type="text" id="tahun_terbit" name="tahun_terbit" /></td>
              </tr>
            </tbody>
          </table>
          <button className="btn-submit" type="submit">Submit</button>
          <Link href="/" className="btn-cancel">Cancel</Link>
        </form>
      </div>
    </center>
    </div>
  );
  
    }
    }


