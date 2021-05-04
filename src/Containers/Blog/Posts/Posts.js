import React, {Component} from 'react';
import classes from './Posts.module.css';
import axios from '../../../axios';
import Post from '../../../Components/Post/Post';
import FullPost from '../FullPost/FullPost';
import { Route } from 'react-router-dom';
import Auxilary from '../../../hoc/Auxilary/Auxilary';




// import {Link} from 'react-router-dom';

class Posts extends Component{
    state={
        posts:[]
        }
    componentDidMount=()=>{
        console.log("[Posts.js]");
        console.log(this.props);
        axios.get('/posts')
                    .then(res=>{
                        const posts=res.data.slice(0,4);
                        const updatedPosts=posts.map(post=>{
                            return {
                                ...post,
                                Auther:'Max'
                            }
                        })
                        this.setState({posts:updatedPosts})
                        // console.log(res);
                    }).catch(err=> console.log(err))
    }

    setFullPostIdHandler= (id)=>{
        this.props.history.push('/posts/'+id);
        // console.log(id);
    }
    render(){
        let posts=<p style={{textAlign:'center'}}><strong>Somethings went error</strong></p>
        if(!this.state.error){
            posts=this.state.posts.map(post=>(
                // <Link to={'/posts/'+post.id} key={post.id} style={{textDecoration:'none'}}>
                    <Post 
                    key={post.id}
                        Auther={post.Auther} 
                        Title={post.title}
                        clicked={()=>this.setFullPostIdHandler(post.id)}
                    />
                // {/* </Link> */}
                    
            ))
        }
        return(
            <Auxilary>

            <section className={classes.Posts}>
                    {posts}

                </section>
             <Route path={this.props.match.url+'/:id'} exact component={FullPost}/>
            </Auxilary>
        )
    }
}

export default Posts;