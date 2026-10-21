import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ServicesPage from './pages/ServicesPage'
import bannerImage from './assets/Play to Z Dog Training banner v2(2).png'
import pawFavicon from './assets/Play to Z Dog Training favicon.jpg'
import './App.css'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  ...(import.meta.env.DEV ? [{ label: 'Blog', to: '/blog' }] : []),
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
            <span className="brand-name">PlayToZ</span>
            <span className="brand-caption">DOG TRAINING</span>
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
      <Link className="footer-brand" to="/">PlayToZ <span>Dog Training</span></Link>
      <p>Good days are built together.</p>
      <nav aria-label="Footer navigation">
        {navigation.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
      </nav>
    </footer>
  )
}

function App() {
  return (
    <BrowserRouter>
      <SiteHeader />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
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
