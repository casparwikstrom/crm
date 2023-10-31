const fs = require('fs');
const globby = require('globby');
const matter = require('gray-matter');
const prettier = require('prettier');

const siteMetadata = require('../data/siteMetadata');

const domain = process.env.DOMAIN_URL;
const languages = ['en', 'ru', 'fr', 'es', 'ro', 'hi', 'ar', 'pt', 'de'];

(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/*.js',
    'pages/*.tsx',
    '.next/server/pages/en/videos/*.html',
    '!pages/_*.js',
    '!pages/_*.tsx',
    '!pages/api',
    '!pages/404.js',  // Exclude the 404 page
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${pages
      .map((page) => {
        const path = page
          .replace('pages/', '/')
          .replace('public/', '/')
          .replace('.js', '')
          .replace('.tsx', '')
          .replace('.mdx', '')
          .replace('.html', '')
          .replace('.md', '')
          .replace('.next/server/', '')
          .replace('/feed.xml', '')
          .replace('/en', '');
          console.log(path)

        const route = path === '/index' ? '' : path;

        let dom = '';
        switch (domain) {
          case 'docu':
            dom = 'https://www.ydocu.com';
            break;
          case 'money':
            dom = 'https://www.thecashclinic.com';
            break;
          case 'travel':
            dom = 'https://www.freetipsfortravel.com';
            break;
          case 'diy':
            dom = 'https://www.technoab.com';
            break;
          case 'chatgpt':
            dom = 'https://www.aiwizardz.com';
            break;
          case 'crm':
            dom = 'https://crmproductreview.com';
            break;
        }
        const cleanedRoute = route.startsWith('/videos') ? route.replace('/videos', '') : route;

        return `
            <url>
              <loc>${dom}${route}</loc>
              ${languages
            .map((lang) => {
              console.log(cleanedRoute)
              if (lang === 'en') {
                return `<xhtml:link rel="alternate" hreflang="${lang}" href="${dom}${cleanedRoute}" />`;
              } else {
                return `<xhtml:link rel="alternate" hreflang="${lang}" href="${dom}/${lang}${cleanedRoute}" />`;
              }
            })
            .join('')}
            <xhtml:link rel="alternate" hreflang="x-default" href="${dom}${cleanedRoute}" />
            </url>
          `;
      })
      .join('')}
    </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  });

  fs.writeFileSync('public/sitemap.xml', formatted);
})();
