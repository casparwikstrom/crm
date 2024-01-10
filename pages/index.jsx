import Link from '@/components/Link';
import { PageSEO } from '@/components/SEO';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import NewsletterForm from '@/components/NewsletterForm';
import getConfig from 'next/config';
import Image from '../components/Image';
import ListLayout from '@/layouts/ListLayout';

const { publicRuntimeConfig } = getConfig();
const isDevelopment = publicRuntimeConfig.isDevelopment;
//pagination with max 10 posts per page
// const domain = publicRuntimeConfig.domain
export const VIDEOS_PER_PAGE = 10;



export async function getStaticProps() {
  const domain = process.env.DOMAIN_URL
  const v = await fetch(isDevelopment ? `http://localhost:3001/api/v1/videos?domain=${domain}` : `https://you-b.herokuapp.com/api/v1/videos?domain=${domain}`)
  const videos = await v.json()

  const initialDisplayVideos = videos.slice(0, VIDEOS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(videos.length / VIDEOS_PER_PAGE),
    // totalPages: 1,
  }

  return { props: { videos, initialDisplayVideos, pagination } }
}

export default function Home({ videos, initialDisplayVideos, pagination, metaData }) {

  return (
    <>
      <PageSEO title={`Video - ${metaData.author}`} description={metaData.description} metaData={metaData} />
      <ListLayout
        videos={videos}
        initialDisplayVideos={initialDisplayVideos}
        pagination={pagination}
        title="Alla Inlägg"
      />
      {siteMetadata.newsletter.provider !== '' && (
        <div className="flex items-center justify-center pt-4">
          <NewsletterForm />
        </div>
      )}
    </>
  )
}

