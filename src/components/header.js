import React, {useState, useEffect} from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import db from './firebase';

function Header() { 

    const [values, setvalues] = useState([]);

     useEffect(()=>{
        onSnapshot(collection(db, "post"), snapshop => setvalues(snapshop.docs.map(doc => ({
            id:doc.id,data:doc.data()
        }))))
    },[])      
    console.log(values[0].map(value => (value.data.title)))

    const database = {
        slide1: {
            id: values[0].map(value => (value.data.id)),
            src: values[0].map(value => (value.data.img_src)),
            title: values[0].map(value => (value.data.title)),
            description: values[0].map(value => (value.data.description))
        },
        slide2: {
            id: values[1].map(value => (value.data.id)),
            src: values[1].map(value => (value.data.img_src)),
            title: values[1].map(value => (value.data.title)),
            description: values[1].map(value => (value.data.description))
        },
        slide3: {
            id: values[2].map(value => (value.data.id)),
            src: values[2].map(value => (value.data.img_src)),
            title: values[2].map(value => (value.data.title)),
            description: values[2].map(value => (value.data.description))
        }
    }

    return (
        
        <div className='p-5'>
            <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel">
                {
                <div className="carousel-inner"> 
                    <div className="carousel-item" id={database.slide1.id} style={{opacity: "100", display: "block"}}>
                        <img src={database.slide1.src} className="d-block w-100" alt="Canyon at Nigh"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{database.slide1.title}</h5>
                            <p>{database.slide1.description}</p>
                        </div>  
                    </div>
                    <div className="carousel-item" id={database.slide2.id} style={{opacity: "100", display: "block"}}>
                        <img src={database.slide2.src} className="d-block w-100" alt="Canyon at Nigh"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{database.slide2.title}</h5>
                            <p>{database.slide2.description}</p>
                        </div>  
                    </div>
                    <div className="carousel-item" id={database.slide3.id} style={{opacity: "100", display: "block"}}>
                        <img src={database.slide3.src} className="d-block w-100" alt="Canyon at Nigh"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{database.slide3.title}</h5>
                            <p>{database.slide3.description}</p>
                        </div>  
                    </div>
                </div>
                }
                <button className="carousel-control-prev" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-mdb-target="#carouselBasicExample" data-mdb-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    ); 
}

export default Header;