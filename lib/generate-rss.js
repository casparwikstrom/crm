import he from 'he'
import siteMetadata from '@/data/siteMetadata'
const site = siteMetadata

const generateRssItem = (vid) => {
  console.log('vid', site)
  
  return `
  <item>
    <guid>${site.siteUrl}/blog/${vid.slug}</guid>
    <title>${(vid.title)}</title>
    <link>${site.siteUrl}/blog/${vid.slug}</link>
    ${vid.summary && `<description>${(vid.summary)}</description>`}
    <pubDate>${new Date(vid.date).toUTCString()}</pubDate>
    <author>${site.email} (${site.author})</author>
    ${vid.tags && vid.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`
}

const generateRss = (vids, page = 'feed.xml') => {
  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${(site.title)}</title>
      <link>${site.siteUrl}/blog</link>
      <description>${(site.summary)}</description>
      <language>${site.language}</language>
      <managingEditor>${site.email} (${site.author})</managingEditor>
      <webMaster>${site.email} (${site.author})</webMaster>
      <lastBuildDate>${new Date(vids[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${site.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${vids.map(generateRssItem).join('')}
    </channel>
  </rss>
`
}
export default generateRss
