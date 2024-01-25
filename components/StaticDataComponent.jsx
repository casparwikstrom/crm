// components/StaticDataComponent.jsx
import { BlogSEO } from '@/components/SEO';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';



function StaticDataComponent({ vid, metaData }) {
  if (!vid) {
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

export default StaticDataComponent;

