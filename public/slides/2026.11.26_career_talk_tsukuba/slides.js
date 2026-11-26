// Content and speaker notes stay editable without a build step.
const asset = (name) => `assets/${name}`;
const source = (label, url) => ({ label, url });

export const slides = [
  {
    title: 'ヨーロッパで活躍する日本人博士によるキャリアトーク',
    section: 'はじめに',
    minutes: 1,
    className: 'cover',
    html: `<div class="hero-title"><p class="eyebrow reveal">筑波大学主催 · Career Talks by Japanese Ph.D. Professionals Working in Europe</p><h1 class="reveal">ヨーロッパで活躍する<br>日本人博士による<br><span class="title-word">キャリアトーク</span></h1></div><div class="seed reveal" aria-label="本日のキーワード"><img class="cover-logo" src="${asset('dfki-logo.svg')}" alt="DFKI logo" width="200" height="165"><p>多様なキャリアパス</p><p>海外での博士・就労</p><p>直感と経験の往復</p></div><div class="title-bottom reveal"><div><p class="presenter">渡邉 洸（Ko Watanabe）</p><p class="role">Senior Researcher · DFKI</p></div><p class="cover-event">ルール大学ボーフム<br>2026.11.26</p></div>`,
    notes: [
      '本日はお招きいただきありがとうございます。筑波大学の SPRING/BOOST 支援学生の皆さんに向けて、ヨーロッパで働く日本人博士の一例として、私のキャリアをお話しします。',
      '目的は「正解の一本道」を示すことではなく、博士取得後・海外でのキャリアがどれだけ多様になり得るかを、自分の軌跡を通じて具体化することです。',
      '約30分。スライドは道標で、話の肉付けはスピーカーノートに寄せています。質問は最後にまとめて、または途中で短く受けます。'
    ],
    cue: '冒頭で「今日はロールモデルではなく、一つの実例として聞いてほしい」と伝える。',
    sources: [
      source('イベント趣旨（登壇者メモ）'),
      source('個人サイト', 'https://ko-watanabe.github.io/'),
      source('note · DeNAからドイツ就労までの軌跡', 'https://note.com/ko_watanabe_note/n/nb30491bfbc3e'),
      source('note · ドイツで博士を取得した話', 'https://note.com/ko_watanabe_note/n/n622b5a205a9d'),
      source('note · 2025年振り返り', 'https://note.com/ko_watanabe_note/n/na248a96494e1'),
      source('note · ETRA 2025 BEST SHORT PAPER', 'https://note.com/ko_watanabe_note/n/n53f3306d4e3d')
    ]
  },
  {
    title: '自己紹介',
    section: 'はじめに',
    minutes: 2,
    className: 'intro',
    html: `<div class="two-col"><div><p class="eyebrow reveal">Self-introduction</p><h2 class="reveal">渡邉 洸</h2><p class="lead reveal">Senior Researcher<br>ドイツ人工知能研究センター（DFKI）</p><p class="small reveal">カイザースラウテルン、ドイツ</p><div class="rule reveal"></div><p class="affiliation reveal">客員助教 · 奈良先端科学技術大学院大学（NAIST）<br>Visiting Researcher · 大阪公立大学</p><p class="interest reveal">Human–Centered AI<br><span class="study-topic">& Trustworthy AI</span></p></div><figure class="profile-wrap reveal"><img class="profile" src="/ko-watanabe.jpg" alt="渡邉洸の肖像写真" width="460" height="490"><div class="affiliation-logos" aria-label="所属機関"><div><img src="${asset('dfki-logo.svg')}" alt="DFKI" width="100" height="83"><span>DFKI</span></div><div><img src="${asset('naist-logo-transparent.png')}" alt="NAIST" width="85" height="81"><span>NAIST</span></div><div><img src="${asset('omu-logo.svg')}" alt="大阪公立大学" width="85" height="85"><span>OMU</span></div></div></figure></div>`,
    notes: [
      '現在は DFKI のシニア研究員として、Trustworthy AI と HCI の接点で研究しています。カイザースラウテルンを拠点にしています。',
      'NAIST では客員助教、大阪公立大学でも Visiting Researcher として、日本側の研究コミュニティとも橋を渡しています。',
      '博士はドイツの RPTU Kaiserslautern-Landau（旧カイザースラウテルン工科大学）で2024年に取得。専門は教育・認知支援寄りの HCI から、いまは医療AI・公平性・説明可能性など Trustworthy AI へ広がっています。'
    ],
    cue: '顔写真と所属ロゴで「誰が話しているか」を短く固定する。',
    sources: [
      source('個人サイト', 'https://ko-watanabe.github.io/'),
      source('DFKI プロフィール', 'https://www.dfki.de/en/web/about-us/employee/person/kowa01'),
      source('Google Scholar', 'https://scholar.google.com/citations?user=AluAUmEAAAAJ&hl=ja')
    ]
  },
  {
    title: 'キャリアの全体像',
    section: 'はじめに',
    minutes: 2,
    html: `<p class="eyebrow reveal">一本道ではなかった</p><h2 class="reveal">キャリアの全体像</h2><div class="roadmap"><div class="roadmap-row reveal"><b>2013–17</b><h3>東京農工大学 · 機械工学 学士</h3><p>日本</p></div><div class="roadmap-row reveal"><b>2017–19</b><h3>NAIST · 情報科学 修士</h3><p>日本 · DFKIインターン</p></div><div class="roadmap-row reveal"><b>2019–21</b><h3>DeNA · ソフトウェアエンジニア</h3><p>日本 · 社会人</p></div><div class="roadmap-row reveal"><b>2021–24</b><h3>DFKI 研究員 × RPTU 博士</h3><p>ドイツ</p></div><div class="roadmap-row reveal"><b>2024–</b><h3>DFKI Senior Researcher ほか</h3><p>ドイツ · 日独の接点</p></div></div>`,
    notes: [
      'ポイントは「修士のあとすぐ博士」ではなく、一度企業で働き、コロナ禍をきっかけにドイツへ戻ったことです。',
      'NAIST 在学中に DFKI でインターンした経験が、後の決断の土台になりました。人とのつながりが、数年後に扉を開くことがあります。',
      'タイムラインを頭に入れておくと、このあとの各章がどこに位置するか分かりやすくなります。'
    ],
    cue: '「社会人経由で博士」という海外では珍しくない道を、先に地図として見せる。',
    sources: [
      source('個人サイト · Education & Experience', 'https://ko-watanabe.github.io/')
    ]
  },
  {
    title: '日本での歩み',
    section: '日本での歩み',
    minutes: 1,
    dark: true,
    className: 'chapter-divider',
    html: `<p class="chapter-bridge reveal">まずは、ドイツに行く前の土台の話です。</p><p class="eyebrow reveal">第1部</p><h2 class="chapter-title reveal">日本での歩み</h2><p class="chapter-question reveal">なぜ、社会人を経てから海外博士を選んだのか？</p><div class="chapter-route reveal" aria-label="この章の流れ"><span>学部・修士</span><span aria-hidden="true">→</span><span>企業経験</span><span aria-hidden="true">→</span><span>ドイツへの決断</span></div>`,
    notes: [
      'ここから第1部。農工大・NAIST・DeNA、そしてドイツ行きの決断までを話します。',
      '聴衆への問いかけとして、「いまの自分は、いつ海外に行くイメージを持っているか」を頭の片隅に置いてもらう。'
    ],
    cue: '章の切り替えをはっきりさせ、リズムを変える。',
    sources: []
  },
  {
    title: '学部・修士と最初のドイツ',
    section: '日本での歩み',
    minutes: 2,
    html: `<p class="eyebrow reveal">2013–2019</p><h2 class="reveal">学部・修士と<br>最初のドイツ</h2><div class="two-col"><div><ul class="flat-list"><li class="reveal"><strong>東京農工大学</strong><br>機械工学。ものづくりの感覚が土台に</li><li class="reveal"><strong>NAIST 情報科学</strong><br>HCI・センシングへ。研究の面白さに目覚める</li><li class="reveal"><strong>DFKI インターン（2018）</strong><br>ドイツの研究所を体験し、人との縁が残る</li><li class="reveal"><strong>当時の感覚</strong><br>海外博士への興味はあるが、先に社会人経験も欲しい</li></ul><p class="keyline reveal">「すぐ博士」か「一度働くか」。<br>両方に価値がある、と感じていました。</p></div><div class="photo-stack reveal"><figure class="note-figure"><img class="note-photo" src="${asset('note/dena/10.jpg')}" alt="DFKIインターンでの人との出会い" width="675" height="233"><figcaption>大学院の指導教員とドイツの研究所長</figcaption></figure><figure class="note-figure"><img class="note-photo" src="${asset('note/dena/11.jpg')}" alt="トビタテ！留学JAPAN" width="1024" height="492"><figcaption>トビタテ留学ジャパンでの留学</figcaption></figure></div></div>`,
    notes: [
      '学部は機械、修士で情報・HCIへ。専門のジャンプ自体が、のちの「境界領域で働く」経験につながっています。',
      '2018年の DFKI インターンは、研究の中身だけでなく、ドイツでの働き方・人との距離感を体感した最初の機会でした。',
      '当時、海外で博士を取る選択肢は頭にありました。ただ、日本で社会人を経験せずに飛び込むと踏ん切りがつかない、とも感じていました。海外では社会人経由の博士も多い、というイメージが後押しになりました。'
    ],
    cue: 'インターンで得た「人の縁」が、後のスライドの決断につながる予告をする。',
    sources: [
      source('個人サイト', 'https://ko-watanabe.github.io/')
    ]
  },
  {
    title: 'DeNAでの社会人経験',
    section: '日本での歩み',
    minutes: 2,
    html: `<p class="eyebrow reveal">2019.4 – 2021.2</p><h2 class="reveal">DeNAでの<br>社会人経験</h2><div class="two-col wide-left"><div><p class="lead reveal">初めての社会人として、ライブ配信サービスのエンジニアに。</p><ul class="flat-list"><li class="reveal"><strong>学び</strong>　見積もり、チームの空気、優秀な同僚からの刺激</li><li class="reveal"><strong>選び方</strong>　事業より「この人の近くで働きたい」でチームを選んだ</li><li class="reveal"><strong>コロナ禍</strong>　原則リモートへ。住所に縛られない働き方が現実に</li></ul></div><div class="photo-stack reveal"><figure class="note-figure"><img class="note-photo" src="${asset('note/dena/01.jpg')}" alt="DeNA同期との集まり" width="1200" height="800"><figcaption>同期・仲間との時間</figcaption></figure><figure class="note-figure"><img class="note-photo" src="${asset('note/dena/09.jpg')}" alt="南場代表との1on1" width="1024" height="569"><figcaption>南場代表と1on1するきっかけに</figcaption></figure></div></div>`,
    notes: [
      'DeNA は良い会社で、気の合う同期と出会えたことが最大の資産でした。技術だけでなく、チームの空気の作り方も学びました。',
      '事業選択は「この人素敵だな」と思える人がいるところ、という直感寄りでした。結果として働きやすく、成長できました。',
      'コロナで原則リモートになったとき、「出社しなくて良いなら京都に住む」という同期の決断を見て、「どこでも良いなら海外」とスイッチが入りました。',
      '社会人経験は、のちの博士生活でも「納期」「チーム」「プロダクト視点」として効いています。ストレート博士だけが正解ではありません。'
    ],
    cue: '企業経験を「遠回り」ではなく「キャリアの燃料」として語る。',
    sources: [
      source('note · DeNAからドイツ就労までの軌跡', 'https://note.com/ko_watanabe_note/n/nb30491bfbc3e')
    ]
  },
  {
    title: 'ドイツへ行く決断',
    section: '日本での歩み',
    minutes: 2,
    html: `<p class="eyebrow reveal">2020秋 – 2021.3</p><h2 class="reveal">ドイツへ行く決断</h2><div class="two-col"><div><div class="decision-grid stacked"><article class="reveal"><span>きっかけ</span><h3>石丸教授からの募集</h3><p>DFKIで働きながらPhDを、という投稿にすぐ連絡</p></article><article class="reveal"><span>準備</span><h3>怒涛の手続き</h3><p>書類・渡航ルール・コロナ規制。国内転職より工数が大きい</p></article><article class="reveal"><span>入国</span><h3>2021年3月</h3><p>住民登録・就労申請を終え、3/15から就労兼PhD開始</p></article></div><p class="keyline reveal">瞬間を大事に、やってみたいを大切に。</p></div><figure class="note-figure reveal"><img class="note-photo tall" src="${asset('note/dena/04.jpg')}" alt="石丸さんへのDM：DFKIで働きながらPhDの相談" width="964" height="1184"><figcaption>きっかけは、すぐの一言連絡</figcaption></figure></div>`,
    notes: [
      '2020年10月頃、石丸さん（当時のつながり）の投稿を見てすぐに連絡しました。過去にインターンしていた場所だったため、手続きも比較的スムーズでした。',
      '上長には「ドイツはわからんなぁ、でも行きたいなら行くのが良いでしょ」と背中を押してもらいました。辞め際のパフォーマンス低下にも注意、という助言は今でも覚えています。',
      'コロナ禍の渡航はルールが日々変わる中での挑戦でした。VISAは日本で長期申請せず、現地で取る通常フローで進みました。',
      'メッセージ：完璧な計画より、きっかけを逃さないこと。ただし海外就労の事務工数は甘く見ないこと。'
    ],
    cue: '「論理と直感の往復」を、このスライドの核にする。',
    sources: [
      source('note · DeNAからドイツ就労までの軌跡', 'https://note.com/ko_watanabe_note/n/nb30491bfbc3e'),
      source('YouTube · @ko_watanabe', 'https://www.youtube.com/@ko_watanabe')
    ]
  },
  {
    title: 'ドイツでの博士',
    section: 'ドイツでの博士',
    minutes: 1,
    dark: true,
    className: 'chapter-divider',
    html: `<p class="chapter-bridge reveal">次は、ドイツで学位を取るという働き方の話です。</p><p class="eyebrow reveal">第2部</p><h2 class="chapter-title reveal">ドイツでの博士</h2><p class="chapter-question reveal">学生であり、研究員である——その実態は？</p><div class="chapter-route reveal" aria-label="この章の流れ"><span>研究所雇用</span><span aria-hidden="true">→</span><span>研究プロジェクト</span><span aria-hidden="true">→</span><span>学位取得プロセス</span></div>`,
    notes: [
      '第2部では、ドイツ（特に情報系・研究所連携）でよくある「研究員として給与を得ながら博士を取る」モデルを説明します。',
      '日本の博士課程イメージとの違いを意識して話すと、聴衆の理解が深まります。'
    ],
    cue: '「博士＝無給の学生」だけではない、と予告する。',
    sources: []
  },
  {
    title: '研究員として博士を取る',
    section: 'ドイツでの博士',
    minutes: 2,
    className: 'organization',
    html: `<p class="eyebrow reveal">DFKI × RPTU Kaiserslautern-Landau</p><h2 class="reveal">研究員として<br>博士を取る</h2><div class="two-col wide-left"><div><p class="lead reveal">多くの場合、まず研究員として雇用され、<br>並行して大学で博士課程に登録します。</p><div class="stat-line reveal"><span class="big-number">3</span><p>年程度で博士取得（私の場合 2021–2024）</p></div><div class="stat-line reveal"><span class="big-number">€</span><p>給与ありの研究職モデルが一般的<br><span class="small">契約形態・税率・生活費は個人差が大きい</span></p></div><ul class="flat-list"><li class="reveal">学生承認には単位互換・教授会などが絡み、数ヶ月かかることも</li><li class="reveal">承認前でも研究は始められる。待ち時間を恐れすぎない</li></ul></div><div class="reveal"><img class="photo-wide" src="${asset('dfki-kaiserslautern.webp')}" alt="DFKI Kaiserslautern" width="650" height="366"><p class="small" style="margin-top:12px">DFKI Kaiserslautern · 登録本拠地</p></div></div>`,
    notes: [
      'ドイツの博士は国や分野で多様ですが、情報系・DFKIのような応用研究機関では、雇用契約付きの博士が多い印象です。',
      '私は2021年3月15日から研究員としてスタート。大学の正式な学生承認は同年11月頃。ドイツ人学生でも数ヶ月かかることはあり、外国人だから特別に遅いとは限りません。',
      '学生証があれば交通やメンザが安くなる等のメリットがあります。ゼメスター費は半年でおおよそ数百ユーロ規模（当時の感覚）。',
      'SPRING/BOOSTの皆さんへ：海外博士を考えるとき、「学費」「給与」「指導教員との関係」の三点セットで調べると現実味が増します。'
    ],
    cue: '写真で場所の実在感を出し、制度の話を抽象にしない。',
    sources: [
      source('note · ドイツで博士（工学）を取得した話', 'https://note.com/ko_watanabe_note/n/n622b5a205a9d'),
      source('DWIH · RPTU 紹介', 'https://www.dwih-tokyo.org/ja/supporter/rptu/'),
      source('DFKI', 'https://www.dfki.de/')
    ]
  },
  {
    title: '博士研究と学位プロセス',
    section: 'ドイツでの博士',
    minutes: 2,
    html: `<p class="eyebrow reveal">研究と手続き</p><h2 class="reveal">博士研究と<br>学位プロセス</h2><p class="lead reveal" style="font-size:24px;line-height:1.45;margin-bottom:18px">日独仏AI研究（JST/DFG/ANR）のマッチングファンド方式の枠組みで採択された LeCycl で、<br>知識伝達（Transfer）を中心に研究。</p><div class="two-col"><div><ul class="flat-list"><li class="reveal">コロナ禍のオンライン会議で、非言語情報の不足を実感</li><li class="reveal">教育サイクル Perceive / Master / Transfer の一角を担当</li><li class="reveal">論文・国際会議・共同研究が「成果の通貨」</li></ul><p class="label reveal" style="margin-top:18px">学位までの流れ（要約）</p><ol class="process-list"><li class="reveal">アブスト・目次・CV・業績の提出</li><li class="reveal">本稿執筆の承認 → 提出 → 査読</li><li class="reveal">公聴会・修正・最終稿で公式取得</li></ol></div><figure class="note-figure reveal"><img class="note-photo" src="${asset('note/phd/01.jpg')}" alt="LeCyclの教育サイクルと実験環境" width="1200" height="425"><figcaption>Perceive / Master / Transfer · 実験環境</figcaption></figure></div>`,
    notes: [
      '研究は Learning Cyclotron（LeCycl）。デジタルで教育サイクルを加速するプロジェクトで、私は Transfer（知識伝達）を担当しました。',
      '海外ラボではボディランゲージに頼る場面も多く、オンライン化で「伝わる情報の削減」を強く感じたことが研究動機と重なりました。',
      'ドイツの学位プロセスは、本稿提出前の承認、査読教員、公聴会、紙の最終稿提出など、段階が多いです。レビュー期間が長く感じることもあります。',
      '「研究の面白さ」と「事務プロセスの粘り」の両方が必要、と正直に伝える。'
    ],
    cue: '研究の中身は深くやりすぎず、キャリア視点（成果の積み方・プロセス）に寄せる。',
    sources: [
      source('note · ドイツで博士（工学）を取得した話', 'https://note.com/ko_watanabe_note/n/n622b5a205a9d'),
      source('Google Scholar', 'https://scholar.google.com/citations?user=AluAUmEAAAAJ&hl=ja'),
      source('LeCycl プロジェクト概要', 'https://opu-imp.github.io/')
    ]
  },
  {
    title: '現在のDFKI',
    section: 'ドイツでの博士',
    minutes: 2,
    html: `<p class="eyebrow reveal">日本との接点が広がっている</p><h2 class="reveal">現在のDFKI</h2><div class="two-col wide-left"><div><p class="lead reveal">日本からの人材・渡航が、研究所の日常の一部に。</p><div class="role-grid"><article class="reveal"><span>01</span><h3>博士課程 3名進学中</h3><p>大阪公立大学 · 法政大学からの進学者</p></article><article class="reveal"><span>02</span><h3>Aspire による留学</h3><p>九大・大阪公立大から、情報学部・医学部の研究者が訪問</p></article><article class="reveal"><span>03</span><h3>BOOST による渡航</h3><p>支援プログラムを活用した短期・中期のドイツ滞在</p></article><article class="reveal"><span>04</span><h3>トビタテでの渡航</h3><p>トビタテ！留学JAPAN を活用した渡航・交流</p></article><article class="reveal"><span>05</span><h3>日独ネットワーク</h3><p>日本との根強いネットワークを、いま構築中</p></article></div></div><figure class="note-figure reveal"><img class="note-photo" src="${asset('note/dena/12.jpg')}" alt="DFKIの日本人研究者・学生との交流" width="1024" height="768"><figcaption>日本からの仲間との交流</figcaption></figure></div>`,
    notes: [
      'DFKI 側でも、日本からの博士進学や各種プログラムによる渡航が増えています。',
      'Aspire では九州大学・大阪公立大学から情報・医学の研究者が訪問。分野横断の接点が生まれています。',
      'BOOST やトビタテなど、学生・研究者が使える支援を組み合わせることで、渡航のハードルは下がります。',
      'SPRING/BOOST の皆さんへ：制度を「自分の渡航設計」に落とし込む例として聞いてほしい、と伝える。'
    ],
    cue: '「ドイツは遠い」ではなく「すでに人と制度の橋がある」ことを具体名で示す。',
    sources: [
      source('DFKI', 'https://www.dfki.de/'),
      source('トビタテ！留学JAPAN', 'https://www.tobitate.mext.go.jp/')
    ]
  },
  {
    title: '博士取得後のいま',
    section: '博士取得後',
    minutes: 1,
    dark: true,
    className: 'chapter-divider',
    html: `<p class="chapter-bridge reveal">学位はゴールではなく、次の章の入口でした。</p><p class="eyebrow reveal">第3部</p><h2 class="chapter-title reveal">博士取得後</h2><p class="chapter-question reveal">ヨーロッパに残って、何をしているのか？</p><div class="chapter-route reveal" aria-label="この章の流れ"><span>研究職の拡張</span><span aria-hidden="true">→</span><span>生活と家族</span><span aria-hidden="true">→</span><span>皆さんへの示唆</span></div>`,
    notes: [
      '第3部。2024年に博士取得後、DFKI でシニア研究員として続き、研究テーマや役割が広がっています。',
      'キャリアは「肩書きの更新」だけでなく、コミュニティ、指導、日独の橋渡しも含みます。'
    ],
    cue: '「取って終わり」ではないことを、短い章扉で印象づける。',
    sources: []
  },
  {
    title: 'いまの仕事と広がる役割',
    section: '博士取得後',
    minutes: 2,
    html: `<p class="eyebrow reveal">2024 – Present</p><h2 class="reveal">いまの仕事と<br>広がる役割</h2><div class="two-col wide-left"><div><div class="role-grid"><article class="reveal"><span>01</span><h3>研究</h3><p>Human Augmentation · 医療AI（Aspire） · サイバーセキュリティ（NII共同研究）</p></article><article class="reveal"><span>02</span><h3>指導</h3><p>テーマを「自分ごと」にする伴走<br>世界中の研究者の指導</p></article><article class="reveal"><span>03</span><h3>コミュニティ</h3><p>国際会議の運営・査読。縁が次の研究を生む</p></article><article class="reveal"><span>04</span><h3>日独の橋</h3><p>NAIST 客員助教、日本との共同研究</p></article><article class="reveal"><span>05</span><h3>研究費の獲得</h3><p>競争的資金・共同研究プロジェクトの提案</p></article><article class="reveal"><span>06</span><h3>研究の事業化</h3><p>LOGOT UG の創業</p></article></div><p class="small reveal" style="margin-top:16px">例：ETRA 2025 Best Short Paper は、同僚との雑談から始まった瞳孔径研究。</p></div><div class="photo-stack reveal"><figure class="note-figure"><img class="note-photo" src="${asset('note/etra/zozonext.jpg')}" alt="ZOZONEXTとの共同研究" width="1024" height="576"><figcaption>ZOZONEXTとの共同研究</figcaption></figure><figure class="note-figure"><img class="note-photo" src="${asset('note/etra/02.jpg')}" alt="PupilSenseアプリケーション画面" width="1172" height="756"><figcaption>PupilSense · ETRA 2025</figcaption></figure></div></div>`,
    notes: [
      '博士後も同じ研究所に残りつつ、テーマは教育HCIから Trustworthy AI・医療寄りへ広がっています。変化を恐れないことが大事です。',
      '指導では、学生がテーマを自分ごとにできるかを重視しています。熱量が初期にあると、研究の推進力が違います。',
      'ETRA 2025 Best Short Paper（PupilSense）は、日本で同僚 Brian を案内した友情が共同研究につながった例です。「友達から始まる研究」もあり得ます。',
      '会議運営（Poster/Demo Chair など）や査読も、キャリアの一部です。見える成果だけでなく、コミュニティへの貢献が次の機会を呼びます。'
    ],
    cue: '研究成果名より「役割の広がり」と「人の縁」を前面に。',
    sources: [
      source('note · ETRA 2025 BEST SHORT PAPER', 'https://note.com/ko_watanabe_note/n/n53f3306d4e3d'),
      source('note · 2025年振り返り', 'https://note.com/ko_watanabe_note/n/na248a96494e1'),
      source('個人サイト · Awards & Activities', 'https://ko-watanabe.github.io/')
    ]
  },
  {
    title: 'ヨーロッパで暮らして働く',
    section: '博士取得後',
    minutes: 2,
    html: `<p class="eyebrow reveal">研究以外もキャリアの一部</p><h2 class="reveal">ヨーロッパで<br>暮らして働く</h2><div class="two-col"><div><ul class="flat-list"><li class="reveal"><strong>移動と学会</strong>　ヨーロッパ域内は比較的近く、国際会議が生活のリズムに</li><li class="reveal"><strong>生活インフラ</strong>　住民登録、外国人局、保険、語学——研究と同じく実務力</li><li class="reveal"><strong>家族</strong>　配偶者のキャリア、育児、ビザ。一人の決断ではない</li><li class="reveal"><strong>永住などの安定</strong>　長期滞在の見通しが、挑戦の土台になる</li></ul><p class="keyline reveal">研究の自由と、生活の不確実性はセットです。</p></div><figure class="note-figure reveal"><img class="note-photo" src="${asset('note/year2025/instagram-kai.jpg')}" alt="息子・諧（Kai）の誕生" width="1080" height="1080"><figcaption>ドイツで結婚 · 息子の誕生</figcaption></figure></div>`,
    notes: [
      'キャリアトークでは研究だけ語りがちですが、海外では生活手続きが大きな比重を占めます。住民登録、外国人局、保険、住居。',
      '2025年は第一子の誕生、永住権（PR）取得など、家族のライフイベントと研究が並行しました。配偶者のサポートなしには回りません。',
      '学会出張はヨーロッパ内だと比較的移動しやすく、ネットワーク形成のチャンスでもあります。一方で、育児期は出張の調整が必要になります。',
      '為替（ユーロ高）や物価も無視できません。リアルな話として触れると、学生の準備が具体化します。'
    ],
    cue: '「キラキラ海外」だけにしない。それでも選び続ける理由も一言添える。',
    sources: [
      source('note · 2025年振り返り', 'https://note.com/ko_watanabe_note/n/na248a96494e1')
    ]
  },
  {
    title: 'SPRING / BOOST の皆さんへ',
    section: 'メッセージ',
    minutes: 3,
    dark: true,
    html: `<p class="eyebrow reveal">今日持ち帰ってほしいこと</p><h2 class="reveal">SPRING / BOOST の<br>皆さんへ</h2><div class="message-list"><article class="reveal"><strong>01</strong><div><h3>キャリアは一本道ではない</h3><p>企業経由の博士、研究所雇用の博士、日本との掛け持ち——型は複数ある。</p></div></article><article class="reveal"><strong>02</strong><div><h3>人の縁を資産にする</h3><p>インターン、同僚、同期。数年後に扉を開けるのは、多くの場合「人」。</p></div></article><article class="reveal"><strong>03</strong><div><h3>直感を、経験で裏打ちする</h3><p>やってみたいを大切に。ただし手続き・資金・生活は調べてから飛ぶ。</p></div></article><article class="reveal"><strong>04</strong><div><h3>博士後を先に想像する</h3><p>学位取得後に何をしたいか。研究・産業・橋渡し——出口から逆算も有効。</p></div></article></div>`,
    notes: [
      'ここが本トークの核心。4点をゆっくり話す。',
      '01：自分の道が「遠回り」に見えても、欧州では十分あり得るルートです。',
      '02：スキルシートより、一緒に働いた人・案内した同僚・同期の方が長期的に効いた場面が多いです。',
      '03：私は直感で動くことが多いですが、それは過去のインターンや社会人経験という論理が下支えしています。無計画な飛び込みを推奨しているわけではありません。',
      '04：SPRING/BOOST は博士課程の支援です。在学中から「博士後の仮説」を複数持っておくと、海外応募や共同研究の声かけが具体化します。',
      '余裕があれば、聴衆に「いまの仮説を一つだけ隣の人と共有」してもらう（30秒）。時間なければスキップ。'
    ],
    cue: '最も時間をかけてよいスライド。具体エピソードを1つずつ添える。',
    sources: []
  },
  {
    title: '今日のまとめ',
    section: 'おわりに',
    minutes: 1,
    html: `<p class="eyebrow reveal">30分の要約</p><h2 class="reveal">今日のまとめ</h2><div class="conclusion-points"><article class="reveal"><h3>参考キャリア例</h3><p>農工大 → NAIST → DeNA → ドイツ博士 → DFKI</p></article><article class="reveal"><h3>学び</h3><p>社会人経験も、研究所雇用の博士も、立派な選択肢</p></article><article class="reveal"><h3>姿勢</h3><p>きっかけを逃さず、人を大切に、生活も設計する</p></article></div><p class="keyline reveal">博士後のキャリアは数多あります。<br>ワクワクする方向に進むことで最大の幸せを得られると思っています。</p>`,
    notes: [
      '3点で締める。新しい情報は足さない。',
      '最後の一文で、行動（下書きを更新する）を促す。',
      'Q&A への橋渡し：「海外応募の始め方」「語学」「給与感」「家族帯同」など、聞きたいテーマを歓迎する。'
    ],
    cue: '時計を見て、まとめを急がない。余った時間はQ&Aへ。',
    sources: []
  },
  {
    title: 'ありがとうございました',
    section: 'おわりに',
    minutes: 1,
    dark: true,
    className: 'thanks',
    html: `<p class="eyebrow reveal">Thank you</p><h1 class="reveal">ありがとう<br>ございました</h1><p class="lead reveal">ご質問・キャリア相談、お気軽にどうぞ。</p><p class="reveal"><a class="contact" href="mailto:ko.watanabe@dfki.de">ko.watanabe@dfki.de</a></p><p class="small reveal thanks-links"><a href="https://ko-watanabe.github.io/" target="_blank" rel="noopener noreferrer">Web</a> · <a href="https://note.com/ko_watanabe_note" target="_blank" rel="noopener noreferrer">note</a> · <a href="https://www.youtube.com/@ko_watanabe" target="_blank" rel="noopener noreferrer">YouTube</a> · <a href="https://scholar.google.com/citations?user=AluAUmEAAAAJ&hl=ja" target="_blank" rel="noopener noreferrer">Scholar</a><br>スライドはサイトの Slides からも開けます</p>`,
    notes: [
      '御礼と連絡先。DFKI に興味のある学生は X やメールでも歓迎、と伝える。',
      '時間があれば、よくある質問（ドイツ語は必須か？ 修士から直接来られるか？ など）に先回りして一文。',
      'ドイツ語：研究室・国際チームでは英語中心のことも多いが、生活ではドイツ語が強力。必須度は職場による。',
      '閉会の挨拶で主催・筑波大学・会場のルール大学ボーフムにも謝意を。'
    ],
    cue: '拍手のあと、最初の質問を取りやすくする一言を用意する。',
    sources: [
      source('個人サイト', 'https://ko-watanabe.github.io/'),
      source('note', 'https://note.com/ko_watanabe_note'),
      source('YouTube', 'https://www.youtube.com/@ko_watanabe'),
      source('Google Scholar', 'https://scholar.google.com/citations?user=AluAUmEAAAAJ&hl=ja'),
      source('メール', 'mailto:ko.watanabe@dfki.de')
    ]
  }
];
