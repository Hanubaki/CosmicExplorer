<?php
/**
 * Title: Süpernovalar ve Nebulalar
 * Slug: cosmic-explorer/supernovae
 * Categories: cosmic-features
 * Viewport Width: 1400
 */
$sn_img      = esc_url( get_theme_file_uri( 'assets/images/supernova.jpg' ) );
$pillars_img = esc_url( get_theme_file_uri( 'assets/images/pillars.jpg' ) );
?>
<!-- wp:group {"align":"full","backgroundColor":"space-black","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained"}} -->
<div id="supernovalar" class="wp-block-group alignfull has-space-black-background-color has-background" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">
	<!-- wp:paragraph {"align":"center"} -->
	<p class="has-text-align-center"><span class="science-badge science-badge--gold">Yıldız Evrimi, Kozmik Nükleosentez ve Gaz Bulutları</span></p>
	<!-- /wp:paragraph -->

	<!-- wp:heading {"textAlign":"center","className":"glow-effect","fontSize":"x-large"} -->
	<h2 class="wp-block-heading has-text-align-center glow-effect has-x-large-font-size">Süpernovalar ve Nebulalar</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","textColor":"dust-gray","fontSize":"medium"} -->
	<p class="has-text-align-center has-dust-gray-color has-text-color has-medium-font-size">Evrenin en güçlü termonükleer patlamaları ve yeni güneş sistemlerini doğuran kozmik moleküler bulutlar.</p>
	<!-- /wp:paragraph -->

	<!-- wp:spacer {"height":"40px"} -->
	<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:columns {"align":"wide"} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"className":"cosmic-glass-card","layout":{"type":"constrained"}} -->
			<div class="wp-block-group cosmic-glass-card" style="padding: 1.75rem;">
				<img src="<?php echo $sn_img; ?>" alt="NASA Hubble Yengeç Nebulası Süpernova Kalıntısı" class="timeline-photo" style="margin-top:0; max-height:280px;" />
				<span class="science-badge science-badge--purple" style="margin-top:1rem;">Tip II Çekirdek Çöküşü • Hubble &amp; Chandra</span>
				<!-- wp:heading {"level":3,"textColor":"cosmic-violet","fontSize":"large"} -->
				<h3 class="wp-block-heading has-cosmic-violet-color has-text-color has-large-font-size">Yengeç Nebulası (Crab Nebula - M1)</h3>
				<!-- /wp:heading -->
				<!-- wp:paragraph {"textColor":"dust-gray","fontSize":"small"} -->
				<p class="has-dust-gray-color has-text-color has-small-font-size">MS 1054 yılında Çinli ve Arap gökbilimciler tarafından kaydedilen parlak süpernovanın kalıntısı. Merkezinde saniyede 30 kez dönen yüksek manyetizmalı bir nötron yıldızı (Pulsar) yer alır.</p>
				<!-- /wp:paragraph -->

				<table class="science-data-table">
					<tr><td>Süpernova Türü:</td><td>Tip II (Demir Çekirdek Çökmesi)</td></tr>
					<tr><td>Genişleme Hızı:</td><td>1.500 km/s</td></tr>
					<tr><td>Dünya'ya Uzaklık:</td><td>6.500 Işık Yılı (Boğa Takımyıldızı)</td></tr>
					<tr><td>Kalıntı Çapı:</td><td>11 Işık Yılı</td></tr>
				</table>
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column -->
		<div class="wp-block-column">
			<!-- wp:group {"className":"cosmic-glass-card","layout":{"type":"constrained"}} -->
			<div class="wp-block-group cosmic-glass-card" style="padding: 1.75rem;">
				<img src="<?php echo $pillars_img; ?>" alt="NASA James Webb Yaratılış Sütunları Kartal Nebulası" class="timeline-photo" style="margin-top:0; max-height:280px;" />
				<span class="science-badge science-badge--gold" style="margin-top:1rem;">Stellar Doğumevi • JWST NIRCam Gözlemi</span>
				<!-- wp:heading {"level":3,"textColor":"solar-gold","fontSize":"large"} -->
				<h3 class="wp-block-heading has-solar-gold-color has-text-color has-large-font-size">Yaratılış Sütunları (Messier 16)</h3>
				<!-- /wp:heading -->
				<!-- wp:paragraph {"textColor":"dust-gray","fontSize":"small"} -->
				<p class="has-dust-gray-color has-text-color has-small-font-size">Kartal Nebulası'nın kalbinde yer alan yoğun gaz ve toz kuleleri. James Webb'in yakın kızılötesi ışığı, toz bulutlarını delerek içeride kütleçekimsel çökmeyle yeni parlayan protostar yıldızları görünür kılmıştır.</p>
				<!-- /wp:paragraph -->

				<table class="science-data-table">
					<tr><td>Nebula Türü:</td><td>Yayma (Emisyon) &amp; Yıldız Doğumevi</td></tr>
					<tr><td>Bileşim:</td><td>Soğuk Moleküler Hidrojen Gazı &amp; Toz</td></tr>
					<tr><td>Dünya'ya Uzaklık:</td><td>6.500 Işık Yılı (Yılan Takımyıldızı)</td></tr>
					<tr><td>Sütun Yüksekliği:</td><td>~4-5 Işık Yılı</td></tr>
				</table>
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->

	<!-- wp:spacer {"height":"30px"} -->
	<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:group {"className":"cosmic-glass-card","layout":{"type":"constrained"}} -->
	<div class="wp-block-group cosmic-glass-card" style="padding: 2rem; max-width: 1000px; margin: 0 auto;">
		<span class="science-badge">Kozmik Elementlerin Kökeni</span>
		<!-- wp:heading {"level":3,"textColor":"starlight-cyan"} -->
		<h3 class="wp-block-heading has-starlight-cyan-color has-text-color">Süpernova Nükleosentezi: Biz Yıldız Tozuyuz</h3>
		<!-- /wp:heading -->
		<!-- wp:paragraph -->
		<p>Büyük Patlama sırasında evrende yalnızca Hidrojen, Helyum ve eser miktarda Lityum oluşmuştur. Karbon, Oksijen ve Azot gibi yaşamın temel taşları dev yıldızların çekirdek kaynaşmasında sentezlenirken; Demir'den daha ağır olan Altın, Platin ve Uranyum gibi elementler ancak <strong>Süpernova patlamalarında</strong> ve <strong>Nötron Yıldızı birleşmelerinde (Kilonova)</strong> açığa çıkan devasa enerjiyle (hızlı nötron yakalama / r-süreci) üretilebilmektedir.</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div>
<!-- /wp:group -->
