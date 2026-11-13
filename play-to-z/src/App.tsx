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
import './App.css'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  ...(import.meta.env.DEV ? [{ label: 'Blog', to: '/blog' }] : []),
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

function SiteHeader() {
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
          {navigation.map((item) => (
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

function SiteFooter() {
  return (
    <footer className="site-footer">
      <Link className="footer-brand" to="/" aria-label="PlayToZ Dog Training home">
        <img src={fullLogo} alt="" />
      </Link>
      <p>Good days are built together.</p>
      <nav aria-label="Footer navigation">
        {navigation
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
    document.title = metadata?.title ?? 'Page not found | Play to Z Dog Training'

    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.append(description)
    }
    description.content = metadata?.description ?? 'The page you requested could not be found.'

    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      document.head.append(robots)
    }
    robots.content = metadata ? 'index,follow' : 'noindex,follow'

    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (metadata) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.append(canonical)
      }
      canonical.href = `https://playtozdogtraining.com.au${route === '/' ? '/' : route}`
    } else {
      canonical?.remove()
    }

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: `${pathname}${search}${hash}`,
      })
    }
  }, [hash, metadata, pathname, route, search])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <PageMetadata />
      <SiteHeader />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
          {import.meta.env.DEV && (
            <Route
              path="/blog"
              element={<DevelopmentBlogRoute />}
            />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </BrowserRouter>
  )
}

export default App
