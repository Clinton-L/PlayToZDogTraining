import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'About me', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="PlayToZ Dog Training home">
        <span className="brand-name">PlayToZ</span>
        <span className="brand-caption">DOG TRAINING</span>
      </Link>
      <nav className="main-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              isActive ? 'nav-link is-active' : 'nav-link'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Link className="header-cta" to="/contact">
        Let’s talk <span aria-hidden="true">↗</span>
      </Link>
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
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </BrowserRouter>
  )
}

export default App
