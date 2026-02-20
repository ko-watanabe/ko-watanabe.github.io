// ビルド時にGoogle Scholarから論文データを取得してJSONファイルに保存するスクリプト
// 注意: Google Scholarはボット検出が厳しいため、キャッシュデータを優先的に使用します
// 手動で更新したい場合は: node scripts/fetch-scholar-publications.js --force
const fs = require('fs')
const path = require('path')
const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const cheerio = require('cheerio')

// ステルスプラグインを追加（ボット検出回避）
puppeteer.use(StealthPlugin())

const SCHOLAR_URL = 'https://scholar.google.com/citations?hl=ja&user=AluAUmEAAAAJ'
const SCHOLAR_URL_LATEST = 'https://scholar.google.com/citations?hl=ja&user=AluAUmEAAAAJ&view_op=list_works&sortby=pubdate'

// キャッシュファイルのパス
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'scholar-publications.json')

// コマンドライン引数をチェック
const forceRefresh = process.argv.includes('--force')
const skipScraping = process.env.SKIP_SCHOLAR_SCRAPING === 'true' || process.env.CI === 'true'

async function fetchScholarPublications() {
  // キャッシュが存在し、強制更新でなく、スクレイピングをスキップする場合
  if (!forceRefresh && skipScraping && fs.existsSync(OUTPUT_PATH)) {
    try {
      const existingData = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'))
      if (existingData.length > 0) {
        console.log(`✓ Using cached publications data: ${existingData.length} publications`)
        console.log('  (Set SKIP_SCHOLAR_SCRAPING=false or use --force to attempt fresh scraping)')
        return
      }
    } catch (error) {
      console.warn('⚠ Failed to read cache, will attempt scraping')
    }
  }

  // キャッシュが存在し、最近更新された場合はスキップ（24時間以内）
  if (!forceRefresh && fs.existsSync(OUTPUT_PATH)) {
    const stats = fs.statSync(OUTPUT_PATH)
    const hoursSinceModified = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60)
    if (hoursSinceModified < 24) {
      try {
        const existingData = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'))
        if (existingData.length > 0) {
          console.log(`✓ Using recent cache (${Math.round(hoursSinceModified)}h old): ${existingData.length} publications`)
          console.log('  (Use --force to refresh)')
          return
        }
      } catch (error) {
        // キャッシュ読み込みエラーは無視してスクレイピングを試みる
      }
    }
  }
  let browser = null
  try {
    console.log('Launching browser with stealth mode...')
    browser = await puppeteer.launch({
      headless: 'new', // 新しいヘッドレスモード（検出されにくい）
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-blink-features=AutomationControlled', // 自動化フラグを無効化
        '--disable-features=IsolateOrigins,site-per-process',
        '--window-size=1920,1080',
      ],
    })

    const page = await browser.newPage()

    // WebDriverプロパティを削除（ボット検出対策）
    await page.evaluateOnNewDocument(() => {
      // webdriverプロパティを削除
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      })
      // プラグインを偽装
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      })
      // 言語設定を偽装
      Object.defineProperty(navigator, 'languages', {
        get: () => ['ja', 'en-US', 'en'],
      })
      // Chrome固有のプロパティを追加
      window.chrome = {
        runtime: {},
      }
    })

    // User-Agentを設定（最新のChromeバージョンを使用）
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36')
    
    // 追加のヘッダーを設定
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'ja,en-US;q=0.9,en;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Upgrade-Insecure-Requests': '1',
      'Cache-Control': 'max-age=0',
    })
    
    // ビューポートを設定
    await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })

    // ランダム遅延関数（人間らしい動作をシミュレート）
    const randomDelay = (min, max) => new Promise(resolve => 
      setTimeout(resolve, Math.floor(Math.random() * (max - min + 1)) + min)
    )

    // 引用件数順でデータを取得
    console.log('Navigating to Google Scholar (by citations)...')
    await page.goto(SCHOLAR_URL, {
      waitUntil: 'networkidle2', // ネットワークが安定するまで待つ
      timeout: 60000,
    })

    // ページが完全に読み込まれるまで待つ（ランダム遅延）
    await randomDelay(3000, 6000)
    
    // マウス移動をシミュレート（人間らしい動作）
    await page.mouse.move(100, 200)
    await randomDelay(500, 1000)
    await page.mouse.move(300, 400)
    
    // スクロールしてコンテンツを読み込む
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
    await randomDelay(2000, 4000)
    
    // ページの状態を確認
    const pageTitle = await page.title()
    console.log('Page title:', pageTitle)
    const currentUrl = page.url()
    console.log('Current URL:', currentUrl)

    // 論文リストが読み込まれるまで待つ（複数のセレクターを試す）
    let publicationsFound = false
    try {
      await page.waitForSelector('tr.gsc_a_tr', { timeout: 15000 })
      publicationsFound = true
      console.log('✓ Found publications list (gsc_a_tr)')
    } catch (error) {
      console.warn('tr.gsc_a_tr not found, trying alternative selectors...')
      try {
        await page.waitForSelector('table.gsc_a_t', { timeout: 10000 })
        publicationsFound = true
        console.log('✓ Found publications list (gsc_a_t)')
      } catch (error2) {
        console.warn('Alternative selector also not found')
        // デバッグ用スクリーンショットを保存
        const screenshotPath = path.join(process.cwd(), 'debug-scholar-page.png')
        await page.screenshot({ path: screenshotPath, fullPage: true })
        console.log(`Debug screenshot saved to: ${screenshotPath}`)
        
        // ページの内容を確認
        const pageContent = await page.evaluate(() => document.body.textContent)
        console.log('Page content preview:', pageContent.substring(0, 1000))
        // HTMLの構造も確認
        const htmlContent = await page.evaluate(() => document.body.innerHTML)
        console.log('HTML contains "gsc_a_tr":', htmlContent.includes('gsc_a_tr'))
        console.log('HTML contains "gsc_a_t":', htmlContent.includes('gsc_a_t'))
        console.log('HTML contains "publication":', htmlContent.toLowerCase().includes('publication'))
        // CAPTCHAチェック
        console.log('HTML contains "captcha":', htmlContent.toLowerCase().includes('captcha'))
        console.log('HTML contains "robot":', htmlContent.toLowerCase().includes('robot'))
      }
    }

    // 引用件数順でデータを取得
    const publicationsByCitations = await page.evaluate(() => {
      const results = []
      // 複数のセレクターを試す
      let rows = document.querySelectorAll('tr.gsc_a_tr')
      if (rows.length === 0) {
        rows = document.querySelectorAll('table.gsc_a_t tr')
      }
      if (rows.length === 0) {
        rows = document.querySelectorAll('tbody tr')
      }
      
      console.log(`Found ${rows.length} publication rows`)

      rows.forEach((row) => {
        try {
          // タイトルとリンク
          const titleElement = row.querySelector('a.gsc_a_at')
          if (!titleElement) return

          const title = titleElement.textContent.trim()
          const relativeUrl = titleElement.getAttribute('href')
          const url = relativeUrl ? `https://scholar.google.com${relativeUrl}` : undefined

          // citation_for_viewパラメータを抽出（BibTeX取得用）
          let citationForView = null
          if (relativeUrl) {
            const match = relativeUrl.match(/citation_for_view=([^&]+)/)
            if (match) {
              citationForView = match[1]
            }
          }

          // 著者、会場、年の情報
          const grayDivs = row.querySelectorAll('div.gs_gray')
          let authors = ''
          let venue = ''
          let year = ''

          if (grayDivs.length >= 1) {
            authors = grayDivs[0].textContent.trim()
          }
          if (grayDivs.length >= 2) {
            const secondText = grayDivs[1].textContent.trim()
            const parts = secondText.split(',').map(p => p.trim())
            if (parts.length >= 1) {
              const lastPart = parts[parts.length - 1]
              if (/^\d{4}$/.test(lastPart)) {
                year = lastPart
                venue = parts.slice(0, parts.length - 1).join(', ')
              } else {
                venue = secondText
              }
            }
          }

          // 引用件数
          let citations = 0
          // 引用件数は td.gsc_a_c の中にある
          const citationsCell = row.querySelector('td.gsc_a_c')
          if (citationsCell) {
            // まず a.gsc_a_c を探す
            const citationsLink = citationsCell.querySelector('a.gsc_a_c')
            if (citationsLink) {
              const citationsText = citationsLink.textContent.trim()
              const citationsMatch = citationsText.match(/\d+/)
              if (citationsMatch) {
                citations = parseInt(citationsMatch[0])
              }
            } else {
              // リンクがない場合、span.gsc_a_c を探す
              const citationsSpan = citationsCell.querySelector('span.gsc_a_c')
              if (citationsSpan) {
                const citationsText = citationsSpan.textContent.trim()
                const citationsMatch = citationsText.match(/\d+/)
                if (citationsMatch) {
                  citations = parseInt(citationsMatch[0])
                }
              } else {
                // セル全体のテキストから数字を抽出
                const citationsText = citationsCell.textContent.trim()
                const citationsMatch = citationsText.match(/\d+/)
                if (citationsMatch) {
                  citations = parseInt(citationsMatch[0])
                }
              }
            }
          }

          if (title) {
            results.push({
              title,
              authors: authors || 'N/A',
              venue: venue || 'N/A',
              year: year || 'N/A',
              citations,
              url,
              citationForView, // BibTeX取得用
            })
          }
        } catch (error) {
          console.warn('Error parsing publication:', error)
        }
      })

      return results
    })
    
    console.log(`Found ${publicationsByCitations.length} publications by citations`)

    // 最新順でデータを取得
    console.log('Navigating to Google Scholar (by date)...')
    await randomDelay(2000, 4000) // ページ遷移前に待機
    await page.goto(SCHOLAR_URL_LATEST, {
      waitUntil: 'networkidle2',
      timeout: 60000,
    })

    // ページが完全に読み込まれるまで待つ（ランダム遅延）
    await randomDelay(3000, 6000)
    
    // マウス移動をシミュレート
    await page.mouse.move(200, 300)
    await randomDelay(500, 1000)
    
    // スクロールしてコンテンツを読み込む
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight)
    })
    await randomDelay(2000, 4000)
    
    // ページの状態を確認
    const pageTitle2 = await page.title()
    console.log('Page title (by date):', pageTitle2)
    const currentUrl2 = page.url()
    console.log('Current URL (by date):', currentUrl2)

    // 論文リストが読み込まれるまで待つ
    let publicationsFoundByDate = false
    try {
      await page.waitForSelector('tr.gsc_a_tr', { timeout: 15000 })
      publicationsFoundByDate = true
      console.log('✓ Found publications list (by date)')
    } catch (error) {
      console.warn('Publications list not found (by date), trying alternative selectors...')
      try {
        await page.waitForSelector('table.gsc_a_t', { timeout: 10000 })
        publicationsFoundByDate = true
        console.log('✓ Found publications list (alternative selector)')
      } catch (error2) {
        console.warn('Alternative selector also not found')
      }
    }

    // 最新順でデータを取得（順序を保持）
    const publicationsByDate = await page.evaluate(() => {
      const results = []
      // 複数のセレクターを試す
      let rows = document.querySelectorAll('tr.gsc_a_tr')
      if (rows.length === 0) {
        rows = document.querySelectorAll('table.gsc_a_t tr')
      }
      if (rows.length === 0) {
        rows = document.querySelectorAll('tbody tr')
      }
      
      console.log(`Found ${rows.length} publication rows (by date)`)

      rows.forEach((row) => {
        try {
          // タイトルとリンク
          const titleElement = row.querySelector('a.gsc_a_at')
          if (!titleElement) return

          const title = titleElement.textContent.trim()
          const relativeUrl = titleElement.getAttribute('href')
          const url = relativeUrl ? `https://scholar.google.com${relativeUrl}` : undefined

          // citation_for_viewパラメータを抽出（BibTeX取得用）
          let citationForView = null
          if (relativeUrl) {
            const match = relativeUrl.match(/citation_for_view=([^&]+)/)
            if (match) {
              citationForView = match[1]
            }
          }

          // 著者、会場、年の情報
          const grayDivs = row.querySelectorAll('div.gs_gray')
          let authors = ''
          let venue = ''
          let year = ''

          if (grayDivs.length >= 1) {
            authors = grayDivs[0].textContent.trim()
          }
          if (grayDivs.length >= 2) {
            const secondText = grayDivs[1].textContent.trim()
            const parts = secondText.split(',').map(p => p.trim())
            if (parts.length >= 1) {
              const lastPart = parts[parts.length - 1]
              if (/^\d{4}$/.test(lastPart)) {
                year = lastPart
                venue = parts.slice(0, parts.length - 1).join(', ')
              } else {
                venue = secondText
              }
            }
          }

          // 引用件数
          let citations = 0
          const citationsCell = row.querySelector('td.gsc_a_c')
          if (citationsCell) {
            const citationsLink = citationsCell.querySelector('a.gsc_a_c')
            if (citationsLink) {
              const citationsText = citationsLink.textContent.trim()
              const citationsMatch = citationsText.match(/\d+/)
              if (citationsMatch) {
                citations = parseInt(citationsMatch[0])
              }
            } else {
              const citationsSpan = citationsCell.querySelector('span.gsc_a_c')
              if (citationsSpan) {
                const citationsText = citationsSpan.textContent.trim()
                const citationsMatch = citationsText.match(/\d+/)
                if (citationsMatch) {
                  citations = parseInt(citationsMatch[0])
                }
              } else {
                const citationsText = citationsCell.textContent.trim()
                const citationsMatch = citationsText.match(/\d+/)
                if (citationsMatch) {
                  citations = parseInt(citationsMatch[0])
                }
              }
            }
          }

          if (title) {
            results.push({
              title,
              authors: authors || 'N/A',
              venue: venue || 'N/A',
              year: year || 'N/A',
              citations,
              url,
              citationForView,
            })
          }
        } catch (error) {
          console.warn('Error parsing publication:', error)
        }
      })

      return results
    })

    // 引用件数でソート（降順）
    const sortedPublications = publicationsByCitations.sort((a, b) => b.citations - a.citations)

    // 最新順のデータをマージ（引用件数順のデータに最新順の情報を追加）
    // タイトルをキーとしてマージ
    const publicationsMap = new Map()
    sortedPublications.forEach(pub => {
      publicationsMap.set(pub.title, { ...pub })
    })

    // 最新順のデータで順序を更新（既存のデータがあれば更新、なければ追加）
    publicationsByDate.forEach((pub, index) => {
      if (publicationsMap.has(pub.title)) {
        // 既存のデータを更新（順序情報を保持）
        const existing = publicationsMap.get(pub.title)
        existing.dateOrder = index
      } else {
        // 新しいデータを追加
        const newPub = { ...pub, dateOrder: index }
        publicationsMap.set(pub.title, newPub)
      }
    })

    // 最終的なリストを作成（引用件数順を優先）
    const allPublications = Array.from(publicationsMap.values())

    console.log(`Found ${allPublications.length} publications (${sortedPublications.length} by citations, ${publicationsByDate.length} by date)`)
    
    const outputPath = OUTPUT_PATH
    
    // スクレイピングが失敗した場合（0件の場合）、既存のファイルがあればそれを使用
    if (allPublications.length === 0) {
      console.warn('⚠ No publications found from scraping. Checking for existing file...')
      if (fs.existsSync(outputPath)) {
        try {
          const existingData = JSON.parse(fs.readFileSync(outputPath, 'utf8'))
          if (existingData.length > 0) {
            console.log(`✓ Using existing publications data: ${existingData.length} publications`)
            console.log('⚠ Note: Using cached data because scraping failed (likely due to Google Scholar bot detection)')
            return // 既存のデータを使用して終了
          } else {
            console.warn('⚠ Existing file is empty, cannot use as fallback')
          }
        } catch (error) {
          console.warn('⚠ Failed to read existing file:', error.message)
        }
      } else {
        console.warn('⚠ No existing file found, will save empty array')
      }
    }

    console.log('Skipping BibTeX fetch (requires authentication)')

    // BibTeX取得はスキップ（ログインが必要なため）
    allPublications.forEach(pub => {
      pub.bibtex = null
    })

    // 引用件数でソート（降順）して保存
    const finalPublications = allPublications.sort((a, b) => b.citations - a.citations)

    // public/scholar-publications.jsonに保存
    fs.writeFileSync(
      outputPath,
      JSON.stringify(finalPublications, null, 2)
    )

    const bibtexCount = finalPublications.filter(p => p.bibtex).length
    console.log(`Scholar publications data saved (${finalPublications.length} publications, ${bibtexCount} with BibTeX)`)
    
    // ファイルが正しく保存されたか確認
    if (fs.existsSync(outputPath)) {
      const savedData = JSON.parse(fs.readFileSync(outputPath, 'utf8'))
      if (savedData.length === finalPublications.length) {
        console.log(`✓ Verified: ${savedData.length} publications saved to ${outputPath}`)
      } else {
        console.warn(`⚠ Warning: Saved ${savedData.length} publications, expected ${finalPublications.length}`)
      }
    } else {
      throw new Error(`Failed to save publications to ${outputPath}`)
    }
  } catch (error) {
    console.error('Failed to fetch scholar publications:', error.message)
    console.error('Error stack:', error.stack)
    
    const outputPath = OUTPUT_PATH
    
    // エラー時、既存のファイルがあればそれを使用
    if (fs.existsSync(outputPath)) {
      try {
        const existingData = JSON.parse(fs.readFileSync(outputPath, 'utf8'))
        if (existingData.length > 0) {
          console.log(`✓ Using existing publications data after error: ${existingData.length} publications`)
          console.log('⚠ Note: Using cached data because scraping failed')
          return // 既存のデータを使用して終了
        }
      } catch (readError) {
        console.warn('⚠ Failed to read existing file:', readError.message)
      }
    }
    
    // 既存のファイルがない、または空の場合は空の配列を保存（ビルドを続行するため）
    const defaultPublications = []
    fs.writeFileSync(
      outputPath,
      JSON.stringify(defaultPublications, null, 2)
    )
    console.warn(`Warning: Saved empty publications array to ${outputPath}`)
    // エラーを再スローしない（ビルドを続行するため）
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}

fetchScholarPublications()

