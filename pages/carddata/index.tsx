import { useState,useEffect } from "react";
import axios from "axios";
import { stat } from "fs";
 
 const koneksiBuku = axios.create({
  
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
    const [stateadd,setAdd]=useState("hide");
    const [statebutonadd,setbtnAdd]=useState("show");
    const [stateedit,setEdit]=useState("hide");

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
      <div className="container-header">
        <header id="header">
        <h1>PERPUS'MAN</h1>
        </header>
        <br></br>
        <br></br>
      <div className="container">
        <div className="row">
          {buku.map((bk) => 
           <div className="card-data">
             <img src={bk.cover} width="100%"/>
             <table className="tbl-data">
              <tr>
                <td>Judul Buku</td>
                <td>:</td>
                <td>{bk.judul_buku}</td>
              </tr>
              <tr>
                <td>Penulis</td>
                <td>:</td>
                <td>{bk.penulis}</td>
              </tr>
              <tr>
                <td>Penerbit</td>
                <td>:</td>
                <td>{bk.penerbit}</td>
              </tr>
              <tr>
                <td>Tahun Terbit</td>
                <td>:</td>
                <td>{bk.tahun_terbit}</td>
              </tr>
            </table>
             </div>
          )}     
          </div>
       </div>
       </div>
        )
}
  
  }