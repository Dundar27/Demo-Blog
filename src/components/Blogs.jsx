import React, {useState, useEffect} from 'react';
import {collection, onSnapshot, addDoc, query, where, orderBy, limit} from "firebase/firestore";
/* import { query, where, orderBy, orderByChild, limit, limitToFirst, startAt, startAfter, endAt, endBefore, getDocs } from "firebase/firestore"; */
import db from './Firebase';
import './style.css'


const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        onSnapshot(query(collection(db, 'blogs'), where("like", ">", 10), orderBy("like"), limit(4)), snapshop => setBlogs(snapshop.docs.map(doc => ({
            id:doc.id,data:doc.data()
        }))))
    },[]) 

    const SubscribeForm = async(event) =>{
        event.preventDefault();

        var mailValue = document.getElementById("subscribe").value;
        const docRef = await addDoc(collection(db, "subscribers"), {
            mail: mailValue,
            subscribeDate: new Date()
        });
       alert("You have successfully subscribed", docRef);
    }

    
    return (
        <div className='p-3' id='blog-component'>
            {/* <div className="card text-center mt-3">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="true" href="#info">Info</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link bg-success text-light" href="#create">Create</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link bg-warning text-dark" href="#update">Update</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link  bg-danger text-light" href="#delete">Delete</a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <h5 className="card-title">Create Blog Post</h5>
                    <p className="card-text">Click the create button in the top right to create your own blog post.</p>
                </div>
            </div> */}
            <div className='row mt-3'>
                <div className='col-8 row p-2'>
                    {blogs.map((blog)=>(
                        <div className='card col-5 mx-3 my-3'>
                            <div className='card-header'>
                                <h3>Popular Blog Posts</h3> 
                            </div>
                            <div className='card-body'>
                                <div className='my-0'>        
                                    <div className="conteiner">
                                        <img src={blog.data.image} className="d-block w-100" alt="Blog image_"/>
                                        <div className='mt-5'>
                                            <div className="mt-0">
                                                <div className='text-center'>
                                                    <h5>{blog.data.title}</h5>
                                                </div>
                                                <div className='p-3'>
                                                    <p>{blog.data.description}</p>
                                                </div>
                                            </div> 
                                        </div> 
                                    </div>
                                </div>    
                            </div>      
                        </div>
                    ))}
                </div>
                <div className='col-4 p-2 my-3'>
                    <div className='card'>
                        <div className='card-header'>
                            <h3>Help Box</h3>
                        </div>
                        <div className='card-body'>
                            <div className='card text-dark my-3'>
                                <div className='card-header'>
                                    <h5>Subscribe</h5>
                                </div>
                                <div className='card-body'>
                                    <form onSubmit={SubscribeForm} className='form-box'>
                                        <label htmlFor="subscribe_label">Subscribe : <br />
                                            <input type="email" name="subscribe_button" id="subscribe" className='mx-auto mt-1' required /> 
                                        </label>
                                        <input type="submit" className='btn btn-success mx-auto' value="Subscribe" />   
                                    </form>
                                </div>
                            </div>
                            <div className='card text-dark my-3'>
                                <div className='card-header'>
                                    <h5>Social Media</h5>
                                </div>
                                <div className='card-body'>
                                    <a href={"https://www.github.com/Dundar27"} target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-github fa-2x mx-2 text-dark"></i>
                                    </a>
                                    <a href={"https://www.instagram.com/davut_burak_/"} target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-instagram fa-2x mx-2 text-dark"></i>
                                    </a>
                                    <a href={"https://tr.linkedin.com/in/davutburak"} target="_blank" rel="noopener noreferrer">
                                        <i class="fab fa-linkedin fa-2x mx-2 text-dark"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="alert alert-warning card my-3" role="alert">
                                <div className='card-header'>
                                    <h5>Warning</h5>
                                </div>
                                <div className='card-body'>
                                    <p>Our site is still under development. You are now using the demo version. If you've discovered a bug, please let us know.</p>
                                    <hr />
                                    <p className="mb-0">Click the link above to return to the home page.</p>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default Blogs;