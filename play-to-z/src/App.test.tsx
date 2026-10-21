import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import App from './App'

const routes = [
  { path: '/', heading: /More connection.*Less guesswork/ },
  { path: '/about', heading: /A little more about.*person behind the leash/ },
  { path: '/services', heading: /Practical support for everyday life/ },
  { path: '/contact', heading: /Good things start.*a hello/ },
  { path: '/blog', heading: /Notes for life/ },
]

afterEach(() => {
  cleanup()
  window.history.replaceState(null, '', '/')
})

describe.each(routes)('$path route', ({ path, heading }) => {
  it('loads its page content', async () => {
    window.history.pushState(null, '', path)
    render(<App />)

    expect(await screen.findByRole('heading', { name: heading })).toBeTruthy()
  })
})