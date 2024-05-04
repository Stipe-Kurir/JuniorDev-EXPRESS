import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import Slider from '../../components/Slider/Slider'
import stil from './home.module.css'


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className={stil.HomeContainer}>
        <div className={stil.Slider}><Slider/></div>
        <div className={stil.Informacije}>
          <div className={stil.InformacijeNaslov}>INFORMACIJE I ZANIMLJIVOSTI</div>
          <div className={stil.InformacijeTekst}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed a purus nisi. Quisque bibendum luctus convallis. 
          Suspendisse pretium erat eu libero commodo finibus. 
          Curabitur id auctor nisl, eget pulvinar sem. 
          Cras ullamcorper dignissim mi, sed iaculis nisl pharetra ut. Fusce vitae magna sed risus fringilla imperdiet ac laoreet libero.
          </div>
          </div>
        <div className={stil.Lokacija}>
          <div className={stil.Mapa}>
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23147.551773749186!2d16.454899193857255!3d43.51393371692611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13355f618d496d35%3A0x2a62d294893c7fe5!2sSportski%20tereni%20Visoka!5e0!3m2!1shr!2shr!4v1683362324541!5m2!1shr!2shr" 
          width="350px" 
          height="250px"  
          loading="lazy" 
          style={{border:"none",marginLeft:"20px"}}
          referrerPolicy="no-referrer-when-downgrade">
          </iframe> 
          </div>
          <div className={stil.Podaci}>
          <div className={stil.PodaciNaslov}><b>KAKO DO NAS</b></div>
          <div className={stil.PodaciEl}><b style={{fontSize:"20px"}}>LOKACIJA</b>Splitska 77</div>
          <div className={stil.PodaciEl}><b style={{fontSize:"20px"}}>MAIL</b>azilzivotinje@mail.hr</div>
          <div className={stil.PodaciEl}><b style={{fontSize:"20px"}}>KONTAKT BROJ</b>077-777-7777 </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
