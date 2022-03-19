import React, {useState, useEffect} from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import db from './Firebase';

function Header() { 

    const [values, setvalues] = useState([]);

    useEffect(()=>{
        onSnapshot(collection(db, "slides"), snapshop => setvalues(snapshop.docs.map(doc => ({
            id:doc.id,data:doc.data()
        }))))
    },[])      

    return (  
        <div className='p-3'>
            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel"> 
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner"> 
                {values.map((slide)=>(
                    <div className="carousel-item" style={{display : "block"}}>
                        <img src={slide.data.img_src} className="d-block w-100" alt="Canyon at Nigh"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{slide.data.title}</h5>
                            <p>{slide.data.description}</p>
                        </div>  
                    </div>   
                ))}
                </div>
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