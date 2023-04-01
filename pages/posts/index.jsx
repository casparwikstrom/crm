import React from 'react'
import Link from 'next/link'

const Posts = (props) => (
  <div>
    <h1>My Videos</h1>
    <ul>
      {props.videos.map((video) => (
        <li key={video.id}>
          <Link href="/videos/[slug]" as={`/videos/${video.slug}`}>
            <a>{video.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

Posts.getInitialProps = async function () {
  const res = await fetch("https://you-b.herokuapp.com/api/v1/videos")
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    videos: data,
  }
}

export default Posts
