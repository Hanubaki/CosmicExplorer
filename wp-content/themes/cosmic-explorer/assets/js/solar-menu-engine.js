/**
 * Solar System Interactive Navigation Menu Engine (Prototip Laboratuvarı v3.0)
 *
 * - Hover anında tüm yörünge hareketini otomatik dondurma (Auto-Pause)
 * - Gezegenin tam üstünde beliren kompakt ve akıllı HUD telemetri kapsülü
 * - Dış köşelerdeki kutu çerçevelerinin kaldırılması
 * - Sinematik kalitede Interstellar Olay Ufku Karadeliği (Doppler Beaming & Gravitational Lensing)
 * - Yengeç Süpernova Bulutsusu, Andromeda Galaksisi ve Karanlık Madde Kozmik Ağı
 * - Kepler yasalarına tam uygun oransal yörünge hızları
 */

(function () {
	'use strict';

	var canvas = document.getElementById('solarMenuCanvas');
	if (!canvas) return;

	var ctx = canvas.getContext('2d');
	var stageContainer = document.getElementById('solarStageContainer');
	var popoutCard = document.getElementById('solarPopoutCard');
	var popoutBadge = document.getElementById('solarPopoutBadge');
	var popoutDist = document.getElementById('solarPopoutDistance');
	var popoutTitle = document.getElementById('solarPopoutTitle');
	var popoutSub = document.getElementById('solarPopoutSub');
	var popoutDesc = document.getElementById('solarPopoutDesc');
	var popoutBtn = document.getElementById('solarPopoutBtn');
	var popoutBtnText = document.getElementById('solarPopoutBtnText');
	var focusNameEl = document.getElementById('solarFocusName');
	var speedValEl = document.getElementById('solarSimSpeed');
	var canvasHint = document.getElementById('solarCanvasHint');
	var overlay = document.getElementById('solarMenuOverlay');
	var openBtn = document.getElementById('solarMenuOpenBtn');
	var floatingBtn = document.getElementById('solarFloatingLauncher');
	var closeBtn = document.getElementById('solarMenuCloseBtn');

	var themeUri = '/wordpress/wp-content/themes/cosmic-explorer';

	// Simulation State
	var isRunning = true;             // Manuel kullanıcı anahtarı
	var speedMultiplier = 1.0;
	var activeFilter = 'all';
	var hoveredNode = null;
	var dpr = window.devicePixelRatio || 1;

	// Camera & Transform (Pan & Zoom)
	var camera = {
		x: 0,
		y: 0,
		targetX: 0,
		targetY: 0,
		zoom: 0.82,
		targetZoom: 0.82,
		minZoom: 0.40,
		maxZoom: 2.4
	};

	var isDragging = false;
	var dragStart = { x: 0, y: 0 };
	var mousePos = { x: -9999, y: -9999 };

	// --- Texture Preloader ---
	var textureCache = {};
	var textureSources = {
		sun: themeUri + '/assets/images/sun.jpg',
		mercury: themeUri + '/assets/images/mercury.jpg',
		venus: themeUri + '/assets/images/venus.jpg',
		earth: themeUri + '/assets/images/earth.jpg',
		mars: themeUri + '/assets/images/mars.jpg',
		jupiter: themeUri + '/assets/images/jupiter.jpg',
		saturn: themeUri + '/assets/images/saturn.jpg',
		neptune: themeUri + '/assets/images/neptune.jpg',
		apollo11: themeUri + '/assets/images/apollo11.jpg',
		iss: themeUri + '/assets/images/iss.jpg',
		jwst: themeUri + '/assets/images/jwst.jpg'
	};

	Object.keys(textureSources).forEach(function (key) {
		var img = new Image();
		img.src = textureSources[key];
		textureCache[key] = img;
	});

	// --- Deep Space Background Starfield ---
	var bgStars = [];
	function initBgStars(w, h) {
		bgStars = [];
		var count = Math.floor((w * h) / 3000);
		for (var i = 0; i < count; i++) {
			bgStars.push({
				x: (Math.random() - 0.5) * w * 2.8,
				y: (Math.random() - 0.5) * h * 2.8,
				size: Math.random() * 1.8 + 0.4,
				alpha: Math.random() * 0.75 + 0.25,
				twinkleSpeed: Math.random() * 0.02 + 0.005,
				twinklePhase: Math.random() * Math.PI * 2,
				color: Math.random() > 0.8 ? '#00f0ff' : (Math.random() > 0.8 ? '#ffb703' : '#ffffff')
			});
		}
	}

	// --- Asteroid Belt (Mars & Jüpiter Arası) ---
	var asteroidParticles = [];
	function initAsteroids() {
		asteroidParticles = [];
		var count = 180;
		for (var i = 0; i < count; i++) {
			asteroidParticles.push({
				angle: Math.random() * Math.PI * 2,
				dist: 260 + Math.random() * 32,
				size: Math.random() * 2.0 + 0.7,
				speed: (0.008 + Math.random() * 0.003) * 0.45,
				color: Math.random() > 0.4 ? '#857f72' : '#b0aba0'
			});
		}
	}

	// --- Celestial Nodes (Gezegenler, Uydular ve Dış Derin Uzay İstasyonları) ---
	var celestialNodes = [
		// ================= GÜNEŞ SİSTEMİ MERKEZİ & GEZEGENLER =================
		{
			id: 'sun',
			type: 'star',
			group: 'planets',
			name: 'Güneş (Sol)',
			sub: 'Sarı Cüce Yıldız • Sistemin Kalbi',
			badge: 'MERKEZİ YILDIZ',
			distanceStr: '0 KM (Merkez)',
			textureKey: 'sun',
			url: '/wordpress/gunes-sistemi/',
			desc: 'Güneş Sistemi kütlesinin %99.86\'sını oluşturan füzyon fırını. Yüzey sıcaklığı 5,500°C, merkezinde hidrojen helyuma dönüşerek tüm sistemin ışığını üretir.',
			orbitDist: 0,
			speed: 0,
			radius: 38,
			angle: 0,
			rotSpeed: 0.002,
			rotation: 0,
			color: '#ffb703',
			glowColor: 'rgba(255, 183, 3, 0.85)',
			hoverScale: 1
		},
		{
			id: 'mercury',
			type: 'planet',
			group: 'planets',
			name: 'Merkür',
			sub: 'Güneş\'e En Yakın Kayaç Gezegen',
			badge: 'KAYAÇ GEZEGEN',
			distanceStr: '57.9M KM',
			textureKey: 'mercury',
			url: '/wordpress/gunes-sistemi/',
			desc: 'Güneş Sistemi\'nin en küçük gezegeni. Atmosferi olmadığından gündüz 430°C\'ye ulaşırken gece -180°C\'ye kadar dondurucu bir soğuğa bürünür.',
			orbitDist: 72,
			speed: 0.024,
			radius: 8,
			angle: 0.8,
			rotSpeed: 0.004,
			rotation: 0,
			color: '#a8a29e',
			glowColor: 'rgba(168, 162, 158, 0.6)',
			orbitColor: 'rgba(168, 162, 158, 0.18)',
			hoverScale: 1
		},
		{
			id: 'venus',
			type: 'planet',
			group: 'planets',
			name: 'Venüs',
			sub: 'Kontrolden Çıkan Sera Dünyası',
			badge: 'SERA GEZEGENİ',
			distanceStr: '108.2M KM',
			textureKey: 'venus',
			url: '/wordpress/gunes-sistemi/',
			desc: 'Yoğun karbondioksit ve sülfürik asit atmosferiyle 465°C yüzey sıcaklığına sahip en sıcak gezegen. Yüzey basıncı okyanusların 900 m altındaki basınca eşittir.',
			orbitDist: 114,
			speed: 0.018,
			radius: 12,
			angle: 2.1,
			rotSpeed: -0.002,
			rotation: 0,
			color: '#f59e0b',
			glowColor: 'rgba(245, 158, 11, 0.75)',
			orbitColor: 'rgba(245, 158, 11, 0.18)',
			hoverScale: 1
		},
		{
			id: 'earth',
			type: 'planet',
			group: 'planets',
			name: 'Dünya (Earth)',
			sub: 'Mavi Gezegen & Yaşamın Beşiği',
			badge: 'ANA GEZEGEN',
			distanceStr: '149.6M KM',
			textureKey: 'earth',
			url: '/wordpress/gunes-sistemi/',
			desc: 'Sıvı suya, koruyucu manyetosfere ve zengin biyosfere sahip bilinen tek yaşam yuvası. Yörüngesinde Apollo 11, Ay ve ISS istasyonunu barındırır.',
			orbitDist: 165,
			speed: 0.013,
			radius: 14,
			angle: 3.5,
			rotSpeed: 0.008,
			rotation: 0,
			color: '#38bdf8',
			glowColor: 'rgba(56, 189, 248, 0.85)',
			orbitColor: 'rgba(0, 240, 255, 0.22)',
			hoverScale: 1
		},
		// --- Dünya Yörüngesi Uyduları (Tarihi Görevler) ---
		{
			id: 'apollo11',
			type: 'mission',
			group: 'missions',
			name: 'Apollo 11 & Ay (1969)',
			sub: 'Neil Armstrong & Buzz Aldrin İnişi',
			badge: 'TARİHİ UZAY GÖREVİ',
			distanceStr: '384,400 KM (Ay)',
			textureKey: 'apollo11',
			url: '/wordpress/uzay-gorevleri/',
			desc: '20 Temmuz 1969\'da insanlık ilk kez başka bir gökcismine ayak bastı: "İnsan için küçük, insanlık için dev bir adım."',
			parentOrbitId: 'earth',
			subOrbitDist: 28,
			speed: 0.046,
			radius: 6,
			angle: 1.2,
			rotSpeed: 0.01,
			rotation: 0,
			color: '#f8fafc',
			glowColor: 'rgba(255, 255, 255, 0.95)',
			orbitColor: 'rgba(255, 255, 255, 0.28)',
			hoverScale: 1
		},
		{
			id: 'iss',
			type: 'mission',
			group: 'missions',
			name: 'Uluslararası Uzay İstasyonu (ISS)',
			sub: 'Yörüngedeki İnsan Laboratuvarı',
			badge: 'AKTİF UYDU İSTASYONU',
			distanceStr: '408 KM İrtifa',
			textureKey: 'iss',
			url: '/wordpress/uzay-gorevleri/',
			desc: '1998\'den bu yana kesintisiz insan varlığına ev sahipliği yapan dev laboratuvar. Saatte 27.600 km hızla Dünya çevresini her 90 dakikada bir turlar.',
			parentOrbitId: 'earth',
			subOrbitDist: 19,
			speed: 0.085,
			radius: 5,
			angle: 4.2,
			rotSpeed: 0.02,
			rotation: 0,
			color: '#00f0ff',
			glowColor: 'rgba(0, 240, 255, 0.95)',
			orbitColor: 'rgba(0, 240, 255, 0.35)',
			hoverScale: 1
		},
		{
			id: 'jwst',
			type: 'mission',
			group: 'missions',
			name: 'James Webb Teleskobu (JWST)',
			sub: 'Lagrange L2 Kızılötesi Gözlemcisi',
			badge: 'UZAY TELESKOBU',
			distanceStr: '1.5M KM (L2)',
			textureKey: 'jwst',
			url: '/wordpress/gunun-fotografi/',
			desc: 'Dünya ile Güneş kütleçekim dengesinde (L2) konuşlu altın aynalarıyla Büyük Patlama\'dan sonraki ilk galaksileri görüntüleyen teknoloji harikası.',
			parentOrbitId: 'earth',
			subOrbitDist: 40,
			speed: 0.013,
			radius: 7,
			angle: 0,
			rotSpeed: 0.005,
			rotation: 0,
			color: '#fbbf24',
			glowColor: 'rgba(251, 191, 36, 0.95)',
			orbitColor: 'rgba(251, 191, 36, 0.35)',
			hoverScale: 1
		},
		{
			id: 'mars',
			type: 'planet',
			group: 'planets',
			name: 'Mars (Kızıl Gezegen)',
			sub: 'Antik Nehir Yatakları & Keşif Ufku',
			badge: 'HEDEF GEZEGEN',
			distanceStr: '227.9M KM',
			textureKey: 'mars',
			url: '/wordpress/gunes-sistemi/',
			desc: 'Demir oksit kaplı kızıl yüzeyi, 22 km\'lik dev Olympus Mons volkanı ve kurumuş delta kalıntılarıyla insanlığın ikinci evi olmaya en yakın aday.',
			orbitDist: 224,
			speed: 0.010,
			radius: 11,
			angle: 1.1,
			rotSpeed: 0.006,
			rotation: 0,
			color: '#ef4444',
			glowColor: 'rgba(239, 68, 68, 0.85)',
			orbitColor: 'rgba(239, 68, 68, 0.20)',
			hoverScale: 1
		},
		{
			id: 'curiosity',
			type: 'mission',
			group: 'missions',
			name: 'Perseverance & Curiosity',
			sub: 'Mars Yüzey & Atmosfer Kaşifleri',
			badge: 'MARS YÜZEY GÖREVİ',
			distanceStr: 'Mars Yüzeyi / Yörünge',
			textureKey: 'mars',
			url: '/wordpress/uzay-gorevleri/',
			desc: 'Jezero Krateri\'nde antik mikrobiyal yaşam izleri arayan, Ingenuity helikopteriyle ilk motorlu uçuşu gerçekleştiren nükleer enerjili robotik kaşifler.',
			parentOrbitId: 'mars',
			subOrbitDist: 20,
			speed: 0.055,
			radius: 5,
			angle: 2.8,
			rotSpeed: 0.01,
			rotation: 0,
			color: '#fb923c',
			glowColor: 'rgba(251, 146, 60, 0.9)',
			orbitColor: 'rgba(251, 146, 60, 0.3)',
			hoverScale: 1
		},
		{
			id: 'jupiter',
			type: 'planet',
			group: 'planets',
			name: 'Jüpiter',
			sub: 'Güneş Sistemi\'nin Gaz Devler Kralı',
			badge: 'GAZ DEVİ',
			distanceStr: '778.5M KM',
			textureKey: 'jupiter',
			url: '/wordpress/gunes-sistemi/',
			desc: 'Diğer tüm gezegenlerin toplamından 2.5 kat daha ağır dev kütle. Asırlardır süren Büyük Kırmızı Leke fırtınasını ve okyanus barındıran Europa uydusunu yönetir.',
			orbitDist: 325,
			speed: 0.007,
			radius: 24,
			angle: 4.8,
			rotSpeed: 0.012,
			rotation: 0,
			color: '#e2b170',
			glowColor: 'rgba(226, 177, 112, 0.8)',
			orbitColor: 'rgba(226, 177, 112, 0.18)',
			hoverScale: 1
		},
		{
			id: 'saturn',
			type: 'planet',
			group: 'planets',
			name: 'Satürn',
			sub: 'Halkaların Görkemli Efendisi',
			badge: 'HALKALI DEV',
			distanceStr: '1.43 Milyar KM',
			textureKey: 'saturn',
			url: '/wordpress/gunes-sistemi/',
			desc: 'Su buzu parçacıklarından oluşan binlerce halkasıyla gökyüzünün incisi. Yoğunluğu sudan düşüktür; devasa bir okyanusa konsa yüzebilir!',
			orbitDist: 410,
			speed: 0.005,
			radius: 19,
			hasRings: true,
			angle: 0.3,
			rotSpeed: 0.010,
			rotation: 0,
			color: '#fed7aa',
			glowColor: 'rgba(254, 215, 170, 0.8)',
			orbitColor: 'rgba(254, 215, 170, 0.16)',
			hoverScale: 1
		},
		{
			id: 'neptune',
			type: 'planet',
			group: 'planets',
			name: 'Neptün & Uranüs',
			sub: 'Dış Kuşağın Buz Devleri',
			badge: 'BUZ DEVLERİ',
			distanceStr: '4.5 Milyar KM',
			textureKey: 'neptune',
			url: '/wordpress/gunes-sistemi/',
			desc: 'Süpersonik rüzgârların (saatte 2.100 km) estiği metan zengini masmavi atmosferler. Güneş Sistemi\'nin en soğuk dış gezegen sınırları.',
			orbitDist: 490,
			speed: 0.0035,
			radius: 15,
			angle: 2.7,
			rotSpeed: 0.008,
			rotation: 0,
			color: '#38bdf8',
			glowColor: 'rgba(56, 189, 248, 0.8)',
			orbitColor: 'rgba(56, 189, 248, 0.14)',
			hoverScale: 1
		},
		{
			id: 'voyager1',
			type: 'mission',
			group: 'missions',
			name: 'Voyager 1 Sondası',
			sub: 'Yıldızlararası Uzayın İlk Elçisi',
			badge: 'YILDIZLARARASI GÖREV (1977)',
			distanceStr: '24.2 Milyar KM',
			textureKey: 'apollo11',
			url: '/wordpress/uzay-gorevleri/',
			desc: '1977\'de fırlatılarak Güneş\'in heliopoz sınırını aşan ve yıldızlararası boşluğa ulaşan ilk insan yapımı araç. Üzerinde Altın Plak ve Dünya selamları taşır.',
			orbitDist: 560,
			speed: 0.0018,
			radius: 7,
			angle: 5.4,
			rotSpeed: 0.003,
			rotation: 0,
			color: '#c084fc',
			glowColor: 'rgba(192, 132, 252, 0.95)',
			orbitColor: 'rgba(192, 132, 252, 0.25)',
			hoverScale: 1
		},

		// ================= GÜNEŞ SİSTEMİ DIŞI: SERBEST DERİN UZAY KÖŞELERİ =================
		// (Güneş'in etrafında DÖNMEZLER! Kutu çerçeve YOK, tamamen organik derin uzay görselleri)
		{
			id: 'blackhole-beacon',
			type: 'deepspace',
			group: 'deepspace',
			isDeepSpaceCorner: true,
			fixedX: 580,
			fixedY: -320,
			name: 'Karadelikler & Olay Ufku (M87*)',
			sub: 'Kerr Metriği • Kütleçekimsel Merceklenme',
			badge: 'DERİN UZAY • 55M IŞIK YILI',
			distanceStr: '55M Işık Yılı (M87*)',
			url: '/wordpress/karadelikler/',
			desc: 'Işığın dahi kaçamayacağı kadar muazzam kütleçekimine sahip uzay-zaman tekilliği. Event Horizon Teleskobu ile görüntülenen ilk karadelik M87*.',
			radius: 24,
			isBlackHole: true,
			color: '#ff8800',
			glowColor: 'rgba(255, 136, 0, 0.95)',
			hoverScale: 1
		},
		{
			id: 'supernova-beacon',
			type: 'deepspace',
			group: 'deepspace',
			isDeepSpaceCorner: true,
			fixedX: 580,
			fixedY: 310,
			name: 'Süpernovalar & Yengeç Nebulası',
			sub: 'Yıldız Patlaması • Nötron Yıldızı Feneri',
			badge: 'KOZMİK BULUTSU • 6,500 IŞIK YILI',
			distanceStr: '6,500 Işık Yılı',
			url: '/wordpress/supernovalar/',
			desc: 'Dev yıldızların ömürlerini tamamlayıp patlamasıyla uzaya saçılan demir, altın ve yaşam elementleri. Merkezinde dönen yüksek hızlı bir pulsar bulunur.',
			radius: 22,
			isNebula: true,
			color: '#ec4899',
			glowColor: 'rgba(236, 72, 153, 0.95)',
			hoverScale: 1
		},
		{
			id: 'darkmatter-beacon',
			type: 'deepspace',
			group: 'deepspace',
			isDeepSpaceCorner: true,
			fixedX: -580,
			fixedY: -320,
			name: 'Karanlık Madde & Karanlık Enerji',
			sub: 'Evrenin Görünmeyen %95\'lik Kozmik Ağı',
			badge: 'KOZMOLOJİ • DERİN ALAN',
			distanceStr: 'Kozmik Ufuk',
			url: '/wordpress/karanlik-madde-ve-enerji/',
			desc: 'Evrenin hızlanarak genişlemesine sebep olan Karanlık Enerji (%68) ve galaksileri bir arada tutan kütleçekimsel görünmez Karanlık Madde (%27).',
			radius: 21,
			isDarkMatter: true,
			color: '#22c55e',
			glowColor: 'rgba(34, 197, 94, 0.95)',
			hoverScale: 1
		},
		{
			id: 'galaxies-beacon',
			type: 'deepspace',
			group: 'deepspace',
			isDeepSpaceCorner: true,
			fixedX: -580,
			fixedY: 310,
			name: 'Galaksiler & Kozmik Ağ (Andromeda)',
			sub: 'Samanyolu, M31 & Hubble Derin Alanı',
			badge: 'GALAKTİK SİSTEM • 2.5M IŞIK YILI',
			distanceStr: '2.5M Işık Yılı (M31)',
			url: '/wordpress/galaksiler/',
			desc: 'Milyarlarca yıldız barındıran sarmal galaktik adalar, Yaratılış Sütunları yıldız doğumevleri ve evrenin en derin galaktik yapıları.',
			radius: 22,
			isGalaxy: true,
			color: '#a855f7',
			glowColor: 'rgba(168, 85, 247, 0.95)',
			hoverScale: 1
		}
	];

	// Resize canvas
	function resizeCanvas() {
		if (!stageContainer || !canvas) return;
		var rect = stageContainer.getBoundingClientRect();
		var w = rect.width || window.innerWidth;
		var h = rect.height || (window.innerHeight - 65);
		if (w <= 0) w = window.innerWidth;
		if (h <= 0) h = Math.max(window.innerHeight - 65, 600);

		dpr = window.devicePixelRatio || 1;
		canvas.width = Math.floor(w * dpr);
		canvas.height = Math.floor(h * dpr);
		canvas.style.width = w + 'px';
		canvas.style.height = h + 'px';

		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.scale(dpr, dpr);

		initBgStars(w, h);
	}

	initAsteroids();
	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);

	// Helper: Get computed world coordinates for a node
	function computeNodePosition(node) {
		if (node.isDeepSpaceCorner) {
			return { x: node.fixedX, y: node.fixedY };
		}

		if (node.parentOrbitId) {
			var parent = celestialNodes.find(function (n) { return n.id === node.parentOrbitId; });
			if (parent) {
				var pPos = computeNodePosition(parent);
				return {
					x: pPos.x + Math.cos(node.angle) * node.subOrbitDist,
					y: pPos.y + Math.sin(node.angle) * node.subOrbitDist * 0.70
				};
			}
		}

		var ellipY = 0.65;
		return {
			x: Math.cos(node.angle) * node.orbitDist,
			y: Math.sin(node.angle) * node.orbitDist * ellipY
		};
	}

	// 60 FPS Render Loop
	var lastTime = performance.now();
	function renderLoop(now) {
		var dt = (now - lastTime) / 1000;
		lastTime = now;

		var w = canvas.width / dpr;
		var h = canvas.height / dpr;
		var centerX = w / 2 + camera.x;
		var centerY = h / 2 + camera.y;

		// Smooth camera pan & zoom
		camera.x += (camera.targetX - camera.x) * 0.08;
		camera.y += (camera.targetY - camera.y) * 0.08;
		camera.zoom += (camera.targetZoom - camera.zoom) * 0.08;

		// --- AUTO-PAUSE LOGIC (Kullanıcı fareyle bir cismin üzerine geldiğinde hareket DONAR!) ---
		var isSimulating = isRunning && !hoveredNode;

		if (isSimulating) {
			celestialNodes.forEach(function (node) {
				if (!node.isDeepSpaceCorner) {
					node.angle += (node.speed || 0) * speedMultiplier * 0.45;
				}
				node.rotation = (node.rotation || 0) + (node.rotSpeed || 0.005) * speedMultiplier;
			});
			asteroidParticles.forEach(function (ast) {
				ast.angle += ast.speed * speedMultiplier * 0.45;
			});
		}

		// Clear screen
		ctx.clearRect(0, 0, w, h);

		// Deep Space Background Gradient
		var bgGrad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, Math.max(w, h));
		bgGrad.addColorStop(0, '#0a0d1e');
		bgGrad.addColorStop(0.5, '#060813');
		bgGrad.addColorStop(1, '#020308');
		ctx.fillStyle = bgGrad;
		ctx.fillRect(0, 0, w, h);

		ctx.save();
		ctx.translate(centerX, centerY);
		ctx.scale(camera.zoom, camera.zoom);

		// 1. Draw Starfield
		bgStars.forEach(function (s) {
			var alpha = s.alpha + Math.sin(now * s.twinkleSpeed + s.twinklePhase) * 0.2;
			ctx.fillStyle = s.color;
			ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
			ctx.fillRect(s.x, s.y, s.size, s.size);
		});
		ctx.globalAlpha = 1.0;

		// 2. Draw Solar System Planetary Orbits (SADECE Güneş Sistemi için!)
		var uniqueOrbits = {};
		celestialNodes.forEach(function (node) {
			if (!node.isDeepSpaceCorner && node.orbitDist > 0 && !uniqueOrbits[node.orbitDist]) {
				uniqueOrbits[node.orbitDist] = node;
				var isFiltered = activeFilter === 'all' || node.group === activeFilter;

				ctx.beginPath();
				ctx.ellipse(0, 0, node.orbitDist, node.orbitDist * 0.65, 0, 0, Math.PI * 2);
				ctx.strokeStyle = isFiltered ? (node.orbitColor || 'rgba(0, 240, 255, 0.2)') : 'rgba(255, 255, 255, 0.04)';
				ctx.lineWidth = isFiltered ? 1.3 : 0.7;
				ctx.setLineDash([4, 6]);
				ctx.stroke();
				ctx.setLineDash([]);
			}
		});

		// 3. Draw Heliopause Boundary
		ctx.save();
		ctx.beginPath();
		ctx.ellipse(0, 0, 520, 520 * 0.65, 0, 0, Math.PI * 2);
		ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
		ctx.lineWidth = 1.2;
		ctx.setLineDash([8, 8]);
		ctx.stroke();
		ctx.setLineDash([]);

		ctx.font = 'bold 9px JetBrains Mono, monospace';
		ctx.fillStyle = 'rgba(0, 240, 255, 0.6)';
		ctx.textAlign = 'center';
		ctx.fillText('--- HELYOPOZ / GÜNEŞ SİSTEMİ SINIRI (VOYAGER GEÇİŞİ) ---', 0, -520 * 0.65 - 8);
		ctx.restore();

		// 4. Draw Asteroid Belt
		asteroidParticles.forEach(function (ast) {
			var ax = Math.cos(ast.angle) * ast.dist;
			var ay = Math.sin(ast.angle) * ast.dist * 0.65;
			ctx.fillStyle = ast.color;
			ctx.fillRect(ax, ay, ast.size, ast.size);
		});

		// 5. Draw Satellite Sub-Orbits
		celestialNodes.forEach(function (node) {
			if (node.parentOrbitId) {
				var parent = celestialNodes.find(function (n) { return n.id === node.parentOrbitId; });
				if (parent) {
					var pPos = computeNodePosition(parent);
					var isFiltered = activeFilter === 'all' || node.group === activeFilter;
					ctx.beginPath();
					ctx.ellipse(pPos.x, pPos.y, node.subOrbitDist, node.subOrbitDist * 0.70, 0, 0, Math.PI * 2);
					ctx.strokeStyle = isFiltered ? 'rgba(0, 240, 255, 0.35)' : 'rgba(255, 255, 255, 0.06)';
					ctx.lineWidth = 1;
					ctx.setLineDash([2, 3]);
					ctx.stroke();
					ctx.setLineDash([]);
				}
			}
		});

		// 6. Check Hover Target in World Coordinates
		var worldMouseX = (mousePos.x - centerX) / camera.zoom;
		var worldMouseY = (mousePos.y - centerY) / camera.zoom;

		var closestNode = null;
		var minDistance = 999999;

		celestialNodes.forEach(function (node) {
			var pos = computeNodePosition(node);
			node.worldX = pos.x;
			node.worldY = pos.y;

			var hitDist = Math.hypot(worldMouseX - pos.x, worldMouseY - pos.y);
			var threshold = (node.radius + 18);
			if (hitDist < threshold && hitDist < minDistance) {
				minDistance = hitDist;
				closestNode = node;
			}
		});

		if (closestNode !== hoveredNode) {
			hoveredNode = closestNode;
			onHoverChanged(hoveredNode, centerX, centerY);
		} else if (hoveredNode) {
			// Update tooltip position smoothly if camera is panning
			updateTooltipPosition(hoveredNode, centerX, centerY);
		}

		// 7. Render Celestial Bodies
		celestialNodes.forEach(function (node) {
			var isHovered = (node === hoveredNode);
			var isFiltered = (activeFilter === 'all' || node.group === activeFilter);
			var targetScale = isHovered ? 1.45 : (isFiltered ? 1.0 : 0.6);
			node.hoverScale += (targetScale - node.hoverScale) * 0.18;

			var r = node.radius * node.hoverScale;
			var x = node.worldX;
			var y = node.worldY;

			ctx.save();
			ctx.translate(x, y);

			// ================= SPECIAL: CINEMATIC KERR BLACK HOLE =================
			if (node.isBlackHole) {
				ctx.save();
				var t = now * 0.001;

				// A. Gravitational Lensing Arc (Arka Üst Foton Kemeri)
				ctx.beginPath();
				ctx.ellipse(0, -r * 0.45, r * 1.85, r * 1.25, 0, Math.PI, Math.PI * 2);
				ctx.strokeStyle = 'rgba(255, 183, 3, 0.75)';
				ctx.lineWidth = 3.5;
				ctx.stroke();

				// B. Relativistic Accretion Disk (Doppler Beaming ile dönen parlak disk)
				// Sol taraf bize doğru döndüğü için çok daha parlak ve kalın
				var diskGrad = ctx.createLinearGradient(-r * 2.2, 0, r * 2.2, 0);
				diskGrad.addColorStop(0.0, 'rgba(255, 255, 255, 0.95)'); // Parlak beyaz sıcak tepe
				diskGrad.addColorStop(0.2, '#00f0ff');                     // Yüksek enerjili Doppler maviye kayma
				diskGrad.addColorStop(0.45, '#ffb703');                    // Altın sıcak bölge
				diskGrad.addColorStop(0.7, '#ff5500');                     // Kırmızıya kayan uzaklaşan taraf
				diskGrad.addColorStop(1.0, 'rgba(180, 40, 0, 0.4)');

				ctx.beginPath();
				ctx.ellipse(0, 0, r * 2.3, r * 0.65, 0.15, 0, Math.PI * 2);
				ctx.strokeStyle = diskGrad;
				ctx.lineWidth = isHovered ? 5.5 : 4.0;
				ctx.stroke();

				// C. İkinci İnce Dış Toz Halkası
				ctx.beginPath();
				ctx.ellipse(0, 0, r * 2.9, r * 0.82, 0.15, 0, Math.PI * 2);
				ctx.strokeStyle = 'rgba(255, 136, 0, 0.35)';
				ctx.lineWidth = 1.6;
				ctx.stroke();

				// D. Olay Ufku (Simsiyah Işıksız Tekillik Çekirdeği)
				ctx.fillStyle = '#000000';
				ctx.beginPath();
				ctx.arc(0, 0, r, 0, Math.PI * 2);
				ctx.fill();

				// E. İnce Elektrik Altın Foton Halkası (Event Horizon Rim)
				ctx.beginPath();
				ctx.arc(0, 0, r + 1.2, 0, Math.PI * 2);
				ctx.strokeStyle = 'rgba(255, 220, 100, 0.95)';
				ctx.lineWidth = 1.4;
				ctx.stroke();

				// F. Alt Lensing Yayı (Ön alt ışık eğrilmesi)
				ctx.beginPath();
				ctx.ellipse(0, r * 0.45, r * 1.85, r * 1.25, 0, 0, Math.PI);
				ctx.strokeStyle = 'rgba(255, 140, 0, 0.65)';
				ctx.lineWidth = 2.8;
				ctx.stroke();

				ctx.restore();

			// ================= SPECIAL: CRAB SUPERNOVA NEBULA =================
			} else if (node.isNebula) {
				ctx.save();
				// Çok katmanlı organik gaz bulutu filamentleri
				var nebColors = [
					'rgba(236, 72, 153, 0.35)',
					'rgba(123, 44, 191, 0.35)',
					'rgba(0, 240, 255, 0.25)'
				];
				for (var ni = 0; ni < 3; ni++) {
					var nebAngle = (now * 0.0003) * (ni % 2 === 0 ? 1 : -1) + ni * 1.8;
					var nebR = r * (1.6 + ni * 0.35);
					ctx.fillStyle = nebColors[ni];
					ctx.beginPath();
					ctx.ellipse(Math.cos(nebAngle) * 4, Math.sin(nebAngle) * 4, nebR, nebR * 0.75, nebAngle, 0, Math.PI * 2);
					ctx.fill();
				}

				// Pulsar Çekirdeği (Hızlı dönen ve parıldayan nötron yıldızı)
				var pulsarFlash = 0.7 + Math.sin(now * 0.015) * 0.3;
				ctx.fillStyle = '#ffffff';
				ctx.beginPath();
				ctx.arc(0, 0, r * 0.4, 0, Math.PI * 2);
				ctx.fill();

				ctx.beginPath();
				ctx.arc(0, 0, r * 0.8, 0, Math.PI * 2);
				ctx.strokeStyle = 'rgba(0, 240, 255, ' + pulsarFlash + ')';
				ctx.lineWidth = 1.8;
				ctx.stroke();
				ctx.restore();

			// ================= SPECIAL: ANDROMEDA SPIRAL GALAXY =================
			} else if (node.isGalaxy) {
				ctx.save();
				ctx.rotate(0.55); // Galaksi eğim açısı

				// Galaktik parlak şişkinlik (Bulge Core)
				var coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, r * 0.8);
				coreGrad.addColorStop(0, '#ffffff');
				coreGrad.addColorStop(0.3, '#fde047');
				coreGrad.addColorStop(0.7, '#a855f7');
				coreGrad.addColorStop(1, 'transparent');
				ctx.fillStyle = coreGrad;
				ctx.beginPath();
				ctx.arc(0, 0, r * 0.8, 0, Math.PI * 2);
				ctx.fill();

				// Spiral Sarmal Kollar
				ctx.strokeStyle = 'rgba(168, 85, 247, 0.6)';
				ctx.lineWidth = 2.2;
				ctx.beginPath();
				ctx.ellipse(0, 0, r * 2.2, r * 0.9, 0, 0, Math.PI * 2);
				ctx.stroke();

				ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
				ctx.lineWidth = 1.4;
				ctx.beginPath();
				ctx.ellipse(0, 0, r * 2.7, r * 1.15, 0, 0, Math.PI * 2);
				ctx.stroke();

				ctx.restore();

			// ================= SPECIAL: DARK MATTER COSMIC WEB =================
			} else if (node.isDarkMatter) {
				ctx.save();
				// Kütleçekimsel merceklenme Einstein halkası
				ctx.strokeStyle = 'rgba(34, 197, 94, 0.65)';
				ctx.lineWidth = 2.0;
				ctx.setLineDash([6, 6]);
				ctx.beginPath();
				ctx.arc(0, 0, r * 1.6, 0, Math.PI * 2);
				ctx.stroke();
				ctx.setLineDash([]);

				// Kozmik lifler (Filaments)
				var webBranches = 5;
				ctx.strokeStyle = 'rgba(34, 197, 94, 0.4)';
				ctx.lineWidth = 1.2;
				for (var wi = 0; wi < webBranches; wi++) {
					var wAng = (wi / webBranches) * Math.PI * 2;
					ctx.beginPath();
					ctx.moveTo(0, 0);
					ctx.lineTo(Math.cos(wAng) * r * 2.4, Math.sin(wAng) * r * 2.4);
					ctx.stroke();
				}

				// Merkez Düğümlenme
				ctx.fillStyle = '#22c55e';
				ctx.beginPath();
				ctx.arc(0, 0, r * 0.5, 0, Math.PI * 2);
				ctx.fill();
				ctx.restore();

			// ================= STANDARD: HD TEXTURED PLANET SPHERE =================
			} else {
				// Halo / Glow
				if (isHovered || isFiltered) {
					var glowR = r * (isHovered ? 2.6 : 1.7);
					var glowGrad = ctx.createRadialGradient(0, 0, r * 0.4, 0, 0, glowR);
					glowGrad.addColorStop(0, node.glowColor);
					glowGrad.addColorStop(1, 'transparent');
					ctx.fillStyle = glowGrad;
					ctx.beginPath();
					ctx.arc(0, 0, glowR, 0, Math.PI * 2);
					ctx.fill();
				}

				// Sun Dynamic Corona Rays
				if (node.id === 'sun') {
					var rayCount = 14;
					ctx.save();
					ctx.rotate(now * 0.0004);
					for (var i = 0; i < rayCount; i++) {
						var rayAngle = (i / rayCount) * Math.PI * 2;
						var rayLen = r * (1.32 + Math.sin(now * 0.0035 + i) * 0.16);
						ctx.beginPath();
						ctx.moveTo(Math.cos(rayAngle) * r, Math.sin(rayAngle) * r);
						ctx.lineTo(Math.cos(rayAngle) * rayLen, Math.sin(rayAngle) * rayLen);
						ctx.strokeStyle = 'rgba(255, 183, 3, 0.4)';
						ctx.lineWidth = 2.8;
						ctx.stroke();
					}
					ctx.restore();
				}

				// Satürn Arka Halka
				if (node.hasRings) {
					ctx.save();
					ctx.rotate(0.38);
					ctx.beginPath();
					ctx.ellipse(0, 0, r * 2.4, r * 0.85, 0, Math.PI, Math.PI * 2);
					ctx.strokeStyle = 'rgba(254, 215, 170, 0.8)';
					ctx.lineWidth = 4.0;
					ctx.stroke();

					ctx.beginPath();
					ctx.ellipse(0, 0, r * 2.9, r * 1.05, 0, Math.PI, Math.PI * 2);
					ctx.strokeStyle = 'rgba(254, 215, 170, 0.45)';
					ctx.lineWidth = 1.8;
					ctx.stroke();
					ctx.restore();
				}

				// HD Doku Küresi
				var texImg = textureCache[node.textureKey];
				if (texImg && texImg.complete && texImg.naturalWidth > 0) {
					ctx.save();
					ctx.beginPath();
					ctx.arc(0, 0, r, 0, Math.PI * 2);
					ctx.clip();

					ctx.save();
					ctx.rotate(node.rotation);
					ctx.drawImage(texImg, -r, -r, r * 2, r * 2);
					ctx.restore();

					// 3D Işık ve Terminator Gölgesi
					if (node.id !== 'sun') {
						var angleFromSun = Math.atan2(y, x);
						var lightGrad = ctx.createRadialGradient(
							-Math.cos(angleFromSun) * r * 0.4,
							-Math.sin(angleFromSun) * r * 0.4,
							r * 0.1,
							0,
							0,
							r
						);
						lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
						lightGrad.addColorStop(0.45, 'rgba(0, 0, 0, 0.05)');
						lightGrad.addColorStop(0.85, 'rgba(0, 0, 0, 0.55)');
						lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0.92)');
						ctx.fillStyle = lightGrad;
						ctx.beginPath();
						ctx.arc(0, 0, r, 0, Math.PI * 2);
						ctx.fill();
					}

					ctx.restore();

					// Rayleigh atmosfer rim
					ctx.beginPath();
					ctx.arc(0, 0, r, 0, Math.PI * 2);
					ctx.strokeStyle = node.glowColor;
					ctx.lineWidth = 1.2;
					ctx.stroke();

				} else {
					var bodyGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r);
					bodyGrad.addColorStop(0, '#ffffff');
					bodyGrad.addColorStop(0.35, node.color);
					bodyGrad.addColorStop(1, '#05070f');

					ctx.fillStyle = bodyGrad;
					ctx.beginPath();
					ctx.arc(0, 0, r, 0, Math.PI * 2);
					ctx.fill();
				}

				// Satürn Ön Halka
				if (node.hasRings) {
					ctx.save();
					ctx.rotate(0.38);
					ctx.beginPath();
					ctx.ellipse(0, 0, r * 2.4, r * 0.85, 0, 0, Math.PI);
					ctx.strokeStyle = 'rgba(254, 215, 170, 0.95)';
					ctx.lineWidth = 4.0;
					ctx.stroke();

					ctx.beginPath();
					ctx.ellipse(0, 0, r * 2.9, r * 1.05, 0, 0, Math.PI);
					ctx.strokeStyle = 'rgba(254, 215, 170, 0.55)';
					ctx.lineWidth = 1.8;
					ctx.stroke();
					ctx.restore();
				}
			}

			// Hover Reticle (High-Tech Reticle Brackets)
			if (isHovered) {
				ctx.beginPath();
				ctx.arc(0, 0, r + 9, 0, Math.PI * 2);
				ctx.strokeStyle = '#00f0ff';
				ctx.lineWidth = 1.8;
				ctx.setLineDash([4, 4]);
				ctx.stroke();
				ctx.setLineDash([]);

				var tick = 6;
				var tr = r + 14;
				ctx.strokeStyle = '#00f0ff';
				ctx.lineWidth = 1.6;
				ctx.beginPath();
				ctx.moveTo(-tr, -tr + tick); ctx.lineTo(-tr, -tr); ctx.lineTo(-tr + tick, -tr);
				ctx.moveTo(tr - tick, -tr); ctx.lineTo(tr, -tr); ctx.lineTo(tr, -tr + tick);
				ctx.moveTo(-tr, tr - tick); ctx.lineTo(-tr, tr); ctx.lineTo(-tr + tick, tr);
				ctx.moveTo(tr - tick, tr); ctx.lineTo(tr, tr); ctx.lineTo(tr, tr - tick);
				ctx.stroke();
			}

			// Title Tag below node
			if (isHovered || (isFiltered && camera.zoom > 0.70)) {
				ctx.font = (isHovered ? 'bold 13px Inter, sans-serif' : '10px Inter, sans-serif');
				ctx.textAlign = 'center';
				ctx.fillStyle = isHovered ? '#00f0ff' : (isFiltered ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.35)');
				ctx.fillText(node.name, 0, r + (isHovered ? 22 : 15));
			}

			ctx.restore();
		});

		ctx.restore();

		requestAnimationFrame(renderLoop);
	}

	// Smart Bounded Tooltip Position Updater (Ekran dışına asla taşmayan akıllı kenetleme)
	function updateTooltipPosition(node, centerX, centerY) {
		if (!popoutCard || !node || !stageContainer) return;

		var stageW = stageContainer.clientWidth;
		var stageH = stageContainer.clientHeight;
		var cardW = popoutCard.offsetWidth || 260;
		var cardH = popoutCard.offsetHeight || 170;

		var targetX = centerX + node.worldX * camera.zoom;
		var targetY = centerY + node.worldY * camera.zoom;
		var r = (node.radius || 12) * (node.hoverScale || 1.0) * camera.zoom;

		// 1. Dikey Konumlandırma (Yukarı sığıyor mu?)
		var fitsAbove = (targetY - r - cardH - 16 >= 16);

		var topPos;
		if (fitsAbove) {
			topPos = targetY - r - cardH - 12;
			popoutCard.classList.remove('is-flipped-down');
		} else {
			// Üste sığmıyorsa gezegenin altına aç ve oku yukarı çevir:
			topPos = targetY + r + 16;
			popoutCard.classList.add('is-flipped-down');
		}

		// Dikey sahne sınırlarına kenetleme (Asla taşamaz):
		topPos = Math.max(16, Math.min(stageH - cardH - 16, topPos));

		// 2. Yatay Konumlandırma (Merkezleme ve sağ/sol kenar koruması):
		var leftPos = targetX - (cardW / 2);
		leftPos = Math.max(16, Math.min(stageW - cardW - 16, leftPos));

		// 3. Ok (Caret) Konumu (Kart kenara kilitlense bile ok daima gezegeni gösterir):
		var caretX = targetX - leftPos;
		caretX = Math.max(16, Math.min(cardW - 16, caretX));
		popoutCard.style.setProperty('--caret-left', caretX + 'px');

		popoutCard.style.left = leftPos + 'px';
		popoutCard.style.top = topPos + 'px';
	}

	// Hover UI Updates
	function onHoverChanged(node, centerX, centerY) {
		if (!node) {
			canvas.style.cursor = isDragging ? 'grabbing' : 'default';
			popoutCard.classList.remove('is-active');
			popoutCard.setAttribute('aria-hidden', 'true');
			if (focusNameEl) focusNameEl.textContent = 'SERBEST YÖRÜNGE';
			return;
		}

		canvas.style.cursor = 'pointer';
		if (focusNameEl) focusNameEl.textContent = node.name.toUpperCase();

		// Update popout content
		if (popoutBadge) popoutBadge.textContent = node.badge || 'KEŞİF';
		if (popoutDist) popoutDist.textContent = node.distanceStr || '';
		if (popoutTitle) popoutTitle.textContent = node.name;
		if (popoutSub) popoutSub.textContent = node.sub || '';
		if (popoutDesc) popoutDesc.textContent = node.desc || '';
		if (popoutBtn) {
			popoutBtn.href = node.url || '#';
			if (popoutBtnText) {
				popoutBtnText.textContent = (node.type === 'mission' ? 'Görevi İncele' : 'Sayfayı Keşfet');
			}
		}

		updateTooltipPosition(node, centerX, centerY);

		popoutCard.classList.add('is-active');
		popoutCard.setAttribute('aria-hidden', 'false');

		if (canvasHint) canvasHint.style.opacity = '0';
	}

	// Mouse & Drag Events
	canvas.addEventListener('mousemove', function (e) {
		var rect = canvas.getBoundingClientRect();
		mousePos.x = e.clientX - rect.left;
		mousePos.y = e.clientY - rect.top;

		if (isDragging) {
			var dx = e.clientX - dragStart.x;
			var dy = e.clientY - dragStart.y;
			camera.targetX += dx;
			camera.targetY += dy;
			dragStart.x = e.clientX;
			dragStart.y = e.clientY;
		}
	});

	canvas.addEventListener('mousedown', function (e) {
		if (e.button === 0) {
			isDragging = true;
			dragStart.x = e.clientX;
			dragStart.y = e.clientY;
			canvas.style.cursor = 'grabbing';
		}
	});

	window.addEventListener('mouseup', function () {
		if (isDragging) {
			isDragging = false;
			canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
		}
	});

	canvas.addEventListener('mouseleave', function () {
		mousePos.x = -9999;
		mousePos.y = -9999;
		isDragging = false;
		if (hoveredNode) {
			hoveredNode = null;
			var w = canvas.width / dpr;
			var h = canvas.height / dpr;
			onHoverChanged(null, w / 2 + camera.x, h / 2 + camera.y);
		}
	});

	// Click to Navigate
	canvas.addEventListener('click', function (e) {
		if (hoveredNode && hoveredNode.url) {
			window.location.href = hoveredNode.url;
		}
	});

	// Zoom with Mouse Wheel & MacBook Trackpad Pinch
	canvas.addEventListener('wheel', function (e) {
		e.preventDefault();
		// MacBook trackpad pinch-to-zoom emits wheel with ctrlKey=true
		if (e.ctrlKey) {
			var pinchDelta = -e.deltaY * 0.015;
			camera.targetZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, camera.targetZoom * (1 + pinchDelta)));
		} else {
			var zoomFactor = e.deltaY < 0 ? 1.12 : 0.89;
			camera.targetZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, camera.targetZoom * zoomFactor));
		}
	}, { passive: false });

	// Touch & Gesture Support for iOS (iPhone & iPad)
	canvas.style.touchAction = 'none';
	var touchStartPos = { x: 0, y: 0 };
	var touchStartTime = 0;
	var isTouchDragging = false;
	var isTouchPinching = false;
	var pinchStartDistance = 0;
	var pinchStartZoom = 1;

	canvas.addEventListener('touchstart', function (e) {
		var rect = canvas.getBoundingClientRect();
		if (e.touches.length === 1) {
			var t = e.touches[0];
			touchStartPos.x = t.clientX;
			touchStartPos.y = t.clientY;
			dragStart.x = t.clientX;
			dragStart.y = t.clientY;
			touchStartTime = Date.now();
			isTouchDragging = true;
			isTouchPinching = false;

			mousePos.x = t.clientX - rect.left;
			mousePos.y = t.clientY - rect.top;
		} else if (e.touches.length === 2) {
			isTouchDragging = false;
			isTouchPinching = true;
			var dx = e.touches[0].clientX - e.touches[1].clientX;
			var dy = e.touches[0].clientY - e.touches[1].clientY;
			pinchStartDistance = Math.hypot(dx, dy);
			pinchStartZoom = camera.targetZoom;
		}
	}, { passive: false });

	canvas.addEventListener('touchmove', function (e) {
		e.preventDefault(); // Prevent iOS bounce
		var rect = canvas.getBoundingClientRect();

		if (isTouchPinching && e.touches.length === 2) {
			var dx = e.touches[0].clientX - e.touches[1].clientX;
			var dy = e.touches[0].clientY - e.touches[1].clientY;
			var currentDist = Math.hypot(dx, dy);
			if (pinchStartDistance > 0) {
				var scale = currentDist / pinchStartDistance;
				camera.targetZoom = Math.max(camera.minZoom, Math.min(camera.maxZoom, pinchStartZoom * scale));
			}
		} else if (isTouchDragging && e.touches.length === 1) {
			var t = e.touches[0];
			var moveDx = t.clientX - dragStart.x;
			var moveDy = t.clientY - dragStart.y;
			camera.targetX += moveDx;
			camera.targetY += moveDy;
			dragStart.x = t.clientX;
			dragStart.y = t.clientY;

			mousePos.x = t.clientX - rect.left;
			mousePos.y = t.clientY - rect.top;
		}
	}, { passive: false });

	canvas.addEventListener('touchend', function (e) {
		var elapsed = Date.now() - touchStartTime;
		var touchEndPos = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : null;

		if (touchEndPos && elapsed < 350) {
			var totalMove = Math.hypot(touchEndPos.clientX - touchStartPos.x, touchEndPos.clientY - touchStartPos.y);
			if (totalMove < 15) {
				// Tap Event
				if (hoveredNode) {
					if (window.navigator && typeof window.navigator.vibrate === 'function') {
						try { window.navigator.vibrate(10); } catch (_) {}
					}
					// If already showing popout card for this node, navigate
					if (popoutCard.classList.contains('is-active') && popoutTitle && popoutTitle.textContent === hoveredNode.name && hoveredNode.url) {
						window.location.href = hoveredNode.url;
					}
					// Otherwise, onHoverChanged already positioned popoutCard during touchstart/move
				} else {
					// Tapped empty space, dismiss popout card
					onHoverChanged(null, 0, 0);
				}
			}
		}

		if (e.touches.length === 0) {
			isTouchDragging = false;
			isTouchPinching = false;
		} else if (e.touches.length === 1) {
			isTouchPinching = false;
			isTouchDragging = true;
			dragStart.x = e.touches[0].clientX;
			dragStart.y = e.touches[0].clientY;
		}
	}, { passive: true });

	canvas.addEventListener('touchcancel', function () {
		isTouchDragging = false;
		isTouchPinching = false;
	}, { passive: true });

	// Filter Buttons
	var filterBtns = document.querySelectorAll('.solar-filter-btn');
	filterBtns.forEach(function (btn) {
		btn.addEventListener('click', function () {
			filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
			btn.classList.add('is-active');
			activeFilter = btn.getAttribute('data-filter') || 'all';
		});
	});

	// Simulation Controls
	var playPauseBtn = document.getElementById('solarPlayPause');
	var playIcon = document.getElementById('solarPlayIcon');
	var playText = document.getElementById('solarPlayText');
	if (playPauseBtn) {
		playPauseBtn.addEventListener('click', function () {
			isRunning = !isRunning;
			if (playIcon) playIcon.textContent = isRunning ? '⏸️' : '▶️';
			if (playText) playText.textContent = isRunning ? 'Duraklat' : 'Başlat';
		});
	}

	var speedToggleBtn = document.getElementById('solarSpeedToggle');
	var speedText = document.getElementById('solarSpeedText');
	var speedSteps = [0.5, 1.0, 2.0];
	var currentSpeedIndex = 1;
	if (speedToggleBtn) {
		speedToggleBtn.addEventListener('click', function () {
			currentSpeedIndex = (currentSpeedIndex + 1) % speedSteps.length;
			speedMultiplier = speedSteps[currentSpeedIndex];
			if (speedText) speedText.textContent = speedMultiplier.toFixed(1) + 'x Hız';
			if (speedValEl) speedValEl.textContent = speedMultiplier.toFixed(2) + ' KEPLER BİRİMİ';
		});
	}

	var resetViewBtn = document.getElementById('solarResetView');
	if (resetViewBtn) {
		resetViewBtn.addEventListener('click', function () {
			camera.targetX = 0;
			camera.targetY = 0;
			camera.targetZoom = 0.82;
		});
	}

	// Fullscreen Menu Simulation
	var simulatePortalBtn = document.getElementById('solarSimulatePortal');
	if (simulatePortalBtn) {
		simulatePortalBtn.addEventListener('click', function () {
			stageContainer.classList.toggle('is-fullscreen-simulation');
			var isFull = stageContainer.classList.contains('is-fullscreen-simulation');
			simulatePortalBtn.querySelector('.solar-ctrl-text').textContent = isFull ? 'Tam Ekrandan Çık' : 'Tam Ekran Menü Olarak Dene';
			setTimeout(resizeCanvas, 60);
		});
	}

	// Solar Navigation Menu Overlay Open / Close Handlers
	function openSolarMenu() {
		if (!overlay) return;
		overlay.classList.add('is-open');
		overlay.setAttribute('aria-hidden', 'false');
		document.body.classList.add('solar-menu-portal-open');
		setTimeout(resizeCanvas, 40);
		setTimeout(resizeCanvas, 180);
	}

	function closeSolarMenu() {
		if (!overlay) return;
		overlay.classList.remove('is-open');
		overlay.setAttribute('aria-hidden', 'true');
		document.body.classList.remove('solar-menu-portal-open');
		if (popoutCard) {
			popoutCard.classList.remove('is-active');
			popoutCard.setAttribute('aria-hidden', 'true');
		}
	}

	if (openBtn) {
		openBtn.addEventListener('click', openSolarMenu);
	}
	if (floatingBtn) {
		floatingBtn.addEventListener('click', openSolarMenu);
	}
	if (closeBtn) {
		closeBtn.addEventListener('click', closeSolarMenu);
	}

	// Close on ESC key
	window.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
			closeSolarMenu();
		}
	});

	// Close on backdrop click
	if (overlay) {
		overlay.addEventListener('click', function (e) {
			if (e.target === overlay) {
				closeSolarMenu();
			}
		});
	}

	// Start Engine Loop
	requestAnimationFrame(renderLoop);

})();
