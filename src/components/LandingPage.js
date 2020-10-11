import React, { useState, useEffect, Component } from 'react';
import axios from "axios";



export default class LandingPage extends Component {
constructor(props){
  super(props);
  this.state={
    posts:[]
    
    
  }
}
componentDidMount(){
  this.getPosts();
}
getPosts(){
  axios.get("http://localhost:5000/posts").then(res=>{
    
  
    if(res.data.success){
      this.setState({
        posts:res.data.posts,
      });
      console.log(this.state.posts);
    }
  });
}
filterContent(posts, searchTerm){
  const result = posts.filter((post)=> 
  post.title.toLowerCase().includes(searchTerm) ||
   post.description.toLowerCase().includes(searchTerm) ||
   post.postCategory.toLowerCase().includes(searchTerm));
  this.setState({posts: result});
}

handleTextSearch=(e)=>{
  const searchTerm= e.currentTarget.value;
  axios.get("http://localhost:5000/posts").then(res=>{
    if(res.data.success){
      this.filterContent(res.data.posts, searchTerm)
        
    }
  });

}
onDelete=(id)=>{
  axios.delete(`http://localhost:5000/posts/delete/${id}`).then((res)=>{
    alert(res.data.title+" Deleted Successfully");
    this.getPosts();

  })
};

  render() {
    return <div>
        <div className="row">
  <div className="col-lg-9 mt-2 mb-2">
    <h2>All Posts</h2>
  </div>
  <div className="col-lg-9 mt-2 mb-2">
    <input className="form-control"
    type="search"
    placeholder="Search"
    name="searchTerm"
    onChange={this.handleTextSearch}/>
</div>
</div>
      <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">Sr.</th>
      <th scope="col">Company Name</th>
      <th scope="col">Description</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
  {this.state.posts.map((post, index)=>(
    <tr>
      <th scope="row">{index+1}</th>
  
      <td>
        <a href={`/posts/${post._id}`}> {post.title} </a></td>
      <td dangerouslySetInnerHTML= {{__html:post.description}}></td>
      <td>{post.postCategory}</td>
      <td>

        <a className= "btn btn-warning" href={`/edit/${post._id}`}>
          <i className="fas fa-edit"></i>&nbsp; Edit
        </a> &nbsp;
        <a className= "btn btn-danger" href="#" onClick={()=>this.onDelete(post._id)}>
          <i className="far fa-trash-alt"></i>&nbsp;Delete
        </a>
      </td>
      

    </tr>
      )
      )}
    </tbody>
    </table>
    <button className="btn btn-success"><a href="/add">Add New Post</a></button>
      </div>
    
   
    
  }
}

