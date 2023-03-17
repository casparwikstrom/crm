import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import formatDate from '@/lib/utils/formatDate'
import NewsletterForm from '@/components/NewsletterForm'
import getConfig from 'next/config'
import Image from '../components/Image'
import ListLayout from '@/layouts/ListLayout'


const { publicRuntimeConfig } = getConfig()
const isDevelopment = publicRuntimeConfig.isDevelopment

//pagination with max 3 posts per page

export const VIDEOS_PER_PAGE = 10

export async function getStaticProps() {
  const v = await fetch(isDevelopment ? 'http://localhost:3001/api/v1/videos' : "https://guarded-beach-57115.herokuapp.com/api/v1/videos")
  const videos = await v.json()

  const initialDisplayVideos = videos.slice(0, VIDEOS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(videos.length / VIDEOS_PER_PAGE),
    // totalPages: 1,
  }

  return { props: { videos, initialDisplayVideos, pagination } }
}

export default function Home({ videos, initialDisplayVideos, pagination }) {

  return (
    <>
      <PageSEO title={`Video - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        videos={videos}
        initialDisplayVideos={initialDisplayVideos}
        pagination={pagination}
        title="All Videos"
      />
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}
