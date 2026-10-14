<?php
/**
 * Title: Karadelikler ve Görecelik
 * Slug: cosmic-explorer/black-holes
 * Categories: cosmic-features
 * Viewport Width: 1400
 */
$bh_img = esc_url( get_theme_file_uri( 'assets/images/blackhole.jpg' ) );
?>
<!-- wp:group {"align":"full","backgroundColor":"space-black","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained"}} -->
<div id="karadelikler" class="wp-block-group alignfull has-space-black-background-color has-background" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">
	<!-- wp:paragraph {"align":"center"} -->
	<p class="has-text-align-center"><span class="science-badge science-badge--purple">Aşırı Yerçekimi Fiziği ve Uzay-Zaman Tekillikleri</span></p>
	<!-- /wp:paragraph -->

	<!-- wp:heading {"textAlign":"center","className":"glow-effect","fontSize":"x-large"} -->
	<h2 class="wp-block-heading has-text-align-center glow-effect has-x-large-font-size">Karadelikler ve Olay Ufku</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","textColor":"dust-gray","fontSize":"medium"} -->
	<p class="has-text-align-center has-dust-gray-color has-text-color has-medium-font-size">Albert Einstein'ın Genel Görecelik Teorisinin en radikal öngörüsü: Işığın dahi kaçamadığı kozmik kütleçekim tuzakları.</p>
	<!-- /wp:paragraph -->

	<!-- wp:spacer {"height":"30px"} -->
	<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- Interactive WebGL Kerr Black Hole Laboratory Viewport -->
	<div class="kerr-sim-container cosmic-glass-card" style="margin-bottom: 2.5rem; padding: 1.5rem; position: relative; overflow: hidden; border: 1.5px solid rgba(255, 183, 3, 0.45); box-shadow: 0 10px 35px rgba(0, 0, 0, 0.7), 0 0 30px rgba(255, 140, 0, 0.2);">
		<div class="kerr-sim-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
			<div>
				<span class="science-badge science-badge--gold">EHT &amp; TÜBİTAK ASTROFİZİK LABORATUVARI // GENEL GÖRELİLİK</span>
				<h3 style="margin: 0.4rem 0 0; color: #fff; font-size: 1.4rem; font-family: var(--wp--preset--font-family--heading, sans-serif); font-weight: 800; letter-spacing: -0.01em;">Dönen Kerr Karadeliği &amp; Kütleçekimsel Merceklenme</h3>
				<p style="margin: 0.25rem 0 0; color: #94a3b8; font-size: 0.88rem; line-height: 1.55;">Einstein alan denklemleri uyarınca GPU üzerinde gerçek zamanlı foton jeodeziği (gravitational ray-tracing) ve göreli Doppler ışıması hesaplanmaktadır.</p>
			</div>
			<div class="kerr-sim-telemetry" style="display: flex; gap: 0.9rem; align-items: center; font-family: var(--wp--preset--font-family--mono, monospace); font-size: 0.8rem; background: rgba(8,6,20,0.85); padding: 0.5rem 1rem; border-radius: 10px; border: 1px solid rgba(0,240,255,0.3); backdrop-filter: blur(10px);">
				<span style="color: #00f0ff;">SPİN ($a/M$): <strong>0.94</strong></span>
				<span style="color: #ffb703;">EĞİM: <strong id="kerrAngleVal">20°</strong></span>
				<span style="color: #38bdf8;">MESAFE: <strong id="kerrDistVal">4.2r</strong></span>
				<span style="color: #22c55e;">PERFORMANS: <strong id="kerrFpsVal">60</strong> FPS</span>
			</div>
		</div>

		<div class="kerr-sim-viewport" style="position: relative; width: 100%; height: 440px; border-radius: 14px; overflow: hidden; background: #000; border: 1.5px solid rgba(255, 183, 3, 0.35); box-shadow: inset 0 0 35px rgba(0,0,0,0.9), 0 0 30px rgba(255, 100, 0, 0.25);">
			<canvas id="kerrBhSimCanvas" width="1100" height="440" style="width: 100%; height: 100%; display: block; cursor: grab; touch-action: none;"></canvas>
			<div class="kerr-sim-hint" style="position: absolute; bottom: 14px; left: 16px; font-size: 0.78rem; font-family: var(--wp--preset--font-family--mono, monospace); color: #ffb703; background: rgba(10,8,25,0.85); padding: 5px 12px; border-radius: 8px; pointer-events: none; border: 1px solid rgba(255,183,3,0.4); backdrop-filter: blur(8px);">
				[KONTROL] Sürükleyerek 360° Döndürün &bull; Çift Parmakla Yakınlaştırın &bull; Sıfırlamak İçin Çift Dokunun
			</div>
		</div>
	</div>

	<!-- wp:columns {"align":"wide"} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"width":"45%"} -->
		<div class="wp-block-column" style="flex-basis:45%">
			<!-- wp:group {"className":"cosmic-glass-card","layout":{"type":"constrained"}} -->
			<div class="wp-block-group cosmic-glass-card" style="padding: 1.75rem; overflow:hidden;">
				<img src="<?php echo $bh_img; ?>" alt="Event Horizon Telescope M87 Süperkütleli Karadelik Doğrudan Gözlemi" class="timeline-photo" style="margin-top:0; max-height:360px;" />
				<span class="science-badge science-badge--gold" style="margin-top:1rem;">Event Horizon Telescope (EHT) • VLBI Konsorsiyumu</span>
				<!-- wp:heading {"level":3,"textColor":"solar-gold","fontSize":"large"} -->
				<h3 class="wp-block-heading has-solar-gold-color has-text-color has-large-font-size">Messier 87 (M87*) Karadeliği</h3>
				<!-- /wp:heading -->
				<!-- wp:paragraph {"textColor":"dust-gray","fontSize":"small"} -->
				<p class="has-dust-gray-color has-text-color has-small-font-size">İnsanlık tarihinin ilk doğrudan karadelik silueti görüntüsü. Dünya çapında 8 radyo teleskobun eşzamanlı interferometri ağı ile 55 milyon ışık yılı uzaklıktan kaydedilmiştir. Parıldayan halka, olay ufkuna düşen plazmanın ışımasıdır.</p>
				<!-- /wp:paragraph -->
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"width":"55%"} -->
		<div class="wp-block-column" style="flex-basis:55%">
			<!-- wp:group {"className":"cosmic-glass-card","layout":{"type":"constrained"}} -->
			<div class="wp-block-group cosmic-glass-card" style="padding: 2rem; height: 100%;">
				<span class="science-badge">Temel Teori ve Matematiksel Modeller</span>
				<!-- wp:heading {"level":3,"textColor":"starlight-cyan"} -->
				<h3 class="wp-block-heading has-starlight-cyan-color has-text-color">Olay Ufku ve Schwarzschild Geometrisi</h3>
				<!-- /wp:heading -->
				<!-- wp:paragraph -->
				<p>Bir karadeliğin kütleçekiminden kaçış hızının ışık hızına ($c$) eşit olduğu sınıra <strong>Olay Ufku (Event Horizon)</strong> denir. Bu sınırın ötesinden evrene hiçbir bilgi veya foton kaçamaz. Dönen karadeliklerde (Kerr metriği) olay ufkunu çevreleyen enerji kazanım bölgesi 'Ergosfer' olarak adlandırılır.</p>
				<!-- /wp:paragraph -->

				<!-- wp:paragraph {"textColor":"star-white"} -->
				<p class="has-star-white-color has-text-color" style="font-weight:600; margin-top:1.25rem;">Doğrulanmış Karadelik Karşılaştırma Verileri:</p>
				<!-- /wp:paragraph -->

				<table class="science-data-table">
					<tr><td>Parametre / Cisim</td><td>M87* (Virgo A)</td><td>Sagittarius A* (Samanyolu)</td><td>Cygnus X-1 (Kuğu)</td></tr>
					<tr><td>Karadelik Sınıfı:</td><td>Süperkütleli</td><td>Süperkütleli</td><td>Yıldızsal Kütleli</td></tr>
					<tr><td>Kütle:</td><td>6,5 Milyar Güneş</td><td>4,15 Milyon Güneş</td><td>21,2 Güneş Kütlesi</td></tr>
					<tr><td>Dünya'ya Uzaklık:</td><td>55 Milyon Işık Yılı</td><td>26.700 Işık Yılı</td><td>7.200 Işık Yılı</td></tr>
					<tr><td>Schwarzschild Çapı:</td><td>~38 Milyar km</td><td>~25,4 Milyon km</td><td>~125 km</td></tr>
					<tr><td>Keşif / Gözlem:</td><td>EHT (2019)</td><td>EHT (2022)</td><td>Uhuru X-Ray (1971)</td></tr>
				</table>
			</div>
			<!-- /wp:group -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->
