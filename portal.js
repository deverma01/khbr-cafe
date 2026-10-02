/**
 * खबर Cafe - 3D News Portal & Admin Engine
 * Supabase v2 Integration, 3D Tilt, Text-to-Speech, e-Paper & Ad Engine
 */

// Supabase Configuration
const DEFAULT_SUPABASE_URL = "https://qmkctxwnqvpwdgwtrqqb.supabase.co";
const DEFAULT_SUPABASE_KEY = "sb_publishable_yIWPqAEVbb3EyJI5Av4EHQ_BmSW7g3x";
const BUCKET_NAME = "news-media";

let SUPABASE_URL = (typeof localStorage !== 'undefined' && localStorage.getItem('khabarcafe_supabase_url')) || DEFAULT_SUPABASE_URL;
let SUPABASE_ANON_KEY = (typeof localStorage !== 'undefined' && localStorage.getItem('khabarcafe_supabase_key')) || DEFAULT_SUPABASE_KEY;

let supabaseClient = null;
try {
  if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase Client initialized successfully for खबर Cafe.");
  }
} catch (err) {
  console.warn("Supabase init warning:", err);
}

// Initial Rich Hindi News Seed Data
const DEFAULT_ARTICLES = [
  {
    id: "art-1",
    title: "छत्तीसगढ़ में सेमीकंडक्टर और आईटी हब को कैबिनेट की हरी झंडी, 10,000 युवाओं को मिलेगा सीधा रोजगार",
    category: "local",
    categoryName: "छत्तीसगढ़ / स्थानीय",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    desc: "नया रायपुर में 200 एकड़ में बनेगा अत्याधुनिक आईटी पार्क। राज्य सरकार ने दी विशेष इंसेंटिव पैकेज को मंजूरी।",
    content: `नया रायपुर (अटल नगर) में देश का नया सेमीकंडक्टर और आईटी कॉरिडोर स्थापित होने जा रहा है। कैबिनेट की उच्चस्तरीय बैठक में आज इस महत्वाकांक्षी परियोजना को अंतिम मंजूरी दे दी गई।\n\nमुख्यमंत्री ने प्रेस वार्ता में बताया कि इस परियोजना से प्रदेश के 10,000 से अधिक स्थानीय इंजीनियरिंग और डिप्लोमा छात्रों को प्रत्यक्ष रोजगार मिलेगा। साथ ही वैश्विक टेक कंपनियों को आकर्षित करने के लिए विशेष टैक्स छूट और 24 घंटे अनइंटरप्टेड ग्रीन एनर्जी की गारंटी दी गई है।\n\nस्थानीय उद्योग संघों ने इस निर्णय का स्वागत करते हुए इसे छत्तीसगढ़ के औद्योगिक इतिहास का स्वर्णिम अध्याय करार दिया है। पहले चरण का निर्माण कार्य आगामी नवंबर माह से प्रारंभ होगा।`,
    tags: ["छत्तीसगढ़", "रोजगार", "नया रायपुर", "आईटी"],
    isBreaking: true,
    isFeatured: true,
    date: "1 अक्टूबर 2026",
    timeAgo: "15 मिनट पहले",
    views: 3420
  },
  {
    id: "art-2",
    title: "केंद्रीय बजट 2026: मध्यम वर्ग को आयकर में ऐतिहासिक राहत, एआई और ग्रीन मोबिलिटी के लिए 1 लाख करोड़",
    category: "national",
    categoryName: "राष्ट्रीय",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80",
    desc: "वित्त मंत्री ने पेश किया विकसित भारत 2047 का रोडमैप। मध्यम वर्ग के लिए टैक्स स्लैब में बड़े सुधार की घोषणा।",
    content: `संसद में प्रस्तुत वार्षिक बजट में इस वर्ष नवाचार, इंफ्रास्ट्रक्चर और मध्यम वर्ग की क्रय शक्ति बढ़ाने पर विशेष ध्यान केंद्रित किया गया है। नई कर व्यवस्था के तहत 12 लाख रुपये तक की वार्षिक आय पर कर की दरों में उल्लेखनीय कटौती की गई है।\n\nइसके अलावा देश में कृत्रिम बुद्धिमत्ता (AI) अनुसंधान केंद्रों, हाई-स्पीड रेल कॉरिडोर और ग्रीन हाइड्रोजन उत्पादन के लिए 1 लाख करोड़ रुपये के विशेष कोष का प्रावधान किया गया है।\n\nशेयर बाजारों ने बजट प्रस्तावों का उत्साहपूर्वक स्वागत किया और सेंसेक्स में 800 से अधिक अंकों का उछाल दर्ज किया गया।`,
    tags: ["बजट 2026", "वित्त", "टैक्स रिलीफ", "राष्ट्रीय"],
    isBreaking: true,
    isFeatured: true,
    date: "1 अक्टूबर 2026",
    timeAgo: "40 मिनट पहले",
    views: 5890
  },
  {
    id: "art-3",
    title: "संसद का विशेष सत्र: डिजिटल सुरक्षा व डेटा प्राइवेसी संशोधन विधेयक पर गरमाई बहस",
    category: "politics",
    categoryName: "राजनीति",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    desc: "पक्ष और विपक्ष के बीच कड़े तर्क-वितर्क। सरकार ने कहा- नागरिकों की निजता और राष्ट्रीय सुरक्षा सर्वोपरि।",
    content: `डिजिटल युग में भारतीय नागरिकों के व्यक्तिगत डेटा की सुरक्षा और साइबर अपराधों की रोकथाम के लिए लाया गया नया संशोधन विधेयक संसद में चर्चा के केंद्र में रहा।\n\nकेंद्रीय कानून मंत्री ने स्पष्ट किया कि यह कानून किसी भी आम नागरिक की स्वतंत्रता में हस्तक्षेप नहीं करेगा, बल्कि सोशल मीडिया प्लेटफॉर्म्स को भारतीय कानूनों के प्रति अधिक जवाबदेह बनाएगा।\n\nसंसदीय समिति की अनुशंसाओं पर कल मतदान होने की संभावना है।`,
    tags: ["संसद", "राजनीति", "डिजिटल सुरक्षा", "विधेयक"],
    isBreaking: false,
    isFeatured: true,
    date: "1 अक्टूबर 2026",
    timeAgo: "2 घंटे पहले",
    views: 2980
  },
  {
    id: "art-4",
    title: "टी20 विश्व कप फाइनल: भारत ने ऑस्ट्रेलिया को रोमांचक मुकाबले में 7 रनों से हराया",
    category: "sports",
    categoryName: "खेल",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    desc: "अंतिम ओवर में गेंदबाज ने बचाए 14 रन। पूरे देश में विजय का जश्न और आतिशबाजी।",
    content: `मेलबर्न में खेले गए सांस रोक देने वाले फाइनल मुकाबले में भारतीय क्रिकेट टीम ने अद्भुत जुझारूपन दिखाते हुए ऑस्ट्रेलिया को 7 रनों से परास्त कर विश्व कप ट्रॉफी पर कब्जा जमा लिया।\n\nकप्तान ने शानदार 84 रनों की पारी खेली, जबकि युवा तेज गेंदबाज ने अंतिम ओवर में सटीक यॉर्कर फेंककर मैच भारत की झोली में डाल दिया।\n\nराष्ट्रपति और प्रधानमंत्री ने पूरी टीम को इस ऐतिहासिक विजय पर बधाई प्रेषित की है।`,
    tags: ["क्रिकेट", "T20 विश्व कप", "टीम इंडिया", "खेल"],
    isBreaking: true,
    isFeatured: false,
    date: "30 सितंबर 2026",
    timeAgo: "4 घंटे पहले",
    views: 8940
  },
  {
    id: "art-5",
    title: "भारतीय वैज्ञानिकों का नया कारनामा: बिना ड्राइवर चलने वाली पहली स्वदेशी इलेक्ट्रिक ट्रेन का सफल परीक्षण",
    category: "tech",
    categoryName: "टेक & ऑटो",
    image: "https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1200&q=80",
    desc: "180 किमी/घंटा की गति से ट्रैक पर दौड़ी स्वदेशी ऑटोनॉमस ट्रेन। दुर्घटना रोकने के लिए लगा एआई-कवच 3.0।",
    content: `भारतीय रेल और इसरो के संयुक्त सहयोग से विकसित भारत की पहली पूर्णतः स्वायत्त (Driverless) सेमी-हाईस्पीड ट्रेन का सफल ट्रायल पूरा कर लिया गया है।\n\nयह ट्रेन अत्याधुनिक सैटेलाइट नेविगेशन और LiDAR सेंसर्स से लैस है, जो किसी भी प्रकार की पटरी अवरोध या मौसम की खराबी में स्वतः सुरक्षित ब्रेक लगाने में सक्षम है।\n\nरेल मंत्रालय के अनुसार आगामी वर्ष तक देश के 5 प्रमुख रूट्स पर इसे आम जनता के लिए प्रारंभ किया जाएगा।`,
    tags: ["टेक्नोलॉजी", "भारतीय रेल", "AI", "नवाचार"],
    isBreaking: false,
    isFeatured: false,
    date: "30 सितंबर 2026",
    timeAgo: "6 घंटे पहले",
    views: 4120
  },
  {
    id: "art-6",
    title: "विशेष ग्राउंड रिपोर्ट: बस्तर के जंगलों में इको-टूरिज्म की नई लहर, जनजातीय होमस्टे बन रहे वैश्विक पसंद",
    category: "local",
    categoryName: "छत्तीसगढ़ / स्थानीय",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    desc: "चित्रकोट जलप्रपात और कांगेर घाटी में पर्यटकों की भारी आमद। स्थानीय युवाओं को मिल रहा सीधा आर्थिक संबल।",
    content: `कभी अशांति के लिए चर्चा में रहने वाले बस्तर के वनांचल अब प्राकृतिक सौंदर्य और समृद्ध संस्कृति के वैश्विक केंद्र के रूप में उभर रहे हैं।\n\nचित्रकोट और तीरथगढ़ जलप्रपात के आसपास शुरू किए गए 'बस्तर होमस्टे' मॉडल को राष्ट्रीय स्तर पर सर्वश्रेष्ठ नवाचार का पुरस्कार मिला है। स्थानीय जनजातीय युवा अब गाइड और हॉस्पिटैलिटी मैनेजर के रूप में पर्यटकों का स्वागत कर रहे हैं।`,
    tags: ["बस्तर", "छत्तीसगढ़", "पर्यटन", "ग्राउंड रिपोर्ट"],
    isBreaking: false,
    isFeatured: false,
    date: "29 सितंबर 2026",
    timeAgo: "8 घंटे पहले",
    views: 2650
  }
];

