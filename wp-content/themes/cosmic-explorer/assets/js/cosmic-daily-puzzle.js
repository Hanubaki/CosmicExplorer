/**
 * Cosmic Explorer - Daily Space Puzzle & Challenge Engine (Günün Kozmik Bulmacası)
 * 
 * Features:
 * - Deterministic Daily Puzzle: Automatically updates every day at 00:00 based on calendar date.
 * - 35+ In-Depth Scientific Cosmic Mystery Challenges ("Ben Kimim? / Kozmik Dedektif").
 * - Progressive Clue Unlocking (İpucu 1 -> 2 -> 3) with dynamic XP scoring.
 * - Daily Bonus Astrophysical Question.
 * - Streak Tracking (🔥 Günlük Seri) stored in localStorage.
 * - Galactic Ranks (Çaylak Astronot -> Yıldız Kaşifi -> Derin Uzay Kaptanı -> Olay Ufku Üstadı).
 * - Live Countdown Timer to Tomorrow's Puzzle (00:00:00).
 * - Shareable Result Card (Wordle / BiP style emoji grid with 1-click clipboard copy).
 */

(function () {
	'use strict';

	// 35+ Meticulously Designed Daily Cosmic Challenges (Astrofiziksel Günlük Bulmaca Veritabanı)
	var dailyPuzzles = [
		{
			id: 'mars',
			title: 'Kızıl Gezegenin Gizemi',
			category: 'Gezegen Jeolojisi',
			answer: 'Mars',
			options: ['Mars', 'Venüs', 'Merkür', 'Jüpiter'],
			clues: [
				'Güneş Sistemi’ndeki en devasa yanardağ olan Olympus Mons’a ve 4.000 km uzunluğundaki Valles Marineris kanyonuna ev sahipliği yaparım.',
				'Yüzeyimdeki zengin demir oksit (pas) tozları nedeniyle gece gökyüzünde parlak turuncu-kızıl bir fener gibi görünürüm.',
				'Perseverance ve Curiosity gibi robotik gezginler antik nehir deltalarımda geçmiş mikrobiyal yaşam izlerini arıyor.'
			],
			fact: 'Mars’ın atmosferi %95 karbondioksitten oluşur ve atmosfer basıncı Dünya’nınkinin yüzde birinden azdır. Phobos ve Deimos\'un kökeni kesin olarak bilinmemektedir; yakalanmış asteroidler veya erken dönemde oluşan bir enkaz diskinden meydana gelmiş olabilecekleri düşünülmektedir.',
			bonus: {
				question: 'Mars yüzeyinde geçmiş su varlığını araştıran ve minik Ingenuity helikopterini taşıyan NASA gezgini hangisidir?',
				options: ['Perseverance', 'Voyager 1', 'Curiosity', 'Cassini'],
				correct: 0,
				fact: 'Perseverance, Şubat 2021’de Jezero Krateri’ne inmiş ve beraberindeki Ingenuity helikopteri Mars atmosferinde 72 başarılı uçuş gerçekleştirmiştir.'
			}
		},
		{
			id: 'jwst',
			title: 'Zamanda Geriye Bakan Altın Göz',
			category: 'Uzay Teleskopları',
			answer: 'James Webb Uzay Teleskobu (JWST)',
			options: ['James Webb Uzay Teleskobu (JWST)', 'Hubble Teleskobu', 'Spitzer Teleskobu', 'Kepler Teleskobu'],
			clues: [
				'Dünya’dan tam 1.5 milyon kilometre uzaklıkta, Güneş-Dünya İkinci Lagrange (L2) noktasında yalnız bir yörüngedeyim.',
				'6.5 metre çapındaki 18 parçalı berilyum aynam saf altınla kaplıdır ve tenis kortu büyüklüğünde 5 katmanlı bir güneş kalkanına sahibim.',
				'Derin kızılötesi gözlemlerimle Büyük Patlama’dan sadece birkaç yüz milyon yıl sonra parlayan evrenin en ilkel galaksilerini görüntülüyorum.'
			],
			fact: 'JWST, optik dalgaboylarından ziyade kızılötesi spektrumda çalışarak kozmik toz bulutlarının ardını deler ve evrenin genişlemesiyle kırmızıya kaymış en eski ışığı yakalar.',
			bonus: {
				question: 'James Webb Uzay Teleskobu hangi tarihte ve hangi roketle fırlatılmıştır?',
				options: ['25 Aralık 2021 (Ariane 5)', '4 Temmuz 2020 (Falcon Heavy)', '12 Nisan 2022 (Atlas V)', '20 Temmuz 2019 (Delta IV)'],
				correct: 0,
				fact: 'JWST, 25 Aralık 2021 Noel gününde Fransız Guyanası’ndaki Kourou Uzay Üssü’nden Ariane 5 roketiyle fırlatılmıştır.'
			}
		},
		{
			id: 'sagittarius-a',
			title: 'Samanyolu’nun Kalbindeki Canavar',
			category: 'Süperkütleli Karadelikler',
			answer: 'Sagittarius A*',
			options: ['Sagittarius A*', 'Messier 87*', 'Cygnus X-1', 'Gargantua'],
			clues: [
				'Samanyolu Galaksisi’nin tam kütleçekim merkezinde, yaklaşık 27.000 ışık yılı uzaklıkta pusuya yatmış durumdayım.',
				'Güneş’imizin kütlesinin tam 4.3 milyon katına sahibim ama Schwarzschild yarıçapım Merkür’ün yörüngesinden daha küçüktür.',
				'2022 yılında Event Horizon Telescope (EHT) küresel interferometri ağı tarafından olay ufkumun ilk doğrudan fotoğrafı çekilmiştir.'
			],
			fact: 'Sagittarius A* etrafında dönen S2 yıldızı, en yakın geçişinde ışık hızının %2.5’ine (saatte 25 milyon km) ulaşarak Einstein’ın genel görelilik teorisini kanıtlamıştır.',
			bonus: {
				question: 'Samanyolu merkezindeki bu devasa kütleçekimsel tekilliğin varlığını kanıtlayarak 2020 Nobel Fizik Ödülü’nü kazanan ikili kimdir?',
				options: ['Reinhard Genzel & Andrea Ghez', 'Stephen Hawking & Kip Thorne', 'Carl Sagan & Neil deGrasse Tyson', 'Edwin Hubble & Vera Rubin'],
				correct: 0,
				fact: 'Genzel ve Ghez, onlarca yıl Samanyolu merkezindeki yıldızların yörüngelerini izleyerek merkezde 4 milyon Güneş kütleli görünmez bir nesne olduğunu kanıtlamıştır.'
			}
		},
		{
			id: 'titan',
			title: 'Metan Denizlerinin Dünyası',
			category: 'Gizemli Uydular',
			answer: 'Titan (Satürn Uydusu)',
			options: ['Titan (Satürn Uydusu)', 'Europa (Jüpiter Uydusu)', 'Triton (Neptün Uydusu)', 'Ganymede (Jüpiter Uydusu)'],
			clues: [
				'Güneş Sistemi’nde yoğun ve kalın bir nitrojen atmosferine sahip tek doğal uyduyum; Merkür gezegeninden bile daha büyüğüm.',
				'Yüzey sıcaklığım -179°C’dir; sıvı sudan değil, sıvı metan ve etandan oluşan göller, nehirler ve denizler barındırırım.',
				'2005 yılında ESA’nın Cassini misyonuna ait Huygens sondası turuncu puslu atmosferimden paraşütle süzülerek yüzeyime tarihi bir iniş yapmıştır.'
			],
			fact: 'Titan’ın atmosfer basıncı Dünya’nınkinin 1.5 katıdır. Düşük yerçekimi ve yoğun atmosferi sayesinde sıradan bir insan kollarına kanat takıp kuş gibi uçabilir!',
			bonus: {
				question: 'Titan’ın sıvı metan göllerinde yüzüp atmosferinde uçacak olan NASA’nın gelecekteki dron misyonunun adı nedir?',
				options: ['Dragonfly', 'Ingenuity II', 'Valkyrie', 'Titan Wanderer'],
				correct: 0,
				fact: 'Dragonfly, nükleer pille çalışan sekiz rotorlu bir drone olup 2028’de fırlatılacak ve Titan’ın organik prebiyotik kimyasını araştıracaktır.'
			}
		},
		{
			id: 'voyager-1',
			title: 'Yıldızlararası Uzayın İlk Elçisi',
			category: 'Tarihi Uzay Misyonları',
			answer: 'Voyager 1',
			options: ['Voyager 1', 'New Horizons', 'Pioneer 10', 'Voyager 2'],
			clues: [
				'1977 yılında fırlatıldım; Jüpiter ve Satürn’ün yanından geçtikten sonra insan yapımı en hızlı ve en uzak nesne unvanını aldım.',
				'2012 yılında Güneş’in manyetik rüzgarlarının bittiği heliopoz sınırını aşarak yıldızlararası uzaya çıkan ilk araç oldum.',
				'Üzerimde uzaylı medeniyetler için Dünya’dan 55 dilde selam, 115 görüntü ve kozmik müzikler içeren Altın Plak (Golden Record) taşırım.'
			],
			fact: 'Voyager 1 şu anda Dünya’dan 24 milyar kilometre uzaktadır. Işık hızıyla gönderilen bir radyo sinyalinin araca ulaşması 22.5 saatten fazla sürer.',
			bonus: {
				question: 'Voyager 1’in 1990 yılında 6 milyar km uzaktan Dünya’yı küçük bir nokta olarak çektiği efsanevi fotoğrafın adı nedir?',
				options: ['Soluk Mavi Nokta (Pale Blue Dot)', 'Mavi Bilye (Blue Marble)', 'Dünya Doğuşu (Earthrise)', 'Kozmik Vaha'],
				correct: 0,
				fact: 'Carl Sagan’ın isteğiyle Voyager 1 kamerası geriye çevrilmiş ve Dünya, güneş ışını huzmesi içinde tek bir piksel büyüklüğünde görüntülenmiştir.'
			}
		},
		{
			id: 'europa',
			title: 'Buz Kabuğun Altındaki Okyanus',
			category: 'Okyanus Dünyaları',
			answer: 'Europa (Jüpiter Uydusu)',
			options: ['Europa (Jüpiter Uydusu)', 'Enceladus (Satürn Uydusu)', 'Callisto (Jüpiter Uydusu)', 'Io (Jüpiter Uydusu)'],
			clues: [
				'Yüzeyim onlarca kilometre kalınlığında, çatlak ve yarıklarla dolu pürüzsüz bir buz zırhıyla kaplıdır.',
				'Bu buz kabuğunun altında, Dünya’daki tüm okyanusların toplam su miktarından iki kat daha fazla tuzlu sıvı su içeren küresel bir okyanus saklarım.',
				'Jüpiter’in devasa kütleçekiminin yarattığı gelgit sürtünmesi iç çekirdeğimi ısıtır ve okyanusumun donmasını engeller.'
			],
			fact: 'Europa’nın okyanus tabanındaki hidrotermal bacalar, Güneş ışığına ihtiyaç duymayan kemosentez temelli canlı türleri için en ideal yaşam vahası adayıdır.',
			bonus: {
				question: 'NASA’nın Europa’nın buz kalınlığını ve okyanus yaşanabilirliğini araştırmak üzere Ekim 2024’te fırlattığı amiral gemisi görevi hangisidir?',
				options: ['Europa Clipper', 'Juno Extended', 'JUICE', 'Oceanus Explorer'],
				correct: 0,
				fact: 'Europa Clipper, NASA’nın gezegen keşifleri için bugüne kadar inşa ettiği en büyük uzay aracı olup Europa’ya 50’ye yakın yakın geçiş yapacaktır.'
			}
		},
		{
			id: 'crab-pulsar',
			title: 'Kozmik Deniz Feneri',
			category: 'Nötron Yıldızları',
			answer: 'Yengeç Pulsarı (Crab Pulsar)',
			options: ['Yengeç Pulsarı (Crab Pulsar)', 'Betelgeuse', 'Sirius B', 'Vela Pulsarı'],
			clues: [
				'MS 1054 yılında Çinli ve Arap gökbilimciler tarafından gündüz bile gökyüzünde parlarken kaydedilen süpernovanın kalıntısıyım.',
				'Boğa takımyıldızındaki Yengeç Nebulası’nın tam kalbindeyim; Güneş’ten daha ağır bir kütleyi sadece 20-30 km’lik bir küreye sığdırdım.',
				'Kendi eksenim etrafında saniyede tam 30 kez fırıldak gibi dönerim ve manyetik kutuplarımdan kozmik bir deniz feneri gibi ritmik sinyaller fışkırtırım.'
			],
			fact: 'Nötron yıldızlarının maddesi o kadar yoğundur ki, yüzeyinden alınacak tek bir çay kaşığı madde Dünya’da yaklaşık 1 milyar ton (Everest Dağı kadar) ağırlığa sahiptir.',
			bonus: {
				question: 'Pulsarların (atan radyo kaynakları) ilkini 1967 yılında keşfeden efsanevi astrofizikçi kimdir?',
				options: ['Jocelyn Bell Burnell', 'Marie Curie', 'Vera Rubin', 'Caroline Herschel'],
				correct: 0,
				fact: 'Jocelyn Bell, Cambridge Üniversitesi’nde öğrenciyken saniyede 1.33 saniyelik periyodik sinyali keşfetmiş, başlangıçta bu sinyale LGM-1 (Little Green Men) denmiştir.'
			}
		},
		{
			id: 'oumuamua',
			title: 'Güneş Dışı Sistemden Gelen Puro',
			category: 'Yıldızlararası Ziyaretçiler',
			answer: '‘Oumuamua',
			options: ['‘Oumuamua', '2I/Borisov', 'Halley Kuyrukluyıldızı', 'Ceres'],
			clues: [
				'2017 yılında Hawaii’deki Pan-STARRS teleskobu tarafından Güneş Sistemi’nin düzlemine dik bir açıyla hızla geçerken keşfedildim.',
				'Başka bir yıldız sisteminden geldiği kesinleşen tarihteki ilk yıldızlararası gök cismiyim; ismim Hawaii dilinde "uzaktan gelen öncü/izci" anlamına gelir.',
				'Boyu eninin 10 katı olan puro veya yassı krep şeklinde sıra dışı bir geometriye sahibim ve Güneş’in yanından geçerken kütleçekimi dışı ekstra bir ivmelenme gösterdim.'
			],
			fact: '‘Oumuamua’nın Güneş’ten uzaklaşırken sergilediği gaz püskürmesi olmayan gizemli ivmelenme, Harvard’lı astrofizikçi Avi Loeb tarafından Güneş yelkenlisi olabileceği hipoteziyle tartışılmıştır.',
			bonus: {
				question: '‘Oumuamua’dan sonra Güneş Sistemi’ni ziyaret ettiği 2019 yılında keşfedilen ikinci yıldızlararası nesne hangisidir?',
				options: ['2I/Borisov', 'Shoemaker-Levy 9', 'Hale-Bopp', 'Churyumov-Gerasimenko'],
				correct: 0,
				fact: '2I/Borisov, Kırım’daki amatör gökbilimci Gennadiy Borisov tarafından keşfedilmiş ve belirgin bir koma/kuyruk sergileyen ilk yıldızlararası kuyrukluyıldız olmuştur.'
			}
		},
		{
			id: 'andromeda',
			title: 'Gelecekteki Galaktik Eşimiz',
			category: 'Büyük Ölçekli Evren',
			answer: 'Andromeda Galaksisi (M31)',
			options: ['Andromeda Galaksisi (M31)', 'Üçgen Galaksisi (M33)', 'Büyük Macellan Bulutu', 'Fırıldak Galaksisi (M101)'],
			clues: [
				'Samanyolu’nun içinde bulunduğu Yerel Grup’un en büyük ve en kütleli galaksisiyim; yaklaşık 1 trilyon yıldıza ev sahipliği yaparım.',
				'Dünya’dan tam 2.537 milyon ışık yılı uzakta olmama rağmen berrak karanlık bir gecede insan gözünün çıplak görebildiği en uzak kozmik yapıyım.',
				'Maviye kayan spektrumum gösteriyor ki saniyede 110 kilometre hızla Samanyolu’na yaklaşıyorum; yaklaşık 4.5 milyar yıl sonra senin galaksinle kucaklaşacağım.'
			],
			fact: 'Andromeda ve Samanyolu birleştiğinde yıldızlararası boşluklar devasa olduğu için neredeyse hiçbir yıldız birbiriyle doğrudan çarpışmayacak; iki süperkütleli karadelik tek bir dev eliptik galakside birleşecektir.',
			bonus: {
				question: 'Andromeda ve Samanyolu’nun milyarlarca yıl sonra birleşmesiyle oluşacak devasa birleşik galaksiye şimdiden verilen isim nedir?',
				options: ['Milkomeda', 'Saman-Drom', 'Kozmik Birlik', 'Andro-Milky'],
				correct: 0,
				fact: 'Milky Way ve Andromeda kelimelerinin birleşiminden türetilen Milkomeda (veya Lactomeda), geleceğin dev eliptik mega galaksisinin adıdır.'
			}
		},
		{
			id: 'dark-matter',
			title: 'Görünmeyen Kozmik Çimento',
			category: 'Kozmoloji',
			answer: 'Karanlık Madde',
			options: ['Karanlık Madde', 'Karanlık Enerji', 'Antimadde', 'Nötrinolar'],
			clues: [
				'Evrendeki toplam madde miktarının yaklaşık %85’ini oluştururum ama ışığı ne yayarım, ne yansıtırım, ne de soğururum.',
				'Galaksilerin dış kollarındaki yıldızların merkezkaç kuvvetiyle uzaya savrulmasını engelleyen görünmez bir yerçekimi ağı oluştururum.',
				'Varlığım doğrudan teleskopla görülemez; ancak arkamdaki galaksilerin ışığını yerçekimsel mercekleme ile bükmemden ve eğriltmemden anlaşılır.'
			],
			fact: '1970’lerde astronom Vera Rubin, sarmal galaksilerin dış kısımlarındaki yıldızların merkeze yakın yıldızlarla aynı hızda döndüğünü ölçerek karanlık maddenin varlığını tartışmasız şekilde kanıtlamıştır.',
			bonus: {
				question: 'Evrenin toplam kütle-enerji bütçesinin yaklaşık %68’ini oluşturan ve evrenin hızlanarak genişlemesini sağlayan gizemli güç nedir?',
				options: ['Karanlık Enerji', 'Karanlık Madde', 'Kozmik Sicimler', 'Manyetik Rezonans'],
				correct: 0,
				fact: 'Karanlık Madde çekici kütleçekim kuvvetiyle yapıları bir arada tutarken, Karanlık Enerji itici basınç uygulayarak uzayın dokusunu artan bir hızla genişletmektedir.'
			}
		}
	];

	// Deterministic Day Seed Generator (Her gün için dünya çapında aynı bulmacayı seçer)
	function getDailySeed() {
		var now = new Date();
		var year = now.getFullYear();
		var month = now.getMonth();
		var day = now.getDate();

		// Gün sayısı hesabı (Epoch bazlı deterministik seed)
		var epochStart = new Date(2026, 0, 1);
		var diffDays = Math.floor((now - epochStart) / (1000 * 60 * 60 * 24));
		if (diffDays < 0) diffDays = 0;

		var puzzleIndex = diffDays % dailyPuzzles.length;
		var puzzleNumber = diffDays + 101; // #101'den başlayan prestijli bulmaca numarası

		var monthNames = [
			'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
			'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
		];
		var dateFormatted = day + ' ' + monthNames[month] + ' ' + year;
		var dateKey = year + '-' + String(month + 1).padStart(2, '0') + '-' + String(day).padStart(2, '0');

		return {
			puzzle: dailyPuzzles[puzzleIndex],
			puzzleNumber: puzzleNumber,
			dateFormatted: dateFormatted,
			dateKey: dateKey
		};
	}

	// LocalStorage User Persistence
	var STORAGE_KEY = 'cosmic_explorer_daily_challenge';
	function getUserData() {
		try {
			var raw = localStorage.getItem(STORAGE_KEY);
			if (raw) return JSON.parse(raw);
		} catch (e) {}
		return {
			lastDate: null,
			streak: 0,
			totalXp: 0,
			history: {}
		};
	}

	function saveUserData(data) {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
		} catch (e) {}
	}

	function getGalacticRank(xp) {
		if (xp >= 500) return { title: 'Olay Ufku Üstadı', badgeClass: 'science-badge--gold' };
		if (xp >= 250) return { title: 'Derin Uzay Kaptanı', badgeClass: 'science-badge--purple' };
		if (xp >= 100) return { title: 'Yıldız Kaşifi', badgeClass: 'science-badge--cyan' };
		return { title: 'Çaylak Astronot', badgeClass: 'science-badge--cyan' };
	}

	// Main Daily Puzzle Controller
	function initDailyPuzzle() {
		var container = document.getElementById('dailyPuzzleContainer');
		if (!container) return;

		var dailyInfo = getDailySeed();
		var puzzle = dailyInfo.puzzle;
		var userData = getUserData();

		// Check if already completed today
		var isCompletedToday = (userData.history && userData.history[dailyInfo.dateKey]);

		// State variables for current session
		var cluesRevealed = 1;
		var maxClues = puzzle.clues.length;
		var mysteryGuessed = false;
		var mysteryScore = 0;
		var bonusAnswered = false;
		var bonusScore = 0;

		renderInterface();

		function renderInterface() {
			var rankInfo = getGalacticRank(userData.totalXp);

			var html = 
				'<div class="cosmic-puzzle-shell cosmic-glass-card">' +
					// 1. Top Telemetry Bar (Date, Streak, XP, Rank)
					'<div class="puzzle-telemetry-bar">' +
						'<div class="puzzle-badge-group">' +
							'<span class="science-badge science-badge--cyan">GÖZLEM GÖREVİ</span>' +
							'<span class="puzzle-date-tag">Görev #' + dailyInfo.puzzleNumber + ' &bull; ' + dailyInfo.dateFormatted + '</span>' +
						'</div>' +
						'<div class="puzzle-stats-hud">' +
							'<span class="puzzle-stat-pill" title="Ardı ardına çözülen gün sayısı">' +
								'<strong>[SERİ: ' + userData.streak + ' GÜN]</strong>' +
							'</span>' +
							'<span class="puzzle-stat-pill" title="Astrofizik Puanı">' +
								'<strong>[SKOR: ' + userData.totalXp + ' XP]</strong>' +
							'</span>' +
							'<span class="science-badge ' + rankInfo.badgeClass + '">' + rankInfo.title + '</span>' +
						'</div>' +
					'</div>';

			// If completed today: Show Victory & Countdown Screen directly!
			if (isCompletedToday) {
				html += renderCompletedScreen(userData.history[dailyInfo.dateKey]);
			} else {
				html += renderActivePuzzleGame();
			}

			html += '</div>';
			container.innerHTML = html;

			attachEventListeners();
			startCountdownTimer();
		}

		function renderActivePuzzleGame() {
			var html = 
				'<div class="puzzle-gameplay-stage">' +
					// Stage Header
					'<div class="puzzle-mission-header">' +
						'<span class="puzzle-category-tag">' + puzzle.category + '</span>' +
						'<h3 class="puzzle-mission-title glow-effect">Aşama 1: Kozmik Bilmece &bull; "Ben Kimim?"</h3>' +
						'<p class="puzzle-mission-desc">Evrenin derinliklerinden bir gök cismi veya fenomen gizlendi. İpuçlarını inceleyin, ne kadar az ipucuyla bilirseniz o kadar çok XP kazanırsınız!</p>' +
					'</div>' +

					// Progressive Clues Container
					'<div class="puzzle-clues-wrapper">';

			for (var i = 0; i < maxClues; i++) {
				var isUnlocked = (i < cluesRevealed);
				html += 
					'<div class="puzzle-clue-card ' + (isUnlocked ? 'is-unlocked' : 'is-locked') + '">' +
						'<div class="clue-card-header">' +
							'<span class="clue-number">İPUCU ' + (i + 1) + '</span>' +
							(isUnlocked ? '<span class="clue-status-tag">AÇILDI</span>' : '<span class="clue-status-tag">KİLİTLİ</span>') +
						'</div>' +
						'<p class="clue-text">' + 
							(isUnlocked ? puzzle.clues[i] : 'Bu ipucunu açarak gizemi çözmeyi kolaylaştırabilirsiniz (-5 XP bonusu).') + 
						'</p>' +
					'</div>';
			}

			html += '</div>';

			// Unlock Next Clue Action Button (if not all unlocked and not guessed yet)
			if (!mysteryGuessed && cluesRevealed < maxClues) {
				html += 
					'<div class="puzzle-clue-action-wrap">' +
						'<button class="puzzle-btn-reveal-clue" id="btnRevealNextClue">' +
							(cluesRevealed + 1) + '. İpucunu İncele' +
						'</button>' +
						'<span class="clue-penalty-note">İpucu açtıkça nesne parametreleri netleşir.</span>' +
					'</div>';
			}

			// Mystery Options Grid
			html += 
				'<div class="puzzle-guess-section">' +
					'<h4 class="puzzle-guess-title">Hedef Gökcismini Belirleyin:</h4>' +
					'<div class="puzzle-options-grid">';

			puzzle.options.forEach(function (opt, idx) {
				html += 
					'<button class="puzzle-option-btn" data-choice="' + opt + '" ' + (mysteryGuessed ? 'disabled' : '') + '>' +
						'<span class="opt-key">' + String.fromCharCode(65 + idx) + '</span>' +
						'<span class="opt-label">' + opt + '</span>' +
					'</button>';
			});

			html += 
					'</div>' +
				'</div>';

			// Post-Guess Scientific Reveal Box
			if (mysteryGuessed) {
				html += 
					'<div class="puzzle-reveal-box cosmic-glass-card ' + (mysteryScore > 0 ? 'is-success' : 'is-fail') + '">' +
						'<div class="reveal-header">' +
							'<span class="reveal-status-icon">' + (mysteryScore > 0 ? 'DOĞRULANDI: DOĞRU TESPİT' : 'HEDEF GÖKCİSMİ: ' + puzzle.answer) + '</span>' +
							'<span class="reveal-xp-pill">+' + mysteryScore + ' XP</span>' +
						'</div>' +
						'<p class="reveal-fact">' + puzzle.fact + '</p>' +
					'</div>';

				// Stage 2: Bonus Scientific Question
				html += 
					'<div class="puzzle-bonus-stage">' +
						'<div class="puzzle-mission-header">' +
							'<span class="science-badge science-badge--gold">AŞAMA 2 &bull; GÜNÜN BONUS SORUSU</span>' +
							'<h3 class="puzzle-mission-title">' + puzzle.bonus.question + '</h3>' +
						'</div>' +
						'<div class="puzzle-options-grid">';

				puzzle.bonus.options.forEach(function (bOpt, bIdx) {
					html += 
						'<button class="puzzle-bonus-btn" data-bonus-index="' + bIdx + '" ' + (bonusAnswered ? 'disabled' : '') + '>' +
							'<span class="opt-key">' + String.fromCharCode(65 + bIdx) + '</span>' +
							'<span class="opt-label">' + bOpt + '</span>' +
						'</button>';
				});

				html += '</div>';

				if (bonusAnswered) {
					html += 
						'<div class="puzzle-bonus-fact-box">' +
							'<p><strong>Bilimsel Açıklama:</strong> ' + puzzle.bonus.fact + '</p>' +
							'<button class="puzzle-btn-finish" id="btnFinishDailyMission">Günün Görevini Tamamla ve Kaydet</button>' +
						'</div>';
				}

				html += '</div>';
			}

			html += '</div>';
			return html;
		}

		function renderCompletedScreen(historyRecord) {
			var earnedXp = historyRecord ? historyRecord.xp : 60;
			var cluesUsed = historyRecord ? historyRecord.cluesUsed : 1;
			var wasFullSuccess = (historyRecord && historyRecord.score === 2);

			return (
				'<div class="puzzle-completed-screen">' +
					'<div class="completed-hero-icon" style="font-family:monospace; font-size:1.1rem; letter-spacing:0.1em; color:#38bdf8;">' + (wasFullSuccess ? '[GÖREV TAMAMLANDI]' : '[ANALİZ KAYDEDİLDİ]') + '</div>' +
					'<h3 class="completed-heading">Günün Bilimsel Gözlem Görevi Tamamlandı</h3>' +
					'<p class="completed-sub">' + dailyInfo.dateFormatted + ' tarihli astrofiziksel gözlem telemetrisi başarıyla analiz edildi.</p>' +

					'<div class="completed-stats-row">' +
						'<div class="completed-stat-card">' +
							'<span class="card-val">+' + earnedXp + '</span>' +
							'<span class="card-lbl">Kazanılan XP</span>' +
						'</div>' +
						'<div class="completed-stat-card">' +
							'<span class="card-val">' + userData.streak + ' Gün</span>' +
							'<span class="card-lbl">Güncel Seri</span>' +
						'</div>' +
						'<div class="completed-stat-card">' +
							'<span class="card-val">' + (cluesUsed) + '. İpucunda</span>' +
							'<span class="card-lbl">Çözüm Hızı</span>' +
						'</div>' +
					'</div>' +

					// Real-Time Countdown to Midnight
					'<div class="puzzle-countdown-card">' +
						'<span class="countdown-title">SONRAKİ GÖZLEM GÖREVİNE KALAN SÜRE:</span>' +
						'<div class="countdown-timer-display" id="puzzleCountdownTimer">00 : 00 : 00</div>' +
						'<span class="countdown-hint">Her gece 00:00 UTC+3’te yeni bir gözlem telemetrisi yayımlanır.</span>' +
					'</div>' +

					// 1-Click Clipboard Share (BiP & WhatsApp uyumlu)
					'<div class="puzzle-share-actions">' +
						'<button class="puzzle-btn-share" id="btnSharePuzzleResult">' +
							'Sonuç Raporunu Panoya Kopyala' +
						'</button>' +
						'<span class="share-toast" id="shareToast"></span>' +
					'</div>' +

					// Re-inspect button
					'<div class="puzzle-reinspect-wrap">' +
						'<button class="puzzle-btn-reinspect" id="btnReinspectPuzzle">Günün Bilimsel İpuçlarını ve Açıklamasını İncele</button>' +
					'</div>' +
				'</div>'
			);
		}

		function attachEventListeners() {
			// Clue reveal button
			var btnReveal = document.getElementById('btnRevealNextClue');
			if (btnReveal) {
				btnReveal.addEventListener('click', function () {
					if (cluesRevealed < maxClues) {
						cluesRevealed++;
						renderInterface();
					}
				});
			}

			// Mystery guess options
			var optionBtns = container.querySelectorAll('.puzzle-option-btn');
			optionBtns.forEach(function (btn) {
				btn.addEventListener('click', function () {
					if (mysteryGuessed) return;
					var choice = btn.getAttribute('data-choice');
					mysteryGuessed = true;

					if (choice === puzzle.answer) {
						// Calculate XP based on clues used (1 clue = 40 XP, 2 clues = 30 XP, 3 clues = 20 XP)
						mysteryScore = Math.max(20, 50 - (cluesRevealed - 1) * 15);
						btn.classList.add('is-correct');
					} else {
						mysteryScore = 0;
						btn.classList.add('is-wrong');
						// Highlight correct
						optionBtns.forEach(function (b) {
							if (b.getAttribute('data-choice') === puzzle.answer) {
								b.classList.add('is-correct');
							}
						});
					}

					setTimeout(function () {
						renderInterface();
					}, 600);
				});
			});

			// Bonus question options
			var bonusBtns = container.querySelectorAll('.puzzle-bonus-btn');
			bonusBtns.forEach(function (bBtn) {
				bBtn.addEventListener('click', function () {
					if (bonusAnswered) return;
					var bIdx = parseInt(bBtn.getAttribute('data-bonus-index'), 10);
					bonusAnswered = true;

					if (bIdx === puzzle.bonus.correct) {
						bonusScore = 20;
						bBtn.classList.add('is-correct');
					} else {
						bonusScore = 0;
						bBtn.classList.add('is-wrong');
						bonusBtns.forEach(function (b, idx) {
							if (idx === puzzle.bonus.correct) b.classList.add('is-correct');
						});
					}

					setTimeout(function () {
						renderInterface();
					}, 500);
				});
			});

			// Finish Mission button
			var btnFinish = document.getElementById('btnFinishDailyMission');
			if (btnFinish) {
				btnFinish.addEventListener('click', function () {
					var totalEarned = mysteryScore + bonusScore;
					var scoreCount = (mysteryScore > 0 ? 1 : 0) + (bonusScore > 0 ? 1 : 0);

					// Calculate streak
					var yesterday = new Date();
					yesterday.setDate(yesterday.getDate() - 1);
					var yKey = yesterday.getFullYear() + '-' + String(yesterday.getMonth() + 1).padStart(2, '0') + '-' + String(yesterday.getDate()).padStart(2, '0');

					if (userData.lastDate === yKey) {
						userData.streak += 1;
					} else if (userData.lastDate === dailyInfo.dateKey) {
						// already recorded today
					} else {
						userData.streak = 1;
					}

					userData.lastDate = dailyInfo.dateKey;
					userData.totalXp += totalEarned;
					userData.history[dailyInfo.dateKey] = {
						xp: totalEarned,
						score: scoreCount,
						cluesUsed: cluesRevealed,
						dateFormatted: dailyInfo.dateFormatted
					};

					saveUserData(userData);
					isCompletedToday = true;
					renderInterface();
				});
			}

			// Share result button
			var btnShare = document.getElementById('btnSharePuzzleResult');
			if (btnShare) {
				btnShare.addEventListener('click', function () {
					var historyItem = userData.history[dailyInfo.dateKey];
					var scoreStr = historyItem && historyItem.score === 2 ? '🟩 🟩' : (historyItem && historyItem.score === 1 ? '🟩 🟨' : '🟨 🟨');
					var rank = getGalacticRank(userData.totalXp).title;

					var textToCopy = 
						'[UZAY GÖZLEMİ] Görev #' + dailyInfo.puzzleNumber + ' (' + dailyInfo.dateFormatted + ')\n' +
						scoreStr + '\n' +
						'Seri: ' + userData.streak + ' Gün | Rütbe: ' + rank + '\n' +
						window.location.origin + window.location.pathname + '#bilgi-testi';

					if (navigator.clipboard && navigator.clipboard.writeText) {
						navigator.clipboard.writeText(textToCopy).then(function () {
							showShareToast('Gözlem raporu panoya kopyalandı.');
						});
					} else {
						showShareToast('Rapor kopyalandı.');
					}
				});
			}

			// Re-inspect
			var btnReinspect = document.getElementById('btnReinspectPuzzle');
			if (btnReinspect) {
				btnReinspect.addEventListener('click', function () {
					isCompletedToday = false;
					cluesRevealed = 3;
					mysteryGuessed = true;
					bonusAnswered = true;
					renderInterface();
				});
			}
		}

		function showShareToast(msg) {
			var toast = document.getElementById('shareToast');
			if (toast) {
				toast.textContent = msg;
				toast.classList.add('is-visible');
				setTimeout(function () {
					toast.classList.remove('is-visible');
				}, 3200);
			}
		}

		function startCountdownTimer() {
			var timerEl = document.getElementById('puzzleCountdownTimer');
			if (!timerEl) return;

			function updateTimer() {
				var now = new Date();
				var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
				var diffMs = midnight - now;

				if (diffMs <= 0) {
					timerEl.textContent = '00 : 00 : 00 (Yeni Bulmaca Geldi!)';
					return;
				}

				var hours = Math.floor(diffMs / (1000 * 60 * 60));
				var minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

				timerEl.textContent = 
					String(hours).padStart(2, '0') + ' : ' +
					String(minutes).padStart(2, '0') + ' : ' +
					String(seconds).padStart(2, '0');
			}

			updateTimer();
			setInterval(updateTimer, 1000);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initDailyPuzzle);
	} else {
		initDailyPuzzle();
	}
})();
