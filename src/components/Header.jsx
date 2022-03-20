import React, {useState, useEffect} from 'react';
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import db from './Firebase';

const Header = () => { 

    const [values, setvalues] = useState([]);

    useEffect(()=>{
        onSnapshot(collection(db, "slides"), orderBy("id"), snapshop => setvalues(snapshop.docs.map(doc => ({
            id:doc.id,data:doc.data()
        }))))
    },[])      

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