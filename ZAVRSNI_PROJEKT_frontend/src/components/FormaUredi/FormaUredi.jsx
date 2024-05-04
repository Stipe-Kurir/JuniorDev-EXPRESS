import React from 'react'
import stil from "./formaUredi.module.css"
import {useState} from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const FormaUredi = ({podaci,postaviPodatke,funk}) => {


  const UnosVrijednosti=(e)=>{
    const {name, value}=e.target;
    postaviPromjenjeno({...promjenjeno,[name]:value})
  }


  const [promjenjeno,postaviPromjenjeno]=useState({
    _id:podaci._id,
    ime:podaci.ime,
    vrsta:podaci.vrsta,
    cip:podaci.cip,
    godine:podaci.godine,
    opis:podaci.opis,
    pregled:new Date(Date.parse(podaci.pregled)),
    udomljen:podaci.udomljen
  });


  const UnosCheckCip=()=>{
    if(promjenjeno.cip===false)
    {
       postaviPromjenjeno({...promjenjeno,cip:true})
    }
      else{
        postaviPromjenjeno({...promjenjeno,cip:false})
      }
  }
  const UnosCheckUdomljen=()=>{
    if(promjenjeno.udomljen==="udomljen")
    {
       postaviPromjenjeno({...promjenjeno,udomljen:"nije udomljen"})
    }
      else{
        postaviPromjenjeno({...promjenjeno,udomljen:"udomljen"})
      }
  }

  function obradiPodatke(objekt){
    return {
      "_id":objekt._id,
      "ime":objekt.ime,
      "vrsta":objekt.vrsta,
      "cip":objekt.cip,
      "godine":objekt.godine,
      "opis":objekt.opis,
      "pregled":objekt.pregled,
      "udomljen":objekt.udomljen
    }
  }

  async function Spremi(e){
    e.preventDefault()
    const rezultat=obradiPodatke(promjenjeno);
    await axios.patch(`http://localhost:3000/zivotinje/${promjenjeno._id}`,rezultat);
    const rez=await axios.get("http://localhost:3000/zivotinje");
    postaviPodatke(rez.data)
    funk()
  }


  return (
    <form className={stil.Podaci} onSubmit={Spremi}>
          <div className={stil.PodaciElm}><b>IME:</b> {promjenjeno.ime}</div>
          <div className={stil.PodaciElm}><b>VRSTA:</b> {promjenjeno.vrsta}</div>

          <div className={stil.PodaciElm}>
          <b>UDOMLJEN:</b>
            <input  type="checkbox" onChange={UnosCheckUdomljen} id="udomljen"  value={promjenjeno.udomljen} checked={promjenjeno.udomljen==="udomljen"}
              name="udomljen" />
          </div>
          <div className={stil.PodaciElm}>
          <b>ČIPIRAN:</b> 
            <input  type="checkbox" onChange={UnosCheckCip} id="cip"  value={promjenjeno.cip} checked={promjenjeno.cip===true}
              name="cip" />
            </div>
          <div className={stil.PodaciElm}>
          <b>GODINE:</b><input className={stil.inputG} type="number" id="godine" name="godine" min={0} value={promjenjeno.godine} onChange={UnosVrijednosti} required/> 
            </div>
          <div className={stil.PodaciElm}>
          <b>ZADNJI PREGLED:</b>
              <DatePicker 
                 selected={promjenjeno.pregled} maxDate={new Date()} className={stil.inputG}  onChange={datum=>postaviPromjenjeno({...promjenjeno,pregled:datum})}  dateFormat='dd/MM/yyyy' required/> 
            </div> 
          <div className={stil.PodaciElmOpis}>
          <b>OPIS:</b>  <input className={stil.input} type="text" id="opis" name="opis"  maxLength="100" value={promjenjeno.opis} onChange={UnosVrijednosti}  />
            </div>

          <button className={stil.BotunUrediStil} type="submit">SPREMI</button>
        </form>
  )
}

export default FormaUredi
