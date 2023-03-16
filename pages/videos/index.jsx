import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import getConfig from 'next/config'
import fs from 'fs'
import generateRss from '@/lib/generate-rss'

export const VIDEOS_PER_PAGE = 2
const { publicRuntimeConfig } = getConfig()
const isDevelopment = publicRuntimeConfig.isDevelopment


export async function getServerSideProps(context) {
  const tags  = context.query.tags
  const v = await fetch(isDevelopment ? `http://localhost:3001/api/v1/videos?keywords=${tags}` : `https://guarded-beach-57115.herokuapp.com/api/v1/videos?keywords=${tags}`)
  const videos = await v.json()

  const initialDisplayVideos = videos.slice(0, VIDEOS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(videos.length / VIDEOS_PER_PAGE),
    // totalPages: 1,
  }

  if (videos.length > 0) {

    const rss = generateRss(videos)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return { props: { videos, initialDisplayVideos, pagination } }
}

export default function Blog({ videos, initialDisplayVideos, pagination }) {

  return (
    <>
      <PageSEO title={`Video - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        videos={videos}
        initialDisplayVideos={initialDisplayVideos}
        pagination={pagination}
        title="All Videos"
      />
    </>
  )
}
