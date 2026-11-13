import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = resolve(projectRoot, 'dist')
const metadata = JSON.parse(await readFile(resolve(projectRoot, 'src/seo-pages.json'), 'utf8'))
const template = await readFile(resolve(distRoot, 'index.html'), 'utf8')

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
await writeFile(resolve(distRoot, '404.html'), notFoundHtml)
