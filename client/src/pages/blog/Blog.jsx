import React from 'react'
import './blog.scss'

import Container from '../../components/container/container'
import blog1 from '../../assets/blog/blog1.jpg'
import blog4 from '../../assets/blog/blog4.jpg'
import blog2 from '../../assets/blog/blog3.jpg'
import { useNavigate } from 'react-router-dom'
import { posts } from './blogData';

export default function Blog() {

let navigate = useNavigate()

  return (
    
    <div className="blog pageBrief">

        <Container>

            <div className="blog__heading headers">
                <p>Discover Trends, Expert Tips, and Strategies for Growth</p>
            </div>

            <div className="blogBody">
                
                {
                    posts.length ? posts.map( (post, index) => (

                        <div key = {index} className="blog__item" onClick={ () => navigate(`/blog/${post.id}`) }>

                            <div className="text__content">

                                <div className="author"> 
                                    <p> { post.author.split(" ")[0].split("")[0] }{ post.author.split(" ")[1].split("")[0] } </p> 
                                    <span> {post.author} </span>
                                </div>

                                <div className="blog__title"> {post.title} </div>
                                <div className="blog__subtitle"> {post.description} </div>

                            </div>

                            <div className="blog__photo"> 
                                <img src={post.img} alt="" /> 
                            </div>

                        </div>

                    ) ) : null
                }
                
            </div>

        </Container>

    </div>

  )

}
