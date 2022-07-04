import React from 'react';
import { Row } from 'react-bootstrap';
import SearchBar from './SearchBar';
import BlogPosts from "./BlogPosts";

class Blog extends React.Component{
    
    constructor(props){
        super(props);
        this.state={}
    }

    render(){
        return (
            <div className='p-4' id='blog-component'>
                <div className='my-5'>
                    <h1>Welcome To Our Blog Page</h1>
                    <hr /> <p><i>You can find everything on the blog page</i></p>
                </div>

                <SearchBar searchProp={this.props.searchProp}/>

                <Row>
                    <BlogPosts BlogPosts={this.props.getBlogPosts} />
                </Row>
            </div>
        );
    }
}

export default Blog;