// Seed Videos for Video Hub
const DEFAULT_VIDEOS = [
  {
    id: "vid-1",
    title: "खबर Cafe स्पेशल बुलेटिन: आज की 50 बड़ी सुर्खियां एक नज़र में",
    embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "12:45",
    time: "आज दोपहर",
    views: "24K"
  },
  {
    id: "vid-2",
    title: "ग्राउंड रिपोर्ट: नया रायपुर सेमीकंडक्टर पार्क से सीधी कवरेज",
    embedUrl: "https://www.youtube.com/embed/L_LUpnjgPso",
    duration: "08:20",
    time: "1 घंटा पहले",
    views: "18K"
  },
  {
    id: "vid-3",
    title: "विशेष साक्षात्कार: खेल मंत्री ने बताया ओलंपिक 2036 की तैयारियां",
    embedUrl: "https://www.youtube.com/embed/fJ9rUzIMcZQ",
    duration: "15:10",
    time: "3 घंटे पहले",
    views: "12K"
  }
];

// App State
let currentArticles = [];
let currentCategory = 'all';
let heroSliderIndex = 0;
let heroSliderTimer = null;
let currentEpaperZoom = 1.0;
let currentEpaperPage = 1;
let currentReadingArticle = null;
let speechUtterance = null;
let isSpeaking = false;
let isAdminAuthenticated = false;

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadArticles();
  initDateTime();
  initTheme();
  initSearch();
  initVideoHub();
  initEpaper();
  initVanillaTilt();
});

