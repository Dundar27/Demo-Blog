import React, {useState, useEffect} from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import db from './Firebase';

function Header() { 

    const [values, setvalues] = useState([]);

     useEffect(()=>{
        onSnapshot(collection(db, "post"), snapshop => setvalues(snapshop.docs.map(doc => ({
            id:doc.id,data:doc.data()
        }))))
    },[])      

    console.log(values[0].data.title)
    return (  
        <div className='p-5'>
            <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel"> 
                <div className="carousel-inner"> 
                    <div className="carousel-item" id={values[0].id} style={{opacity: "100", display: "block"}}>
                        <img src={values[0].data.img_src} className="d-block w-100" alt="Canyon at Nigh"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{values[0].data.title}</h5>
                            <p>{values[0].data.description}</p>
                        </div>  
                    </div>
                    <div className="carousel-item" id={values[1].id} style={{opacity: "100", display: "block"}}>
                        <img src={values[1].data.img_src} className="d-block w-100" alt="Canyon at Nigh"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{values[1].data.title}</h5>
                            <p>{values[1].data.description}</p>
                        </div>  
                    </div>
                    <div className="carousel-item" id={values[2].id} style={{opacity: "100", display: "block"}}>
                        <img src={values[2].data.img_src} className="d-block w-100" alt="Canyon at Nigh"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>{values[2].data.title}</h5>
                            <p>{values[2].data.description}</p>
                        </div>  
                    </div>
                </div>
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