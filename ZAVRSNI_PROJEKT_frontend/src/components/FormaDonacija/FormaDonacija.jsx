import React from 'react'
import stil from './formaDonacija.module.css'
import { useState,useContext } from 'react'
import axios from 'axios'
import UserContext from '../../components/Context/UserContext'


const FormaDonacija = ({isAdmin,funk,postaviDonacije}) => {

    const [podaci,postaviPodatke]=useState({
        kategorija:"",
        tip:"Ostalo",
        vrijednost:"",
        opis:"",
      })


      function obradiPodatkeAdmin(objekt){
        return {
          "kategorija":"trazi",
          "tip":objekt.tip,
          "vrijednost":objekt.vrijednost,
          "opis":objekt.opis
        }
      }

      function obradiPodatkeKorisnik(objekt){
        return {
          "kategorija":"nudi",
          "tip":objekt.tip,
          "vrijednost":objekt.vrijednost,
          "opis":objekt.opis
        }
      }

      const unosVrijednosti=(e)=>{
        const {name, value}=e.target;
        postaviPodatke({...podaci,[name]:value})
      }

      const vratiZadano=()=>{
        podaci.kategorija="",
        podaci.tip="Ostalo",
        podaci.vrijednost="",
        podaci.opis=""
      }
      

 

    const UnesiDonaciju=(e)=>{
        if(isAdmin)
        {
            const ObradeniPodaci=obradiPodatkeAdmin(podaci);
            axios.post("http://localhost:3000/donacije", ObradeniPodaci,{ headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
            }})
            .then(rez => {
                    axios.get("http://localhost:3000/donacije")
                     .then(rez => postaviDonacije(rez.data));
                 })
               vratiZadano()
        }
        else
        {
            const ObradeniPodaci=obradiPodatkeKorisnik(podaci);
            axios.post("http://localhost:3000/donacije",ObradeniPodaci, { headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, 
            }})
            .then(rez => {
                    axios.get("http://localhost:3000/donacije")
                     .then(rez => postaviDonacije(rez.data));
                 })
           
            vratiZadano()
        }
      
    }
       

  return (
    <form className={stil.formaDonacija} onSubmit={UnesiDonaciju}>
        <div className={stil.donacijaNaslov}>UNESITE NOVU DONACIJU</div>
        <div className={stil.PodaciElm}><b>Tip: </b>
            <input className={stil.RadioBtn} type="radio"  name="tip" value={"Ostalo"}  checked={podaci.tip === "Ostalo"}  onChange={unosVrijednosti}  required />
            <label htmlFor="tip">Ostalo</label>

            <input className={stil.RadioBtn} type="radio"  name="tip" value={"Hrana"}  checked={podaci.tip === "Hrana"} onChange={unosVrijednosti} required />
            <label htmlFor="tip">Hrana</label>

            <input className={stil.RadioBtn} type="radio"  name="tip" value={"Igračke"} checked={podaci.tip === "Igračke"}  onChange={unosVrijednosti} required />
            <label htmlFor="tip">Igračke</label>

            <input className={stil.RadioBtn} type="radio"  name="tip" value={"Lijekovi"} checked={podaci.tip === "Lijekovi"}  onChange={unosVrijednosti} required />
            <label htmlFor="tip">Lijekovi</label>
        
        </div>
        <div className={stil.PodaciElm}><b>Vrijednost: </b>
        <input className={stil.inputVr} type="number"  name="vrijednost" min={0} value={podaci.vrijednost} onChange={unosVrijednosti}   required/> 
        </div>
        <div className={stil.PodaciElm}><b>Opis: </b>
          <input className={stil.input} type="text"  name="opis" value={podaci.opis} onChange={unosVrijednosti}   maxLength="100"  /> 
        </div>
      <button className={stil.BotunUrediStil} type="submit">DODAJ</button>
    </form>
  )
}

export default FormaDonacija
