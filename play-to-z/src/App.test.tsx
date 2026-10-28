import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'
import { services } from './pages/services'
import indexHtml from '../index.html?raw'

const routes = [
  { path: '/', heading: /More connection.*Less guesswork/ },
  { path: '/about', heading: /A little more about.*person behind the leash/ },
  { path: '/services', heading: /We're helping you raise a/ },
  { path: '/contact', heading: /Good things start.*a hello/ },
  { path: '/faq', heading: /Frequently asked questions/ },
  { path: '/cancellation-policy', heading: /Play to Z.*Cancellation.*Rescheduling Policy/ },
  { path: '/blog', heading: /Notes for life/ },
]

afterEach(() => {
  cleanup()
  window.history.replaceState(null, '', '/')
})

it('embeds the Google tag in the document head after the meta tags', () => {
  const head = indexHtml.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? ''
  const tagLoader = head.indexOf('https://www.googletagmanager.com/gtm.js?id=G-BGL5BKJ789')
  const charsetMeta = head.indexOf('<meta charset=')
  const viewportMeta = head.indexOf('<meta name="viewport"')
  const inlineTag = head.indexOf('function gtag(){dataLayer.push(arguments);}')

  expect(charsetMeta).toBeGreaterThanOrEqual(0)
  expect(viewportMeta).toBeGreaterThan(charsetMeta)
  expect(tagLoader).toBeGreaterThan(viewportMeta)
  expect(inlineTag).toBeGreaterThan(tagLoader)
  expect(head).toContain("gtag('js', new Date());")
})

describe.each(routes)('$path route', ({ path, heading }) => {
  it('loads its page content', async () => {
    window.history.pushState(null, '', path)
    render(<App />)

    expect(await screen.findByRole('heading', { name: heading })).toBeTruthy()
  })
})

it('shows service pricing and the in-home travel fees', () => {
  window.history.pushState(null, '', '/services')
  const { container } = render(<App />)

  expect(screen.getByText(/^\$495/)).toBeTruthy()
  expect(screen.getByRole('img', {
    name: 'Hawk, Kelpie cross playing on his bed with a toy in his mouth, looking up at the camera',
  }).getAttribute('src')).toContain('PuppyServices-card')
  expect(screen.getByText('$145 (1 x 90 minute session)')).toBeTruthy()
  expect(screen.getByRole('heading', { name: 'In-home sessions & travel' })).toBeTruthy()
  expect(screen.getByText('Within 10 km')).toBeTruthy()
  expect(screen.getByText(/\$15 per appointment/)).toBeTruthy()
  expect(Array.from(container.querySelectorAll('.service-keyword'), (word) => word.textContent)).toEqual([
    ...services.filter((service) => service.display).map((service) => service.title.split(' ')[0]),
  ])
  expect(container.querySelectorAll('.service-card')).toHaveLength(services.filter((service) => service.display).length)
  for (const service of services.filter((item) => item.display)) {
    expect(screen.getByRole('img', { name: service.imageAlt }).getAttribute('style')).toContain(
      `object-position: ${service.imagePosition ?? 'center'}`,
    )
  }
})

it('hides services whose display flag is false', () => {
  const service = services[0]
  service.display = false

  try {
    window.history.pushState(null, '', '/services')
    render(<App />)

    expect(screen.queryByRole('heading', { name: /Begin - Puppy Foundations/ })).toBeNull()
    expect(screen.getByRole('heading', { name: /Learn - Initial Consultation/ })).toBeTruthy()
  } finally {
    service.display = true
  }
})

it('uses the logo as the footer home link without changing footer navigation', () => {
  const { container } = render(<App />)
  const footerBrand = container.querySelector('.site-footer .footer-brand')
  const logo = footerBrand?.querySelector('img')

  expect(footerBrand?.getAttribute('href')).toBe('/')
  expect(footerBrand?.getAttribute('aria-label')).toBe('PlayToZ Dog Training home')
  expect(logo?.getAttribute('alt')).toBe('')
  expect(container.querySelectorAll('.site-footer nav a')).toHaveLength(5)
  expect(screen.getByRole('navigation', { name: 'Main navigation' }).querySelector('a[href="/faq"]')?.textContent).toBe('FAQ')
  expect(container.querySelector('.site-footer nav a[href="/faq"]')).toBeNull()
  expect(screen.queryByRole('link', { name: 'Frequently asked questions' })).toBeNull()
  expect(screen.getByRole('link', { name: 'Cancellation & Rescheduling Policy' }).getAttribute('href')).toBe('/cancellation-policy')
})

it('shows all FAQ answers as accessible, initially collapsed disclosures', () => {
  window.history.pushState(null, '', '/faq')
  const { container } = render(<App />)

  const items = Array.from(container.querySelectorAll('.faq-item'))
  expect(items).toHaveLength(9)
  expect(items.every((item) => !item.hasAttribute('open'))).toBe(true)
  expect(screen.getByText('Within 10 km')).toBeTruthy()
  expect(screen.getByText('Quoted individually before booking')).toBeTruthy()
  expect(container.querySelector('.faq-item:last-child .faq-answer a')?.getAttribute('href')).toBe('/cancellation-policy')
})

it('presents the complete cancellation policy and a contact path', () => {
  window.history.pushState(null, '', '/cancellation-policy')
  const { container } = render(<App />)

  expect(screen.getByRole('heading', { name: 'Client cancellations and rescheduling' })).toBeTruthy()
  expect(screen.getByRole('heading', { name: 'Illness, emergencies and unexpected circumstances' })).toBeTruthy()
  expect(screen.getByText(/full session fee may be charged/)).toBeTruthy()
  expect(screen.getByText(/Any fees will be applied in accordance with applicable consumer rights/)).toBeTruthy()
  expect(container.querySelector('.policy-content .text-link')?.getAttribute('href')).toBe('/contact')
})

it('uses the logo as the header home link without changing header navigation', () => {
  window.history.pushState(null, '', '/about')
  const { container } = render(<App />)
  const headerBrand = container.querySelector('.site-header .brand')
  const logo = headerBrand?.querySelector('img')

  expect(headerBrand?.getAttribute('href')).toBe('/')
  expect(headerBrand?.getAttribute('aria-label')).toBe('PlayToZ Dog Training home')
  expect(logo?.getAttribute('alt')).toBe('')
  expect(container.querySelectorAll('.site-header nav .nav-link')).toHaveLength(6)
})

it('uses the on-duty photo in the first About story and preserves the other story image placements', () => {
  window.history.pushState(null, '', '/about')
  const { container } = render(<App />)
  const stories = Array.from(container.querySelectorAll('.about-story'))

  expect(stories).toHaveLength(4)
  expect(stories.map((story) => story.classList.contains('about-story-reversed'))).toEqual([
    false,
    true,
    false,
    true,
  ])
  expect(stories.map((story) =>
    ['about-story-banjo', 'about-story-graduation', 'about-story-koala']
      .find((storyClass) => story.classList.contains(storyClass)) ?? null,
  )).toEqual([null, 'about-story-banjo', 'about-story-graduation', 'about-story-koala'])
  expect(stories.slice(1).map((story) =>
    Array.from(story.querySelector('.about-photo')?.classList ?? [])
      .find((imageClass) => ['about-photo-banjo', 'about-photo-graduation', 'about-photo-koala'].includes(imageClass)) ?? null,
  )).toEqual(['about-photo-banjo', 'about-photo-graduation', 'about-photo-koala'])
  const firstImage = stories[0].querySelector('img.about-photo')
  expect(firstImage?.getAttribute('src')).toContain('KelsHawkOnDuty-about')
  expect(firstImage?.getAttribute('alt')).toBe('Kelsey with Hawk, a scent-detection dog in training')
  expect(stories.slice(1).every((story) => story.querySelector('.about-photo')?.getAttribute('aria-hidden') === 'true')).toBe(true)
  expect(stories[0].querySelectorAll('.story-copy ul li')).toHaveLength(3)
})