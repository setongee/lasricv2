import React, { useState , useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './blogView.scss'
import Container from '../../components/container/container';
import { ArrowLeft } from 'iconoir-react';
import blog1 from '../../assets/blog/blog1.jpg'
import blog2 from '../../assets/blog/blog2.jpg'
import blog3 from '../../assets/blog/blog3.jpg'
import blog4 from '../../assets/blog/blog4.jpg'

import { posts } from './blogData';
import Blog1 from './blog1';
import './blogTemp.scss'
import Blog2 from './blog2';
import Blog3 from './blog3';

export default function BlogView() {

    const [post, setPost] = useState({});

    const {id} = useParams();
    const navigate = useNavigate();
    
    const navigateBack = () => {

        navigate(-1);

    }

    useEffect(() => {
       
        const data = posts.filter( res => res.id === Number(id) );
        if (data.length) setPost(data[0]);
       
    }, []);


  return (
    
    <div className="view_news">

        <Container>

            <div className="overhold flex">

                <div className="news_container">

                    <div className="back_to_news" onClick = { () => navigateBack() } > <ArrowLeft/> </div>

                    <div className="current_news">

                        <div className="dateNow"> 
                            
                            <div className="firstPart flex">

                                {post.date}

                                <p>-</p>

                                <div className="readtime"> 
                                   3 Mins Read  
                                </div>

                            </div>
                        
                        </div>

                        <div className="current_news_title">
                            {post.title}
                        </div>    

                        <div className="current_news_image">
                            <img src={post.img} alt={post.title} />
                        </div>  
                        
                        {
                            Number(id) === 1 ? <Blog1/> : Number(id) === 2 ? <Blog2/> : Number(id) === 3 ? <Blog3/> : null
                        }              

                    </div>

                </div>

                <div className="sub_news_container">

                    <div className="title__sub__news">
                        <p>Other Related Topics </p>
                    </div>

                    <div className="sub__news__data">

                        {
                            posts.length > 1 ? posts.filter( e => e.id !== Number(id) ).map( relatedPosts => (

                                <a className="subs_news" href={`/blog/${relatedPosts.id}`}>

                                    <div className="sub__image"><img src = {relatedPosts.img} alt={relatedPosts.title} /></div>
                                    <div className="sub__title flex"> 

                                        {relatedPosts.title}
                                        <div className="date"> {relatedPosts.date} </div>

                                    </div>

                                </a>

                            ) ) : null
                        }

                    </div>

                </div>

            </div>

        </Container>

    </div>

  )
}
