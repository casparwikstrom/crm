
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import YouTube from 'react-youtube'
import getConfig from 'next/config'
import {BlogSEO} from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'

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
  const res = await fetch(isDevelopment ? 'http://localhost:3001/api/v1/videos' : "https://you-b.herokuapp.com/api/v1/videos")

  //const res = await fetch("https://you-b.herokuapp.com/api/v1/videos")
  const videos = await res.json()

  return {
    paths: videos.map((video) => ({
      params: {
        slug: [video.slug.toString()],
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetch videos from API
  const res = await fetch(isDevelopment ? `http://localhost:3001/api/v1/videos/${params.slug}` : `https://you-b.herokuapp.com/api/v1/videos/${params.slug}` )
  const vid = await res.json()

  // rss
  if (vid.length > 0) {
    const rss = generateRss(vid)
    fs.writeFileSync("../public/rss.xml", rss)
  }

  return { props: { vid } }
}

export default function Blog({ vid }) {
  
  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/videos/${toString(vid.slug)}`}
       // authorDetails={authorDetails}
        type='article'
        thumbnails={vid?.video_info?.thumbnail?.thumbnails}
        {...vid}
      />
      <PageTitle>
        <div dangerouslySetInnerHTML={{ __html: vid.name }} />
      </PageTitle>
      <div className="py-12" dangerouslySetInnerHTML={{ __html: vid.description }} />
      <YouTubeVideo url={vid.url} />
      
      <div className="py-12" dangerouslySetInnerHTML={{ __html: vid.summary }} />
    </>
  )
}