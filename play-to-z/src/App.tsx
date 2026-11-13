import { lazy, Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ServicesPage from './pages/ServicesPage'
import CancellationPolicyPage from './pages/CancellationPolicyPage'
import bannerImage from './assets/Play to Z Dog Training banner v2(2).png'
import pawFavicon from './assets/Play to Z Dog Training favicon.jpg'
import fullLogo from './assets/Play to Z Dog Training logo_full colour_RGB.png'
import pageMetadata from './seo-pages.json'
import { trackAnalyticsEvent } from './analytics'
import './App.css'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

const DevelopmentBlogPage = import.meta.env.DEV
  ? lazy(() => import('./pages/BlogPage'))
  : null

function DevelopmentBlogRoute() {
  if (!DevelopmentBlogPage) return null

  return (
    <Suspense fallback={null}>
      <DevelopmentBlogPage />
    </Suspense>
  )
}

function SiteHeader({ items }: { items: typeof navigation }) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`site-header${isHome ? ' site-header-home' : ''}`}>
      {isHome && (
        <Link className="home-banner" to="/" aria-label="Play To Z Dog Training home">
          <img src={bannerImage} alt="Play To Z Dog Training. Helping dogs and their people learn through play." />
        </Link>
      )}
      <div className="site-header-row">
        {!isHome && (
          <Link className="brand" to="/" aria-label="PlayToZ Dog Training home">
            <img src={fullLogo} alt="" />
          </Link>
        )}
        <nav id="main-navigation" className={`main-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? 'nav-link is-active' : 'nav-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <Link className="header-cta" to="/contact">
          Get in touch <img src={pawFavicon} alt="" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          title={menuOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <img src={pawFavicon} alt="" />
        </button>
      </div>
    </header>
  )
}

function SiteFooter({ items }: { items: typeof navigation }) {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" to="/" aria-label="PlayToZ Dog Training home">
        <img src={fullLogo} alt="" />
      </Link>
      <p>Good days are built together.</p>
      <nav aria-label="Footer navigation">
        {items
          .filter((item) => item.to !== '/faq')
          .map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
      </nav>
      <p className="footer-legal">
        <Link to="/cancellation-policy">Cancellation &amp; Rescheduling Policy</Link>
      </p>
    </footer>
  )
}

function PageMetadata() {
  const { pathname, search, hash } = useLocation()
  const route = pathname.replace(/\/+$/, '') || '/'
  const metadata = pageMetadata[route as keyof typeof pageMetadata]

  useEffect(() => {
    const pageTitle = metadata?.title ?? 'Page not found | Play to Z Dog Training'
    const pageDescription = metadata?.description ?? 'The page you requested could not be found.'
    const canonicalUrl = metadata
      ? `https://playtozdogtraining.com.au${route === '/' ? '/' : route}`
      : undefined
    const socialImage = 'https://playtozdogtraining.com.au/social-preview.jpg'
    const socialImageAlt = 'Play to Z Dog Training in Werribee, Victoria, with the trainer and her two dogs.'

    document.title = pageTitle

    const setMetaContent = (selector: string, attribute: 'name' | 'property', content?: string) => {
      let tag = document.querySelector<HTMLMetaElement>(selector)
      if (!content) {
        tag?.remove()
        return
      }
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, selector.match(/["']([^"']+)["']/)?.[1] ?? '')
        document.head.append(tag)
      }
      tag.content = content
    }

    setMetaContent('meta[name="description"]', 'name', pageDescription)
    setMetaContent('meta[name="robots"]', 'name', metadata ? 'index,follow' : 'noindex,follow')
    setMetaContent('meta[property="og:type"]', 'property', 'website')
    setMetaContent('meta[property="og:site_name"]', 'property', 'Play to Z Dog Training')
    setMetaContent('meta[property="og:locale"]', 'property', 'en_AU')
    setMetaContent('meta[property="og:title"]', 'property', pageTitle)
    setMetaContent('meta[property="og:description"]', 'property', pageDescription)
    setMetaContent('meta[property="og:url"]', 'property', canonicalUrl)
    setMetaContent('meta[property="og:image"]', 'property', socialImage)
    setMetaContent('meta[property="og:image:width"]', 'property', '1200')
    setMetaContent('meta[property="og:image:height"]', 'property', '630')
    setMetaContent('meta[property="og:image:alt"]', 'property', socialImageAlt)
    setMetaContent('meta[name="twitter:card"]', 'name', 'summary_large_image')
    setMetaContent('meta[name="twitter:title"]', 'name', pageTitle)
    setMetaContent('meta[name="twitter:description"]', 'name', pageDescription)
    setMetaContent('meta[name="twitter:image"]', 'name', socialImage)
    setMetaContent('meta[name="twitter:image:alt"]', 'name', socialImageAlt)

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.append(canonical)
      }
      canonical.href = canonicalUrl
    } else {
      canonical?.remove()
    }

    trackAnalyticsEvent('page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${pathname}${search}${hash}`,
    })
  }, [hash, metadata, pathname, route, search])

  return null
}

export function AppLayout({ includeDevelopmentBlog = import.meta.env.DEV }: { includeDevelopmentBlog?: boolean }) {
  const items = includeDevelopmentBlog
    ? [...navigation.slice(0, 3), { label: 'Blog', to: '/blog' }, ...navigation.slice(3)]
    : navigation

  return (
    <>
      <PageMetadata />
      <SiteHeader items={items} />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
          {includeDevelopmentBlog && (
            <Route
              path="/blog"
              element={<DevelopmentBlogRoute />}
            />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter items={items} />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
