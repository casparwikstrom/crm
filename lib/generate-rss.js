import he from 'he'
import siteMetadata from '@/data/siteMetadata'

const site = siteMetadata

const generateRssItem = (vid) => `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${vid.slug}</guid>
    <title>${(vid.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${vid.slug}</link>
    ${vid.summary && `<description>${(vid.summary)}</description>`}
    <pubDate>${new Date(vid.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    
  </item>
`

const generateRss = (vids, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${(siteMetadata.name)}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${(siteMetadata.summary)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(vids[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      
    </channel>
  </rss>
`
export default generateRss