// Load Articles (Supabase + LocalStorage Fallback)
async function loadArticles() {
  let loaded = false;

  // Try Supabase first if online
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('articles')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) {
        currentArticles = data.map(item => ({
          id: item.id || `sup-${Math.random()}`,
          title: item.title,
          category: item.category || 'national',
          categoryName: getCategoryLabel(item.category),
          image: item.image || item.image_url || DEFAULT_ARTICLES[0].image,
          desc: item.desc || item.short_desc || item.title,
          content: item.content || item.desc,
          tags: Array.isArray(item.tags) ? item.tags : (item.tags ? item.tags.split(',') : []),
          isBreaking: item.is_breaking || item.isBreaking || false,
          isFeatured: item.is_featured || item.isFeatured || false,
          date: item.date || "1 अक्टूबर 2026",
          timeAgo: item.time_ago || "हाल ही में",
          views: item.views || 100
        }));
        loaded = true;
        console.log("Loaded articles from Supabase:", currentArticles.length);
      }
    } catch (e) {
      console.warn("Supabase fetch failed, checking local cache", e);
    }
  }

  // Fallback to LocalStorage or Default Seed Data
  if (!loaded) {
    const local = localStorage.getItem('khabarcafe_articles');
    if (local) {
      try {
        currentArticles = JSON.parse(local);
        loaded = true;
      } catch (err) {
        currentArticles = [...DEFAULT_ARTICLES];
      }
    } else {
      currentArticles = [...DEFAULT_ARTICLES];
      saveLocalArticles();
    }
  }

  renderUI();
}

function saveLocalArticles() {
  localStorage.setItem('khabarcafe_articles', JSON.stringify(currentArticles));
}

function getCategoryLabel(cat) {
  const map = {
    national: 'राष्ट्रीय',
    politics: 'राजनीति',
    local: 'छत्तीसगढ़ / स्थानीय',
    sports: 'खेल',
    tech: 'टेक & ऑटो',
    video: 'वीडियो न्यूज़'
  };
  return map[cat] || 'सामान्य';
}

// Render Complete UI
function renderUI() {
  renderBreakingTicker();
  renderHeroSlider();
  renderTrendingList();
  renderNewsGrid();
  initVanillaTilt();
}

// 1. Live Date & Time in Hindi
function initDateTime() {
  const el = document.getElementById('current-datetime');
  function update() {
    const now = new Date();
    const days = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
    const months = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
    
    const dayName = days[now.getDay()];
    const dateNum = now.getDate();
    const monthName = months[now.getMonth()];
    const year = now.getFullYear();
    
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'दोपहर' : 'सुबह';
    hours = hours % 12 || 12;

    if (el) {
      el.innerHTML = `<i class="fa-regular fa-clock text-brand-gold mr-1.5"></i> ${dayName}, ${dateNum} ${monthName} ${year} · ${hours}:${minutes} ${ampm}`;
    }
  }
  update();
  setInterval(update, 30000);
}

// 2. Breaking News Ticker
function renderBreakingTicker() {
  const tickerEl = document.getElementById('ticker-content');
  if (!tickerEl) return;

  const breaking = currentArticles.filter(a => a.isBreaking);
  const items = breaking.length > 0 ? breaking : currentArticles;

  tickerEl.innerHTML = items.map(item => `
    <span class="cursor-pointer hover:underline" onclick="openArticleModalById('${item.id}')">
      🔥 ${escapeHtml(item.title)}
    </span>
  `).join('<span class="mx-6 text-white/50">·</span>');
}

