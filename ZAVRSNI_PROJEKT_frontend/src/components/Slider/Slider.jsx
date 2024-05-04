
import stil from './slider.module.css'
import { useState } from 'react';

const Slider = () => {

    const [index,setIndex]=useState(0);
    const photos=[
        {src:"ljubimci.jpg"},
        {src:"zivotinje.jpg"},
        {src:"psi_macke.jpg"},                          
    ]

    const handleArrowClick=(direction)=>{
        let newIndexNumber;

        if (direction === "l") {
            newIndexNumber = index === 0 ? 2 : index - 1;
          } else {
            newIndexNumber = index ===2 ? 0 : index + 1;
          }
      
          setIndex(newIndexNumber)

    }

    const handleClickPointer=(index)=>{
        setIndex(index);

    }

  return (
    <div className={stil.slider}>
            
            <div className={stil.sliderImages} >

                 <img src={photos[index].src} alt="" className={stil.sliderImg}/> 

                 <div className={stil.arrowL}>
                    <img onClick={()=>handleArrowClick("l")} src="right-arrow.png" alt="icon" width="20px" height="30px"/>
                 </div>

                 <div className={stil.arrowR}>
                    <img  onClick={()=>handleArrowClick("r")}  src="right-arrow.png" alt="icon" width="20px" height="30px"/>
                 </div>

                  <div className={stil.sliderPoint}>
                    <img onClick={()=>handleClickPointer(0)} src="new-moon.png" alt="" width="15px" height="15px" className={stil.sliderPointer}/>
                    <img onClick={()=>handleClickPointer(1)} src="new-moon.png" alt="" width="15px" height="15px" className={stil.sliderPointer}/>
                    <img onClick={()=>handleClickPointer(2)} src="new-moon.png" alt="" width="15px" height="15px" className={stil.sliderPointer}/>
                </div> 

            </div>
               
        </div>
  )
}

export default Slider
