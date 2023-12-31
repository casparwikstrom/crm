import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import LanguageSwitcher from './LanguageSwitcher'

const LayoutWrapper = ({ children, metaData }) => {
  return (
    <SectionContainer className="max-w-none">
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between">
          <div>
            <Link href="/" aria-label={metaData.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof metaData.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {metaData.headerTitle}
                  </div>
                ) : (
                    metaData.headerTitle
                )}
              </div>
            </Link>
          </div>
          
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              <LanguageSwitcher className=""/>
            </div>
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="max-w-none">{children}</main>
        <Footer metaData={metaData} />
      </div>
    </SectionContainer>
  )
}
export default LayoutWrapper