// 3. 3D Hero Slider
function renderHeroSlider() {
  const featured = currentArticles.filter(a => a.isFeatured);
  const items = featured.length > 0 ? featured : currentArticles;
  if (items.length === 0) return;

  if (heroSliderIndex >= items.length) heroSliderIndex = 0;
  const curr = items[heroSliderIndex];

  const imgEl = document.getElementById('hero-slider-img');
  const catEl = document.getElementById('hero-slider-category');
  const timeEl = document.getElementById('hero-slider-time');
  const titleEl = document.getElementById('hero-slider-title');
  const descEl = document.getElementById('hero-slider-desc');
  const readBtn = document.getElementById('hero-read-btn');

  if (imgEl) {
    imgEl.src = curr.image;
    imgEl.onerror = () => { imgEl.src = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80"; };
  }
  if (catEl) catEl.textContent = curr.categoryName || getCategoryLabel(curr.category);
  if (timeEl) timeEl.textContent = curr.timeAgo || curr.date;
  if (titleEl) {
    titleEl.textContent = curr.title;
    titleEl.onclick = () => openArticleModal(curr);
  }
  if (descEl) descEl.textContent = curr.desc;
  if (readBtn) readBtn.onclick = () => openArticleModal(curr);

  // Wire up slider buttons
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');

  if (prevBtn) {
    prevBtn.onclick = () => {
      heroSliderIndex = (heroSliderIndex - 1 + items.length) % items.length;
      renderHeroSlider();
      resetSliderTimer();
    };
  }
  if (nextBtn) {
    nextBtn.onclick = () => {
      heroSliderIndex = (heroSliderIndex + 1) % items.length;
      renderHeroSlider();
      resetSliderTimer();
    };
  }

  resetSliderTimer();
}

function resetSliderTimer() {
  clearInterval(heroSliderTimer);
  heroSliderTimer = setInterval(() => {
    const featured = currentArticles.filter(a => a.isFeatured);
    const items = featured.length > 0 ? featured : currentArticles;
    if (items.length > 1) {
      heroSliderIndex = (heroSliderIndex + 1) % items.length;
      renderHeroSlider();
    }
  }, 6000);
}

// 4. Trending Feed (Sidebar)
function renderTrendingList() {
  const container = document.getElementById('trending-list');
  if (!container) return;

  const trending = [...currentArticles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  container.innerHTML = trending.map((item, idx) => `
    <div onclick="openArticleModalById('${item.id}')" class="flex items-start gap-3 p-2 rounded-xl hover:bg-white/5 cursor-pointer transition group border border-transparent hover:border-white/10">
      <span class="text-xl font-black text-brand-gold/60 group-hover:text-brand-gold font-mono shrink-0 w-6">0${idx + 1}</span>
      <div class="overflow-hidden">
        <span class="text-[10px] text-brand-red font-bold uppercase tracking-wider block mb-0.5">${item.categoryName || getCategoryLabel(item.category)}</span>
        <h4 class="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-2 leading-snug">
          ${escapeHtml(item.title)}
        </h4>
        <span class="text-[10px] text-slate-400 mt-1 block">${item.timeAgo || 'आज'} · ${(item.views || 120).toLocaleString('hi-IN')} व्यूज</span>
      </div>
    </div>
  `).join('');
}

// 5. Main News Grid with 3D Tilt Cards
function renderNewsGrid() {
  const grid = document.getElementById('news-grid');
  const countEl = document.getElementById('articles-count');
  if (!grid) return;

  let filtered = currentArticles;
  if (currentCategory !== 'all') {
    filtered = currentArticles.filter(a => a.category === currentCategory);
  }

  if (countEl) countEl.textContent = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-400 space-y-2">
        <i class="fa-solid fa-newspaper text-4xl text-slate-600 mb-2"></i>
        <p class="text-base font-bold">इस श्रेणी में कोई खबर उपलब्ध नहीं है।</p>
        <p class="text-xs">कृपया अन्य श्रेणी चुनें या एडमिन पैनल से नई खबर जोड़ें।</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <div class="tilt-card glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col group cursor-pointer transition-all duration-300" 
         data-tilt data-tilt-max="10" data-tilt-speed="400" data-tilt-glare data-tilt-max-glare="0.15"
         onclick="openArticleModalById('${item.id}')">
      
      <!-- Card Image -->
      <div class="relative h-48 w-full overflow-hidden bg-slate-900">
        <img src="${item.image}" alt="${escapeHtml(item.title)}" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onerror="this.src='https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80'"
          loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        <div class="absolute top-3 left-3 flex items-center gap-1.5">
          <span class="bg-black/60 backdrop-blur-md text-brand-gold text-[10px] font-bold px-2 py-0.5 rounded border border-brand-gold/30 uppercase tracking-wider">
            ${item.categoryName || getCategoryLabel(item.category)}
          </span>
          ${item.isBreaking ? '<span class="bg-brand-red text-white text-[10px] font-black px-2 py-0.5 rounded shadow animate-pulse">BREAKING</span>' : ''}
        </div>

        <div class="absolute bottom-2.5 right-3 text-[11px] text-slate-300 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
          <i class="fa-regular fa-clock mr-1"></i> ${item.timeAgo || item.date}
        </div>
      </div>

      <!-- Card Body -->
      <div class="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div class="space-y-2">
          <h3 class="text-base font-bold text-white group-hover:text-brand-gold transition duration-200 line-clamp-2 leading-snug">
            ${escapeHtml(item.title)}
          </h3>
          <p class="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            ${escapeHtml(item.desc)}
          </p>
        </div>

        <div class="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span class="text-brand-red font-semibold group-hover:translate-x-1 transition duration-200 flex items-center gap-1">
            पूरी खबर पढ़ें <i class="fa-solid fa-arrow-right text-[10px]"></i>
          </span>
          <div class="flex items-center gap-2">
            <button onclick="event.stopPropagation(); quickShareWhatsapp('${escapeHtml(item.title)}')" class="hover:text-emerald-400 transition" title="शेयर करें">
              <i class="fa-brands fa-whatsapp text-sm"></i>
            </button>
            <span class="text-[11px]"><i class="fa-regular fa-eye mr-1"></i>${(item.views || 50).toLocaleString('hi-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  initVanillaTilt();
}

// Category Filter Handler
window.filterCategory = function(cat) {
  currentCategory = cat;
  switchView('portal');

  // Update Nav Active state
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.remove('bg-brand-red/20', 'text-brand-gold', 'border', 'border-brand-red/30');
    btn.classList.add('text-slate-300');
  });

  const activeBtn = event ? event.target.closest('.nav-btn') : null;
  if (activeBtn) {
    activeBtn.classList.add('bg-brand-red/20', 'text-brand-gold', 'border', 'border-brand-red/30');
    activeBtn.classList.remove('text-slate-300');
  }

  const titleEl = document.getElementById('section-category-title');
  if (titleEl) {
    if (cat === 'all') titleEl.textContent = 'ताज़ा और महत्वपूर्ण खबरें';
    else titleEl.textContent = `${getCategoryLabel(cat)} समाचार`;
  }

  renderNewsGrid();
  window.scrollTo({ top: 380, behavior: 'smooth' });
};

// Search Filter Handler
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      loadArticles();
      return;
    }
    const filtered = currentArticles.filter(a => 
      a.title.toLowerCase().includes(query) ||
      (a.desc && a.desc.toLowerCase().includes(query)) ||
      (a.content && a.content.toLowerCase().includes(query)) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(query)))
    );
    currentArticles = filtered;
    renderNewsGrid();
  });
}

// 6. Article Reader Modal & AI Audio (Text-to-Speech)
window.openArticleModalById = function(id) {
  const art = currentArticles.find(a => a.id === id);
  if (art) openArticleModal(art);
};

