import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import SearchBar from './SearchBar';
import db from './Firebase';
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore';

class BlogsSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [],
      userBlogPosts: [],
      selected: false,
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.getUserData();
    this.getUserBlogPosts();
  }

  async getUserData() {
    const response = await onSnapshot(
      query(
        collection(db, 'users'),
        where('id', '==', this.props.userControl.uid)
      ),
      (snapshop) =>
        this.setState({
          userData: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
  }

  async getUserBlogPosts() {
    const response = await onSnapshot(
      query(
        collection(db, 'blogs'),
        where('writer', '==', this.props.userControl.displayName)
      ),
      (snapshop) =>
        this.setState({
          userBlogPosts: snapshop.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          })),
        })
    );
  }

  deleteBlog(id) {
    const blogRef = doc(db, 'blogs', id);

    if (window.confirm('Are you sure ?')) {
      deleteDoc(blogRef)
        .then(() => {
          //this.toggleShowA();
        })
        .catch((error) => {
          alert(error.code);
          alert(error.message);
        });
    }
  }

  searchBlogPostProp = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    let filtered = this.state.userBlogPosts
      .filter((blog) => {
        return (
          blog.data.title
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1 ||
          blog.data.catagories
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });

    return (
      <div id="blogssettings-component">
        <Link to={'/blog/post/create/'} className="mt-3">
          <Button variant="primary" className="w-100">
            <i className="fas fa-plus"></i> Create
          </Button>
        </Link>{' '}
        <hr />
        <SearchBar searchProp={this.searchBlogPostProp} />
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
            {filtered.map((blog) => (
              <tr id={blog.id}>
                <td>{blog.data.title}</td>

                <td>{blog.data.description}</td>

                <td>{blog.data.catagories}</td>

                <td>
                  <Link to={`/blog/post/edit/${blog.id}`} className="mx-2">
                    <Button variant="warning" className="text-light">
                      <i className="fas fa-edit"></i> Edit
                    </Button>
                  </Link>
                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => this.deleteBlog(blog.id)}
                  >
                    <i className="fas fa-trash"></i> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default BlogsSettings;
