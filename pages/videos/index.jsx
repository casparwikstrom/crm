import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import getConfig from 'next/config'


export const VIDEOS_PER_PAGE = 5
const { publicRuntimeConfig } = getConfig()
const isDevelopment = publicRuntimeConfig.isDevelopment
const domain = process.env.DOMAIN_URL

export async function getServerSideProps(context) {
  const tags  = context.query.tags

  const v = await fetch(isDevelopment ? `http://localhost:3001/api/v1/videos?keywords=${tags}&domain=${domain}` : `https://you-b.herokuapp.com/api/v1/videos?keywords=${tags}&domain=${domain}`)
  const videos = await v.json()

  const initialDisplayVideos = videos.slice(0, VIDEOS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(videos.length / VIDEOS_PER_PAGE),
    // totalPages: 1,
  }

  return { props: { videos, initialDisplayVideos, pagination } }
}

export default function Blog({ videos, initialDisplayVideos, pagination, metaData }) {

  return (
    <>
      <PageSEO title={`Video - ${siteMetadata.author}`} description={siteMetadata.description} metaData={metaData} />
      <ListLayout
        videos={videos}
        initialDisplayVideos={initialDisplayVideos}
        pagination={pagination}
        title="Alla Inlägg"
      />
    </>
  )
}
