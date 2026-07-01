const fs = require('fs')
const path = require('path')

const outDir = path.join(process.cwd(), 'out')
const indexPath = path.join(outDir, 'index.html')

fs.writeFileSync(path.join(outDir, '.nojekyll'), '')

if (!fs.existsSync(indexPath)) {
  console.error('ERROR: out/index.html not found')
  process.exit(1)
}

const cacheMeta =
  '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate"/>' +
  '<meta http-equiv="Pragma" content="no-cache"/>' +
  '<meta http-equiv="Expires" content="0"/>'

let html = fs.readFileSync(indexPath, 'utf8')

if (!html.includes('Cache-Control')) {
  html = html.replace('<head>', `<head>${cacheMeta}`)
}

fs.writeFileSync(indexPath, html)
console.log('✓ Added .nojekyll and cache-control meta to out/index.html')
