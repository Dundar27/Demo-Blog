import React, {useState, useEffect} from 'react';
import { collection, onSnapshot } from "firebase/firestore";
//import ReactDOM from 'react-dom';
//import firebase from 'firebase/compat';
import db from './firebase';



function Header() { 

    const [values, setvalues] = useState([]);

     useEffect(()=>{
        onSnapshot(collection(db, "post"), snapshop => setvalues(snapshop.docs.map(doc => ({
            id:doc.id,data:doc.data()
        }))))
    },[])

    return(
        <div>
            <img src={values.map(item=>(item.data.img_src))} alt="not found img_url" />
        </div>
    )
}

export default Header;