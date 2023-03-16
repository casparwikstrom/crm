

import siteMetadata from '@/data/siteMetadata'



const generateRssItem = (vid) => {
  return `
    <item>
      
    </item>
  `
}

const generateRss = (videos, page = 'feed.xml') => {
  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    
  </rss>
`
}
export default generateRss