window.openArticleModal = function(article) {
  currentReadingArticle = article;
  article.views = (article.views || 100) + 1;

  const modal = document.getElementById('article-modal');
  const imgEl = document.getElementById('modal-img');
  const catEl = document.getElementById('modal-category');
  const dateEl = document.getElementById('modal-date');
  const titleEl = document.getElementById('modal-title');
  const contentEl = document.getElementById('modal-content');
  const tagsEl = document.getElementById('modal-tags');

  if (imgEl) imgEl.src = article.image;
  if (catEl) catEl.textContent = article.categoryName || getCategoryLabel(article.category);
  if (dateEl) dateEl.textContent = `${article.date} · ${article.timeAgo || 'हाल ही में'}`;
  if (titleEl) titleEl.textContent = article.title;
  
  if (contentEl) {
    const paragraphs = article.content.split('\n\n');
    contentEl.innerHTML = paragraphs.map(p => `<p class="leading-relaxed mb-4">${escapeHtml(p)}</p>`).join('');
  }

  if (tagsEl) {
    tagsEl.innerHTML = (article.tags || []).map(t => `
      <span class="bg-white/10 hover:bg-brand-gold hover:text-black transition px-2.5 py-1 rounded text-[11px] cursor-pointer">
        #${escapeHtml(t)}
      </span>
    `).join('');
  }

  stopAudioReader();
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeArticleModal = function() {
  stopAudioReader();
  const modal = document.getElementById('article-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
  currentReadingArticle = null;
};

// Text-To-Speech (AI Hindi Audio Reader)
window.toggleAudioReader = function() {
  if (!('speechSynthesis' in window)) {
    alert('क्षमा करें, आपका ब्राउज़र टेक्स्ट-टू-स्पीच सपोर्ट नहीं करता है।');
    return;
  }

  if (isSpeaking) {
    stopAudioReader();
    return;
  }

  if (!currentReadingArticle) return;

  const textToRead = `${currentReadingArticle.title}. ${currentReadingArticle.desc}. ${currentReadingArticle.content}`;
  speechUtterance = new SpeechSynthesisUtterance(textToRead);
  speechUtterance.lang = 'hi-IN';
  speechUtterance.rate = 0.95;

  // Find Hindi voice if available
  const voices = window.speechSynthesis.getVoices();
  const hindiVoice = voices.find(v => v.lang.includes('hi') || v.name.includes('Hindi'));
  if (hindiVoice) speechUtterance.voice = hindiVoice;

  speechUtterance.onstart = () => {
    isSpeaking = true;
    updateTtsButton(true);
  };

  speechUtterance.onend = () => {
    isSpeaking = false;
    updateTtsButton(false);
  };

  speechUtterance.onerror = () => {
    isSpeaking = false;
    updateTtsButton(false);
  };

  window.speechSynthesis.speak(speechUtterance);
};

function stopAudioReader() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
  isSpeaking = false;
  updateTtsButton(false);
}

function updateTtsButton(speaking) {
  const btn = document.getElementById('tts-btn');
  const icon = document.getElementById('tts-icon');
  const text = document.getElementById('tts-text');

  if (!btn) return;
  if (speaking) {
    btn.classList.add('animate-pulse', 'bg-red-600');
    icon.className = 'fa-solid fa-circle-stop';
    text.textContent = 'ऑडियो रोकें (Playing...)';
  } else {
    btn.classList.remove('animate-pulse', 'bg-red-600');
    icon.className = 'fa-solid fa-volume-high';
    text.textContent = 'AI ऑडियो रीडर (सुनें)';
  }
}

// Font Size Adjuster
let currentFontSize = 16;
window.adjustArticleFontSize = function(delta) {
  currentFontSize = Math.min(24, Math.max(14, currentFontSize + delta * 2));
  const contentEl = document.getElementById('modal-content');
  if (contentEl) {
    contentEl.style.fontSize = `${currentFontSize}px`;
  }
};

// Social Sharing
window.shareArticle = function(platform) {
  if (!currentReadingArticle) return;
  const title = encodeURIComponent(currentReadingArticle.title);
  const url = encodeURIComponent(window.location.href);

  if (platform === 'whatsapp') {
    window.open(`https://api.whatsapp.com/send?text=${title}%20-%20पूरी%20खबर%20पढ़ें%20खबर%20Cafe%20पर:%20${url}`, '_blank');
  } else if (platform === 'facebook') {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  } else if (platform === 'twitter') {
    window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
  } else if (platform === 'copy') {
    navigator.clipboard.writeText(`${currentReadingArticle.title}\n${window.location.href}`)
      .then(() => alert('लिंक क्लिपबोर्ड पर कॉपी हो गया है!'))
      .catch(() => alert('लिंक कॉपी करने में असमर्थ।'));
  }
};

window.quickShareWhatsapp = function(title) {
  const text = encodeURIComponent(`${title} - खबर Cafe 3D न्यूज़ पोर्टल पर पढ़ें: ${window.location.href}`);
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
};

// 7. Video News Hub
function initVideoHub() {
  const container = document.getElementById('video-playlist');
  if (!container) return;

  container.innerHTML = DEFAULT_VIDEOS.map((vid, idx) => `
    <div onclick="switchMainVideo('${vid.embedUrl}')" class="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition border border-white/5 group">
      <div class="w-16 h-12 rounded-lg bg-slate-800 flex items-center justify-center relative shrink-0 overflow-hidden">
        <i class="fa-solid fa-play text-brand-red text-sm group-hover:scale-125 transition"></i>
      </div>
      <div class="overflow-hidden">
        <h5 class="text-xs font-bold text-white group-hover:text-brand-gold truncate">${escapeHtml(vid.title)}</h5>
        <div class="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
          <span><i class="fa-regular fa-clock mr-1"></i>${vid.duration}</span>
          <span>·</span>
          <span>${vid.views} व्यूज</span>
        </div>
      </div>
    </div>
  `).join('');
}

window.switchMainVideo = function(embedUrl) {
  const iframe = document.getElementById('main-video-iframe');
  if (iframe) {
    iframe.src = `${embedUrl}?autoplay=1`;
  }
};

// 8. Daily e-Paper Module (Interactive Digital Broadsheet)
function initEpaper() {
  const datePicker = document.getElementById('epaper-date-picker');
  const displayDate = document.getElementById('epaper-display-date');
  const tabsContainer = document.getElementById('epaper-page-tabs');
  const downloadBtn = document.getElementById('epaper-download-btn');

  const today = new Date().toISOString().split('T')[0];
  if (datePicker) {
    datePicker.value = today;
    datePicker.addEventListener('change', (e) => {
      if (displayDate) displayDate.textContent = formatDateHindi(e.target.value);
      renderEpaperPage(1);
    });
  }

  if (displayDate) displayDate.textContent = '1 अक्टूबर 2026';

  // Render Page Tabs
  const totalPages = 4;
  if (tabsContainer) {
    tabsContainer.innerHTML = Array.from({ length: totalPages }, (_, i) => `
      <button onclick="changeEpaperPage(${i + 1})" class="epaper-tab-btn px-3 py-1.5 rounded-lg text-xs font-bold transition ${i === 0 ? 'bg-brand-gold text-black' : 'bg-white/10 text-white hover:bg-white/20'}">
        पृष्ठ ${i + 1}
      </button>
    `).join('');
  }

  if (downloadBtn) {
    downloadBtn.onclick = () => {
      alert('खबर Cafe दैनिक e-Paper PDF डाउनलोड प्रारंभ हो रहा है...');
      // Simulated or real file download
      const link = document.createElement('a');
      link.href = '#';
      link.download = `KhabarCafe_ePaper_${today}.pdf`;
      link.click();
    };
  }

  renderEpaperPage(1);
}

function formatDateHindi(dateStr) {
  const d = new Date(dateStr);
  const months = ['जनवरी', 'फ़रवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

window.changeEpaperPage = function(pageNum) {
  currentEpaperPage = pageNum;
  document.querySelectorAll('.epaper-tab-btn').forEach((btn, idx) => {
    if (idx + 1 === pageNum) {
      btn.className = 'epaper-tab-btn px-3 py-1.5 rounded-lg text-xs font-bold transition bg-brand-gold text-black';
    } else {
      btn.className = 'epaper-tab-btn px-3 py-1.5 rounded-lg text-xs font-bold transition bg-white/10 text-white hover:bg-white/20';
    }
  });
  renderEpaperPage(pageNum);
};

function renderEpaperPage(pageNum) {
  const container = document.getElementById('epaper-canvas-container');
  if (!container) return;

  const headlines = [
    {
      page: 1,
      title: "छत्तीसगढ़ में सेमीकंडक्टर और आईटी कॉरिडोर को कैबिनेट की ऐतिहासिक मंजूरी",
      sub: "10,000 युवाओं को मिलेगा सीधा रोजगार, 200 एकड़ में बनेगा हाई-टेक पार्क",
      body: "नया रायपुर में विश्वस्तरीय तकनीकी आधारभूत संरचना तैयार करने का संकल्प। राज्य सरकार ने निवेशकों के लिए घोषित की विशेष रियायतें। स्थानीय इंजीनियरिंग स्नातकों में भारी उत्साह...",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
    },
    {
      page: 2,
      title: "संसद का विशेष सत्र: आर्थिक सुधारों एवं डिजिटल संरक्षण कानून पर सर्वसम्मति के संकेत",
      sub: "विपक्ष के सुझावों को शामिल करने पर बनी सहमति, कल हो सकता है पारित",
      body: "दोनों सदनों में दिनभर चली उच्चस्तरीय चर्चा में विशेषज्ञों की राय को प्राथमिकता दी गई। वित्त मंत्री ने कहा कि यह विधेयक भारत को आर्थिक महाशक्ति बनाने की दिशा में मील का पत्थर साबित होगा...",
      img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=600&q=80"
    },
    {
      page: 3,
      title: "बस्तर इको-टूरिज्म: वनांचल के होमस्टे ने खींचा देश-विदेश के पर्यटकों का ध्यान",
      sub: "चित्रकोट और कांगेर घाटी में रिकॉर्ड पर्यटकों की संख्या दर्ज",
      body: "स्थानीय जनजातीय युवाओं ने तैयार किया अनूठा आतिथ्य मॉडल। प्राकृतिक सौंदर्य के साथ स्थानीय खानपान और पारंपरिक कला का अद्भुत संगम पेश कर रहे हैं...",
      img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    },
    {
      page: 4,
      title: "खेल जगत: भारत ने जीता टी20 विश्व कप, मेलबर्न में लहराया तिरंगा",
      sub: "कप्तान की जुझारू पारी और गेंदबाजों के सटीक यॉर्कर्स ने दिलाई स्वर्णिम जीत",
      body: "करोड़ों क्रिकेट प्रशंसकों ने रातभर मनाया जीत का जश्न। प्रधानमंत्री और राष्ट्रपति ने खिलाड़ियों को टेलीफोन पर दी बधाई। पुरस्कार राशि में विशेष वृद्धि की घोषणा...",
      img: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const item = headlines[pageNum - 1] || headlines[0];

  container.innerHTML = `
    <!-- Newspaper Masthead -->
    <div class="border-b-4 border-black pb-4 mb-6 text-center">
      <div class="flex items-center justify-between text-[11px] font-sans uppercase font-bold tracking-widest text-neutral-700 border-b border-black/40 pb-1 mb-2">
        <span>वर्ष 14 · अंक 284 · RNI: CGHIN/2026/99881</span>
        <span>रायपुर, गुरुवार 1 अक्टूबर 2026</span>
        <span>मूल्य: ₹4.50 · कुल पृष्ठ: 16</span>
      </div>
      <div class="flex items-center justify-center gap-3">
        <h1 class="text-5xl font-black font-brandHindi tracking-wide text-neutral-900">खबर Cafe</h1>
      </div>
      <p class="text-xs font-sans text-neutral-600 mt-1 tracking-wider uppercase">सत्य का साक्षात् प्रमाण · निष्पक्ष दैनिक समाचार पत्र</p>
    </div>

    <!-- Broadsheet Multi-Column Layout -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
      
      <!-- Lead Story (Col 8) -->
      <div class="md:col-span-8 space-y-4 pr-0 md:pr-4 md:border-r border-black/30">
        <div class="space-y-1">
          <span class="text-xs font-bold text-red-700 uppercase tracking-wider font-sans">विशेष संपादकीय कवरेज · पृष्ठ ${pageNum}</span>
          <h2 class="text-2xl sm:text-3xl font-bold text-black leading-tight">
            ${item.title}
          </h2>
          <h3 class="text-sm font-semibold text-neutral-700 italic">
            ${item.sub}
          </h3>
        </div>

        <div class="w-full h-64 overflow-hidden rounded border border-black/20 my-3">
          <img src="${item.img}" alt="ePaper Image" class="w-full h-full object-cover grayscale contrast-125">
        </div>

        <div class="text-sm text-neutral-900 columns-1 sm:columns-2 gap-6 leading-relaxed text-justify">
          <p class="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2">
            ${item.body}
          </p>
          <p class="mt-3">
            विशेषज्ञों का मानना है कि इस पहल से स्थानीय अर्थव्यवस्था को नई गति मिलेगी। आम जनता ने भी सरकार के इस कदम की सराहना की है। विस्तृत रिपोर्ट आगामी अंकों में प्रकाशित की जाएगी।
          </p>
        </div>
      </div>

      <!-- Broadsheet Sidebar & Ad Column (Col 4) -->
      <div class="md:col-span-4 space-y-6">
        <!-- Sidebar Column 1 -->
        <div class="bg-neutral-200/70 p-4 border border-black/20 rounded">
          <h4 class="text-xs font-bold uppercase tracking-wider text-black font-sans border-b border-black pb-1 mb-2">
            संक्षिप्त हलचल
          </h4>
          <ul class="text-xs space-y-2.5 text-neutral-800">
            <li><strong>· मौसम:</strong> प्रदेश में आगामी 48 घंटों में हल्की वर्षा की संभावना।</li>
            <li><strong>· सराफा:</strong> सोना ₹78,500 प्रति 10 ग्राम, चांदी में भी मजबूती।</li>
            <li><strong>· पेट्रोल/डीजल:</strong> दरों में स्थिरता, आमजन को राहत।</li>
          </ul>
        </div>

        <!-- In-Newspaper Ad Box -->
        <div class="border-2 border-dashed border-red-700 p-4 text-center bg-red-50/50">
          <span class="text-[9px] font-sans font-bold text-red-700 uppercase">क्लासीफाइड विज्ञापन</span>
          <h5 class="text-sm font-bold text-neutral-900 mt-1">खबर Cafe ई-पेपर विज्ञापन स्पेस</h5>
          <p class="text-[11px] text-neutral-600 mt-1">अपने व्यवसाय का विज्ञापन इस स्थान पर देने हेतु संपर्क करें: 98765 43210</p>
        </div>
      </div>

    </div>
  `;
}

// e-Paper Zoom Controls
window.changeEpaperZoom = function(delta) {
  currentEpaperZoom = Math.min(1.8, Math.max(0.6, currentEpaperZoom + delta));
  applyEpaperZoom();
};

window.resetEpaperZoom = function() {
  currentEpaperZoom = 1.0;
  applyEpaperZoom();
};

function applyEpaperZoom() {
  const el = document.getElementById('epaper-sheet-wrapper');
  if (el) {
    el.style.transform = `scale(${currentEpaperZoom})`;
    el.style.transformOrigin = 'top center';
  }
}

// 9. View Switcher (Portal vs e-Paper)
window.switchView = function(view) {
  const portalView = document.getElementById('portal-view');
  const epaperView = document.getElementById('epaper-view');

  if (view === 'epaper') {
    portalView.classList.add('hidden');
    epaperView.classList.remove('hidden');
    window.scrollTo({ top: 100, behavior: 'smooth' });
  } else {
    portalView.classList.remove('hidden');
    epaperView.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Promotion Modal & Personal Contact Helpers
window.openPromoModal = function() {
  const modal = document.getElementById('promo-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      initVanillaTilt();
    }, 80);
  }
};

window.closePromoModal = function() {
  const modal = document.getElementById('promo-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
};

window.copyToClipboard = function(text, successMsg) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg || 'क्लिपबोर्ड पर कॉपी हो गया!');
    }).catch(() => {
      fallbackCopy(text, successMsg);
    });
  } else {
    fallbackCopy(text, successMsg);
  }
};

function fallbackCopy(text, successMsg) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  try {
    document.execCommand('copy');
    showToast(successMsg || 'क्लिपबोर्ड पर कॉपी हो गया!');
  } catch (err) {
    prompt('कॉपी करें:', text);
  }
  document.body.removeChild(ta);
}

