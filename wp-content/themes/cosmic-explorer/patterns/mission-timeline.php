<?php
/**
 * Title: Uzay Görevleri Dönüm Noktaları (Milestone Zaman Tüneli)
 * Slug: cosmic-explorer/mission-timeline
 * Categories: cosmic-features
 * Description: Ekrana tam sığan, fare tekerleğiyle adım adım görevleri değiştiren yatay milestone hattı.
 * Viewport Width: 1400
 */

$vostok_img  = esc_url( get_theme_file_uri( 'assets/images/vostok.jpg' ) );
$apollo_img  = esc_url( get_theme_file_uri( 'assets/images/apollo11.jpg' ) );
$voyager_img = esc_url( get_theme_file_uri( 'assets/images/hero-webb.jpg' ) );
$hubble_img  = esc_url( get_theme_file_uri( 'assets/images/hubble.jpg' ) );
$iss_img     = esc_url( get_theme_file_uri( 'assets/images/iss.jpg' ) );
$jwst_img    = esc_url( get_theme_file_uri( 'assets/images/jwst.jpg' ) );
$mars_img    = esc_url( get_theme_file_uri( 'assets/images/mars.jpg' ) );

$milestones = array(
	array(
		'id'        => 'vostok',
		'year'      => '1961',
		'date_full' => '12 Nisan 1961',
		'label'     => 'Vostok 1',
		'callout'   => 'İlk İnsanlı Uçuş',
		'color'     => '#ff5722',
		'badge'     => 'Vostok Programı • SSCB',
		'title'     => 'Vostok 1: İnsanlı İlk Yörünge Uçuşu',
		'image'     => $vostok_img,
		'desc'      => 'Kozmonot Yuri Gagarin, Vostok 1 uzay aracıyla Dünya yörüngesinde 108 dakikalık tam bir tur atarak uzaya çıkan ilk insan oldu.',
		'specs'     => array(
			'Mürettebat' => 'Yuri Gagarin',
			'İrtifa'     => '327 km',
			'Süre'       => '108 Dakika',
			'Roket'      => 'Vostok-K'
		)
	),
	array(
		'id'        => 'apollo',
		'year'      => '1969',
		'date_full' => '20 Temmuz 1969',
		'label'     => 'Apollo 11',
		'callout'   => 'Ay\'a İlk Ayak Basış',
		'color'     => '#ffb703',
		'badge'     => 'NASA Apollo Programı • ABD',
		'title'     => 'Apollo 11: Ay\'a İlk İnsanlı İniş',
		'image'     => $apollo_img,
		'desc'      => 'Neil Armstrong ve Buzz Aldrin, Eagle modülüyle Sessizlik Denizi\'ne iniş yaptı. Ay yüzeyine ayak basan ilk insanlar olarak tarihe geçtiler.',
		'specs'     => array(
			'Mürettebat' => 'Armstrong & Aldrin',
			'Yüzey Kalış'=> '21.5 Saat',
			'Örnek'      => '21.5 kg Kayaç',
			'Roket'      => 'Saturn V'
		)
	),
	array(
		'id'        => 'voyager',
		'year'      => '1977',
		'date_full' => '5 Eylül 1977',
		'label'     => 'Voyager 1',
		'callout'   => 'Yıldızlararası Sınır',
		'color'     => '#00f0ff',
		'badge'     => 'NASA Derin Uzay Misyonu',
		'title'     => 'Voyager 1: Yıldızlararası Uzayın İlk Elçisi',
		'image'     => $voyager_img,
		'desc'      => 'Güneş Sistemi\'nin heliopoz sınırını aşarak yıldızlararası boşluğa ulaşan ilk insan yapımı araç. Üzerinde Altın Plak mesajı taşır.',
		'specs'     => array(
			'Mesafe'     => '24.2 Milyar km',
			'Hız'        => '61.000 km/saat (17 km/s)',
			'Konum'      => 'Yıldızlararası Boşluk',
			'Güç'        => 'Plütonyum RTG'
		)
	),
	array(
		'id'        => 'hubble',
		'year'      => '1990',
		'date_full' => '24 Nisan 1990',
		'label'     => 'Hubble (HST)',
		'callout'   => 'Yörünge Gözlemevi',
		'color'     => '#22c55e',
		'badge'     => 'NASA & ESA Büyük Gözlemevleri',
		'title'     => 'Hubble Uzay Teleskobu',
		'image'     => $hubble_img,
		'desc'      => 'Dünya atmosferinin dışındaki 2.4 metrelik aynasıyla evrenin genişleme hızının (Hubble sabiti) ve derin galaksilerin keşfinde devrim yaptı.',
		'specs'     => array(
			'Ayna Çapı'  => '2.4 Metre',
			'Yörünge'    => '540 km İrtifa',
			'Gözlem'     => '1.5M+ Pozlama',
			'Keşif'      => 'Hubble Derin Alanı'
		)
	),
	array(
		'id'        => 'iss',
		'year'      => '1998',
		'date_full' => '20 Kasım 1998 – Günümüz',
		'label'     => 'ISS İstasyonu',
		'callout'   => 'Yörüngede 25 Yıl',
		'color'     => '#3b82f6',
		'badge'     => '15 Ülke Ortaklığı • Uluslararası İstasyon',
		'title'     => 'Uluslararası Uzay İstasyonu (ISS)',
		'image'     => $iss_img,
		'desc'      => '420 tonluk kütlesiyle alçak Dünya yörüngesindeki en büyük laboratuvar. Kasım 2000\'den beri kesintisiz insan araştırmalarına ev sahipliği yapar.',
		'specs'     => array(
			'Kütle'      => '420 Ton',
			'Hız'        => '28.000 km/saat (7,7 km/s)',
			'Periyot'    => '90 Dakika / Tur',
			'Genişlik'   => '109 Metre'
		)
	),
	array(
		'id'        => 'jwst',
		'year'      => '2021',
		'date_full' => '25 Aralık 2021',
		'label'     => 'James Webb',
		'callout'   => 'Kızılötesi Devrim',
		'color'     => '#a855f7',
		'badge'     => 'NASA / ESA / CSA • Lagrange L2',
		'title'     => 'James Webb Uzay Teleskobu (JWST)',
		'image'     => $jwst_img,
		'desc'      => 'Dünya\'dan 1.5 milyon km uzakta L2 noktasındaki 6.5 metrelik altın aynalarıyla Büyük Patlama\'dan sonraki ilk yıldız ve galaksileri inceler.',
		'specs'     => array(
			'Ayna Çapı'  => '6.5 Metre (18 Altın)',
			'Konum'      => 'Lagrange L2 (1.5M km)',
			'Sıcaklık'   => '-233°C (Kriyogenik)',
			'Spektrum'   => 'Kızılötesi (IR)'
		)
	),
	array(
		'id'        => 'tubitak_imece',
		'year'      => '2023',
		'date_full' => '15 Nisan 2023',
		'label'     => 'İMECE (TÜBİTAK)',
		'callout'   => 'Milli Gözlem Uydusu',
		'color'     => '#0284c7',
		'badge'     => 'TÜBİTAK UZAY • Türkiye',
		'title'     => 'İMECE: Yerli Yüksek Çözünürlüklü Gözlem Uydusu',
		'image'     => $hubble_img,
		'desc'      => 'TÜBİTAK UZAY tarafından yerli ve milli mühendislik altyapısıyla geliştirilen metre-altı elektro-optik kameraya sahip İMECE uydusu, 680 km yörüngede görevine başladı.',
		'specs'     => array(
			'Çözünürlük' => 'Metre-Altı (< 1m)',
			'Enstitü'    => 'TÜBİTAK UZAY',
			'Yörünge'    => '680 km Güneş Eşzamanlı (SSO)',
			'Kütle'      => '800 kg Sınıfı'
		)
	),
	array(
		'id'        => 'artemis2',
		'year'      => '2026',
		'date_full' => '1 Nisan 2026',
		'label'     => 'Artemis II',
		'callout'   => 'Ay Çevresi İnsanlı Uçuş',
		'color'     => '#f97316',
		'badge'     => 'NASA Artemis Programı • Derin Uzay',
		'title'     => 'Artemis II: İnsanlı Ay Çevresi Görevi',
		'image'     => $apollo_img,
		'desc'      => 'Orion uzay aracı ve 4 astronot, yarım asrı aşkın bir sürenin ardından Ay\'ın etrafında turlayarak derin uzaya çıkan ilk insanlı yeni nesil keşif uçuşunu başarıyla tamamladı.',
		'specs'     => array(
			'Mürettebat' => '4 Astronot (Orion)',
			'Uçuş Türü'  => 'Serbest Dönüş Yörüngesi',
			'Mesafe'     => 'Ay Arkası +10.300 km',
			'Roket'      => 'SLS Block 1'
		)
	),
	array(
		'id'        => 'artemis3',
		'year'      => '2027',
		'date_full' => '2027 Hedefi',
		'label'     => 'Artemis III',
		'callout'   => 'HLS Entegrasyon Testi',
		'color'     => '#eab308',
		'badge'     => 'NASA & Ticari Ortaklar • Alçak Dünya Yörüngesi',
		'title'     => 'Artemis III: Ticari İnsanlı İniş Sistemi Testi',
		'image'     => $jwst_img,
		'desc'      => 'Alçak Dünya yörüngesinde Orion uzay aracı ile ticari insanlı iniş sistemlerinin (SpaceX ve/veya Blue Origin HLS) kenetlenme ve entegrasyon tatbikatı.',
		'specs'     => array(
			'Görev'      => 'Orion - HLS Entegrasyonu',
			'Konum'      => 'Alçak Dünya Yörüngesi (LEO)',
			'Araç'       => 'Orion + Ticari İniş Aracı',
			'Amaç'       => 'İnsanlı Ay İnişi Öncesi Sistem Entegrasyonu'
		)
	),
	array(
		'id'        => 'artemis4',
		'year'      => '2028',
		'date_full' => '2028 Başı Hedefi',
		'label'     => 'Artemis IV',
		'callout'   => 'Ay Yüzeyine İnsanlı İniş',
		'color'     => '#06b6d4',
		'badge'     => 'NASA & Uluslararası Ortaklar • Ay Yüzeyi',
		'title'     => 'Artemis IV: Ay Yüzeyine Tarihi Dönüş',
		'image'     => $apollo_img,
		'desc'      => 'Apollo 17\'den bu yana ilk kez insanlı bir mürettebat, Ay\'ın güney kutup bölgesine inerek yaklaşık bir hafta sürecek bilimsel yüzey çalışmaları gerçekleştirecek.',
		'specs'     => array(
			'İniş Bölgesi'=> 'Ay Güney Kutbu',
			'Hedef'      => 'Yüzey Bilimi & Örnekler',
			'Mürettebat' => '4 Astronot',
			'Yüzey Ekibi'=> '2 Astronot'
		)
	),
	array(
		'id'        => 'mars_mission',
		'year'      => 'Gelecek',
		'date_full' => 'Gelecek Vizyonu',
		'label'     => 'İnsanlı Mars',
		'callout'   => 'Kızıl Gezegene Keşif',
		'color'     => '#ef4444',
		'badge'     => 'Gezegenler Arası Keşif Vizyonu',
		'title'     => 'Gelecek Hedefi: İnsanlı Mars Keşfi',
		'image'     => $mars_img,
		'desc'      => 'Artemis ve Ay çevresi görevlerinden edinilen derin uzay deneyimlerinin, gelecekteki insanlı Mars keşif programına temel oluşturması hedefleniyor.',
		'specs'     => array(
			'Hedef'      => 'İnsanlı Mars Keşfi',
			'Durum'      => 'Gelecek Program',
			'Seyahat'    => 'Aylar Ölçeğinde Uçuş',
			'Araştırma'  => 'Yaşam Destek, Radyasyon & Tahrik'
		)
	)
);
?>

