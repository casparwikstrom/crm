const fs = require('fs')
const globby = require('globby')
const matter = require('gray-matter')
const prettier = require('prettier')

const siteMetadata = require('../data/siteMetadata')


const domain = process.env.DOMAIN_URL
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
            .replace('/en', '')
          const route = path === '/index' ? '' : path
          let dom = '';
          switch (domain) {
            case "docu":
              dom = "https://www.ydocu.com";
              break;
            case "money":
              dom = "https://www.thecashclinic.com";
              break;
            case "travel":
              dom = "https://www.freetipsfortravel.com";
              break;
            case "diy":
              dom = "https://www.diyman.info";
              break;
            case "chatgpt":
              dom = "https://www.aiwizardz.com";
              break;
          }
          
          return `
            <url>
              <loc>${dom}${route}</loc>
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
