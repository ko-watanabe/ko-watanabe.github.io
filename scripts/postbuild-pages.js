const fs = require('fs')
const path = require('path')

const outDir = path.join(process.cwd(), 'out')
const htmlPaths = [
  path.join(outDir, 'index.html'),
  path.join(outDir, 'slides', 'index.html'),
]

fs.writeFileSync(path.join(outDir, '.nojekyll'), '')

const cacheMeta =
  '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>' +
  '<meta http-equiv="Pragma" content="no-cache"/>' +
  '<meta http-equiv="Expires" content="0"/>'

for (const htmlPath of htmlPaths) {
  if (!fs.existsSync(htmlPath)) {
    if (path.basename(path.dirname(htmlPath)) === 'out') {
      console.error('ERROR: out/index.html not found')
      process.exit(1)
    }
    continue
  }

  let html = fs.readFileSync(htmlPath, 'utf8')
  if (!html.includes('Cache-Control')) {
    html = html.replace('<head>', `<head>${cacheMeta}`)
  }
  fs.writeFileSync(htmlPath, html)
  console.log(`✓ Added cache-control meta to ${path.relative(process.cwd(), htmlPath)}`)
}

console.log('✓ Added .nojekyll')
