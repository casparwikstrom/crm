import { escape } from '@/lib/utils/htmlEscaper'

import siteMetadata from '@/data/siteMetadata'

const generateRssItem = (vid) => `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${vid.slug}</guid>
    <title>${escape(vid.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${vid.slug}</link>
    ${vid.summary && `<description>${escape(vid.summary)}</description>`}
    <pubDate>${new Date(vid.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
    ${vid.tags && vid.tags.map((t) => `<category>${t}</category>`).join('')}
  </item>
`

const generateRss = (vids, page = 'feed.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.name)}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${escape(siteMetadata.summary)}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(vids[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${vids.map(generateRssItem).join('')}
    </channel>
  </rss>
`
export default generateRss
