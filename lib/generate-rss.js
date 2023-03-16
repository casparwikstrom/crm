import he from 'he'
import siteMetadata from '@/data/siteMetadata'
const site = siteMetadata

const generateRssItem = (vid) => {

  return `
  <item>
    <guid>${he.encode(site.siteUrl)}/blog/${vid.slug}</guid>
    <title>${(vid.title)}</title>
    <link>${he.encode(site.siteUrl)}/blog/${vid.slug}</link>
    ${vid.summary && `<description>${(vid.summary)}</description>`}
    <pubDate>${new Date(vid.date).toUTCString()}</pubDate>
    <author>${he.encode(site.email)} (${he.encode(site.author)})</author>
    ${vid.tags && vid.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`
}

const generateRss = (vids, page = 'feed.xml') => {
  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${he.encode(site.title)}</title>
      <link>${he.encode(site.siteUrl)}/blog</link>
      <description>${he.encode(site.description)}</description>
      <language>${he.encode(site.language)}</language>
      <managingEditor>${he.encode(site.email)} (${he.encode(site.author)})</managingEditor>
      <webMaster>${he.encode(site.email)} (${he.encode(site.author)})</webMaster>
      <lastBuildDate>${new Date(vids[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${he.encode(site.siteUrl)}/${page}" rel="self" type="application/rss+xml"/>
      ${vids.map(generateRssItem).join('')}
    </channel>
  </rss>
`
}
export default generateRss
