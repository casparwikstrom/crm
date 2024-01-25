import { useEffect, useState } from 'react';
import Video from "../models/Video";
import { genericCall } from "../pages/api/api";
import { BlogSEO } from '@/components/SEO';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';

function SSRComponent({ slug, metaData }) {
  const [vid, setVid] = useState(null);
  const isDevelopment = process.env.NODE_ENV === 'development'

  useEffect(() => {
    const endpoint = `videos/${slug}`;
    const baseUrl = 'https://you-b.herokuapp.com/api/v1'
    /* http://localhost:3001/api/v1/videos/amazon-fba-beginners-4-steps-start-selling-amazon */
    const sortParams = { slug: slug }
    genericCall(endpoint, 'GET', null, sortParams, baseUrl)
      .then((response) => {
        // const data = await res.json();
        const video = new Video(response, 'sv');
        setVid(Object.assign({}, video));
      })
      .catch((error) => {
        console.error('Error fetching company data:', error);
      });
  }, []);


  if (vid === null) {
    return <div>Loading...</div>;
  }

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
        <div className="main-content">
          <div className="text-content sm:w-full desktop:pr-0 desktop:w-4/5 desktop:pr-5">
            {/* <details className="dark:bg-gray-800">
              <summary className="dark:text-gray-300text-x font-bold">*</summary>
              <div className="ml-6 text-sm flex justify-center">This article can include affiliate links and we receive commission if you upgrade with this link</div>
            </details> */}
            <div className="py-2" dangerouslySetInnerHTML={{ __html: vid.description }} />
            <div className="prose dark:prose-dark dark:text-gray-300 py-10 prose max-w-none" dangerouslySetInnerHTML={{ __html: vid.summary }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SSRComponent;