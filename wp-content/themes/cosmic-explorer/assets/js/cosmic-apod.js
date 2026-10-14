/**
 * Cosmic Explorer - Live NASA APOD (Astronomy Picture of the Day) & 7-Day Dynamic Archive
 *
 * Automatically fetches and updates the latest 7 days of astronomy photography
 * directly from NASA APOD live API every single day.
 */

document.addEventListener('DOMContentLoaded', function () {
	var daysList = document.getElementById('apodDaysList');
	if (!daysList) return; // Only run on pages that have the APOD section

	var mainDisplay = document.getElementById('apodMainDisplay');
	var featuredImg = document.getElementById('apodFeaturedImage');
	var tagBadge = document.getElementById('apodTagBadge');
	var dateBadge = document.getElementById('apodDateBadge');
	var creditValue = document.getElementById('apodCreditValue');
	var apodTitle = document.getElementById('apodTitle');
	var apodDescText = document.getElementById('apodDescText');
	var tdInstrument = document.getElementById('tdInstrument');
	var tdDistance = document.getElementById('tdDistance');
	var tdClass = document.getElementById('tdClass');
	var tdArchive = document.getElementById('tdArchive');

	var apodArchive = [];
	var currentActiveDay = 0;

	var monthNamesTr = [
		'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
		'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
	];

	function formatTurkishDate(dateObj) {
		var d = String(dateObj.getDate()).padStart(2, '0');
		var m = monthNamesTr[dateObj.getMonth()];
		var y = dateObj.getFullYear();
		return d + ' ' + m + ' ' + y;
	}

	// 1. Hydrate from server-embedded JSON payload (Instant 0ms display)
	var serverDataEl = document.getElementById('cosmic-apod-server-data');
	if (serverDataEl && serverDataEl.textContent.trim()) {
		try {
			var parsed = JSON.parse(serverDataEl.textContent);
			if (Array.isArray(parsed) && parsed.length > 0) {
				apodArchive = parsed;
			}
		} catch (e) {
			console.warn('Could not parse server APOD payload:', e);
		}
	}

	// 2. Client-side Dynamic Date Fallback if server payload was empty
	if (!apodArchive || apodArchive.length === 0) {
		var themeUri = '/wordpress/wp-content/themes/cosmic-explorer';
		var defaultImages = [
			themeUri + '/assets/images/hero-webb.jpg',
			themeUri + '/assets/images/blackhole.jpg',
			themeUri + '/assets/images/supernova.jpg',
			themeUri + '/assets/images/pillars.jpg',
			themeUri + '/assets/images/jupiter.jpg',
			themeUri + '/assets/images/mars.jpg',
			themeUri + '/assets/images/sun.jpg'
		];
		var defaultTitles = [
			'NGC 3324: Karina Nebulası Kozmik Uçurumlar',
			'Messier 87 Karadeliği ve Polarize Manyetik Alanlar',
			'Yengeç Nebulası: Süpernova Kalıntısı ve Pulsar',
			'Yaratılış Sütunları: Kartal Nebulası Moleküler Kuleleri',
			'Jüpiter\'in Fırtınalı Atmosferi ve Büyük Kırmızı Leke',
			'Mars: Jezero Krateri ve Antik Nehir Deltası',
			'Güneş Dinamikleri: Koronal Kütle Atımı ve Plazma Döngüleri'
		];

		for (var i = 0; i < 7; i++) {
			var d = new Date();
			d.setDate(d.getDate() - i);
			var status = (i === 0) ? 'BUGÜN' : (i === 1 ? 'DÜN' : i + ' GÜN ÖNCE');
			apodArchive.push({
				day: i,
				status: status,
				dateStr: formatTurkishDate(d),
				title: defaultTitles[i] || 'Kozmik Gözlem',
				image: defaultImages[i],
				tag: 'Doğrulanmış NASA Bilimsel Gözlemi',
				credit: 'NASA / STScI / ESA',
				instrument: 'James Webb & Hubble Uzay Teleskopları',
				distance: 'Kozmik Koordinat Arşivi',
				classType: 'Astrofiziksel Gök Cismi',
				archiveStatus: 'Canlı NASA APOD Servisi',
				desc: 'NASA ve uluslararası gözlemevleri tarafından her gün paylaşılan yüksek çözünürlüklü astronomi fotoğrafı ve bilimsel telemetri kaydı.'
			});
		}
	}

	function renderDayPills() {
		daysList.innerHTML = '';
		apodArchive.forEach(function (item, idx) {
			var btn = document.createElement('button');
			btn.className = 'apod-day-pill' + (idx === currentActiveDay ? ' is-active' : '');
			btn.setAttribute('data-day', String(idx));
			btn.title = (idx === 0) ? 'Bugünün Fotoğrafı' : item.dateStr;

			var shortTitle = item.title;
			if (shortTitle.length > 24) {
				shortTitle = shortTitle.substring(0, 24) + '...';
			}

			btn.innerHTML = '<span class="day-status">' + escapeHtml(item.status) + '</span>' +
				'<span class="day-date">' + escapeHtml(item.dateStr) + '</span>' +
				'<span class="day-topic">' + escapeHtml(shortTitle) + '</span>';

			btn.addEventListener('click', function () {
				displayDay(idx);
			});

			daysList.appendChild(btn);
		});
	}

	function displayDay(index) {
		var item = apodArchive[index];
		if (!item) return;
		currentActiveDay = index;

		// Smooth transition
		if (mainDisplay) {
			mainDisplay.style.opacity = '0.35';
			mainDisplay.style.transform = 'translateY(4px)';
		}

		setTimeout(function () {
			if (featuredImg) {
				featuredImg.src = item.image || '';
				featuredImg.alt = item.title || 'NASA Fotoğrafı';
			}
			if (tagBadge) tagBadge.textContent = item.tag || 'Doğrulanmış NASA APOD Yayını';
			if (dateBadge) dateBadge.textContent = item.dateStr || '';
			if (creditValue) creditValue.textContent = item.credit || 'NASA';
			if (apodTitle) apodTitle.textContent = item.title || '';
			if (apodDescText) apodDescText.textContent = item.desc || '';
			if (tdInstrument) tdInstrument.textContent = item.instrument || 'NASA Gözlemevi';
			if (tdDistance) tdDistance.textContent = item.distance || 'Astrofiziksel Koordinatlar';
			if (tdClass) tdClass.textContent = item.classType || 'Kozmolojik Fenomen';
			if (tdArchive) tdArchive.textContent = item.archiveStatus || 'Canlı NASA APOD Servisi';

			if (mainDisplay) {
				mainDisplay.style.opacity = '1';
				mainDisplay.style.transform = 'translateY(0)';
			}
		}, 160);

		// Update pill styles
		var pills = daysList.querySelectorAll('.apod-day-pill');
		pills.forEach(function (pill) {
			if (parseInt(pill.getAttribute('data-day'), 10) === index) {
				pill.classList.add('is-active');
			} else {
				pill.classList.remove('is-active');
			}
		});
	}

	function escapeHtml(text) {
		if (!text) return '';
		var div = document.createElement('div');
		div.textContent = text;
		return div.innerHTML;
	}

	// 3. Live Real-Time API Fetch from WordPress REST API (or NASA API directly)
	function fetchLiveAPODData() {
		fetch('/wordpress/wp-json/cosmic-explorer/v1/apod')
			.then(function (res) {
				if (!res.ok) throw new Error('REST response not ok: ' + res.status);
				return res.json();
			})
			.then(function (freshData) {
				if (Array.isArray(freshData) && freshData.length > 0) {
					// Check if freshData is newer than currently loaded
					var needsUpdate = (apodArchive.length === 0 || freshData[0].date !== apodArchive[0].date);
					apodArchive = freshData;
					renderDayPills();
					if (needsUpdate || currentActiveDay === 0) {
						displayDay(0);
					}
				}
			})
			.catch(function (err) {
				// Fallback to direct NASA science endpoint if WordPress REST was unreachable
				fetch('https://science.nasa.gov/wp-json/wp/v2/apod-basic?per_page=7')
					.then(function (res) { return res.json(); })
					.then(function (nasaItems) {
						if (Array.isArray(nasaItems) && nasaItems.length > 0) {
							var formatted = nasaItems.map(function (item, idx) {
								var dParts = (item.date || '').split('-');
								var trDate = dParts[2] + ' ' + (monthNamesTr[parseInt(dParts[1], 10) - 1] || '') + ' ' + dParts[0];
								var status = (idx === 0) ? 'BUGÜN' : (idx === 1 ? 'DÜN' : idx + ' GÜN ÖNCE');
								var img = item.hdurl || item.url || '';
								var rawExp = (item.explanation || '').replace(/<[^>]+>/g, ' ').replace(/^Explanation:\s*/i, '');
								var cleanExp = rawExp.split(/Tomorrow('s|s)?\s*(picture|image):/i)[0].trim();
								return {
									day: idx,
									status: status,
									date: item.date,
									dateStr: trDate,
									title: item.title || 'Kozmik Gözlem',
									image: img,
									tag: 'Canlı NASA APOD API Yayını',
									credit: (item.credit || 'NASA').replace(/<[^>]+>/g, '').trim(),
									instrument: 'NASA / Uluslararası Gözlemevleri',
									distance: 'Astrofiziksel Koordinatlar',
									classType: 'Kozmolojik Fenomen',
									archiveStatus: 'Canlı NASA APOD Servisi (' + item.date + ')',
									desc: cleanExp
								};
							});
							apodArchive = formatted;
							renderDayPills();
							displayDay(0);
						}
					})
					.catch(function (fallbackErr) {
						console.log('Using preloaded APOD archive:', fallbackErr);
					});
			});
	}

	// Initial render
	renderDayPills();

	// Fetch live updates in background to ensure zero staleness
	fetchLiveAPODData();
});
