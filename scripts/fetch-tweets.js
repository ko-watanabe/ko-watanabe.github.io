// ビルド時にX APIから最新ポストを取得してJSONファイルに保存するスクリプト
const fs = require('fs')
const path = require('path')

// .env.localファイルから環境変数を読み込む
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8')
  envFile.split('\n').forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      const value = match[2].trim().replace(/^["']|["']$/g, '')
      process.env[key] = value
    }
  })
}

async function fetchLatestTweet() {
  const bearerToken = process.env.TWITTER_BEARER_TOKEN
  const userId = 'ko_watanabe_jp'

  if (!bearerToken) {
    console.warn('TWITTER_BEARER_TOKEN is not set. Skipping tweet fetch.')
    // デフォルトデータを保存
    const defaultData = {
      location: '現在、ドイツで研究活動中',
      latestTweet: null,
      fetchedAt: new Date().toISOString(),
    }
    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'tweet-data.json'),
      JSON.stringify(defaultData, null, 2)
    )
    return
  }

  try {
    const apiUrl = `https://api.twitter.com/2/tweets/search/recent?query=from:${userId}&max_results=10&tweet.fields=created_at,geo,place,text&expansions=author_id,geo.place_id&place.fields=full_name,country`

    const response = await fetch(apiUrl, {
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Twitter API error details:', errorData)
      throw new Error(`Twitter API error: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()

    let location = '現在、ドイツで研究活動中'
    let latestTweet = null

    if (data.data && data.data.length > 0) {
      latestTweet = data.data[0]

      // 位置情報がある場合
      if (data.includes?.places && latestTweet.geo?.place_id) {
        const place = data.includes.places.find((p) => p.id === latestTweet.geo.place_id)
        if (place) {
          location = place.full_name
        }
      } else if (latestTweet.geo?.coordinates) {
        // 座標がある場合
        const [lat, lon] = latestTweet.geo.coordinates.coordinates
        location = `${lat.toFixed(2)}, ${lon.toFixed(2)}`
      }
    }

    const tweetData = {
      location,
      latestTweet: latestTweet ? {
        text: latestTweet.text,
        created_at: latestTweet.created_at,
        id: latestTweet.id,
      } : null,
      fetchedAt: new Date().toISOString(),
    }

    // public/tweet-data.jsonに保存
    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'tweet-data.json'),
      JSON.stringify(tweetData, null, 2)
    )

    console.log('Successfully fetched tweet data:', tweetData.location)
  } catch (error) {
    console.error('Failed to fetch tweet data:', error.message)
    // エラー時もデフォルトデータを保存
    const defaultData = {
      location: '現在、ドイツで研究活動中',
      latestTweet: null,
      fetchedAt: new Date().toISOString(),
      error: error.message,
    }
    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'tweet-data.json'),
      JSON.stringify(defaultData, null, 2)
    )
  }
}

fetchLatestTweet()

