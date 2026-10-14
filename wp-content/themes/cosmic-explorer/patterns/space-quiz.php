<?php
/**
 * Title: Günün Kozmik Bulmacası
 * Slug: cosmic-explorer/space-quiz
 * Categories: cosmic-interactive
 * Viewport Width: 1200
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"space-black","style":{"spacing":{"padding":{"top":"var:preset|spacing|80","bottom":"var:preset|spacing|80"}}},"layout":{"type":"constrained"}} -->
<div id="bilgi-testi" class="wp-block-group alignfull has-space-black-background-color has-background" style="padding-top:var(--wp--preset--spacing--80);padding-bottom:var(--wp--preset--spacing--80)">
	<!-- wp:paragraph {"align":"center"} -->
	<p class="has-text-align-center"><span class="science-badge science-badge--purple">GÜNLÜK ASTROFİZİK VE GÖZLEM TESTİ</span></p>
	<!-- /wp:paragraph -->

	<!-- wp:heading {"textAlign":"center","fontSize":"x-large"} -->
	<h2 class="wp-block-heading has-text-align-center has-x-large-font-size" style="letter-spacing:-0.02em;">Günün Astronomi &amp; Uzay Bilimi Görevi</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","textColor":"dust-gray"} -->
	<p class="has-text-align-center has-dust-gray-color has-text-color">Gözlemsel telemetri ipuçlarını analiz edin, hedef gökcimini saptayın ve bilimsel veri arşivinizi genişletin.</p>
	<!-- /wp:paragraph -->

	<!-- wp:spacer {"height":"30px"} -->
	<div style="height:30px" aria-hidden="true" class="wp-block-spacer"></div>
	<!-- /wp:spacer -->

	<!-- Dynamic Daily Space Puzzle Container (Hydrated by cosmic-daily-puzzle.js, full server-side HTML fallback for SEO/crawlers) -->
	<div class="daily-puzzle-mount" id="dailyPuzzleContainer">
		<div class="cosmic-puzzle-shell cosmic-glass-card">
			<div class="puzzle-telemetry-bar">
				<div class="puzzle-badge-group">
					<span class="science-badge science-badge--cyan">GÖZLEM GÖREVİ #101</span>
					<span class="puzzle-date-tag"><?php echo esc_html( date_i18n( 'j F Y' ) ); ?> &bull; TÜBİTAK &amp; NASA ARŞİVİ</span>
				</div>
				<div class="puzzle-stats-hud">
					<span class="puzzle-stat-pill" title="Ardı ardına çözülen gün sayısı"><strong>[SERİ: 1 GÜN]</strong></span>
					<span class="puzzle-stat-pill" title="Astrofizik Puanı"><strong>[SKOR: 50 XP]</strong></span>
					<span class="science-badge science-badge--cyan">ARAŞTIRMACI DÜZEYİ</span>
				</div>
			</div>
			<div class="puzzle-gameplay-stage">
				<div class="puzzle-mission-header">
					<span class="puzzle-category-tag">Gezegen Jeolojisi</span>
					<h3 class="puzzle-mission-title">Hedef Teşhisi: Gökcismini Belirleyin</h3>
					<p class="puzzle-mission-desc">Derin uzay veya Güneş Sistemi arşivinden seçilen bir gökcismi analiz edilmektedir. İpuçlarını inceleyerek hedefi teşhis edin.</p>
				</div>
				<div class="puzzle-clues-wrapper">
					<div class="puzzle-clue-card is-unlocked">
						<div class="clue-card-header">
							<span class="clue-number">İPUCU 1</span>
							<span class="clue-status-tag">AÇILDI</span>
						</div>
						<p class="clue-text">Güneş Sistemi’ndeki en devasa yanardağ olan Olympus Mons’a ve 4.000 km uzunluğundaki Valles Marineris kanyonuna ev sahipliği yaparım.</p>
					</div>
					<div class="puzzle-clue-card is-unlocked">
						<div class="clue-card-header">
							<span class="clue-number">İPUCU 2</span>
							<span class="clue-status-tag">AÇILDI</span>
						</div>
						<p class="clue-text">Yüzeyimdeki zengin demir oksit (pas) tozları nedeniyle gece gökyüzünde parlak turuncu-kızıl bir fener gibi görünürüm.</p>
					</div>
					<div class="puzzle-clue-card is-unlocked">
						<div class="clue-card-header">
							<span class="clue-number">İPUCU 3</span>
							<span class="clue-status-tag">AÇILDI</span>
						</div>
						<p class="clue-text">Perseverance ve Curiosity gibi robotik gezginler antik nehir deltalarımda geçmiş mikrobiyal yaşam izlerini arıyor.</p>
					</div>
				</div>
				<div class="puzzle-guess-section">
					<h4 class="puzzle-guess-title">GÖREV TEŞHİSİ: Hedef Gökcismini Seçin:</h4>
					<div class="puzzle-options-grid">
						<button class="puzzle-option-btn"><span class="opt-letter">A</span> Mars</button>
						<button class="puzzle-option-btn"><span class="opt-letter">B</span> Venüs</button>
						<button class="puzzle-option-btn"><span class="opt-letter">C</span> Merkür</button>
						<button class="puzzle-option-btn"><span class="opt-letter">D</span> Jüpiter</button>
					</div>
				</div>
				<div style="margin-top:1.5rem; padding:1rem 1.25rem; background:rgba(0,240,255,0.06); border:1px solid rgba(0,240,255,0.2); border-radius:10px;">
					<p style="margin:0; font-size:0.9rem; color:#cbd5e1;"><strong style="color:var(--wp--preset--color--starlight-cyan);">[BİLİMSEL NOT // JEOLOJİK TELEMETRİ]:</strong> Mars’ın atmosferi %95 karbondioksitten oluşur ve atmosfer basıncı Dünya’nınkinin yüzde birinden azdır. Phobos ve Deimos uyduları kütleçekimsel olarak kilitlenmiştir ve gelgit etkisiyle Mars'a doğru yaklaşmaktadır.</p>
				</div>
			</div>
		</div>
	</div>
</div>
<!-- /wp:group -->
