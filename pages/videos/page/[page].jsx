import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import getConfig from 'next/config'


export const VIDEOS_PER_PAGE = 10
const { publicRuntimeConfig } = getConfig()
const isDevelopment = publicRuntimeConfig.isDevelopment
const domain = process.env.DOMAIN_URL

export async function getStaticPaths() {

  const res = await fetch(isDevelopment ? `http://localhost:3001/api/v1/videos?domain=${domain}` : `https://you-b.herokuapp.com/api/v1/videos?domain=${domain}`)
  const videos = await res.json()

  const totalPages = Math.ceil(videos.length / VIDEOS_PER_PAGE)
  
  const languages = ['en', 'ro', 'es'];

  const paths = languages.flatMap((lang) =>
    Array.from({ length: totalPages }, (_, i) => ({
      params: {
        page: (i + 1).toString(),
      },
      locale: lang,
    }))
  );

  const swePaths = Array.from({ length: totalPages }, (_, i) => ({
    params: {
      page: (i + 1).toString(),
    },
    locale: 'sv',
  }));

  return {
    paths: [...paths, ...swePaths],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const {
    params: { page },
  } = context

  const res = await fetch(isDevelopment ? `http://localhost:3001/api/v1/videos?domain=${domain}` : `https://you-b.herokuapp.com/api/v1/videos?domain=${domain}`)
  const videos = await res.json()

  const pageNumber = parseInt(page)
  const initialDisplayVideos = videos.slice(
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
      initialDisplayVideos,
      pagination,
    },
  }
}

export default function PostPage({ videos, initialDisplayVideos, pagination, metaData }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} metaData={metaData} />
      <ListLayout
        videos={videos}
        initialDisplayVideos={initialDisplayVideos}
        pagination={pagination}
        title="Alla Inlägg"
      />
    </>
  )
}
