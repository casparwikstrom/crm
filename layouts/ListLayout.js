import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { useState } from 'react'
import Pagination from '@/components/Pagination'
import formatDate from '@/lib/utils/formatDate'
import Image from '../components/Image'

export default function ListLayout({ videos, title, initialDisplayVideos = [], pagination }) {
  const [searchValue, setSearchValue] = useState('')

  const filteredBlogVideos = videos.filter((frontMatter) => {
    const searchContent = frontMatter.name + frontMatter.url
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })
  
  // If initialDisplayVideos exist, display it if no searchValue is specified
  const displayVideos =
    initialDisplayVideos.length > 0 && !searchValue ? initialDisplayVideos : filteredBlogVideos

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl">
            {title}
          </h1>
          <div className="relative max-w-lg">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <ul>
          {!filteredBlogVideos.length && 'No Videos found.'}
          {displayVideos.map((singel_video) => {
            const tags = singel_video?.keywords.slice(1, 10)
            const thumbnails = singel_video?.video_info?.thumbnail?.thumbnails ? singel_video?.video_info?.thumbnail?.thumbnails : singel_video?.video_info?.videoDetails?.thumbnail?.thumbnails
            return (
              <li key={singel_video?.id} className="py-4">
                <article className="xl:grid xl:grid-cols-4  xl:space-y-0">
                  <dl className="mx-3">
                    <Link href={`/${singel_video.slug}`} aria-label={`Link to ${singel_video?.name}`}>
                      {thumbnails ? (<Image
                        alt={singel_video?.name}
                        src={thumbnails[1]?.url}
                        className="object-cover object-center md:h-36 lg:h-48"
                        width={544}
                        height={306}
                      />)
                        : <Image
                          alt={singel_video?.name}
                          src={siteMetadata.socialBanner.url}
                          className="object-cover object-center md:h-36 lg:h-48"
                          width={544}
                          height={306}
                        />}

                    </Link>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      Published on: <br />{' '}
                      <time dateTime={singel_video.created_at}>{formatDate(singel_video.created_at)}</time>
                    </dd>
                  </dl>
                  <div className="space-y-3 xl:col-span-3">
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight">
                        <Link
                          href={`/${singel_video.slug}`}
                          className="text-gray-900 dark:text-gray-100"
                        >
                          {singel_video?.name}
                        </Link>
                      </h3>
                      <div className="flex flex-wrap h-full">
                        {tags.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div>
                      {(singel_video?.description ? singel_video?.description : "")}

                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
      {pagination && pagination.totalPages > 1 && !searchValue && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </>
  )
}
