import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

export default function Tag({ text }) {

  return (
      <Link href={{
        pathname: `/blogs`,
        query: {
          tags: text, // pass the id 
        },
      }}
      as={`/blogs?tags=${text}`}
      >
      <a className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}


