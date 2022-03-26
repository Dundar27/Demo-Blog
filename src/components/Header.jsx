import React, {useState, useEffect} from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from "react-router-dom";
//Database functions
import db from './Firebase';
import { collection, onSnapshot, orderBy } from "firebase/firestore";

function Header() {
    //Function to rotate slide by number
    const [index, setIndex] = useState(0);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    //Pass slide data to value variable
    const [values, setvalues] = useState([]);

    //Get slide data from firebase database
    useEffect(()=>{
        onSnapshot(collection(db, "slides"), orderBy("id"), snapshop => setvalues(snapshop.docs.map(doc => ({
            id:doc.id,data:doc.data()
        }))))
    },[]);   
  
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}  className='p-3' id='header-component'>
        {values.map((slide)=>(
            <Carousel.Item id={slide.data.id}>
                <img
                    className="d-block w-100"
                    src={slide.data.img_src}
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>{slide.data.title}</h3>
                    <p>{slide.data.description}</p>
                    <Link to={"/contact"} className="btn btn-outline-primary">Contact Me</Link>
                </Carousel.Caption>
            </Carousel.Item>
        ))}
      </Carousel>
    );
  }
  
export default Header;