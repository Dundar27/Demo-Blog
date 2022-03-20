import React, {useState, useEffect} from 'react';
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import db from './Firebase';

const Header = () => { 

    const [values, setvalues] = useState([]);

    useEffect(()=>{
        onSnapshot(collection(db, "slides"), orderBy("id"), snapshop => setvalues(snapshop.docs.map(doc => ({
            id:doc.id,data:doc.data()
        }))))
    },[]);   
    

   /*  const slider = {
        slide1:{
            id: values[0].data.id,
            img: values[0].data.img_src,
            title: values[0].data.title,
            description: values[0].data.description
        },
        slide2:{
            id: values[1].data.id,
            img: values[1].data.img_src,
            title: values[1].data.title,
            description: values[1].data.description
        },
        slide3:{
            id: values[2].data.id,
            img: values[2].data.img_src,
            title: values[2].data.title,
            description: values[2].data.description
        }
    } */
    

    return (  
        <div className='p-3' id='header-component'>
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel"> 
                    <div className="carousel-inner"> 
                        {values.map((slide)=>(
                            <div className="carousel-item" style={{display : "block"}} id={slide.data.id}>
                                <img src={slide.data.img_src} className="d-block w-100" alt="Not found"/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{slide.data.title}</h5>
                                    <p>{slide.data.description}</p>
                                </div>  
                            </div>   
                        ))}
                    </div>
                    {/* <div className="carousel-inner"> 
                        <div className="carousel-item" style={{display : "block"}} id={slider.slide1.id}>
                            <img src={slider.slide1.img} className="d-block w-100" alt="Not found"/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{slider.slide1.title}</h5>
                                <p>{slider.slide1.description}</p>
                            </div>  
                        </div>    
                    </div>
                    <div className="carousel-inner"> 
                        <div className="carousel-item" style={{display : "block"}} id={slider.slide2.id}>
                            <img src={slider.slide2.img} className="d-block w-100" alt="Not found"/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{slider.slide2.title}</h5>
                                <p>{slider.slide2.description}</p>
                            </div>  
                        </div>    
                    </div>
                    <div className="carousel-inner"> 
                        <div className="carousel-item" style={{display : "block"}} id={slider.slide3.id}>
                            <img src={slider.slide3.img} className="d-block w-100" alt="Not found"/>
                            <div className="carousel-caption d-none d-md-block">
                                <h5>{slider.slide3.title}</h5>
                                <p>{slider.slide3.description}</p>
                            </div>  
                        </div>    
                    </div> */}
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
            </div>
        </div>
    ); 
}

export default Header;