import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'
import { MemoryRouter } from 'react-router-dom'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = resolve(projectRoot, 'dist')
const metadata = JSON.parse(await readFile(resolve(projectRoot, 'src/seo-pages.json'), 'utf8'))
const template = await readFile(resolve(distRoot, 'index.html'), 'utf8')
const assetFiles = await readdir(resolve(distRoot, 'assets'))
const sourceAssetFiles = await readdir(resolve(projectRoot, 'src/assets'))
const builtAssetBySource = new Map(
  sourceAssetFiles
    .map((sourceFile) => {
      const extension = sourceFile.slice(sourceFile.lastIndexOf('.'))
      const sourceName = sourceFile.slice(0, -extension.length)
      const outputFile = assetFiles.find((file) => file.startsWith(`${sourceName}-`) && file.endsWith(extension))
      return outputFile ? [sourceFile, `/assets/${outputFile}`] : null
    })
    .filter(Boolean),
)

const vite = await createServer({
  configFile: resolve(projectRoot, 'vite.config.ts'),
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
})

let AppLayout
try {
  const appModule = await vite.ssrLoadModule('/src/App.tsx')
  AppLayout = appModule.AppLayout
} finally {
  await vite.close()
}

function renderRoute(route) {
  let markup = renderToString(createElement(
    MemoryRouter,
    { initialEntries: [route] },
    createElement(AppLayout, { includeDevelopmentBlog: false }),
  ))

  for (const [sourceFile, outputUrl] of builtAssetBySource) {
    const encodedSource = encodeURIComponent(sourceFile)
    const encodedOutputUrl = outputUrl.replaceAll(' ', '%20')
    markup = markup
      .replaceAll(`/src/assets/${sourceFile}`, encodedOutputUrl)
      .replaceAll(`/src/assets/${encodedSource}`, encodedOutputUrl)
  }

  const preloadLinks = markup.match(/<link rel="preload"[^>]*\/>/g) ?? []
  markup = markup.replace(/<link rel="preload"[^>]*\/>/g, '')
  if (!markup.includes('<main id="main-content">')) {
    throw new Error(`Could not prerender page content for ${route}`)
  }

  return { markup, preloadLinks }
}

function escapeAttribute(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function replaceRequired(html, pattern, replacement, route, element) {
  if (!pattern.test(html)) {
    throw new Error(`Could not find ${element} in the HTML template for ${route}`)
  }
  return html.replace(pattern, replacement)
}

for (const [route, page] of Object.entries(metadata)) {
  if (!route.startsWith('/') || route.includes('..')) {
    throw new Error(`Invalid static page route: ${route}`)
  }

  const outputPath = route === '/'
    ? resolve(distRoot, 'index.html')
    : resolve(distRoot, route.slice(1), 'index.html')
  const canonicalPath = route === '/' ? '/' : route
  let html = replaceRequired(
    template,
    /<title>[^<]*<\/title>/,
    `<title>${escapeAttribute(page.title)}</title>`,
    route,
    'title',
  )
  html = replaceRequired(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeAttribute(page.description)}" />`,
    route,
    'description',
  )
  html = replaceRequired(
    html,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="https://playtozdogtraining.com.au${canonicalPath}" />`,
    route,
    'canonical link',
  )
  html = replaceRequired(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeAttribute(page.title)}" />`,
    route,
    'Open Graph title',
  )
  html = replaceRequired(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeAttribute(page.description)}" />`,
    route,
    'Open Graph description',
  )
  html = replaceRequired(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="https://playtozdogtraining.com.au${canonicalPath}" />`,
    route,
    'Open Graph URL',
  )
  html = replaceRequired(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeAttribute(page.title)}" />`,
    route,
    'Twitter title',
  )
  html = replaceRequired(
    html,
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeAttribute(page.description)}" />`,
    route,
    'Twitter description',
  )
  const { markup, preloadLinks } = renderRoute(route)
  html = html.replace('</head>', `${preloadLinks.join('')}\n  </head>`)
  html = replaceRequired(
    html,
    /<div id="root"><\/div>/,
    `<div id="root">${markup}</div>`,
    route,
    'application root',
  )

  await mkdir(dirname(outputPath), { recursive: true })
  await writeFile(outputPath, html)
}

let notFoundHtml = replaceRequired(
  template,
  /<title>[^<]*<\/title>/,
  '<title>Page not found | Play to Z Dog Training</title>',
  '404',
  'title',
)
notFoundHtml = replaceRequired(
  notFoundHtml,
  /<meta name="description" content="[^"]*" \/>/,
  '<meta name="description" content="The page you requested could not be found." />',
  '404',
  'description',
)
notFoundHtml = replaceRequired(
  notFoundHtml,
  /<link rel="canonical" href="[^"]*" \/>/,
  '<meta name="robots" content="noindex,follow" />',
  '404',
  'canonical link',
)
notFoundHtml = replaceRequired(
  notFoundHtml,
  /<meta property="og:title" content="[^"]*" \/>/,
  '<meta property="og:title" content="Page not found | Play to Z Dog Training" />',
  '404',
  'Open Graph title',
)
notFoundHtml = replaceRequired(
  notFoundHtml,
  /<meta property="og:description" content="[^"]*" \/>/,
  '<meta property="og:description" content="The page you requested could not be found." />',
  '404',
  'Open Graph description',
)
notFoundHtml = replaceRequired(
  notFoundHtml,
  /<meta name="twitter:title" content="[^"]*" \/>/,
  '<meta name="twitter:title" content="Page not found | Play to Z Dog Training" />',
  '404',
  'Twitter title',
)
notFoundHtml = replaceRequired(
  notFoundHtml,
  /<meta name="twitter:description" content="[^"]*" \/>/,
  '<meta name="twitter:description" content="The page you requested could not be found." />',
  '404',
  'Twitter description',
)
const { markup: notFoundMarkup, preloadLinks: notFoundPreloads } = renderRoute('/not-found')
notFoundHtml = notFoundHtml.replace('</head>', `${notFoundPreloads.join('')}\n  </head>`)
notFoundHtml = replaceRequired(
  notFoundHtml,
  /<div id="root"><\/div>/,
  `<div id="root">${notFoundMarkup}</div>`,
  '404',
  'application root',
)
await writeFile(resolve(distRoot, '404.html'), notFoundHtml)
