<?php
/**
 * Title: Galaksiler ve Kozmik Yapı
 * Slug: cosmic-explorer/galaxies
 * Categories: cosmic-features
 * Viewport Width: 1400
 */
$andromeda_img = esc_url( get_theme_file_uri( 'assets/images/pillars.jpg' ) );
$deep_field_img = esc_url( get_theme_file_uri( 'assets/images/hero-webb.jpg' ) );
?>
<!-- wp:group {"align":"full","backgroundColor":"space-black","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained"}} -->
<div id="galaksiler" class="wp-block-group alignfull has-space-black-background-color has-background" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">
	<!-- wp:paragraph {"align":"center"} -->
	<p class="has-text-align-center"><span class="science-badge science-badge--purple">Büyük Ölçekli Kozmik Yapı ve Galaktik Evrim</span></p>
	<!-- /wp:paragraph -->

	<!-- wp:heading {"textAlign":"center","className":"glow-effect","fontSize":"x-large"} -->
	<h2 class="wp-block-heading has-text-align-center glow-effect has-x-large-font-size">Galaksiler: Evrenin Yapı Taşları</h2>
	<!-- /wp:heading -->

	<!-- wp:spacer {"height":"40px"} -->
	<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:columns {"align":"wide"} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"width":"50%"} -->
		<div class="wp-block-column" style="flex-basis:50%">
			<!-- wp:group {"className":"cosmic-glass-card","layout":{"type":"constrained"}} -->
			<div class="wp-block-group cosmic-glass-card" style="padding: 1.75rem; overflow:hidden;">
				<img src="<?php echo $andromeda_img; ?>" alt="Andromeda Galaksisi (M31)" class="timeline-photo" style="margin-top:0; max-height:360px;" />
				<span class="science-badge science-badge--gold" style="margin-top:1rem;">Andromeda Galaksisi (M31)</span>
				
				<table class="science-data-table">
					<tr><td>Galaksi Türü:</td><td>Spiral (Sb)</td></tr>
					<tr><td>Dünya'ya Uzaklık:</td><td>2,537 Milyon Işık Yılı</td></tr>
					<tr><td>Çap:</td><td>~220.000 Işık Yılı</td></tr>
					<tr><td>Yıldız Sayısı:</td><td>~1 Trilyon</td></tr>
					<tr><td>Keşif:</td><td>Al-Sufi (964)</td></tr>
				</table>
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"width":"50%"} -->
		<div class="wp-block-column" style="flex-basis:50%">
			<!-- wp:group {"className":"cosmic-glass-card","layout":{"type":"constrained"}} -->
			<div class="wp-block-group cosmic-glass-card" style="padding: 1.75rem; height: 100%;">
				<img src="<?php echo $deep_field_img; ?>" alt="Hubble Ultra Deep Field" class="timeline-photo" style="margin-top:0; max-height:360px;" />
				<span class="science-badge science-badge--gold" style="margin-top:1rem;">Hubble Ultra Derin Alan (HUDF)</span>
				<!-- wp:paragraph -->
				<p>Gökyüzünde dolunayın onda biri kadar küçük bir alanda binlerce galaksinin bulunduğunu gösteren tarihi bir gözlemdir. Bu küçük gökyüzü alanı, evrenin çok erken dönemlerindeki galaksileri (13 milyar yıl öncesine kadar) barındırır.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->

	<!-- wp:spacer {"height":"40px"} -->
	<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->
	
	<!-- wp:heading {"textAlign":"center","fontSize":"large"} -->
	<h3 class="wp-block-heading has-text-align-center has-large-font-size">Galaksi Sınıflandırması (Hubble Dizisi)</h3>
	<!-- /wp:heading -->

	<!-- wp:group {"className":"cosmic-glass-card","layout":{"type":"constrained"}} -->
	<div class="wp-block-group cosmic-glass-card" style="padding: 2rem;">
		<!-- wp:paragraph -->
		<p>Galaksiler genel olarak morfolojilerine göre sarmal (spiral), eliptik ve düzensiz (irregular) olmak üzere üç temel sınıfa ayrılır.</p>
		<!-- /wp:paragraph -->
		<table class="science-data-table">
			<tr><td>Sınıf</td><td>Özellikler</td><td>Örnek</td></tr>
			<tr><td>Sarmal (Spiral)</td><td>Merkezi bir şişkinlik ve etrafında dönen sarmal kollar. Genç yıldızlar ve gaz açısından zengindir.</td><td>Samanyolu, Andromeda</td></tr>
			<tr><td>Eliptik (Elliptical)</td><td>Düzgün, elipsoit şeklinde ve genellikle yaşlı yıldızlardan oluşur. Yıldız oluşumu çok düşüktür.</td><td>M87</td></tr>
			<tr><td>Düzensiz (Irregular)</td><td>Belirgin bir yapısı olmayan, genellikle galaktik çarpışmalar veya bozulmalar sonucu oluşan galaksiler.</td><td>Macellan Bulutları</td></tr>
		</table>
	</div>
	<!-- /wp:group -->

</div>
<!-- /wp:group -->
