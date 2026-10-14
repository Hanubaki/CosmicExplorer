<?php
/**
 * Title: Galaktik Hero Bölümü
 * Slug: cosmic-explorer/hero-galaxy
 * Categories: cosmic-heroes, banner
 * Viewport Width: 1400
 */
$hero_img = esc_url( get_theme_file_uri( 'assets/images/hero-webb.jpg' ) );
?>
<!-- wp:cover {"url":"<?php echo $hero_img; ?>","dimRatio":65,"overlayColor":"space-black","align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-cover alignfull" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)"><span aria-hidden="true" class="wp-block-cover__background has-space-black-background-color has-background-dim-65 has-background-dim"></span><img class="wp-block-cover__image-background" alt="NASA James Webb Uzay Teleskobu - Karina Nebulası Kozmik Uçurumlar" src="<?php echo $hero_img; ?>" data-object-fit="cover"/><div class="wp-block-cover__inner-container">
	<!-- wp:group {"layout":{"type":"flex","orientation":"vertical","justifyContent":"center","alignItems":"center"}} -->
	<div class="wp-block-group">
		<!-- wp:paragraph {"align":"center"} -->
		<p class="has-text-align-center"><span class="science-badge science-badge--gold">TÜBİTAK UZAY &amp; NASA / ESA • DOĞRULANMIŞ ASTROFİZİK VERİTABANI</span></p>
		<!-- /wp:paragraph -->

		<!-- wp:heading {"textAlign":"center","level":1,"fontSize":"hero","fontFamily":"heading"} -->
		<h1 class="wp-block-heading has-text-align-center has-heading-font-family has-hero-font-size" style="letter-spacing:-0.03em; font-weight:800; color:#ffffff; text-shadow:0 2px 20px rgba(0,0,0,0.8);">EVRENİN DERİNLİKLERİ</h1>
		<!-- /wp:heading -->

		<!-- wp:paragraph {"align":"center","textColor":"dust-gray","fontSize":"large"} -->
		<p class="has-text-align-center has-dust-gray-color has-text-color has-large-font-size" style="max-width:820px; margin:0 auto; line-height:1.65;">TÜBİTAK UZAY enstitüsü, NASA JPL ve ESA derin uzay gözlem arşivlerinden derlenen spektroskopik fotoğraflar, gökcismi telemetrileri ve interaktif astrofiziksel laboratuvar simülasyonları.</p>
		<!-- /wp:paragraph -->

		<!-- wp:spacer {"height":"20px"} -->
		<div style="height:20px" aria-hidden="true" class="wp-block-spacer"></div>
		<!-- /wp:spacer -->

		<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
		<div class="wp-block-buttons">
			<!-- wp:button -->
			<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" style="background:#0284c7; color:#ffffff; font-weight:700; border-radius:8px; padding:0.8rem 1.6rem; letter-spacing:0.04em;" href="#gunes-sistemi">GÜNEŞ SİSTEMİ VERİLERİ</a></div>
			<!-- /wp:button -->

			<!-- wp:button {"className":"is-style-outline"} -->
			<div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" style="border:1.5px solid rgba(255,255,255,0.35); color:#ffffff; font-weight:700; border-radius:8px; padding:0.8rem 1.6rem; letter-spacing:0.04em;" href="#kesif-tarihi">UZAY GÖREVLERİ KRONOLOJİSİ</a></div>
			<!-- /wp:button -->
		</div>
		<!-- /wp:buttons -->

		<!-- wp:spacer {"height":"30px"} -->
		<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
		<!-- /wp:spacer -->

		<!-- wp:paragraph {"align":"center","textColor":"dust-gray","fontSize":"small","fontFamily":"mono"} -->
		<p class="has-text-align-center has-dust-gray-color has-text-color has-mono-font-family has-small-font-size">[GÖZLEM ENSTRÜMANI: JWST / NIRCam • HEDEF: NGC 3324 KARİNA BULUTSUSU • 7.600 IŞIK YILI]</p>
		<!-- /wp:paragraph -->
	</div>
	<!-- /wp:group -->
</div></div>
<!-- /wp:cover -->
