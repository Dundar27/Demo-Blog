import React from 'react';
import { Link } from "react-router-dom";

const Blogs = (props) => {  

    return (
        <div className='p-3' id='blogs-component'>
            <div className='row mt-3'>
                <div className='col-8 row p-2'>
                    {props.getPopulerBlogPosts.map((blog)=>(
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
                                        <Link to={'blog/'+blog.id} className="btn btn-outline-primary btn-rounded">Read the Blog Post</Link>
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
                                    <h5>Pages</h5>
                                </div>
                                <div className='card-body'>
                                    <ul class="list-group">
                                        <Link to={'blog/catagories/'} className={"list-group-item list-group-item-action"}>
                                            Catagories
                                        </Link>
                                        <Link to={'blog/populer-blogs/'} className={"list-group-item list-group-item-action"}>
                                            Populer Blog Posts
                                        </Link>
                                    </ul>
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