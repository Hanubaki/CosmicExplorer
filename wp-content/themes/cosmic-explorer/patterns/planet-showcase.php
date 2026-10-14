<?php
/**
 * Title: Gezegen Vitrin Kartları
 * Slug: cosmic-explorer/planet-showcase
 * Categories: cosmic-features
 * Viewport Width: 1400
 */
$mars_img    = esc_url( get_theme_file_uri( 'assets/images/mars.jpg' ) );
$jupiter_img = esc_url( get_theme_file_uri( 'assets/images/jupiter.jpg' ) );
$saturn_img  = esc_url( get_theme_file_uri( 'assets/images/saturn.jpg' ) );
$neptune_img = esc_url( get_theme_file_uri( 'assets/images/neptune.jpg' ) );
?>
<!-- wp:group {"align":"full","backgroundColor":"space-black","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained"}} -->
<div id="gunes-sistemi" class="wp-block-group alignfull has-space-black-background-color has-background" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">
	<!-- wp:paragraph {"align":"center"} -->
	<p class="has-text-align-center"><span class="science-badge">Gezegensel Jeoloji ve Atmosferik Telemetri</span></p>
	<!-- /wp:paragraph -->

	<!-- wp:heading {"level":3,"textAlign":"center","className":"glow-effect","fontSize":"x-large","fontFamily":"heading"} -->
	<h3 class="wp-block-heading has-text-align-center glow-effect has-heading-font-family has-x-large-font-size">Güneş Sistemi Keşfi</h3>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","textColor":"dust-gray","fontSize":"medium"} -->
	<p class="has-text-align-center has-dust-gray-color has-text-color has-medium-font-size">NASA uzay araçları ve teleskopik gözlemlerle kaydedilen gerçek gezegen fotoğrafları ve teknik parametreler.</p>
	<!-- /wp:paragraph -->

	<!-- wp:spacer {"height":"40px"} -->
	<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:group {"layout":{"type":"constrained"}} -->
	<div class="wp-block-group" data-wp-interactive="cosmicExplorer">
		<!-- ÜST SATIR: Mars, Jüpiter, Satürn (3 Sütun) -->
		<!-- wp:columns -->
		<div class="wp-block-columns">
			<!-- Sütun 1: Mars -->
			<!-- wp:column -->
			<div class="wp-block-column">
				<!-- wp:group {"className":"cosmic-glass-card cosmic-glass-card--interactive planet-card","layout":{"type":"flex","orientation":"vertical","justifyContent":"center","alignItems":"center"}} -->
				<div class="wp-block-group cosmic-glass-card cosmic-glass-card--interactive planet-card" data-wp-context='{"isExpanded":false,"planetName":"Mars"}'>
					<div class="planet-card__photo-wrap">
						<img src="<?php echo $mars_img; ?>" alt="NASA Mars Küresel Mozaik Fotoğrafı" class="planet-card__photo" />
					</div>

					<span class="science-badge science-badge--gold">NASA MRO &amp; Viking</span>

					<!-- wp:heading {"level":4,"textColor":"solar-gold","fontSize":"large"} -->
					<h4 class="wp-block-heading has-solar-gold-color has-text-color has-large-font-size">Mars</h4>
					<!-- /wp:heading -->

					<!-- wp:paragraph {"textColor":"dust-gray","fontSize":"small"} -->
					<p class="has-dust-gray-color has-text-color has-small-font-size" style="margin-bottom:0.4rem;">Karasal Gezegen • Kızıl Gezegen</p>
					<!-- /wp:paragraph -->

					<p style="font-size:0.85rem; color:#94a3b8; line-height:1.45; margin:0 0 0.6rem;">Demir oksit minerali nedeniyle pas kırmızısıdır. Güneş Sistemi'nin en yüksek dağı Olympus Mons'a ev sahipliği yapar.</p>

					<div class="planet-preview-metrics">
						<span class="planet-preview-metric"><strong>Güneş'e:</strong> 228 Milyon km (1,52 AU)</span>
					</div>

					<!-- wp:button -->
					<div class="wp-block-button"><button class="wp-block-button__link wp-element-button planet-toggle-btn" data-wp-on--click="actions.togglePlanetDetail" onclick="this.closest('.planet-card').classList.toggle('is-expanded')">Teknik Verileri İncele ▾</button></div>
					<!-- /wp:button -->

					<!-- wp:group {"className":"planet-card__info","layout":{"type":"constrained"}} -->
					<div class="wp-block-group planet-card__info" data-wp-class--is-expanded="context.isExpanded">
						<table class="science-data-table">
							<tr><td>Ekvator Çapı:</td><td>6.779 km</td></tr>
							<tr><td>Güneş'e Uzaklık:</td><td>1,52 AU (228M km)</td></tr>
							<tr><td>Yörünge Periyodu:</td><td>687 Dünya Günü</td></tr>
							<tr><td>Yüzey Sıcaklığı:</td><td>-140°C ile +20°C</td></tr>
							<tr><td>Uyduları:</td><td>2 (Phobos, Deimos)</td></tr>
							<tr><td>Atmosfer:</td><td>%95,3 CO₂, %2,7 N₂</td></tr>
						</table>
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:column -->

			<!-- Sütun 2: Jüpiter -->
			<!-- wp:column -->
			<div class="wp-block-column">
				<!-- wp:group {"className":"cosmic-glass-card cosmic-glass-card--interactive planet-card","layout":{"type":"flex","orientation":"vertical","justifyContent":"center","alignItems":"center"}} -->
				<div class="wp-block-group cosmic-glass-card cosmic-glass-card--interactive planet-card" data-wp-context='{"isExpanded":false,"planetName":"Jüpiter"}'>
					<div class="planet-card__photo-wrap">
						<img src="<?php echo $jupiter_img; ?>" alt="NASA Juno Uzay Aracı Jüpiter Atmosfer Fotoğrafı" class="planet-card__photo" />
					</div>

					<span class="science-badge">NASA Juno Misyonu</span>

					<!-- wp:heading {"level":4,"textColor":"starlight-cyan","fontSize":"large"} -->
					<h4 class="wp-block-heading has-starlight-cyan-color has-text-color has-large-font-size">Jüpiter</h4>
					<!-- /wp:heading -->

					<!-- wp:paragraph {"textColor":"dust-gray","fontSize":"small"} -->
					<p class="has-dust-gray-color has-text-color has-small-font-size" style="margin-bottom:0.4rem;">Gaz Devi • En Büyük Kütle</p>
					<!-- /wp:paragraph -->

					<p style="font-size:0.85rem; color:#94a3b8; line-height:1.45; margin:0 0 0.6rem;">Diğer tüm gezegenlerin toplam kütlesinin 2,5 katına sahiptir. Asırlardır süren Büyük Kırmızı Leke fırtınasıyla bilinir.</p>

					<div class="planet-preview-metrics">
						<span class="planet-preview-metric"><strong>Güneş'e:</strong> 778 Milyon km (5,20 AU)</span>
					</div>

					<!-- wp:button -->
					<div class="wp-block-button"><button class="wp-block-button__link wp-element-button planet-toggle-btn" data-wp-on--click="actions.togglePlanetDetail" onclick="this.closest('.planet-card').classList.toggle('is-expanded')">Teknik Verileri İncele ▾</button></div>
					<!-- /wp:button -->

					<!-- wp:group {"className":"planet-card__info","layout":{"type":"constrained"}} -->
					<div class="wp-block-group planet-card__info" data-wp-class--is-expanded="context.isExpanded">
						<table class="science-data-table">
							<tr><td>Ekvator Çapı:</td><td>139.820 km</td></tr>
							<tr><td>Güneş'e Uzaklık:</td><td>5,20 AU (778M km)</td></tr>
							<tr><td>Dönüş Süresi:</td><td>9 saat 55 dakika</td></tr>
							<tr><td>Yörünge Periyodu:</td><td>11,86 Dünya Yılı</td></tr>
							<tr><td>Bilinen Uydu:</td><td>115 (NASA 2026 Doğrulandı)</td></tr>
							<tr><td>Atmosfer:</td><td>%90 H₂, %10 He</td></tr>
						</table>
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:column -->

			<!-- Sütun 3: Satürn -->
			<!-- wp:column -->
			<div class="wp-block-column">
				<!-- wp:group {"className":"cosmic-glass-card cosmic-glass-card--interactive planet-card","layout":{"type":"flex","orientation":"vertical","justifyContent":"center","alignItems":"center"}} -->
				<div class="wp-block-group cosmic-glass-card cosmic-glass-card--interactive planet-card" data-wp-context='{"isExpanded":false,"planetName":"Satürn"}'>
					<div class="planet-card__photo-wrap">
						<img src="<?php echo $saturn_img; ?>" alt="NASA Cassini Uzay Aracı Satürn ve Halkaları" class="planet-card__photo" />
					</div>

					<span class="science-badge science-badge--purple">NASA Cassini-Huygens</span>

					<!-- wp:heading {"level":4,"textColor":"solar-gold","fontSize":"large"} -->
					<h4 class="wp-block-heading has-solar-gold-color has-text-color has-large-font-size">Satürn</h4>
					<!-- /wp:heading -->

					<!-- wp:paragraph {"textColor":"dust-gray","fontSize":"small"} -->
					<p class="has-dust-gray-color has-text-color has-small-font-size" style="margin-bottom:0.4rem;">Gaz Devi • Halka Sistemi</p>
					<!-- /wp:paragraph -->

					<p style="font-size:0.85rem; color:#94a3b8; line-height:1.45; margin:0 0 0.6rem;">Yoğunluğu sudan az olan tek gezegendir. Milyarlarca su buzu ve kaya parçasından oluşan halkaları 282.000 km'dir.</p>

					<div class="planet-preview-metrics">
						<span class="planet-preview-metric"><strong>Güneş'e:</strong> 1,43 Milyar km (9,58 AU)</span>
					</div>

					<!-- wp:button -->
					<div class="wp-block-button"><button class="wp-block-button__link wp-element-button planet-toggle-btn" data-wp-on--click="actions.togglePlanetDetail" onclick="this.closest('.planet-card').classList.toggle('is-expanded')">Teknik Verileri İncele ▾</button></div>
					<!-- /wp:button -->

					<!-- wp:group {"className":"planet-card__info","layout":{"type":"constrained"}} -->
					<div class="wp-block-group planet-card__info" data-wp-class--is-expanded="context.isExpanded">
						<table class="science-data-table">
							<tr><td>Ekvator Çapı:</td><td>116.460 km</td></tr>
							<tr><td>Güneş'e Uzaklık:</td><td>9,58 AU (1,43Mrd km)</td></tr>
							<tr><td>Dönüş Süresi:</td><td>10 saat 33 dakika</td></tr>
							<tr><td>Yörünge Periyodu:</td><td>29,45 Dünya Yılı</td></tr>
							<tr><td>Bilinen Uydu:</td><td>293 (NASA Ağustos 2026)</td></tr>
							<tr><td>Atmosfer:</td><td>%96 H₂, %3 He</td></tr>
						</table>
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:column -->
		</div>
		<!-- /wp:columns -->

		<!-- wp:spacer {"height":"30px"} -->
		<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
		<!-- /wp:spacer -->

		<!-- ALT SATIR: Neptün Kartı (Aşağıda, Bağımsız ve Merkezlenmiş) -->
		<div class="planet-row-neptune" style="max-width:400px; margin:0 auto;">
			<!-- wp:group {"className":"cosmic-glass-card cosmic-glass-card--interactive planet-card","layout":{"type":"flex","orientation":"vertical","justifyContent":"center","alignItems":"center"}} -->
			<div class="wp-block-group cosmic-glass-card cosmic-glass-card--interactive planet-card" data-wp-context='{"isExpanded":false,"planetName":"Neptün"}'>
				<div class="planet-card__photo-wrap">
					<img src="<?php echo $neptune_img; ?>" alt="NASA Voyager 2 Neptün Fotoğrafı" class="planet-card__photo" />
				</div>

				<span class="science-badge">NASA Voyager 2 • Uzak Buz Devi</span>

				<!-- wp:heading {"level":4,"textColor":"starlight-cyan","fontSize":"large"} -->
				<h4 class="wp-block-heading has-starlight-cyan-color has-text-color has-large-font-size">Neptün</h4>
				<!-- /wp:heading -->

				<!-- wp:paragraph {"textColor":"dust-gray","fontSize":"small"} -->
				<p class="has-dust-gray-color has-text-color has-small-font-size" style="margin-bottom:0.4rem;">Buz Devi • Dinamik Atmosfer</p>
				<!-- /wp:paragraph -->

				<p style="font-size:0.85rem; color:#94a3b8; line-height:1.45; margin:0 0 0.6rem;">Atmosferindeki metan nedeniyle derin mavidir. Saatte 2.100 km hıza ulaşan süpersonik rüzgarlarla çevrilidir.</p>

				<div class="planet-preview-metrics">
					<span class="planet-preview-metric"><strong>Güneş'e:</strong> 4,5 Milyar km (30,07 AU)</span>
				</div>

				<!-- wp:button -->
				<div class="wp-block-button"><button class="wp-block-button__link wp-element-button planet-toggle-btn" data-wp-on--click="actions.togglePlanetDetail" onclick="this.closest('.planet-card').classList.toggle('is-expanded')">Teknik Verileri İncele ▾</button></div>
				<!-- /wp:button -->

				<!-- wp:group {"className":"planet-card__info","layout":{"type":"constrained"}} -->
				<div class="wp-block-group planet-card__info" data-wp-class--is-expanded="context.isExpanded">
					<table class="science-data-table">
						<tr><td>Ekvator Çapı:</td><td>49.244 km</td></tr>
						<tr><td>Güneş'e Uzaklık:</td><td>30,07 AU (4,5Mrd km)</td></tr>
						<tr><td>Dönüş Süresi:</td><td>16 saat 6 dakika</td></tr>
						<tr><td>Yörünge Periyodu:</td><td>164,8 Dünya Yılı</td></tr>
						<tr><td>Bilinen Uydu:</td><td>16 (Triton, Proteus)</td></tr>
						<tr><td>Atmosfer:</td><td>%80 H₂, %19 He, %1,5 CH₄</td></tr>
					</table>
				</div>
				<!-- /wp:group -->
			</div>
			<!-- /wp:group -->
		</div>
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