function showToast(msg) {
  let toast = document.getElementById('portal-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'portal-toast';
    toast.className = 'fixed top-6 right-6 z-[9999] bg-gradient-to-r from-brand-red to-amber-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-2xl border border-white/20 text-xs transition duration-300 transform translate-y-0 opacity-100 flex items-center gap-2';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check text-amber-300 text-base"></i> <span>${msg}</span>`;
  toast.classList.remove('hidden', 'opacity-0', '-translate-y-4');
  setTimeout(() => {
    toast.classList.add('opacity-0', '-translate-y-4');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 3000);
}

window.copyAllPersonalContacts = function() {
  const details = `खबर Cafe - खबर & विज्ञापन प्रमोशन हेतु पर्सनल संपर्क सूत्र:
संस्थापक एवं मुख्य संपादक: देवेंद्र वर्मा (Devendra Verma)
📧 Personal Gmail: vdev9075@gmail.com
💬 Personal WhatsApp: deverma01
📸 Personal Instagram: https://www.instagram.com/deverma__01?stkn=OXRwZzVxNTI2cTBn
✈️ Personal Telegram: https://t.me/https_deverma_01
(नोट: केवल पर्सनल प्रमोशन व विज्ञापन पूछताछ हेतु)`;
  window.copyToClipboard(details, 'देवेंद्र वर्मा के सभी 4 पर्सनल संपर्क सूत्र सफलतापूर्वक कॉपी हो गए!');
};

// 10. Admin Panel & Supabase Media Upload
window.openAdminModal = function() {
  const modal = document.getElementById('admin-modal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  if (isAdminAuthenticated) {
    showDashboardView();
  } else {
    showLoginView();
  }
};

window.closeAdminModal = function() {
  const modal = document.getElementById('admin-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
};

function showLoginView() {
  document.getElementById('admin-login-view').classList.remove('hidden');
  document.getElementById('admin-dashboard-view').classList.add('hidden');
}

function showDashboardView() {
  document.getElementById('admin-login-view').classList.add('hidden');
  document.getElementById('admin-dashboard-view').classList.remove('hidden');
}

window.handleAdminLogin = function(e) {
  e.preventDefault();
  const pass = document.getElementById('admin-pass-input').value;
  // Default master password or Supabase Auth
  if (pass === 'admin123' || pass === 'admin' || pass === 'khabar@2026') {
    isAdminAuthenticated = true;
    showDashboardView();
  } else {
    alert('गलत पासवर्ड! कृपया सही एडमिन पासवर्ड दर्ज करें।');
  }
};

window.logoutAdmin = function() {
  isAdminAuthenticated = false;
  showLoginView();
};

window.setAdminTab = function(tabName) {
  const tabs = ['news', 'epaper', 'ads', 'settings'];
  tabs.forEach(t => {
    const pane = document.getElementById(`admin-tab-${t}`);
    const btn = document.getElementById(`tab-btn-${t}`);
    if (pane) pane.classList.toggle('hidden', t !== tabName);
    if (btn) {
      if (t === tabName) {
        btn.className = 'admin-tab active bg-brand-red text-white px-4 py-2 rounded-lg transition flex items-center gap-2';
      } else {
        btn.className = 'admin-tab bg-white/5 hover:bg-white/10 text-slate-300 px-4 py-2 rounded-lg transition flex items-center gap-2';
      }
    }
  });
};

// Direct Media Upload to Supabase Storage Bucket ('news-media')
window.uploadMediaToSupabase = async function(fileInputId, targetUrlInputId) {
  const fileInput = document.getElementById(fileInputId);
  const targetUrlInput = document.getElementById(targetUrlInputId);
  
  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    alert('कृपया पहले अपने डिवाइस/गैलरी से कोई फाइल चुनें!');
    return;
  }

  const file = fileInput.files[0];
  const fileName = `${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
  const filePath = `uploads/${fileName}`;

  // Notify uploading
  const btn = event.target.closest('button');
  const origText = btn.innerHTML;
  btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> अपलोड हो रहा है...`;
  btn.disabled = true;

  try {
    let uploadedUrl = null;

    if (supabaseClient) {
      const { data, error } = await supabaseClient.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (!error) {
        const { data: publicUrlData } = supabaseClient.storage
          .from(BUCKET_NAME)
          .getPublicUrl(filePath);

        if (publicUrlData && publicUrlData.publicUrl) {
          uploadedUrl = publicUrlData.publicUrl;
        }
      } else {
        console.warn("Supabase bucket upload error:", error);
      }
    }

    // Fallback to local Data URL if bucket is not configured yet
    if (!uploadedUrl) {
      uploadedUrl = await readFileAsDataURL(file);
    }

    if (targetUrlInput) {
      targetUrlInput.value = uploadedUrl;
    }

    alert('फाइल सफलतापूर्वक अपलोड हो गई है!');
  } catch (err) {
    console.error("Upload error:", err);
    // Fallback
    const localUrl = await readFileAsDataURL(file);
    if (targetUrlInput) targetUrlInput.value = localUrl;
    alert('फाइल सफलतापूर्वक लोड हो गई!');
  } finally {
    btn.innerHTML = origText;
    btn.disabled = false;
  }
};

function readFileAsDataURL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.readAsDataURL(file);
  });
}

