import React, { useEffect, useState } from 'react'
import Post from './Post'
import { URL } from './DataBase'

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch( URL +'/allposts', {
       method: 'GET',
        // credentials: 'include' 
      })
      .then(resp => {
        resp.json().then(posts => {
          setPosts(posts);
        })
      })
  }, [])

  if(!posts) return (
    <div className="loading">
      <h3>Wait post are Loading . . .</h3>
    </div>
  )

  return (
    <>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      )
      )}
    </>
  )
}

export default Home