
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import YouTube from 'react-youtube'
import getConfig from 'next/config'
import { BlogSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import withTranslations from '@/components/withTranslations';
import Video from '../../models/Video';
import Link from '@/components/Link'
import classNames from 'classnames';
import Image from '@/components/Image';
import TOCInline from '@/components/TOCInline';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';

const { publicRuntimeConfig } = getConfig()
// const isDevelopment = publicRuntimeConfig.isDevelopment
const isDevelopment = false

// const domain = process.env.DOMAIN_URL
const domain = "crm"

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
  const languages = ['sv', 'ro', 'es'];

  const v = await fetch(isDevelopment
    ? `http://localhost:3001/api/v1/videos?domain=${domain}`
    : `https://you-b.herokuapp.com/api/v1/videos?domain=${domain}`
  );
  const videos = await v.json();

  const paths = languages.flatMap((lang) =>
    videos.map((video) => {
      return ({
        params: {
          slug: video.slug.toString(),
        },
        locale: lang,
      })
    })
  );

  const englishPaths = videos.map((video) => ({
    params: {
      slug: video.slug.toString(),
    },
    locale: 'en',
  }));

  return {
    paths: [...paths, ...englishPaths],
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {

  const res = await fetch(isDevelopment
    ? `http://localhost:3001/api/v1/videos/${params.slug}`
    : `https://you-b.herokuapp.com/api/v1/videos/${params.slug}`
  );
  const data = await res.json();
  const video = new Video(data, locale);
  const vid = Object.assign({}, video);

  // Fetch all videos to find the index of the current video
  const allVideosRes = await fetch(isDevelopment
    ? `http://localhost:3001/api/v1/videos?domain=${domain}`
    : `https://you-b.herokuapp.com/api/v1/videos?domain=${domain}`
  );
  const allVideos = await allVideosRes.json();
  const currentIndex = allVideos.findIndex((v) => v.slug === params.slug);


  const filteredBlogVideos = allVideos
    .filter((video) => video.slug !== vid.slug) // Hoppa över den aktuella videon
    .filter((frontMatter) => {
      let searchContent = frontMatter["keywords"] && frontMatter["keywords"].length > 0
        ? frontMatter["keywords"]
        : [frontMatter.name.toLowerCase()];

      let searchValue = vid["keywords"] && vid["keywords"].length > 0
        ? vid["keywords"]
        : [vid.name.toLowerCase()];

      if (searchContent && searchContent.length > 0 && searchValue && searchValue.length > 0) {
        const regex = new RegExp(searchValue.join('|'), 'i');
        return searchContent.some((element) => regex.test(element));
      }
      // Om någon av `keywords` är `null` eller tomma, returnera false
      return false;
    });


  // Get the next video/article based on the current index
  let nextVideo = allVideos[currentIndex + 1];
  let priorVideo = allVideos[currentIndex - 1];

  if (!priorVideo) {
    console.log('no prior video');
    priorVideo = allVideos[allVideos.length - 1]; // Set priorVideo to the last video in the array
  }
  if (!nextVideo) {
    console.log('no next video');
    nextVideo = allVideos[0]; // Set nextVideo to the first video in the array
  }

  // Using Object.assign to create new objects with only the slug and name properties
  nextVideo = Object.assign({}, { slug: nextVideo.slug, name: nextVideo.name });
  priorVideo = Object.assign({}, { slug: priorVideo.slug, name: priorVideo.name });

  // rss
  if (vid.length > 0) {
    const rss = generateRss(vid);
    fs.writeFileSync("../public/rss.xml", rss);
  }

  return {
    props: { vid, nextVideo, priorVideo, filteredBlogVideos },
    revalidate: 86400, // Re-generate the page every 24 hours
  };

}

function Blog({ vid, metaData, nextVideo, priorVideo, filteredBlogVideos }) {

  return (
    <>
      <div className="max-w-none">
        <BlogSEO
          vid_url={`${metaData.siteUrl}/${vid.slug}`}
          // authorDetails={authorDetails}
          type='article'
          thumbnails={vid?.video_info?.thumbnail?.thumbnails}
          metaData={metaData}
          {...vid}
        />
        <ScrollTopAndComment />

        <div className="flex">

          {priorVideo && (
            <div className="flex-shrink-0 flex-grow-0 w-1/2" style={{ maxWidth: '50%' }}>
              <Link href={`/${priorVideo.slug}`}>
                <div
                  className={classNames(
                    'flex items-center mt-2 text-primary-500 hover:underline',
                  )}
                >
                  <span className="mr-2">&larr;</span>
                  <h4 className="truncate">
                    {priorVideo.name}
                  </h4>
                </div>
              </Link>
            </div>
          )}
          {nextVideo && (
            <div className="flex-shrink-0 flex-grow-0 w-1/2" style={{ maxWidth: '50%' }}>
              <Link href={`/${nextVideo.slug}`}>
                <div
                  className={classNames(
                    'flex items-center mt-2 text-primary-500 hover:underline',
                  )}
                >
                  <h4 className="truncate">
                    {nextVideo.name}
                  </h4>
                  <span className="ml-2">&rarr;</span>
                </div>
              </Link>
            </div>
          )}
        </div>
        <div className="main-content flex">
          <div className="text-content sm:w-full desktop:pr-0 desktop:w-4/5 desktop:pr-5">
            <PageTitle >
              {vid.name}
            </PageTitle>
            <div className="py-10" dangerouslySetInnerHTML={{ __html: vid.description }} />
            <YouTubeVideo url={vid.url} />
            
            <TOCInline className="py-6" toc={vid.toc} exclude="Excluded Section" />

            <div className="prose dark:prose-dark dark:text-gray-300 py-10 prose max-w-none" dangerouslySetInnerHTML={{ __html: vid.summary }} />
            

          </div>

          <div className="w-1/5 hidden md:block lg:block">
            <div className="top-0 sticky">
              {!filteredBlogVideos.length && <p>No Videos found.</p>}
              {filteredBlogVideos.map((video) => {
                const thumbnails = video?.video_info?.thumbnail?.thumbnails;
                const backgroundImage = thumbnails ? `url(${thumbnails[1]?.url})` : `url(${siteMetadata.socialBanner.url})`;
                const containerStyle = {
                  backgroundImage,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  borderRadius: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                };


                return (
                  <div key={video?.id} className="col-auto h-40 mb-5 text-center" style={containerStyle}>
                    <h3 className="text-m font-bold leading-8 tracking-tight text-white">
                      <Link href={`/${video.slug}`} className="text-white">
                        {video?.name}
                      </Link>
                    </h3>

                  </div>
                );
              })}
            </div>
          </div>


        </div>
      </div>
    </>

  )
}

export default withTranslations(Blog);
