import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'

export const VIDEOS_PER_PAGE = 10

export async function getStaticProps() {
  const v = await fetch('http://localhost:3001/api/v1/videos')
  const videos = await v.json()

  const initialDisplayVideos = videos.slice(0, VIDEOS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    /* totalPages: Math.ceil(videos.length / VIDEOS_PER_PAGE), */
    totalPages: 1,
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
        title="All posts"
      />
    </>
  )
}
