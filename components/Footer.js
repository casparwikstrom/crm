import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer(metaData) {
  let siteData = metaData.metaData;
  return (
    <footer>
      <details className="dark:bg-gray-800 ">
        <summary className="dark:text-gray-300text-x font-bold">*</summary>
        <div className="ml-6 text-sm flex justify-center">This article can include affiliate links and we receive commission if you upgrade with this link</div>
      </details>
      <div className="flex flex-row justify-around items-center">
        {/* <div className="mb-3 flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size="6" />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size="6" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="6" />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size="6" />
        </div> */}

        <nav aria-label="Footer links" className="flex space-x-4">

          <div className="mb-3 flex space-x-4">
            <ul>
              <li><a itemprop="url" href="/companies">Companies</a></li>
              <li><a itemprop="url" href="/taxes">Räkna Ut Skatt på Lön</a></li>
              <li><a itemprop="url" href="/blogs">Blogg</a></li>
            </ul>
          </div>

          <div className="mb-3 flex space-x-4">
            <ul>
              <li><a itemprop="url" href="/about">About Us</a></li>
            </ul>
          </div>

          <div className="mb-3 flex space-x-4">
            <ul>
              <li><a itemprop="url" href="/about">About Us</a></li>
            </ul>
          </div>

          <div className="mb-3 flex space-x-4">
            <ul>
              <li><a itemprop="url" href="/about">About Us</a></li>
              {/* <li><a itemprop="url" href="/privacy-policy">Privacy Policy</a></li>
              <li><a itemprop="url" href="/terms">Terms of Service</a></li> */}
            </ul>
          </div>
        </nav>

      </div>
      <div className="mb-2 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <div itemprop="about" itemScope itemType="http://schema.org/Organization">
          <p itemprop="name">Crm Review</p>
        </div>
        <div>{metaData.author}</div>
        <div>{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
        <div>{` • `}</div>
        <Link href="/">{metaData.title}</Link>
      </div>
    </footer>
  )
}
