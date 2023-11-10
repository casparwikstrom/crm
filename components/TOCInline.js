/**
 * @typedef TocHeading
 * @prop {string} value
 * @prop {number} depth
 * @prop {string} url
 */

/**
 * Generates an inline table of contents
 * Exclude titles matching this string (new RegExp('^(' + string + ')$', 'i')).
 * If an array is passed the array gets joined with a pipe (new RegExp('^(' + array.join('|') + ')$', 'i')).
 *
 * @param {{
 *  toc: TocHeading[],
 *  indentDepth?: number,
 *  fromHeading?: number,
 *  toHeading?: number,
 *  asDisclosure?: boolean,
 *  exclude?: string|string[]
 * }} props
 *
 */
const TOCInline = ({
  toc,
  indentDepth = 3,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = true,
  exclude = '',
}) => {
  const re = Array.isArray(exclude)
    ? new RegExp('^(' + exclude.join('|') + ')$', 'i')
    : new RegExp('^(' + exclude + ')$', 'i')

  const filteredToc = toc.filter(
    
    (heading) =>
      heading.depth >= fromHeading && heading.depth <= toHeading && !re.test(heading.value)
  )

  const tocList = (
    <ul>
      {filteredToc.map((heading) => {
        return (
          <li key={heading.value} className={`${heading.depth >= indentDepth && 'ml-6'}`}>
            <a className="text-primary-500" href={heading.url}>{heading.value}</a>
          </li>
        )
      })}
    </ul>
  )

  return (
    <>
      {asDisclosure ? (
        <div className="prose max-w-none">
          <details open className="dark:bg-gray-800">
            <summary className="dark:text-gray-300 ml-6 pt-2 pb-2 text-x font-bold">Innehåll</summary>
            <div className="ml-6">{tocList}</div>
          </details>
        </div>
        
      ) : (
        tocList
      )}
    </>
  )
}

export default TOCInline
