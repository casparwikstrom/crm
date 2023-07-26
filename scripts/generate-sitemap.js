const fs = require('fs')
const globby = require('globby')
const matter = require('gray-matter')
const prettier = require('prettier')

const siteMetadata = require('../data/siteMetadata')


let domain = process.env.DOMAIN_URL
console.log('domain', domain)
  ;(async () => {
    const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
    const pages = await globby([
      'pages/*.js',
      'pages/*.tsx',
      'data/blog/**/*.mdx',
      'data/blog/**/*.md',
      'public/tags/**/*.xml',
      '.next/server/pages/**/videos/*.html', // Add this line to include the generated pages
      '!pages/_*.js',
      '!pages/_*.tsx',
      '!pages/api',
    ])

    const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          // ... (Existing code)
          debugger
          // Check if the current page is a video page
          if (page.includes('pages/videos/') && fs.existsSync(page)) {
            const source = fs.readFileSync(page, 'utf8')
            const fm = matter(source)
            if (fm.data.draft) {
              return
            }
            if (fm.data.canonicalUrl) {
              return
            }

            // Extract the slug from the path (assuming video page paths are like 'pages/videos/slug.js')
            const slug = page.split('pages/videos/')[1].replace('.js', '')

            // Construct the URL for video pages
            const videoUrl = `/videos/${slug}`

            // ... (Existing code)

            // Return the sitemap entry for video pages
            return `
              <url>
                <loc>${siteMetadata.siteUrl}${videoUrl}</loc>
              </url>
            `
          }
          

          const path = page
            .replace('pages/', '/')
            .replace('data/blog', '/blog')
            .replace('public/', '/')
            .replace('.js', '')
            .replace('.tsx', '')
            .replace('.mdx', '')
            .replace('.html', '')
            .replace('.md', '')
            .replace('.next/server/', '')
            .replace('/feed.xml', '')
          const route = path === '/index' ? '' : path
          switch (domain) {
            case "docu":
              domain = "https://www.ydocu.com/";
            case "money":
              domain = "https://www.cashclinic.com/";
            case "site3":
              domain = "https://www.example-site3.com/";
            // Add more cases for each of your sites
            default:
              // If the value of domainAIN_URL doesn't match any of the cases, you can set a default URL
              domain = "https://www.default-site.com/";
          };
          
          return `
            <url>
              <loc>${domain}${route}</loc>
            </url>
          `
        })
        .join('')}
    </urlset>
  `

    const formatted = prettier.format(sitemap, {
      ...prettierConfig,
      parser: 'html',
    })

    // eslint-disable-next-line no-sync
    fs.writeFileSync('public/sitemap.xml', formatted)
  })()
