/* eslint-disable jsx-a11y/anchor-has-content */
import Link from 'next/link'
import { useRouter } from 'next/router';

const CustomLink = ({ href, ...rest }) => {
  const router = useRouter();
  const { locale } = router;
  const isInternalLink = href && href.startsWith('/');
  const isAnchorLink = href && href.startsWith('#');

  if (isInternalLink) {
    return (
      <Link href={href} locale={locale !== 'sv' ? locale : undefined}>
        <a {...rest} />
      </Link>
    )
  }

  

  if (isAnchorLink) {
    return <a href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink
