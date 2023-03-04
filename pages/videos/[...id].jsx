import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import YouTube from 'react-youtube'
import getConfig from 'next/config'
const DEFAULT_LAYOUT = 'PostLayout'

const { publicRuntimeConfig } = getConfig()
const isDevelopment = publicRuntimeConfig.isDevelopment

function YouTubeVideo({ url }) {
  const videoId = url.split('v=')[1]

  const opts = {
    playerVars: {
      // Enable autoplay
      autoplay: 1,
    },
    width: '100%',
  }
  return <YouTube videoId={videoId} opts={opts} />
}

export async function getStaticPaths() {
  const res = await fetch(isDevelopment ? 'http://localhost:3001/api/v1/videos' : "https://guarded-beach-57115.herokuapp.com/api/v1/videos")

  //const res = await fetch("https://guarded-beach-57115.herokuapp.com/api/v1/videos")
  const videos = await res.json()

  return {
    paths: videos.map((video) => ({
      params: {
        id: [video.id.toString()],
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetch videos from API
  const res = await fetch(isDevelopment ? `http://localhost:3001/api/v1/videos/${params.id}` : `https://guarded-beach-57115.herokuapp.com/api/v1/videos/${params.id}` )
  //const res = await fetch(`https://guarded-beach-57115.herokuapp.com/api/v1/videos/${params.id}`)
  const vid = await res.json()

  // rss
  if (vid.length > 0) {
    const rss = generateRss(vid)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return { props: { vid } }
}

export default function Blog({ vid }) {
  return (
    <>
      <PageTitle>
        <div dangerouslySetInnerHTML={{ __html: vid.name }} />
      </PageTitle>
      <div className="py-12" dangerouslySetInnerHTML={{ __html: vid.description }} />
      <YouTubeVideo url={vid.url} />
      
      <div className="py-12" dangerouslySetInnerHTML={{ __html: vid.summary }} />
    </>
  )
}
