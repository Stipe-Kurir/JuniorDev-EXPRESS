import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import stil from './unos.module.css'
import { useContext,useState,useEffect } from 'react'
import UserContext from '../../components/Context/UserContext'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const Unos = () => {

  const [podaci,postaviPodatke]=useState({
    ime:"",
    vrsta:"Ostalo",
    cip:false,
    godine:"",
    opis:"",
    pregled:"",
    slika:""
  })

  const zadano={
    ime:"",
    vrsta:"Ostalo",
    cip:false,
    godine:"",
    opis:"",
    pregled:"",
    slika:""
  }

  const vratiZadano=()=>{
    postaviPodatke(zadano)
  }

  

  function obradiPodatke(objekt){
    return {
      "ime":objekt.ime,
      "vrsta":objekt.vrsta,
      "cip":objekt.cip,
      "godine":objekt.godine,
      "opis":objekt.opis,
      "pregled":objekt.pregled,
      "udomljen":"nije udomljen",
      "slika":objekt.slika
    }
  }


  const UnosVrijednosti=(e)=>{
    const {id, value}=e.target;
    postaviPodatke({...podaci,[id]:value})
  }


  const UnesiZivotinju=(e)=>{
    e.preventDefault();
    const ObradeniPodaci=obradiPodatke(podaci);
    axios.post("http://localhost:3000/zivotinje", ObradeniPodaci)
    vratiZadano()
   
  }

  const UnosCheck=()=>{
    if(podaci.cip===false)
    {
       postaviPodatke({...podaci,cip:true})
    }
      else{
        postaviPodatke({...podaci,cip:false})
      }
  }

  const [isAdmin, setIsAdmin] = useState(false);
  

  useEffect(() => {

    const token = localStorage.getItem("token");
    if (!token) {
      return; 
    }
    const checkAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/samo-admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAdmin(response.data.isAdmin);
      } catch (error) {
        console.error('Error checking admin status:', error.response.data);
      }
    };
    checkAdmin();
  }, []);



  return (
    <div>
      <Navbar />
      <div className={stil.UnosContainer}>
       {isAdmin ?
       <div className={stil.UnosAdmin}>
        <div className={stil.UnosAdminNaslov}>UNOS NOVE ŽIVOTINJE</div>
    
        <form className={stil.UnosAdminForm} onSubmit={UnesiZivotinju}>
          
          <div className={stil.Input}>  
                <label className={stil.label} htmlFor="ime">IME:</label>
                <div className={stil.InputBar}>
                <input className={stil.input} type="text" id="ime" name="ime" value={podaci.ime} onChange={UnosVrijednosti} maxLength="20" required/>
                </div>
          </div>
          
          <div className={stil.Vrsta}>
            <div className={stil.label}>VRSTA:</div>
            <div className={stil.radioElements}>
                    <div className={stil.element}>
                      <input className={stil.radioElm} type="radio" id="vrsta" name="element"  value="Ostalo" checked={podaci.vrsta==="Ostalo"} onChange={UnosVrijednosti}  required />
                      <label className={stil.radioLabel} htmlFor="Ostalo">Ostalo</label>
                    </div> 
                    <div className={stil.element}>
                      <input className={stil.radioElm} type="radio" id="vrsta" name="element"  value="Pas" onChange={UnosVrijednosti}  required />
                      <label  className={stil.radioLabel} htmlFor="Pas">Pas</label>
                    </div>
                    <div className={stil.element}>
                      <input className={stil.radioElm} type="radio" id="vrsta" name="element" value="Mačka" onChange={UnosVrijednosti}  required />
                      <label className={stil.radioLabel} htmlFor="Mačka">Mačka</label>
                    </div> 
                    
            </div>
          </div>
          <div className={stil.Input}>  
                <label className={stil.label} htmlFor="godine">GODINE:</label>
                <div className={stil.InputBar}>
                <input className={stil.inputGodine} type="number" id="godine" name="godine" min={0} value={podaci.godine} onChange={UnosVrijednosti}  required/>
                </div>
          </div>
          <div className={stil.Input}>  
                <label className={stil.label} htmlFor="opis">OPIS:</label>
                <div className={stil.InputBar}>
                  <textarea className={stil.inputArea}  type="text" id="opis" name="opis"  maxLength="100" value={podaci.opis} onChange={UnosVrijednosti} ></textarea>
                </div>
          </div>
          <div className={stil.Input}>  
                <label className={stil.label} htmlFor="slika">SLIKA(url):</label>
                <div className={stil.InputBar}>
                <input className={stil.input} type="text" id="slika" name="slika"  maxLength="100" value={podaci.slika} onChange={UnosVrijednosti}  />
                </div>
          </div>

          <div className={stil.Input}> 
            <label  className={stil.label}  htmlFor="pregled">UNESITE DATUM PREGLEDA:</label>
              
            <div className={stil.InputBar}>
               <DatePicker 
                 selected={podaci.pregled} maxDate={new Date()}  className={stil.inputGodine} onChange={datum=>postaviPodatke({...podaci,pregled:datum})}  dateFormat='dd/MM/yyyy' required/> 
                </div>
    
        </div>
        <div className={stil.Check}>
            <input className={stil.CheckBox} type="checkbox" onChange={UnosCheck} id="cip"  value={podaci.cip} checked={podaci.cip===true}
              name="cip" />
            <label htmlFor="cip">ČIPIRAN</label> 
            
        </div>

       
          <button  className={stil.Spremi} type="submit">Spremi</button>
       

        </form>

       </div>
       :
       <div className={stil.UnosKorisnik}>
          <div className={stil.UnosKorisnikTekst}>
            NEDOZVOLJEN PRISTUP, MORATE BIT PRIJAVLJENI KAO ADMINISTRATOR
          </div>
        </div>

       }

       </div>
      <Footer />
    </div>
  )
}

export default Unos
