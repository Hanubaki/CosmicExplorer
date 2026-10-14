<?php
/**
 * Title: Karanlık Madde ve Karanlık Enerji
 * Slug: cosmic-explorer/dark-matter
 * Categories: cosmic-features
 * Viewport Width: 1400
 */
$dark_matter_img = esc_url( get_theme_file_uri( 'assets/images/supernova.jpg' ) );
?>
<!-- wp:group {"align":"full","backgroundColor":"space-black","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained"}} -->
<div id="karanlik-madde" class="wp-block-group alignfull has-space-black-background-color has-background" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">
	<!-- wp:paragraph {"align":"center"} -->
	<p class="has-text-align-center"><span class="science-badge science-badge--purple">Evrenin Görünmeyen %95'i — Kozmolojik Gizem</span></p>
	<!-- /wp:paragraph -->

	<!-- wp:heading {"textAlign":"center","className":"glow-effect","fontSize":"x-large"} -->
	<h2 class="wp-block-heading has-text-align-center glow-effect has-x-large-font-size">Karanlık Madde ve Karanlık Enerji</h2>
	<!-- /wp:heading -->

	<!-- wp:spacer {"height":"40px"} -->
	<div style="height:40px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- wp:columns {"align":"wide"} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"width":"45%"} -->
		<div class="wp-block-column" style="flex-basis:45%">
			<!-- wp:group {"className":"cosmic-glass-card","layout":{"type":"constrained"}} -->
			<div class="wp-block-group cosmic-glass-card" style="padding: 1.75rem; overflow:hidden;">
				<img src="<?php echo $dark_matter_img; ?>" alt="Kütleçekimsel Merceklenme ve Karanlık Madde" class="timeline-photo" style="margin-top:0; max-height:360px;" />
				<span class="science-badge science-badge--gold" style="margin-top:1rem;">Kütleçekimsel Merceklenme</span>
				<!-- wp:paragraph {"textColor":"dust-gray","fontSize":"small"} -->
				<p class="has-dust-gray-color has-text-color has-small-font-size">Karanlık madde ışık yaymaz ve soğurmaz, ancak devasa kütlesiyle uzay-zamanı bükerek arkasındaki galaksilerin ışığını mercekler.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"width":"55%"} -->
		<div class="wp-block-column" style="flex-basis:55%">
			<!-- wp:group {"className":"cosmic-glass-card","layout":{"type":"constrained"}} -->
			<div class="wp-block-group cosmic-glass-card" style="padding: 2rem; height: 100%;">
				<!-- wp:heading {"level":3,"textColor":"starlight-cyan"} -->
				<h3 class="wp-block-heading has-starlight-cyan-color has-text-color">Evrenin Temel Bileşenleri</h3>
				<!-- /wp:heading -->
				<!-- wp:paragraph -->
				<p>Evrenin kütle-enerji içeriğinin sadece %5'i baryonik maddeden (yıldızlar, gezegenler, gaz) oluşur. Kalan kısmın %27'si galaksileri bir arada tutan <strong>Karanlık Madde</strong> ve %68'i ise evrenin genişlemesini hızlandıran <strong>Karanlık Enerji</strong>'dir.</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"textColor":"star-white"} -->
				<p class="has-star-white-color has-text-color" style="font-weight:600; margin-top:1.25rem;">Bilimsel Veriler:</p>
				<!-- /wp:paragraph -->

				<table class="science-data-table">
					<tr><td>Parametre</td><td>Detay</td></tr>
					<tr><td>Evrenin Bileşimi:</td><td>%68.3 Karanlık Enerji, %26.8 Karanlık Madde, %4.9 Baryonik Madde</td></tr>
					<tr><td>Karanlık Madde Kanıtı:</td><td>Fritz Zwicky (1933), Vera Rubin (1970ler) - Galaksi dönüş eğrileri</td></tr>
					<tr><td>Karanlık Enerji Kanıtı:</td><td>Tip Ia Süpernova Gözlemleri (1998) - Hızlanan genişleme</td></tr>
				</table>
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