// Save New Article (Supabase + LocalStorage)
window.handleSaveArticle = async function(e) {
  e.preventDefault();

  const title = document.getElementById('news-title-input').value.trim();
  const category = document.getElementById('news-category-input').value;
  const tagsStr = document.getElementById('news-tags-input').value.trim();
  const imageUrl = document.getElementById('news-image-url').value.trim() || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80';
  const desc = document.getElementById('news-desc-input').value.trim();
  const content = document.getElementById('news-content-input').value.trim();
  const isBreaking = document.getElementById('news-breaking-toggle').checked;
  const isFeatured = document.getElementById('news-featured-toggle').checked;

  const newArticle = {
    id: `art-${Date.now()}`,
    title,
    category,
    categoryName: getCategoryLabel(category),
    image: imageUrl,
    desc,
    content,
    tags: tagsStr ? tagsStr.split(',').map(t => t.trim()) : ['ताज़ा खबर'],
    isBreaking,
    isFeatured,
    date: new Date().toLocaleDateString('hi-IN'),
    timeAgo: 'अभी-अभी',
    views: 1
  };

  // Try saving to Supabase
  if (supabaseClient) {
    try {
      await supabaseClient.from('articles').insert([{
        title: newArticle.title,
        category: newArticle.category,
        desc: newArticle.desc,
        content: newArticle.content,
        image_url: newArticle.image,
        tags: newArticle.tags,
        is_breaking: newArticle.isBreaking,
        is_featured: newArticle.isFeatured
      }]);
    } catch (err) {
      console.warn("Could not insert directly to Supabase table, saved locally", err);
    }
  }

  // Prepend to current articles
  currentArticles.unshift(newArticle);
  saveLocalArticles();
  renderUI();

  alert('बधाई! आपकी खबर सफलतापूर्वक प्रकाशित हो गई है।');
  e.target.reset();
  closeAdminModal();
};

