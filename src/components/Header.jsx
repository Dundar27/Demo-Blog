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

    console.log(values[1])

    /* const slides = {
        slide1 :{
            id: values[0],
            img_url: values[0],
            title: values[0],
            description: values[0]
        },
        slide2 :{
            id: values[1],
            img_url: values[1],
            title: values[1],
            description: values[1]
        },
        slide3 :{
            id: values[2],
            img_url: values[2],
            title: values[2],
            description: values[2]
        }
    } */

    return (  
        <div className='p-5'>
            <div id="carouselBasicExample" className="carousel slide carousel-fade" data-mdb-ride="carousel"> 
                <div className="carousel-inner"> 
                    {values.map(blog=>{
                        return(
                        <div>        
                            <div className="carousel-item" key={values[2].id} style={{opacity: "100", display: "block"}}>
                                <img src={values[2].data.img_src} className="d-block w-100" alt="Canyon at Nigh"/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{values[2].data.title}</h5>
                                    <p>{values[2].data.description}</p>
                                </div>  
                            </div>
                            <div className="carousel-item" key={values[1].id} style={{opacity: "100", display: "block"}}>
                                <img src={values[1].data.img_src} className="d-block w-100" alt="Canyon at Nigh"/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{values[1].data.title}</h5>
                                    <p>{values[1].data.description}</p>
                                </div>  
                            </div>
                            <div className="carousel-item" key={values[0].id} style={{opacity: "100", display: "block"}}>
                                <img src={values[0].data.img_src} className="d-block w-100" alt="Canyon at Nigh"/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5>{values[0].data.title}</h5>
                                    <p>{values[0].data.description}</p>
                                </div>  
                            </div>
                        </div>    
                        )
                    })}   
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