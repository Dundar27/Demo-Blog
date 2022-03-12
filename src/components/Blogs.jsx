import React, {useState, useEffect} from 'react';
import { collection, onSnapshot } from "firebase/firestore";
import db from './Firebase';
import './Blog.css'

const Blogs = () => {

    const [blogs, setBlogs] = useState([]);

    useEffect(()=>{
        onSnapshot(collection(db, "blogs"), snapshop => setBlogs(snapshop.docs.map(doc => ({
            id:doc.id,data:doc.data()
        }))))
    },[]) 
   
    console.log(blogs)
    return (
        <div className='p-3 bg-dark'>
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
            <div className='row mt-5'>
                {blogs.map(blog=>{
                    return(
                        <div className='col-8 p-2'>
                            <div className='card'>
                                <div className='card-header'>
                                    <h3>Blog Posts</h3> 
                                </div>
                                <div className='card-body'>
                                    <div className='my-0'>        
                                        <div className="conteiner">
                                            <img src={blogs[0].data.image} className="d-block w-100" alt="Blog image_"/>
                                            <div className='mt-5'>
                                                <div className="mt-0">
                                                    <div className='text-center'>
                                                        <h5>{blogs[0].data.title}</h5>
                                                    </div>
                                                    <div className='p-3'>
                                                        <p>{blogs[0].data.description}</p>
                                                    </div>
                                                </div> 
                                            </div> 
                                        </div>
                                    </div>    
                                </div>      
                            </div>
                        </div>
                    )
                })}
                <div className='col-4 p-2'>
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
                                    <form action="" method="post" className='form-box'>
                                        <label htmlFor="">Subscribe :</label> <br />
                                        <input type="email" name="" id="" />    
                                    </form>
                                </div>
                            </div>
                            <div className='card text-dark my-3'>
                                <div className='card-header'>
                                    <h5>Social Media</h5>
                                </div>
                                <div className='card-body'>
                                    <a href="/"><i class="fab fa-github fa-2x mx-2 text-dark"></i></a>
                                    <a href="/"><i class="fab fa-instagram fa-2x mx-2 text-dark"></i></a>
                                    <a href="/"><i class="fab fa-linkedin fa-2x mx-2 text-dark"></i></a>
                                </div>
                            </div>
                            <div className='card text-dark my-3'>
                                <div className='card-header'>
                                    <h5>Catagories</h5>
                                </div>
                                <div className='card-body'>
                                    {blogs.map(blog=>{
                                        return(
                                          <ul className='catagories-list'>
                                              <li><a href="/catagories/kisisel-gelisim">{blogs[0].data.catagories}</a></li>
                                          </ul>  
                                        )
                                    })}
                                </div>
                            </div>
                            <div className='card text-dark my-3'>
                                <div className='card-header'>
                                    <h5>Populer Posts</h5>
                                </div>
                                <div className='card-body'>
                                    {blogs.map(blog=>{
                                        return(
                                          <ul className='catagories-list'>
                                              <li><a href="/blog/posts/">{blogs[0].data.title}</a></li>
                                          </ul>  
                                        )
                                    })}
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