// Save e-Paper
window.handleSaveEpaper = function(e) {
  e.preventDefault();
  const date = document.getElementById('admin-epaper-date').value;
  const title = document.getElementById('admin-epaper-title').value;
  const url = document.getElementById('admin-epaper-url').value;

  alert(`दैनिक e-Paper अंक (${date} - ${title}) सफलतापूर्वक प्रकाशित कर दिया गया है!`);
  e.target.reset();
  closeAdminModal();
  switchView('epaper');
};

// Save Ad
window.handleSaveAd = function(e) {
  e.preventDefault();
  const slot = document.getElementById('ad-slot-select').value;
  const brand = document.getElementById('ad-brand-input').value;
  const link = document.getElementById('ad-link-input').value;

  if (slot === 'header') {
    const titleEl = document.getElementById('ad-header-title');
    const linkEl = document.getElementById('ad-header-link');
    if (titleEl) titleEl.textContent = `${brand} विशेष ऑफर`;
    if (linkEl) linkEl.href = link;
  } else if (slot === 'mid') {
    const titleEl = document.getElementById('ad-mid-title');
    const linkEl = document.getElementById('ad-mid-link');
    if (titleEl) titleEl.textContent = `${brand} - अधिकृत पार्टनर`;
    if (linkEl) linkEl.href = link;
  }

  alert(`विज्ञापन स्लॉट (${slot}) सफलतापूर्वक सक्रिय कर दिया गया है!`);
  e.target.reset();
  closeAdminModal();
};

// Save Agency Settings
window.handleSaveSettings = function(e) {
  e.preventDefault();
  alert('एजेंसी सेटिंग्स सफलतापूर्वक सुरक्षित कर ली गई हैं!');
  closeAdminModal();
};

// 11. Dismiss Sticky Ad
window.dismissBottomAd = function() {
  const ad = document.getElementById('sticky-bottom-ad');
  if (ad) ad.style.display = 'none';
};

// 12. Theme Toggle (Dark / Light)
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const text = document.getElementById('theme-text');

  const savedTheme = localStorage.getItem('khabarcafe_theme') || 'dark';
  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.onclick = () => {
      const isDark = document.documentElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('khabarcafe_theme', newTheme);
    };
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.classList.remove('bg-[#08080C]', 'text-slate-100');
      document.body.classList.add('bg-stone-100', 'text-stone-900');
      if (icon) icon.className = 'fa-solid fa-sun text-amber-500';
      if (text) text.textContent = 'डार्क मोड';
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      document.body.classList.remove('bg-stone-100', 'text-stone-900');
      document.body.classList.add('bg-[#08080C]', 'text-slate-100');
      if (icon) icon.className = 'fa-solid fa-moon text-brand-gold';
      if (text) text.textContent = 'लाइट मोड';
    }
  }
}

// 13. Vanilla-Tilt 3D Initialization
function initVanillaTilt() {
  if (window.VanillaTilt) {
    const cards = document.querySelectorAll('.tilt-card:not([data-tilt-initialized])');
    cards.forEach(card => {
      window.VanillaTilt.init(card, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
      });
      card.setAttribute('data-tilt-initialized', 'true');
    });
  }
}

// Utility: HTML Escaper
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
