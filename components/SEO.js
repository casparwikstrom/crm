import Head from 'next/head'
import { useRouter } from 'next/router'
import siteMetadata from '@/data/siteMetadata'
import Script from 'next/script'


const CommonSEO = ({ title, desc, ogType, ogImage, twImage, canonicalUrl, metaData, ...vid }) => {
  const router = useRouter()

  return (

    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={desc} />
      <meta property="og:url" content={`${metaData.siteUrl}${router.asPath}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={metaData.title} />
      <meta property="og:description" content={desc} />
      <meta property="og:title" content={title} />
      {ogImage.constructor.name === 'Array' ? (
        ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={metaData.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={twImage} />
      <link
        rel="canonical"
        href={canonicalUrl ? canonicalUrl : `${metaData.siteUrl}${router.asPath.substring(1)}`}
      />
    </Head>
  )
}

export const PageSEO = ({ title, description, metaData }) => {
  const ogImageUrl = (metaData ? metaData.siteUrl : siteMetadata.siteUrl)  + siteMetadata.socialBanner
  const twImageUrl = (metaData ? metaData.siteUrl : siteMetadata.siteUrl) + siteMetadata.socialBanner
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      twImage={twImageUrl}
      metaData={metaData}
    />
  )
}

export const TagSEO = ({ title, description, metaData }) => {
  const ogImageUrl = metaData.siteUrl + siteMetadata.socialBanner
  const twImageUrl = metaData.siteUrl + siteMetadata.socialBanner
  const router = useRouter()
  return (
    <>
      <CommonSEO
        title={title}
        description={description}
        ogType="website"
        ogImage={ogImageUrl}
        twImage={twImageUrl}
        metaData={metaData}
      />
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`${description} - RSS feed`}
          href={`${metaData.siteUrl}${router.asPath}/feed.xml`}
        />
      </Head>
    </>
  )
}

export const BlogSEO = ({ url, thumbnails, metaData, ...vid }) => {
  const images = thumbnails ?? [siteMetadata.socialBanner];
  let truncSummary = vid?.summary?.length > 150 ? vid?.summary.slice(0, 150) : ""
  let description = vid?.description ?? truncSummary

  const publishedAt = new Date(vid?.created_at).toISOString()

  const modifiedAt = new Date(vid?.updated_at || vid?.created_at).toISOString()
  // let imagesArr =
  //   images?.length === 0
  //     ? [siteMetadata.socialBanner]
  //     : typeof images === 'string'
  //       ? [images]
  //       : images

  let imagesArr;

  if (images && images.length === 0) {
    // If images exist and has a length of 0
    // Set imagesArr to an array with the default banner image
    imagesArr = [siteMetadata.socialBanner];
  } else if (typeof images === 'string') {
    // If images is a string
    // Set imagesArr to an array with that string as its only element
    imagesArr = [images];
  } else {
    // If images is an array with elements
    // Set imagesArr to that array
    imagesArr = images;
  }

  const featuredImages = imagesArr.map((img) => {

    return {
      '@type': 'ImageObject',
      url: img.url.includes('http') ? img.url : metaData.siteUrl + img.url,
    }
  })

  // let authorList
  // if (authorDetails) {
  //   authorList = authorDetails.map((author) => {
  //     return {
  //       '@type': 'Person',
  //       name: author.name,
  //     }
  //   })
  // } else {
  //   authorList = {
  //     '@type': 'Person',
  //     name: siteMetadata.author,
  //   }
  // }
  let authorList = {
    '@type': 'Person',
    name: metaData.author,
  }
  console.log('This is a console log statement.');

  

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: vid.name,
    image: featuredImages,
    datePublished: vid?.created_at,
    dateModified: vid?.updated_at,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: metaData.author,
      logo: {
        '@type': 'ImageObject',
        url: `${metaData.siteUrl}${siteMetadata.siteLogo}`,
      },
    },
    description: description,
  }

  console.log(description)

  const twImageUrl = featuredImages[0].url

  return (
    <>
      <CommonSEO
        title={vid?.name}
        desc={description}
        ogType="article"
        ogImage={featuredImages}
        twImage={twImageUrl}
        metaData={metaData}
      />
      <Head>
        {vid?.created_at && <meta property="article:published_time" content={publishedAt} />}
        {vid?.updated_at && <meta property="article:modified_time" content={modifiedAt} />}
      </Head>
      <Script
        id="seo-script"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 2),
        }}
      />
    </>
  )
}
