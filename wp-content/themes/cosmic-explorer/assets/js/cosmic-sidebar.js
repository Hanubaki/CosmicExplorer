/**
 * Cosmic Explorer - Black Hole Portal & Dynamic Breadcrumb Navigation
 *
 * Implements a relativistic Binary Black Hole (İkili Karadelik) merger & off-canvas portal:
 * - Two resting black holes (Alfa & Beta) anchored along the left viewport edge.
 * - Live gravitational particle canvas swirling plasma into their event horizons.
 * - Clicking either black hole triggers a rapid relativistic inspiral merger (~1.4s)
 *   where both bodies spiral inwards, produce a gravitational shockwave blast,
 *   and fuse into the single giant Black Hole (M87* / GW150914) portal.
 * - Mouse wheel scroll / navigation controls cycle topic nodes out of the singularity.
 */

document.addEventListener('DOMContentLoaded', function () {
	// Ensure site scroll is always enabled on initial load
	document.body.style.overflow = '';
	document.documentElement.style.overflow = '';

	var overlay = document.getElementById('cosmicDrawerOverlay');
	var closeBtn = document.getElementById('cosmicDrawerClose');
	var activeCrumb = document.getElementById('cosmicActiveCrumb');
	var orbitArc = document.getElementById('cosmicOrbitArc');
	var prevBtn = document.getElementById('bhOrbitPrev');
	var nextBtn = document.getElementById('bhOrbitNext');
	var pageCounter = document.getElementById('bhPageCounter');

	// Binary Black Hole Elements
	var binarySystem = document.getElementById('binaryBhSystem');
	var binaryUpper = document.getElementById('binaryBhUpper');
	var binaryLower = document.getElementById('binaryBhLower');

	// --- 1. Topic Data (Real NASA Photos & Verified Scientific Subtitles) ---
	var themeUri = '/wordpress/wp-content/themes/cosmic-explorer';
	var cosmicTopics = [
		// Batch 0 (Temel Sistemler & Göksel Cisimler)
		{
			id: 'gunun-fotografi',
			title: 'Günün Fotoğrafı',
			subtitle: 'NASA Günlük APOD & 7 Günlük Arşiv',
			image: themeUri + '/assets/images/hero-webb.jpg',
			url: '/wordpress/gunun-fotografi/',
			badge: 'Canlı APOD',
			anchorId: 'gunun-fotografi',
			excerpt: 'NASA ve profesyonel gökbilimciler tarafından her gün seçilen günün astronomi fotoğrafı. Gerçek zamanlı NASA API telemetrisiyle son 7 günün derin uzay gözlemlerini ve bilimsel açıklamalarını inceleyin.'
		},
		{
			id: 'gunes-sistemi',
			title: 'Güneş Sistemi',
			subtitle: 'Gezegenler & Yörünge Fiziği',
			image: themeUri + '/assets/images/jupiter.jpg',
			url: '/wordpress/gunes-sistemi/',
			badge: '8 Gezegen',
			anchorId: 'gunes-sistemi',
			excerpt: 'Merkür\'den Neptün\'e Güneş\'in kütleçekim alanındaki 8 ana gezegen ve uyduları. Gezegenlerin çapları, yörünge periyotları, yüzey sıcaklıkları ve keşif sondaları hakkında detaylı veriler.'
		},
		{
			id: 'karadelikler',
			title: 'Karadelikler',
			subtitle: 'Olay Ufku & Schwarzschild',
			image: themeUri + '/assets/images/blackhole.jpg',
			url: '/wordpress/karadelikler/',
			badge: 'M87* EHT',
			anchorId: 'karadelikler',
			excerpt: 'Işığın dahi kaçamayacağı kadar muazzam kütleçekimine sahip uzay-zaman tekillikleri. Schwarzschild yarıçapı, akresyon diskleri, Hawking ışıması ve Event Horizon Teleskobu ile görüntülenen ilk karadelik M87*.'
		},
		{
			id: 'supernovalar',
			title: 'Süpernovalar',
			subtitle: 'Yıldız Evrimi & Nebulalar',
			image: themeUri + '/assets/images/supernova.jpg',
			url: '/wordpress/supernovalar/',
			badge: 'Yengeç Kalıntısı',
			anchorId: 'supernovalar',
			excerpt: 'Büyük kütleli yıldızların yakıtını tüketerek patladığı kozmik nükleer felaketler. Evrendeki demir, altın ve ağır elementleri uzaya saçan, geride nötron yıldızları ve pulsarlar bırakan patlama evreleri.'
		},
		{
			id: 'galaksiler',
			title: 'Galaksiler',
			subtitle: 'Kozmik Ağ & Yıldız Doğumevi',
			image: themeUri + '/assets/images/pillars.jpg',
			url: '/wordpress/galaksiler/',
			badge: 'Yaratılış Sütunları',
			anchorId: 'galaksiler',
			excerpt: 'Milyarlarca yıldız, gaz ve karanlık maddeden oluşan dev kozmik adalar. Samanyolu, Andromeda çarpışma simülasyonu, Hubble Ultra Derin Alanı ve Yaratılış Sütunları yıldız doğumevleri.'
		},
		// Batch 1 (Kozmoloji & Keşif Misyonları)
		{
			id: 'karanlik-madde',
			title: 'Karanlık Madde & Enerji',
			subtitle: 'Evrenin %95\'lik Gizemi',
			image: themeUri + '/assets/images/hero-webb.jpg',
			url: '/wordpress/karanlik-madde-ve-enerji/',
			badge: 'JWST Derin Alan',
			anchorId: 'karanlik-madde',
			excerpt: 'Evrenin %68\'ini kaplayan ve genişlemeyi hızlandıran Karanlık Enerji ile galaksileri bir arada tutan görünmeyen Karanlık Madde. Kütleçekimsel merceklenme ve modern kozmoloji gözlemleri.'
		},
		{
			id: 'uzay-gorevleri',
			title: 'Uzay Görevleri',
			subtitle: 'Apollo 11, Hubble & JWST',
			image: themeUri + '/assets/images/apollo11.jpg',
			url: '/wordpress/uzay-gorevleri/',
			badge: '1961 - 2026',
			anchorId: 'kesif-tarihi',
			excerpt: 'Yuri Gagarin\'in ilk Vostok 1 uçuşundan Apollo 11 Ay inişine, Hubble ve James Webb Uzay Teleskobu\'na uzanan insanlığın uzay yolculuğundaki tarihi dönüm noktaları ve telemetri kayıtları.'
		},
		{
			id: 'celestial-stats',
			title: 'Kozmik Sabitler',
			subtitle: 'Işık Hızı & Evren Yaşı',
			image: themeUri + '/assets/images/sun.jpg',
			url: '/wordpress/#celestial-stats',
			badge: 'SI Sabitleri',
			anchorId: 'celestial-stats',
			excerpt: 'Saniyede 299.792 km olan evrensel ışık hızı limiti, 13.8 milyar yıllık evren yaşı, Güneş\'in 5.500°C yüzey sıcaklığı ve 2 trilyon gözlemlenebilir galaksiye dair kesin astrofizik rakamları.'
		},
		{
			id: 'bilgi-testi',
			title: 'Günün Kozmik Bulmacası',
			subtitle: 'Günlük Görev &bull; Kozmik Seri',
			image: themeUri + '/assets/images/earth.jpg',
			url: '/wordpress/#bilgi-testi',
			badge: 'Günlük Bulmaca',
			anchorId: 'bilgi-testi',
			excerpt: 'Her gün gece yarısı 00:00\'da sıfırlanan BiP & Wordle tarzı günlük uzay testi! 3 aşamalı ipucunu açarak gizli gök cismini bulun, 5/5 serinizi koruyun ve puanınızı arkadaşlarınızla paylaşın.'
		}
	];

	// Dynamically update APOD topic node with today's live NASA image, title, and summary
	fetch('/wordpress/wp-json/cosmic-explorer/v1/apod')
		.then(function (res) { return res.json(); })
		.then(function (data) {
			if (Array.isArray(data) && data.length > 0) {
				var apodTopic = cosmicTopics.find(function (t) { return t.id === 'gunun-fotografi'; });
				if (apodTopic) {
					if (data[0].image) apodTopic.image = data[0].image;
					if (data[0].title) {
						var shortTitle = data[0].title;
						if (shortTitle.length > 24) shortTitle = shortTitle.substring(0, 24) + '...';
						if (data[0].dateStr) apodTopic.subtitle = data[0].dateStr + ' • ' + shortTitle;
					}
					if (data[0].explanation) {
						apodTopic.excerpt = data[0].explanation.substring(0, 220) + '...';
					}
					// If currently previewing APOD, refresh the preview panel live
					var currentPreviewTitle = document.getElementById('previewTitle');
					if (currentPreviewTitle && currentPreviewTitle.textContent === 'Günün Fotoğrafı') {
						updateTopicPreview(apodTopic, 0);
					}
				}
			}
		})
		.catch(function () {});

	var currentBatch = 0;
	var batchSize = 4;
	var totalBatches = Math.ceil(cosmicTopics.length / batchSize);
	var isAnimating = false;
	var isMerging = false;

	// Positions along the orbital arc (Optimized for full viewport visibility)
	var arcPositions = [
		{ top: '3%', left: '310px', className: 'pos-1' },
		{ top: '26%', left: '440px', className: 'pos-2' },
		{ top: '50%', left: '440px', className: 'pos-3' },
		{ top: '73%', left: '310px', className: 'pos-4' }
	];

	// --- Right Side Topic Summary & Preview Controller ---
	function updateTopicPreview(item, index) {
		var previewPanel = document.getElementById('cosmicTopicPreview');
		if (!previewPanel || !item) return;

		// Highlight corresponding node on the arc
		var allNodes = orbitArc ? orbitArc.querySelectorAll('.bh-orbit-node') : [];
		allNodes.forEach(function (n) {
			if (n.getAttribute('data-id') === item.id) {
				n.classList.add('is-preview-active');
			} else {
				n.classList.remove('is-preview-active');
			}
		});

		var badgeEl = document.getElementById('previewBadge');
		var indexEl = document.getElementById('previewIndex');
		var imgEl = document.getElementById('previewImage');
		var titleEl = document.getElementById('previewTitle');
		var subEl = document.getElementById('previewSubtitle');
		var excerptEl = document.getElementById('previewExcerpt');
		var ctaEl = document.getElementById('previewCta');

		if (badgeEl) badgeEl.textContent = item.badge || 'Kozmik Konu';
		if (indexEl) {
			var num = (typeof index === 'number' ? index + 1 : 1);
			var total = cosmicTopics.length;
			indexEl.textContent = (num < 10 ? '0' + num : num) + ' / ' + (total < 10 ? '0' + total : total);
		}
		if (imgEl) {
			imgEl.src = item.image;
			imgEl.alt = item.title;
		}
		if (titleEl) titleEl.textContent = item.title;
		if (subEl) subEl.textContent = item.subtitle;
		if (excerptEl) excerptEl.textContent = item.excerpt || '';
		if (ctaEl) {
			ctaEl.href = item.url;
			ctaEl.onclick = function (e) {
				if (item.url.indexOf('#') !== -1) {
					var anchor = item.url.split('#')[1];
					var targetEl = document.getElementById(anchor);
					if (targetEl) {
						e.preventDefault();
						closePortal();
						targetEl.scrollIntoView({ behavior: 'smooth' });
						return;
					}
				}
				var currentPath = window.location.pathname.replace(/\/$/, '');
				var targetPath = item.url.split('#')[0].replace(/\/$/, '');
				if (currentPath === targetPath && currentPath.length > 0) {
					e.preventDefault();
					closePortal();
					window.scrollTo({ top: 0, behavior: 'smooth' });
					return;
				}
				closePortal();
			};
		}

		previewPanel.classList.remove('bh-preview-flash');
		void previewPanel.offsetWidth;
		previewPanel.classList.add('bh-preview-flash');
	}

	// --- 2. Render Orbs Along the Black Hole Arc ---
	function createOrbElement(item, index) {
		var pos = arcPositions[index % batchSize];
		var orb = document.createElement('a');
		orb.href = item.url;
		orb.className = 'bh-orbit-node ' + pos.className;
		orb.style.top = pos.top;
		orb.style.pointerEvents = 'auto'; // Garanti tıklanabilir ve etkileşimli
		orb.setAttribute('data-target-left', pos.left);
		orb.setAttribute('data-index', index);
		orb.setAttribute('data-id', item.id);

		// Hover and Focus update the right-side preview card
		var globalIndex = (currentBatch * batchSize) + (index % batchSize);
		orb.addEventListener('mouseenter', function () {
			updateTopicPreview(item, globalIndex);
		});
		orb.addEventListener('focus', function () {
			updateTopicPreview(item, globalIndex);
		});

		// Smooth link handling
		orb.addEventListener('click', function (e) {
			if (item.url.indexOf('#') !== -1) {
				var anchor = item.url.split('#')[1];
				var targetEl = document.getElementById(anchor);
				if (targetEl) {
					e.preventDefault();
					closePortal();
					targetEl.scrollIntoView({ behavior: 'smooth' });
					return;
				}
			}
			var currentPath = window.location.pathname.replace(/\/$/, '');
			var targetPath = item.url.split('#')[0].replace(/\/$/, '');
			if (currentPath === targetPath && currentPath.length > 0) {
				e.preventDefault();
				closePortal();
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return;
			}
			closePortal();
		});

		orb.innerHTML = 
			'<div class="bh-node-sphere">' +
				'<div class="bh-node-glow"></div>' +
				'<div class="bh-node-ring"></div>' +
				'<div class="bh-node-photo-wrap">' +
					'<img src="' + item.image + '" alt="' + item.title + '" class="bh-node-photo" />' +
				'</div>' +
				'<span class="bh-node-badge">' + item.badge + '</span>' +
			'</div>' +
			'<div class="bh-node-meta">' +
				'<h3 class="bh-node-title">' + item.title + '</h3>' +
				'<p class="bh-node-sub">' + item.subtitle + '</p>' +
			'</div>';

		return orb;
	}

	function renderBatch(batchIndex, direction, isInitial) {
		if (!orbitArc) return;
		isAnimating = true;

		var startIdx = batchIndex * batchSize;
		var items = cosmicTopics.slice(startIdx, startIdx + batchSize);
		var oldNodes = orbitArc.querySelectorAll('.bh-orbit-node');

		// İlk açılışta (isInitial === true) veya henüz eleman yoksa:
		// ASLA içeri yutulma animasyonu çalıştırma! Direkt temizle ve karadelikten fırlat!
		if (isInitial || oldNodes.length === 0) {
			orbitArc.innerHTML = '';
			injectNewNodes(items, direction, isInitial, startIdx);
		} else {
			// Sadece menü zaten açıkken scroll veya ok butonlarıyla sayfa değiştirildiğinde eski konular yutulur
			oldNodes.forEach(function (node, i) {
				node.classList.remove('emerge-out');
				node.classList.add('swallow-in');
				node.style.animationDelay = (i * 0.04) + 's';
			});

			setTimeout(function () {
				orbitArc.innerHTML = '';
				injectNewNodes(items, direction, false, startIdx);
			}, 380);
		}

		if (pageCounter) {
			var curNum = (batchIndex + 1);
			pageCounter.textContent = (curNum < 10 ? '0' + curNum : curNum) + ' / ' + (totalBatches < 10 ? '0' + totalBatches : totalBatches);
		}
	}

	function injectNewNodes(items, direction, isInitial, startIdx) {
		// Karadelik genişlemesiyle tam eşzamanlı kütleçekimsel radyal fırlama (t = 0 başlangıç)
		var baseDelay = 0;
		items.forEach(function (item, i) {
			var node = createOrbElement(item, i);
			node.classList.add('emerge-out');
			node.style.animationDelay = (baseDelay + i * 0.035) + 's';
			orbitArc.appendChild(node);
		});

		// Default preview to the first item in this batch
		if (items.length > 0) {
			var firstIdx = (typeof startIdx === 'number' ? startIdx : currentBatch * batchSize);
			updateTopicPreview(items[0], firstIdx);
		}

		var animLock = isInitial ? 250 : 380;
		setTimeout(function () {
			isAnimating = false;
			var currentNodes = orbitArc ? orbitArc.querySelectorAll('.bh-orbit-node') : [];
			currentNodes.forEach(function (n) {
				n.classList.remove('emerge-out');
			});
		}, 420);
	}

	function switchBatch(delta) {
		if (isAnimating) return;
		var next = currentBatch + delta;
		if (next < 0) next = totalBatches - 1;
		if (next >= totalBatches) next = 0;
		currentBatch = next;
		renderBatch(currentBatch, delta, false);
	}

	// --- 3. Binary Black Hole Merger Animation & Portal Open ---
	function triggerBinaryMerger() {
		if (isMerging || (overlay && overlay.classList.contains('is-open'))) return;
		isMerging = true;

		if (binarySystem) {
			binarySystem.classList.add('is-merging');
		}

		if (glStartMerger) {
			glStartMerger();
		}

		// Optimist & ultra-smooth hızlı birleşim (280ms):
		// Kullanıcı tıkladığı anda anlık, akıcı ve pürüzsüz geçiş
		setTimeout(function () {
			openPortal();
			if (binarySystem) {
				binarySystem.classList.remove('is-merging');
				binarySystem.classList.add('is-hidden');
			}
			isMerging = false;
		}, 280);
	}

	function openPortal() {
		if (overlay) {
			overlay.classList.add('is-open');
			overlay.setAttribute('aria-hidden', 'false');
			document.body.style.overflow = 'hidden';
			document.documentElement.style.overflow = 'hidden';
			startPortalKerrGL();
			renderBatch(currentBatch, 1, true); // true: Karadelik büyüdükten sonra konular içinden çıkar
		}
	}

	function closePortal() {
		if (overlay) {
			overlay.classList.remove('is-open');
			overlay.setAttribute('aria-hidden', 'true');
			document.body.style.overflow = '';
			document.documentElement.style.overflow = '';
		}
		stopPortalKerrGL();
		if (orbitArc) {
			orbitArc.innerHTML = '';
		}
		if (binarySystem) {
			binarySystem.classList.remove('is-hidden');
		}
		if (glResetMerger) {
			glResetMerger();
		}
	}

	// Bind Unified Binary Black Hole System to Merger Trigger (Tekil Etkileşim)
	if (binarySystem) {
		binarySystem.addEventListener('click', function (e) {
			e.preventDefault();
			triggerBinaryMerger();
		});
		binarySystem.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				triggerBinaryMerger();
			}
		});
	}

	// Close portal triggers
	if (closeBtn) {
		closeBtn.addEventListener('click', function (e) {
			e.preventDefault();
			closePortal();
		});
	}

	if (overlay) {
		overlay.addEventListener('click', function (e) {
			if (e.target === overlay || e.target.id === 'cosmicPortalStage') {
				closePortal();
			}
		});
	}

	if (prevBtn) {
		prevBtn.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			switchBatch(-1);
		});
	}

	if (nextBtn) {
		nextBtn.addEventListener('click', function (e) {
			e.preventDefault();
			e.stopPropagation();
			switchBatch(1);
		});
	}

	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && overlay && overlay.classList.contains('is-open')) {
			closePortal();
		}
	});

	// --- 4. Mouse Wheel Scroll (ONLY intercepts when the portal is OPEN) ---
	if (overlay) {
		overlay.addEventListener('wheel', function (e) {
			if (!overlay.classList.contains('is-open')) {
				return; // Do nothing if closed, let native scroll work freely!
			}
			e.preventDefault();
			if (isAnimating) return;
			if (e.deltaY > 15) {
				switchBatch(1);
			} else if (e.deltaY < -15) {
				switchBatch(-1);
			}
		}, { passive: false });
	}

	// --- 5. WebGL Relativistic Binary Black Hole Gravitational Lensing Simulation ---
	var glStartMerger = null;
	var glResetMerger = null;

	function initBinaryBlackHoleGL() {
		var canvas = document.getElementById('binaryBhCanvas');
		if (!canvas) return;

		var gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false }) ||
		         canvas.getContext('experimental-webgl', { alpha: true, antialias: true, premultipliedAlpha: false });

		if (!gl) {
			console.warn('WebGL not available for binary black hole');
			return;
		}

		var vsSource = [
			'attribute vec2 a_pos;',
			'void main() {',
			'    gl_Position = vec4(a_pos, 0.0, 1.0);',
			'}'
		].join('\n');

		var fsSource = [
			'#ifdef GL_ES',
			'precision highp float;',
			'#endif',
			'uniform vec2 u_res;',
			'uniform float u_time;',
			'uniform float u_hover;',
			'uniform float u_merger;',
			'',
			'float hash21(vec2 p) {',
			'    p = fract(p * vec2(234.34, 435.345));',
			'    p += dot(p, p + 34.23);',
			'    return fract(p.x * p.y);',
			'}',
			'',
			'float starLayer(vec2 uv, float scale, float threshold, float tw) {',
			'    vec2 p = uv * scale;',
			'    vec2 id = floor(p);',
			'    vec2 f = fract(p) - 0.5;',
			'    float h = hash21(id);',
			'    if (h > threshold) {',
			'        float d = length(f);',
			'        float size = (h - threshold) / (1.0 - threshold) * 0.44 + 0.06;',
			'        float twinkle = 0.75 + 0.25 * sin(u_time * tw + h * 6.2831);',
			'        return smoothstep(size, 0.0, d) * twinkle;',
			'    }',
			'    return 0.0;',
			'}',
			'',
			'void main() {',
			'    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res.xy) / (u_res.y * 0.5);',
			'',
			'    float speed = 0.82;',
			'    float t = u_time * speed;',
			'',
			'    float m = clamp(u_merger, 0.0, 1.0);',
			'    float chirpAngle = t + pow(m, 2.4) * 18.8495;',
			'    float orbitRadius = mix(0.24, 0.0, pow(m, 1.6));',
			'',
			'    vec2 bh1 = vec2(cos(chirpAngle), sin(chirpAngle)) * orbitRadius;',
			'    vec2 bh2 = -bh1;',
			'',
			'    vec2 v1 = uv - bh1;',
			'    vec2 v2 = uv - bh2;',
			'    float d1 = length(v1);',
			'    float d2 = length(v2);',
			'',
			'    float rh = mix(0.18, 0.26, m);',
			'',
			'    if (d1 < rh || d2 < rh) {',
			'        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);',
			'        return;',
			'    }',
			'',
			'    float gm = 0.045;',
			'    vec2 deflect1 = (v1 / (d1 * d1 + 0.0015)) * gm;',
			'    vec2 deflect2 = (v2 / (d2 * d2 + 0.0015)) * gm;',
			'    vec2 warpedUv = uv + deflect1 + deflect2;',
			'',
			'    float s1 = starLayer(warpedUv, 22.0, 0.82, 2.0);',
			'    float s2 = starLayer(warpedUv + vec2(0.35, 0.72), 44.0, 0.86, 3.4) * 0.75;',
			'    float s3 = starLayer(warpedUv - vec2(0.51, 0.28), 80.0, 0.90, 4.5) * 0.5;',
			'    float allStars = s1 + s2 + s3;',
			'',
			'    float neb = (sin(warpedUv.x * 2.5 + warpedUv.y * 1.8) * 0.5 + 0.5) *',
			'                (cos(warpedUv.x * 4.0 - warpedUv.y * 3.2) * 0.5 + 0.5);',
			'',
			'    vec3 col = vec3(0.008, 0.012, 0.022);',
			'    col += vec3(0.96, 0.94, 0.86) * allStars;',
			'    col += vec3(0.15, 0.10, 0.18) * neb;',
			'',
			'    float binaryDist = length(uv);',
			'    float outerRing = smoothstep(0.05, 0.0, abs(binaryDist - orbitRadius * 1.85));',
			'    col += vec3(0.28, 0.24, 0.20) * outerRing * (allStars + 0.25);',
			'',
			'    float pr1 = smoothstep(0.014, 0.001, abs(d1 - rh));',
			'    float pr2 = smoothstep(0.014, 0.001, abs(d2 - rh));',
			'    vec3 photonGlow = vec3(1.0, 0.97, 0.90);',
			'    col += photonGlow * (pr1 + pr2) * 2.2;',
			'',
			'    float midDist = length(uv - (bh1 + bh2) * 0.5);',
			'    float saddleMask = smoothstep(orbitRadius * 1.15, 0.0, midDist);',
			'    float cusp = (1.0 - smoothstep(rh * 0.92, rh * 1.35, min(d1, d2))) * saddleMask;',
			'    col += vec3(1.0, 0.94, 0.85) * cusp * 1.3;',
			'',
			'    float edgeDist = length(uv);',
			'    float alpha = smoothstep(0.98, 0.70, edgeDist);',
			'',
			'    gl_FragColor = vec4(col, alpha);',
			'}'
		].join('\n');

		function createShader(type, source) {
			var s = gl.createShader(type);
			gl.shaderSource(s, source);
			gl.compileShader(s);
			if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
				console.error('Shader compile error:', gl.getShaderInfoLog(s));
				gl.deleteShader(s);
				return null;
			}
			return s;
		}

		var vs = createShader(gl.VERTEX_SHADER, vsSource);
		var fs = createShader(gl.FRAGMENT_SHADER, fsSource);
		if (!vs || !fs) return;

		var program = gl.createProgram();
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.error('Program link error:', gl.getProgramInfoLog(program));
			return;
		}

		gl.useProgram(program);

		var positionBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			-1.0, -1.0,
			 1.0, -1.0,
			-1.0,  1.0,
			-1.0,  1.0,
			 1.0, -1.0,
			 1.0,  1.0
		]), gl.STATIC_DRAW);

		var aPosLoc = gl.getAttribLocation(program, 'a_pos');
		gl.enableVertexAttribArray(aPosLoc);
		gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

		var uResLoc = gl.getUniformLocation(program, 'u_res');
		var uTimeLoc = gl.getUniformLocation(program, 'u_time');
		var uHoverLoc = gl.getUniformLocation(program, 'u_hover');
		var uMergerLoc = gl.getUniformLocation(program, 'u_merger');

		var hoverVal = 0.0;
		var targetHover = 0.0;
		var mergerVal = 0.0;
		var isMergingActive = false;
		var mergerStart = 0;
		var mergerDuration = 280; // ms: Hızlı, optimist ve akıcı inspiral

		if (binarySystem) {
			binarySystem.addEventListener('mouseenter', function () {
				targetHover = 1.0;
			});
			binarySystem.addEventListener('mouseleave', function () {
				targetHover = 0.0;
			});
		}

		glStartMerger = function () {
			isMergingActive = true;
			mergerStart = performance.now();
		};

		glResetMerger = function () {
			isMergingActive = false;
			mergerVal = 0.0;
		};

		var startTime = performance.now();

		function updateBridgePosition() {
			if (!window.CosmicBridge || !canvas) return;
			var rect = canvas.getBoundingClientRect();
			var cx = rect.left + rect.width * 0.5;
			var cy = rect.top + rect.height * 0.5;
			var w = window.innerWidth;
			var h = window.innerHeight;
			window.CosmicBridge.clipX = (cx / w) * 2.0 - 1.0;
			window.CosmicBridge.clipY = 1.0 - (cy / h) * 2.0;
			var minDim = Math.min(w, h);
			window.CosmicBridge.uvX = (cx - 0.5 * w) / minDim;
			window.CosmicBridge.uvY = -(cy - 0.5 * h) / minDim;
		}

		window.addEventListener('resize', updateBridgePosition, { passive: true });
		updateBridgePosition();

		function renderGL(now) {
			if (overlay && overlay.classList.contains('is-open')) {
				if (window.CosmicBridge) {
					window.CosmicBridge.bhActive = false;
				}
				requestAnimationFrame(renderGL);
				return;
			}

			var elapsed = (now - startTime) * 0.001;

			hoverVal += (targetHover - hoverVal) * 0.08;

			if (isMergingActive) {
				var p = (now - mergerStart) / mergerDuration;
				if (p >= 1.0) {
					mergerVal = 1.0;
				} else {
					mergerVal = p;
				}
			}

			if (window.CosmicBridge) {
				window.CosmicBridge.bhHover = hoverVal;
				window.CosmicBridge.bhMerger = mergerVal;
				window.CosmicBridge.bhActive = true;
			}

			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.clearColor(0.0, 0.0, 0.0, 0.0);
			gl.clear(gl.COLOR_BUFFER_BIT);

			gl.uniform2f(uResLoc, canvas.width, canvas.height);
			gl.uniform1f(uTimeLoc, elapsed);
			gl.uniform1f(uHoverLoc, hoverVal);
			gl.uniform1f(uMergerLoc, mergerVal);

			gl.drawArrays(gl.TRIANGLES, 0, 6);

			requestAnimationFrame(renderGL);
		}

		requestAnimationFrame(renderGL);
	}

	initBinaryBlackHoleGL();

	// --- 6. Dynamic Breadcrumb Title and Active Page Detection ---
	var path = window.location.pathname.toLowerCase();
	var pageMap = [
		{ pattern: 'gunun-fotografi', title: 'Günün Astronomi Fotoğrafı (APOD)' },
		{ pattern: 'gunes-sistemi', title: 'Güneş Sistemi' },
		{ pattern: 'karadelikler', title: 'Karadelikler ve Olay Ufku' },
		{ pattern: 'supernovalar', title: 'Süpernovalar ve Nebulalar' },
		{ pattern: 'galaksiler', title: 'Galaksiler ve Kozmik Yapı' },
		{ pattern: 'karanlik-madde', title: 'Karanlık Madde ve Enerji' },
		{ pattern: 'uzay-gorevleri', title: 'Uzay Keşif Tarihi' }
	];

	var isSubpage = false;
	for (var i = 0; i < pageMap.length; i++) {
		if (path.indexOf(pageMap[i].pattern) !== -1) {
			if (activeCrumb) {
				activeCrumb.textContent = pageMap[i].title;
			}
			isSubpage = true;
			break;
		}
	}

	// Homepage Scroll Spy
	if (!isSubpage && activeCrumb) {
		activeCrumb.textContent = 'Evrenin Derinlikleri';

		var sections = [
			{ id: 'gunes-sistemi', title: 'Güneş Sistemi' },
			{ id: 'karadelikler', title: 'Karadelikler' },
			{ id: 'supernovalar', title: 'Süpernovalar' },
			{ id: 'galaksiler', title: 'Galaksiler' },
			{ id: 'karanlik-madde', title: 'Karanlık Madde' },
			{ id: 'celestial-stats', title: 'Evrenin Ölçütleri' },
			{ id: 'kesif-tarihi', title: 'Uzay Keşif Tarihi' },
			{ id: 'bilgi-testi', title: 'Günün Kozmik Bulmacası' }
		];

		if ('IntersectionObserver' in window) {
			var observer = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						var secId = entry.target.id;
						var found = sections.find(function (s) { return s.id === secId; });
						if (found && activeCrumb) {
							activeCrumb.style.opacity = '0';
							activeCrumb.style.transform = 'translateY(-4px)';
							setTimeout(function () {
								activeCrumb.textContent = found.title;
								activeCrumb.style.opacity = '1';
								activeCrumb.style.transform = 'translateY(0)';
							}, 150);
						}
					}
				});
			}, {
				rootMargin: '-20% 0px -60% 0px',
				threshold: 0
			});

			sections.forEach(function (sec) {
				var el = document.getElementById(sec.id);
				if (el) observer.observe(el);
			});

			window.addEventListener('scroll', function () {
				if (window.scrollY < 300 && activeCrumb) {
					if (activeCrumb.textContent !== 'Evrenin Derinlikleri') {
						activeCrumb.textContent = 'Evrenin Derinlikleri';
					}
				}
			}, { passive: true });
		}
	}

	// --- 7. Fullscreen Hardware-Accelerated WebGL Kerr Portal Engine ---
	var startPortalKerrGL = function () {};
	var stopPortalKerrGL = function () {};

	function initPortalKerrGL() {
		var canvas = document.getElementById('cosmicPortalGlCanvas');
		if (!canvas) return;

		var gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: false }) ||
		         canvas.getContext('experimental-webgl', { alpha: true, antialias: true, premultipliedAlpha: false });
		if (!gl) return;

		var vsSource = [
			'attribute vec2 a_pos;',
			'void main() {',
			'    gl_Position = vec4(a_pos, 0.0, 1.0);',
			'}'
		].join('\n');

		var fsSource = [
			'precision mediump float;',
			'uniform vec2 u_res;',
			'uniform float u_time;',
			'uniform vec2 u_cam;',
			'',
			'void main() {',
			'    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);',
			'    float yaw = u_cam.x;',
			'    float pitch = clamp(u_cam.y, 0.15, 1.30);',
			'',
			'    // 3D Ray Generation',
			'    vec3 ro = vec3(sin(yaw) * cos(pitch), sin(pitch), cos(yaw) * cos(pitch)) * 4.2;',
			'    vec3 ta = vec3(0.0);',
			'    vec3 ww = normalize(ta - ro);',
			'    vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));',
			'    vec3 vv = normalize(cross(uu, ww));',
			'    vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.55 * ww);',
			'',
			'    float r = length(uv);',
			'    float bhRadius = 0.285;',
			'    float photonRadius = 0.365;',
			'',
			'    vec3 col = vec3(0.0);',
			'    float alpha = 0.0;',
			'',
			'    // --- TRUE GRAVITATIONAL LENSING OF BACKGROUND SPACE & STARS ---',
			'    float deflection = 0.085 / (r * r + 0.026);',
			'    vec2 lensedUV = uv + normalize(uv) * deflection;',
			'    float starNoise = fract(sin(dot(floor(lensedUV * 46.0), vec2(12.9898, 78.233))) * 43758.5453);',
			'    if (starNoise > 0.982 && r > bhRadius * 1.05) {',
			'        float starIntensity = pow((starNoise - 0.982) / 0.018, 3.2);',
			'        vec3 starColor = mix(vec3(0.75, 0.92, 1.0), vec3(1.0, 0.85, 0.5), fract(starNoise * 13.0));',
			'        col += starColor * starIntensity * smoothstep(bhRadius * 1.05, bhRadius * 1.35, r);',
			'        alpha = max(alpha, starIntensity * 0.85);',
			'    }',
			'',
			'    // Primary Accretion Disk (Y = 0 plane)',
			'    if (abs(rd.y) > 0.001) {',
			'        float t = -ro.y / rd.y;',
			'        if (t > 0.0) {',
			'            vec3 p = ro + rd * t;',
			'            float dist = length(p.xz);',
			'            if (dist > 0.78 && dist < 2.85) {',
			'                float phi = atan(p.z, p.x);',
			'                float v_orb = 0.55 / sqrt(dist);',
			'                float doppler = clamp(1.0 + v_orb * sin(phi - yaw), 0.32, 2.35);',
			'',
			'                float temp = smoothstep(2.85, 0.88, dist);',
			'                vec3 diskCol = mix(vec3(0.92, 0.20, 0.02), vec3(1.0, 0.68, 0.07), temp);',
			'                diskCol = mix(diskCol, vec3(1.0, 0.98, 0.88), pow(temp, 2.3));',
			'',
			'                float spiral = sin(phi * 5.0 - u_time * 2.6 + dist * 6.5) * 0.5 + 0.5;',
			'                float density = (0.7 + 0.3 * spiral) * pow(doppler, 2.85);',
			'',
			'                vec3 c = diskCol * density * smoothstep(2.85, 2.3, dist) * smoothstep(0.78, 1.0, dist);',
			'                col += c;',
			'                alpha = max(alpha, length(c) * 0.9);',
			'            }',
			'        }',
			'    }',
			'',
			'    // Gravitationally Lensed Einstein Secondary Disk Arcs',
			'    float diskArcDist = abs(r - photonRadius * 1.38);',
			'    if (diskArcDist < 0.21 && r > bhRadius) {',
			'        float arcAngle = atan(uv.y, uv.x);',
			'        float arcDoppler = clamp(1.0 - 0.78 * cos(arcAngle + yaw), 0.3, 2.1);',
			'        float arcInt = (1.0 - diskArcDist / 0.21) * pow(arcDoppler, 2.2);',
			'        vec3 arcCol = mix(vec3(1.0, 0.35, 0.05), vec3(1.0, 0.88, 0.45), arcInt);',
			'        vec3 c = arcCol * arcInt * 0.78;',
			'        col += c;',
			'        alpha = max(alpha, length(c) * 0.85);',
			'    }',
			'',
			'    // Razor-Sharp Photon Sphere Caustics',
			'    float prDist = abs(r - photonRadius);',
			'    float prGlow = exp(-prDist * 60.0) * 1.6;',
			'    col += vec3(1.0, 0.94, 0.75) * prGlow;',
			'    alpha = max(alpha, prGlow * 0.9);',
			'',
			'    // Continuous Soft Relativistic Corona (No Circular Mask Cut)',
			'    float outerGlow = exp(-max(0.0, r - photonRadius) * 4.2) * 0.38;',
			'    col += vec3(1.0, 0.58, 0.12) * outerGlow;',
			'    alpha = max(alpha, outerGlow);',
			'',
			'    // Event Horizon Void (Pure Black)',
			'    if (r < bhRadius) {',
			'        col = vec3(0.0);',
			'        alpha = 1.0; // Opaque black for HUD readability',
			'    } else {',
			'        col *= smoothstep(bhRadius, bhRadius + 0.015, r);',
			'    }',
			'',
			'    alpha = clamp(alpha, 0.0, 1.0);',
			'    gl_FragColor = vec4(col, alpha);',
			'}'
		].join('\n');

		var vs = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vs, vsSource);
		gl.compileShader(vs);

		var fs = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fs, fsSource);
		gl.compileShader(fs);

		if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
			console.warn('Portal Kerr FS compile err:', gl.getShaderInfoLog(fs));
			return;
		}

		var prog = gl.createProgram();
		gl.attachShader(prog, vs);
		gl.attachShader(prog, fs);
		gl.linkProgram(prog);

		if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
			console.warn('Portal Kerr Prog link err:', gl.getProgramInfoLog(prog));
			return;
		}

		var posBuf = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
			-1.0, -1.0,
			 1.0, -1.0,
			-1.0,  1.0,
			-1.0,  1.0,
			 1.0, -1.0,
			 1.0,  1.0
		]), gl.STATIC_DRAW);

		var aPosLoc = gl.getAttribLocation(prog, 'a_pos');
		var uResLoc = gl.getUniformLocation(prog, 'u_res');
		var uTimeLoc = gl.getUniformLocation(prog, 'u_time');
		var uCamLoc = gl.getUniformLocation(prog, 'u_cam');

		var isPortalRunning = false;
		var portalAnimId = null;
		var yaw = 0.0;
		var pitch = 0.38;
		var targetYaw = 0.0;
		var targetPitch = 0.38;
		var startTime = performance.now();

		function renderPortalGL(now) {
			if (!isPortalRunning) return;

			yaw += (targetYaw - yaw) * 0.08;
			pitch += (targetPitch - pitch) * 0.08;

			var elapsed = (now - startTime) * 0.001;

			gl.viewport(0, 0, canvas.width, canvas.height);
			gl.clearColor(0.0, 0.0, 0.0, 0.0);
			gl.clear(gl.COLOR_BUFFER_BIT);

			gl.useProgram(prog);
			gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
			gl.enableVertexAttribArray(aPosLoc);
			gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

			gl.uniform2f(uResLoc, canvas.width, canvas.height);
			gl.uniform1f(uTimeLoc, elapsed);
			gl.uniform2f(uCamLoc, yaw, pitch);

			gl.drawArrays(gl.TRIANGLES, 0, 6);

			portalAnimId = requestAnimationFrame(renderPortalGL);
		}

		startPortalKerrGL = function () {
			if (isPortalRunning) return;
			isPortalRunning = true;
			startTime = performance.now();
			portalAnimId = requestAnimationFrame(renderPortalGL);
		};

		stopPortalKerrGL = function () {
			isPortalRunning = false;
			if (portalAnimId) {
				cancelAnimationFrame(portalAnimId);
				portalAnimId = null;
			}
		};

		// Interactive Camera Tilt on Stage Mouse Movement
		var stage = document.getElementById('cosmicPortalStage');
		if (stage) {
			stage.addEventListener('mousemove', function (e) {
				var w = window.innerWidth;
				var h = window.innerHeight;
				targetYaw = ((e.clientX / w) - 0.5) * 0.45;
				targetPitch = 0.38 + ((e.clientY / h) - 0.5) * 0.35;
			}, { passive: true });
		}
	}

	initPortalKerrGL();
});
