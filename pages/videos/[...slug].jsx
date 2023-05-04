
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import YouTube from 'react-youtube'
import getConfig from 'next/config'
import {BlogSEO} from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import withTranslations from '@/components/withTranslations';
import Video from '../../models/Video';


const { publicRuntimeConfig } = getConfig()
const isDevelopment = publicRuntimeConfig.isDevelopment

const domain = process.env.DOMAIN_URL


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
  // Add the supported languages here
  const languages = ['en', 'ru', 'fr', 'es', 'ro'];

  const v = await fetch(isDevelopment ? `http://localhost:3001/api/v1/videos?domain=${domain}` : `https://you-b.herokuapp.com/api/v1/videos?domain=${domain}`);
  const videos = await v.json();

  const paths = languages.flatMap((lang) =>
    videos.map((video) => ({
      params: {
        slug: [video.slug.toString()],
      },
      locale: lang,
    }))
  );

  return {
    paths,
    fallback: false,
  };
}

// Update your getStaticProps function
export async function getStaticProps({ params, locale }) {
  const res = await fetch(isDevelopment ? `http://localhost:3001/api/v1/videos/${params.slug}?lang=${locale}` : `https://you-b.herokuapp.com/api/v1/videos/${params.slug}?lang=${locale}`);
  const data = await res.json();
  const video = new Video(data, locale);
  const vid = Object.assign({}, video);
  
  // rss
  if (vid.length > 0) {
    const rss = generateRss(vid);
    fs.writeFileSync("../public/rss.xml", rss);
  }

  return { props: { vid } };
}

function Blog({ vid, metaData }) {
  
  return (
    <>
      <BlogSEO
        url={`${siteMetadata.siteUrl}/videos/${toString(vid.slug)}`}
       // authorDetails={authorDetails}
        type='article'
        thumbnails={vid?.video_info?.thumbnail?.thumbnails}
        metaData={metaData}
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


// Your existing Blog component code

export default withTranslations(Blog);
