import React ,{Component,Suspense} from 'react';
import Auxilary from '../../hoc/Auxilary/Auxilary';
import classes from './Blog.module.css';
// import axios from '../../axios';
import Posts from './Posts/Posts'
// import NewPost from './NewPost/NewPost';
// import FullPost from './FullPost/FullPost';

//import Async wrapper function
// import AsyncComponent from '../../hoc/AsyncComponent/AsyncComponent';

import {Route,NavLink, Switch, Redirect} from 'react-router-dom';


//Async loading of component
//Method-1
// const AsyncNewPost= AsyncComponent(()=>{
//     return import('./NewPost/NewPost');
// })

//Method-2
const AsyncNewPost= React.lazy(()=>{
    return import('./NewPost/NewPost');
})

class Blog extends Component{
    state={
        auth:true 
    }
    render(){
        return(
            <Auxilary>
                <header className={classes.Blog}>
                    <nav>
                        <ul>
                            {/* <li><a href='/'>Home</a></li>
                            <li><a href='/new-post'>NewPost</a></li> */}

                            <li><NavLink to="/posts" exact activeClassName={classes.my_active}
                            activeStyle={{
                                color:'#fa923f',
                                textDecoration:'underline'
                            }}
                            >Home</NavLink></li>
                            <li><NavLink to={{
                                pathname:'/new-post',
                                hash:'#submit',
                                search:'?quick-submit=true'
                            }} activeClassName={classes.active}>NewPost</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                {/* method-1 */}
                    {/* {this.state.auth ?<Route path='/new-post' exact component={AsyncNewPost}/>:null} */}
                {/* method-2 */}
                    {this.state.auth ?<Route path='/new-post' exact render={()=>(
                                            <Suspense fallback={<div>Loading...</div>}>
                                                <AsyncNewPost/>
                                            </Suspense>)}/>:null}
                    <Route path='/posts' component={Posts}/>
                    {/* <Route path='/' component={Posts}/> */}

                    {/* redirect any unknown path or the path started with the / to /posts */}
                    {/* <Redirect from='/' to='/posts'/> */}

                    {/* handle 404 error */}
                    <Route render={()=><h1>404.Not Found!!</h1>}/>
                </Switch>
            </Auxilary>

        );
    }
}

export default Blog;