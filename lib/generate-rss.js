

import siteMetadata from '@/data/siteMetadata'



const generateRssItem = (vid) => `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${vid.slug}</guid>
    <title>${(vid?.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${vid.slug}</link>
    ${vid.summary && `<description>${(vid.summary)}</description>`}
    <pubDate>${new Date(vid.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${vid.tags && vid.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (videos, page = 'feed.xml') => {
  console.log(siteMetadata)
  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${(siteMetadata.summary)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(videos[0].created_at).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${videos.map(generateRssItem).join('')}
    </channel>
  </rss>
`
}
export default generateRss
