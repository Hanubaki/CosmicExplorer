<?php
/**
 * Title: Günün Astronomi Fotoğrafı ve NASA Bülteni
 * Slug: cosmic-explorer/nasa-apod
 * Categories: cosmic-features
 * Viewport Width: 1400
 */
$apod_archive = function_exists( 'cosmic_get_nasa_apod_data' ) ? cosmic_get_nasa_apod_data() : array();
$today_item   = ! empty( $apod_archive[0] ) ? $apod_archive[0] : array();
$today_img    = ! empty( $today_item['image'] ) ? esc_url( $today_item['image'] ) : esc_url( get_theme_file_uri( 'assets/images/hero-webb.jpg' ) );
$today_title  = esc_html( $today_item['title'] ?? 'Günün Astronomi Fotoğrafı' );
$today_date   = esc_html( $today_item['dateStr'] ?? gmdate( 'd.m.Y' ) );
$today_credit = esc_html( $today_item['credit'] ?? 'NASA Goddard Space Flight Center' );
$today_tag    = esc_html( $today_item['tag'] ?? 'Canlı NASA APOD Gözlemi' );
$today_desc   = esc_html( $today_item['desc'] ?? '' );
?>
<!-- wp:group {"align":"full","backgroundColor":"space-black","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained"}} -->
<div id="nasa-apod-section" class="wp-block-group alignfull has-space-black-background-color has-background" style="padding-top:var(--wp--preset--spacing--70);padding-bottom:var(--wp--preset--spacing--80)">

	<!-- Section Header -->
	<div class="apod-header-block has-text-align-center" style="margin-bottom: 2.5rem;">
		<span class="science-badge science-badge--gold">NASA Goddard Uzay Uçuş Merkezi &bull; Günlük APOD Servisi</span>
		<h2 class="wp-block-heading glow-effect" style="font-size: clamp(2rem, 4vw, 3rem); margin: 0.5rem 0 0.8rem;">Günün Astronomi Fotoğrafı</h2>
		<p class="has-dust-gray-color" style="font-size: 1.1rem; max-width: 780px; margin: 0 auto;">NASA ve uluslararası gözlemevleri tarafından her gün canlı paylaşılan doğrulanmış astrofiziksel görsel ve son 7 günlük canlı uzay bülteni arşivi.</p>
	</div>

	<!-- 7-Day Interactive Day Selector Bar -->
	<div class="apod-archive-selector-wrap" style="margin-bottom: 2.5rem;">
		<div class="apod-selector-header">
			<span class="apod-selector-title">&#9678; Canlı 7 Günlük NASA Arşivi:</span>
			<span class="apod-selector-hint">Görüntülemek istediğiniz güne tıklayın (Otomatik Günlük Güncellenir)</span>
		</div>
		<div class="apod-days-carousel" id="apodDaysList">
			<?php foreach ( $apod_archive as $idx => $day_item ) : 
				$is_active  = ( 0 === $idx ) ? ' is-active' : '';
				$pill_title = ( 0 === $idx ) ? 'Bugünün Fotoğrafı' : esc_attr( $day_item['dateStr'] );
				$short_title = mb_substr( $day_item['title'], 0, 24 ) . ( mb_strlen( $day_item['title'] ) > 24 ? '...' : '' );
			?>
				<button class="apod-day-pill<?php echo $is_active; ?>" data-day="<?php echo (int) $idx; ?>" title="<?php echo $pill_title; ?>">
					<span class="day-status"><?php echo esc_html( $day_item['status'] ); ?></span>
					<span class="day-date"><?php echo esc_html( $day_item['dateStr'] ); ?></span>
					<span class="day-topic"><?php echo esc_html( $short_title ); ?></span>
				</button>
			<?php endforeach; ?>
		</div>
	</div>

	<!-- Embedded Live Server JSON Payload for Zero-Latency Script Hydration -->
	<script id="cosmic-apod-server-data" type="application/json">
		<?php echo wp_json_encode( $apod_archive ); ?>
	</script>

	<!-- Main APOD Showcase Container (Dynamic) -->
	<div class="apod-main-display cosmic-glass-card" id="apodMainDisplay" style="padding: 2.2rem; margin-bottom: 3.5rem;">
		<div class="apod-display-grid">
			<!-- Photo Side -->
			<div class="apod-photo-column">
				<div class="apod-image-frame">
					<img src="<?php echo $today_img; ?>" id="apodFeaturedImage" alt="<?php echo $today_title; ?>" class="apod-featured-img" />
					<div class="apod-image-overlay-tags">
						<span class="apod-tag-badge" id="apodTagBadge"><?php echo $today_tag; ?></span>
						<span class="apod-date-badge" id="apodDateBadge"><?php echo $today_date; ?></span>
					</div>
				</div>
				<div class="apod-credit-bar">
					<span class="apod-credit-label">Teleskop &amp; Kaynak:</span>
					<span class="apod-credit-value" id="apodCreditValue"><?php echo $today_credit; ?></span>
				</div>
			</div>

			<!-- Meta & Scientific Explanation Side -->
			<div class="apod-meta-column">
				<div class="apod-meta-header">
					<span class="science-badge science-badge--purple" id="apodCategoryTag">Canlı NASA APOD Veri Akışı</span>
					<h2 class="apod-title" id="apodTitle"><?php echo $today_title; ?></h2>
				</div>

				<div class="apod-description-box">
					<p class="apod-desc-text" id="apodDescText">
						<?php echo $today_desc; ?>
					</p>
				</div>

				<div class="apod-telemetry-table-wrap">
					<table class="science-data-table" id="apodDataTable">
						<tr><td>Gözlem Aracı:</td><td id="tdInstrument"><?php echo esc_html( $today_item['instrument'] ?? 'NASA Gözlemevi' ); ?></td></tr>
						<tr><td>Uzaklık / Bölge:</td><td id="tdDistance"><?php echo esc_html( $today_item['distance'] ?? 'Astrofiziksel Koordinatlar' ); ?></td></tr>
						<tr><td>Gök Cisim Sınıfı:</td><td id="tdClass"><?php echo esc_html( $today_item['classType'] ?? 'Astrofiziksel Fenomen' ); ?></td></tr>
						<tr><td>Arşiv Durumu:</td><td id="tdArchive"><?php echo esc_html( $today_item['archiveStatus'] ?? 'Canlı NASA APOD Servisi' ); ?></td></tr>
					</table>
				</div>
			</div>
		</div>
	</div>

	<!-- NASA Daily News & Mission Highlights (Kozmik Bülten) -->
	<div class="nasa-news-section" style="margin-top: 3rem;">
		<div class="has-text-align-center" style="margin-bottom: 2rem;">
			<span class="science-badge science-badge--cyan">NASA Bilim Misyonları &bull; Canlı Bülten</span>
			<h2 class="wp-block-heading glow-effect" style="font-size: 2rem; margin-top: 0.4rem;">Güncel Uzay Görevleri ve Keşif Haberleri</h2>
		</div>

		<div class="wp-block-columns alignwide" style="gap: 1.5rem;">
			<div class="wp-block-column">
				<div class="cosmic-glass-card" style="padding: 1.6rem; height: 100%;">
					<span class="science-badge science-badge--gold">James Webb Spektroskopisi</span>
					<h3 class="wp-block-heading" style="color: var(--wp--preset--color--starlight-cyan); font-size: 1.25rem; margin: 0.8rem 0 0.5rem;">Erken Evrende Beklenmedik Ağır Element Zenginliği</h3>
					<p class="has-dust-gray-color" style="font-size: 0.92rem; line-height: 1.6;">JWST'nin NIRSpec verileri, Büyük Patlama'dan yalnızca 350 milyon yıl sonraki galaksilerde şaşırtıcı düzeyde Karbon ve Oksijen bolluğu tespit etti. Bu bulgu, evrendeki ilk nesil Süper-Kütleli (Popülasyon III) yıldızların teorilerden çok daha erken patladığını kanıtlıyor.</p>
					<span style="font-family: var(--wp--preset--font-family--mono); font-size: 0.78rem; color: var(--wp--preset--color--solar-gold);">Kaynak: NASA / ESA Astrofizik Bülteni</span>
				</div>
			</div>

			<div class="wp-block-column">
				<div class="cosmic-glass-card" style="padding: 1.6rem; height: 100%;">
					<span class="science-badge science-badge--purple">Juno &amp; Europa Clipper</span>
					<h3 class="wp-block-heading" style="color: var(--wp--preset--color--cosmic-violet); font-size: 1.25rem; margin: 0.8rem 0 0.5rem;">Europa'nın Okyanus Kabuğunda Oksijen Üretimi</h3>
					<p class="has-dust-gray-color" style="font-size: 0.92rem; line-height: 1.6;">Jüpiter'in buzlu uydusu Europa'nın yüzeyinden saniyede 12 kg moleküler oksijen salındığı hesaplandı. Yüzey altı okyanusun yaşanabilirlik potansiyeli, fırlatılan Europa Clipper uzay aracının buz radarı taramalarıyla doğrudan incelenecek.</p>
					<span style="font-family: var(--wp--preset--font-family--mono); font-size: 0.78rem; color: var(--wp--preset--color--solar-gold);">Kaynak: NASA Jet Propulsion Laboratory (JPL)</span>
				</div>
			</div>

			<div class="wp-block-column">
				<div class="cosmic-glass-card" style="padding: 1.6rem; height: 100%;">
					<span class="science-badge science-badge--cyan">Mars Keşif Programı</span>
					<h3 class="wp-block-heading" style="color: var(--wp--preset--color--solar-gold); font-size: 1.25rem; margin: 0.8rem 0 0.5rem;">Jezero Kraterinde Karbonat ve Silika Analizleri</h3>
					<p class="has-dust-gray-color" style="font-size: 0.92rem; line-height: 1.6;">Perseverance gezgini, antik göl tabanındaki tortul kayaçlardan 24. çekirdek örneğini başarıyla mühürledi. SHERLOC spektrometresi, organik moleküllerin korunmasına en uygun mineralojik yapıyı teyit etti.</p>
					<span style="font-family: var(--wp--preset--font-family--mono); font-size: 0.78rem; color: var(--wp--preset--color--solar-gold);">Kaynak: NASA Mars Exploration Program</span>
				</div>
			</div>
		</div>
	</div>

</div>
<!-- /wp:group -->
