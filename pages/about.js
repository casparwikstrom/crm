import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { getFileBySlug } from '@/lib/mdx'

const DEFAULT_LAYOUT = 'AuthorLayout'

export async function getStaticProps() {
  const authorDetails = await getFileBySlug('authors', ['default'])
  return { props: { authorDetails } }
}

export default function About({ authorDetails, metaData }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <div>Author</div>
    // <MDXLayoutRenderer
    //   layout={frontMatter.layout || DEFAULT_LAYOUT}
    //   mdxSource={mdxSource}
    //   frontMatter={frontMatter}
    //   metaData={metaData}
    // />
  )
}
