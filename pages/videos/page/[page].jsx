import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import getConfig from 'next/config'


export const VIDEOS_PER_PAGE = 3
const { publicRuntimeConfig } = getConfig()
const isDevelopment = publicRuntimeConfig.isDevelopment

export async function getStaticPaths() {

  const v = await fetch(isDevelopment ? 'http://localhost:3001/api/v1/videos' : "https://guarded-beach-57115.herokuapp.com/api/v1/videos")
  const videos = await v.json()
  
  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({

    params: { 
      page: (i + 1).toString(),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const {
    params: { page },
  } = context



  const v = await fetch(isDevelopment ? 'http://localhost:3001/api/v1/videos' : "https://guarded-beach-57115.herokuapp.com/api/v1/videos")
  const videos = await v.json()

  const pageNumber = parseInt(page)
  const initialDisplayPosts = videos.slice(
    VIDEOS_PER_PAGE * (pageNumber - 1),
    VIDEOS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(videos.length / VIDEOS_PER_PAGE),
  }

  return {
    props: {
      videos,
      initialDisplayPosts,
      pagination,
    },
  }
}

export default function PostPage({ videos, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout
        videos={videos}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Videos"
      />
    </>
  )
}
