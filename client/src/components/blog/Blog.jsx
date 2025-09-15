import React from 'react'
import './blog.scss'
import { posts } from '../../pages/blog/blogData'

export default function Blog() {

  return (
  
    <div className="blogSection" id = 'blog'>

        {
            posts.map( (post, index) => (

                <a href = {`/blog/${post.id}`} className="blog__card" key = {index}>

                    <div className="photo"><img src={post.img} alt={post.title} /></div>
                    <p> {post.title} </p>
                    
                </a>

            ) )
        }

    </div>

  )

}