<!-- wp:group {"align":"full","backgroundColor":"space-black","className":"milestone-viewport-screen","layout":{"type":"default"}} -->
<div id="kesif-tarihi" style="scroll-margin-top: 120px;"></div>
<div id="cosmicMilestoneApp" class="wp-block-group alignfull milestone-viewport-screen has-space-black-background-color has-background">

	<!-- Top Compact Header & Controls Bar -->
	<header class="milestone-screen-header">
		<div class="milestone-title-group">
			<span class="milestone-mini-tag">KRONOLOJİK ARŞİV // 1961 – GÜNÜMÜZ</span>
			<h2 class="milestone-screen-title" style="letter-spacing:-0.02em;">Uzay Araştırmaları Dönüm Noktaları</h2>
		</div>

		<!-- Center Interaction Hint -->
		<div class="milestone-inline-hint">
			<span class="milestone-mouse-icon">◎</span>
			<span>[KONTROL: FARE TEKERLEĞİ VEYA DOKUNMATİK KAYDIRMA]</span>
		</div>

		<!-- Step Counter & Controls Dock -->
		<div class="milestone-screen-dock">
			<button class="milestone-dock-btn" id="milestonePrevBtn" title="Önceki Görev (Yukarı Kaydır)">
				<span>◀</span>
			</button>
			<div class="milestone-dock-counter">
				<span id="milestoneCounter">01 / <?php echo sprintf('%02d', count($milestones)); ?></span>
			</div>
			<button class="milestone-dock-btn" id="milestoneNextBtn" title="Sonraki Görev (Aşağı Kaydır)">
				<span>▶</span>
			</button>
		</div>
	</header>

	<!-- Center Compact Showcase Theater (Fits 100% inside viewport) -->
	<main class="milestone-center-theater" id="milestoneStage">
		<?php foreach ( $milestones as $index => $m ) : ?>
			<article 
				class="milestone-slide <?php echo $index === 0 ? 'is-active' : ''; ?>" 
				id="milestone-slide-<?php echo esc_attr( $index ); ?>"
				data-index="<?php echo esc_attr( $index ); ?>"
				data-year="<?php echo esc_attr( $m['year'] ); ?>"
				data-color="<?php echo esc_attr( $m['color'] ); ?>"
			>
				<div class="milestone-card-unified cosmic-glass-card">
					<!-- Left: Compact Photo -->
					<div class="milestone-card-media">
						<img src="<?php echo $m['image']; ?>" alt="<?php echo esc_attr( $m['title'] ); ?>" class="milestone-card-img" />
						<span class="milestone-card-year" style="border-color: <?php echo esc_attr( $m['color'] ); ?>; color: <?php echo esc_attr( $m['color'] ); ?>;">
							<?php echo esc_html( $m['year'] ); ?>
						</span>
					</div>

					<!-- Right: Mission Content -->
					<div class="milestone-card-content">
						<div class="milestone-card-meta">
							<span class="milestone-card-badge" style="border-color: <?php echo esc_attr( $m['color'] ); ?>; color: <?php echo esc_attr( $m['color'] ); ?>;">
								<?php echo esc_html( $m['badge'] ); ?>
							</span>
							<span class="milestone-card-date"><?php echo esc_html( $m['date_full'] ); ?></span>
						</div>

						<h3 class="milestone-card-heading"><?php echo esc_html( $m['title'] ); ?></h3>
						<p class="milestone-card-desc"><?php echo esc_html( $m['desc'] ); ?></p>

						<!-- Specs Pills Row -->
						<div class="milestone-pills-row">
							<?php foreach ( $m['specs'] as $sk => $sv ) : ?>
								<div class="milestone-pill-box">
									<span class="pill-label"><?php echo esc_html( $sk ); ?>:</span>
									<span class="pill-value"><?php echo esc_html( $sv ); ?></span>
								</div>
							<?php endforeach; ?>
						</div>
					</div>
				</div>
			</article>
		<?php endforeach; ?>
	</main>

	<!-- Bottom Continuous Horizontal Milestone Track (TeamGantt Style Pipeline) -->
	<footer class="milestone-bottom-rail">
		<div class="milestone-rail-track-wrap">
			<!-- Continuous Rail Bar -->
			<div class="milestone-pipeline-bg"></div>
			<div class="milestone-pipeline-fill" id="milestonePipelineFill"></div>

			<!-- Milestone Interactive Pins (Alternating callouts) -->
			<div class="milestone-pins-container" id="milestonePinsContainer">
				<?php foreach ( $milestones as $index => $m ) : 
					$is_odd = ( $index % 2 === 0 ); // 0, 2, 4, 6 (Üst) vs 1, 3, 5 (Alt)
				?>
					<div 
						class="milestone-node <?php echo $index === 0 ? 'is-active' : ''; ?> <?php echo $is_odd ? 'node-callout-top' : 'node-callout-bottom'; ?>" 
						data-index="<?php echo esc_attr( $index ); ?>"
						style="--node-accent: <?php echo esc_attr( $m['color'] ); ?>;"
					>
						<!-- Callout Tag (Alternating Top / Bottom) -->
						<div class="milestone-callout">
							<span class="callout-year"><?php echo esc_html( $m['year'] ); ?></span>
							<span class="callout-text"><?php echo esc_html( $m['callout'] ); ?></span>
							<div class="callout-pointer-stem"></div>
						</div>

						<!-- Center Circular Pin -->
						<button class="milestone-pin-btn" aria-label="<?php echo esc_attr( $m['title'] ); ?>" title="<?php echo esc_attr( $m['year'] . ' - ' . $m['label'] ); ?>">
							<span class="pin-halo"></span>
							<span class="pin-core"></span>
						</button>

						<!-- Node Sub-label -->
						<span class="node-short-label"><?php echo esc_html( $m['label'] ); ?></span>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</footer>

</div>
<!-- /wp:group -->
