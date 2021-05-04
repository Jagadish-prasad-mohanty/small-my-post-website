import React, { Component } from 'react';
import classes from './NewPost.module.css';
import axios from 'axios';

import {Redirect} from 'react-router-dom';

class NewPost extends Component{
    state={
        title:'',
        content:'',
        auther:'Max',
        redirect:false
    }
    componentDidMount(){
        console.log(this.props);
    }
    sendDataHandler=()=>{
        const data={
            Title:this.state.title,
            Content:this.state.content,
            Auther:this.state.auther,

        }
        axios.post('/posts',data)
            .then(res=>{
                //1st way
                // this.setState({redirect:true});


                //2nd way
                // this.props.history.push('/posts')
                this.props.history.replace('/posts');
                console.log(res);
            });
    }
    render(){
        // let redirection=null;
        // if(this.state.redirect)
        //     redirection=<Redirect to='/posts'/>
        return(
            <div className={classes.NewPost}>
                {/* {redirection} */}
                <h1>Add a post</h1>
                <label>Title</label>
                <input type="text"
                value={this.state.title}
                onChange={(event)=>{
                    this.setState({title:event.target.value})
                }}></input>

                <label>Content</label>
                <textarea rows="4"
                value={this.state.content}
                onChange={(event)=>{
                    this.setState({content:event.target.value})
                }}></textarea>

                <label>Auther</label>
                <select value={this.state.auther}
                onChange={(event)=>{
                    this.setState({auther:event.target.value})
                }}>
                    <option value="max">Max</option>
                    <option value="manu">Manu</option>
                </select>
                <button onClick={this.sendDataHandler}>Add Post</button>
            </div>
        );
    }
}


export default NewPost;