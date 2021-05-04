import React,{Component} from 'react';
import classes from './FullPost.module.css';
import axios from 'axios';

class fullPost extends Component{
    state={
        loadedPost:null
    }
    componentDidMount= ()=>{
        console.log(this.props);
        this.getData();
    }
    componentDidUpdate= ()=>{
        console.log(this.props);
        this.getData();
    }

    getData= ()=>{
        if(this.props.match.params.id){
            if(!this.state.loadedPost ||(this.state.loadedPost && (this.state.loadedPost.id!= this.props.match.params.id))){
                axios.get('/posts/'+this.props.match.params.id)
                    .then(res => {
                        // this.setState({post:res.data});
                        // console.log(res);
                        this.setState({loadedPost:res.data})
                    })
                }
            }
    }

    deletePostHandler=()=>{
        axios.delete('/posts/'+this.props.match.params.id)
        .then(res=>console.log(res))
    }
     
    render(){
        
        let post = <p style={{'textAlign':'center'}}>Select a post!!</p>

        if(this.props.match.params.id){
            post=<p style={{'textAlign':'center'}}><strong>Loading...</strong></p>
        }
        
        if(this.state.loadedPost){  
    
            post=(
                <div className={classes.FullPost}>
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className={classes.Edit}>
                        <button className={classes.Delete} onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            )
        }
        return post;
    }

}


export default fullPost;