import React from "react";
import { Link } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import db from './Firebase';
import { collection, onSnapshot, query, where, doc, deleteDoc } from "firebase/firestore";

class BlogsSettings extends React.Component{

    constructor(props){
        super(props);
        this.state={
            userData: [],
            userBlogPosts: []
        }
    }

    componentDidMount(){
        this.getUserData();
        this.getUserBlogPosts();
    }

    async getUserData() {
        const response = await onSnapshot(query(collection(db, 'users'), where("id", "==", this.props.userControl.uid)), snapshop => this.setState({userData: snapshop.docs.map(doc => ({
          id:doc.id,data:doc.data()
        }))}));
    }
    
    async getUserBlogPosts() {
        const response = await onSnapshot(query(collection(db, 'blogs'), where("writer", "==", this.props.userControl.displayName)), snapshop => this.setState({userBlogPosts: snapshop.docs.map(doc => ({
          id:doc.id,data:doc.data()
        }))}));
    }

    deleteBlog(id){

        const blogRef = doc(db, "blogs", id);

        if(window.confirm("Are you sure ?")){

            deleteDoc(blogRef).then(()=>{
                    
                //this.toggleShowA();
    
            }).catch((error) => {
                alert(error.code);
                alert(error.message);
            });
        }
    }

    render(){
        return(
            <div>
                <Link to={"/blog/create-post/"}>
                    <button className="btn btn-primary w-100 mt-3">
                        <i className="fas fa-plus"></i> Create Blog Post
                    </button>
                </Link> <hr />
                <Table responsive="sm" className="my-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Blog Title</th>
                            <th>Catagories</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userBlogPosts.map(blog => (
                            <tr>
                                <td>*</td>
                                <td>{blog.data.title}</td>
                                <td>{blog.data.catagories}</td>
                                <td>
                                    <Link to={"/blog/edit-blog/"}>
                                        <button className="btn btn-warning text-light">
                                            <i className="fas fa-edit"></i>
                                        </button>
                                    </Link>
                                    <button className="btn btn-danger mx-2" onClick={this.deleteBlog(blog.id)}>
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default BlogsSettings;