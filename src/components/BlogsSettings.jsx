import React from "react";
import { Link } from "react-router-dom";
import {Table, Button} from 'react-bootstrap';
import db from './Firebase';
import { collection, onSnapshot, query, where, doc, deleteDoc } from "firebase/firestore";

class BlogsSettings extends React.Component{

    constructor(props){
        super(props);

        this.state={
            userData: [],
            userBlogPosts: [],
            selected: false
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
            <div id="blogssettings-component">
                    
                <Link to={"/blog/create-post/"} className="mt-3">
                    <Button variant="primary" className="w-100">
                        <i className="fas fa-plus"></i> Create
                    </Button> 
                </Link> <hr />

                <Table responsive="sm" className="my-3">
                    <thead>
                        <tr>
                            <th>Blog Title</th>
                            <th>Blog Description</th>
                            <th>Catagories</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userBlogPosts.map(blog => (
                            <tr id={blog.id}>

                                <td>{blog.data.title}</td>

                                <td className="text-center">
                                    {blog.data.description}
                                </td>

                                <td>{blog.data.catagories}</td>

                                <td>
                                    <Link to={"/blog/edit-blog/"} className="mx-2">
                                        <Button variant="warning" className="text-light">    
                                                <i className="fas fa-edit"></i> Edit 
                                        </Button>
                                    </Link>
                                    <Button variant="danger" className="mx-2">
                                        <i className="fas fa-trash"></i> Delete
                                    </Button>
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