<?php
/**
 * Title: Güneş Sistemi Menü Laboratuvarı
 * Slug: cosmic-explorer/solar-menu-lab
 * Categories: cosmic-interactive
 * Description: Gezegenler, yapay uydular ve tarihi uzay araçlarının yörüngeleriyle çalışan deneysel interaktif navigasyon menüsü laboratuvarı.
 * Viewport Width: 1400
 */

$theme_uri = get_template_directory_uri();
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"2rem","bottom":"4rem","left":"1.5rem","right":"1.5rem"}}},"backgroundColor":"space-black","className":"solar-lab-wrapper","layout":{"type":"constrained","wideSize":"1400px"}} -->
<div class="wp-block-group alignfull solar-lab-wrapper has-space-black-background-color has-background" style="padding-top:2rem;padding-bottom:4rem;padding-left:1.5rem;padding-right:1.5rem">

	<!-- Top Header & Breadcrumb -->
	<div class="solar-lab-header">
		<div class="solar-lab-nav-row">
			<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="solar-back-link">
				<span class="solar-back-arrow">←</span>
				<span>Normal Siteye Dön</span>
			</a>
			<div class="solar-lab-badge">
				<span class="solar-badge-dot"></span>
				<span>Deneysel Navigasyon Laboratuvarı v1.0</span>
			</div>
		</div>

		<div class="solar-lab-titles">
			<h2 class="solar-lab-title glow-effect">Güneş Sistemi Navigasyon Portalı</h2>
			<p class="solar-lab-desc">
				Gezegenler ana sayfaları temsil ederken; onların yörüngesindeki <strong>tarihi uzay araçları, uydular ve teleskoplar (Apollo 11, ISS, James Webb, Curiosity, Voyager)</strong> önemli olay ve görevleri temsil eder. Bir gökcismine veya araca yaklaştığınızda detaylı telemetri kartı açılır.
			</p>
		</div>

		<!-- Interactive Filter & Simulation Toolbar -->
		<div class="solar-toolbar-dock">
			<div class="solar-filter-group" role="group" aria-label="Kozmik Filtreler">
				<button class="solar-filter-btn is-active" data-filter="all">Tümü</button>
				<button class="solar-filter-btn" data-filter="planets">Gezegenler</button>
				<button class="solar-filter-btn" data-filter="missions">Görevler &amp; Uydular</button>
				<button class="solar-filter-btn" data-filter="deepspace">Derin Uzay</button>
			</div>

			<div class="solar-sim-controls" role="group" aria-label="Simülasyon Kontrolleri">
				<button class="solar-ctrl-btn" id="solarPlayPause" title="Yörünge Hareketini Duraklat / Başlat">
					<span class="solar-ctrl-icon" id="solarPlayIcon">⏸️</span>
					<span class="solar-ctrl-text" id="solarPlayText">Duraklat</span>
				</button>
				<button class="solar-ctrl-btn" id="solarSpeedToggle" title="Simülasyon Yörünge Hız Katsayısı (1x)">
					<span class="solar-ctrl-icon">⚡</span>
					<span class="solar-ctrl-text" id="solarSpeedText">1.0x Hız</span>
				</button>
				<button class="solar-ctrl-btn" id="solarResetView" title="Görünümü Sıfırla">
					<span class="solar-ctrl-icon">🎯</span>
					<span class="solar-ctrl-text">Ortala</span>
				</button>
				<button class="solar-ctrl-btn solar-ctrl-btn--portal" id="solarSimulatePortal" title="Bu Sistemi Tam Ekran Açılır Menü Olarak Simüle Et">
					<span class="solar-ctrl-icon">🚀</span>
					<span class="solar-ctrl-text">Tam Ekran Menü Olarak Dene</span>
				</button>
			</div>
		</div>
	</div>

	<!-- Main Solar Interactive Stage -->
	<div class="solar-stage-container" id="solarStageContainer">
		<!-- Canvas Layer -->
		<canvas id="solarMenuCanvas" class="solar-menu-canvas" width="1400" height="850"></canvas>

		<!-- Live Telemetry HUD (Bottom Left) -->
		<div class="solar-hud-telemetry" id="solarHudTelemetry">
			<div class="solar-tele-row">
				<span class="solar-tele-label">SİSTEM:</span>
				<span class="solar-tele-val">GÜNEŞ (SOL) - KOZMİK NAVİGATÖR</span>
			</div>
			<div class="solar-tele-row">
				<span class="solar-tele-label">ODAK CİSİM:</span>
				<span class="solar-tele-val" id="solarFocusName">DÜNYA • 149,6 MİLYON KM</span>
			</div>
			<div class="solar-tele-row">
				<span class="solar-tele-label">HIZ / ORAN:</span>
				<span class="solar-tele-val" id="solarSimSpeed" title="Simülasyon Yörünge Hız Katsayısı">1.00 KEPLER BİRİMİ (1.0x)</span>
			</div>
		</div>

		<!-- Interactive Floating Holographic Popout Card (Hover HUD) -->
		<div class="solar-popout-card" id="solarPopoutCard" aria-hidden="true">
			<div class="solar-popout-glow"></div>
			<div class="solar-popout-header">
				<span class="solar-popout-badge" id="solarPopoutBadge">GEZEGEN</span>
				<span class="solar-popout-distance" id="solarPopoutDistance">149.6 MİLYON KM</span>
			</div>
			<div class="solar-popout-media">
				<img id="solarPopoutImg" src="<?php echo esc_url( $theme_uri . '/assets/images/earth.jpg' ); ?>" alt="Önizleme" />
				<div class="solar-popout-media-border"></div>
			</div>
			<div class="solar-popout-body">
				<h3 class="solar-popout-title" id="solarPopoutTitle">Dünya</h3>
				<span class="solar-popout-sub" id="solarPopoutSub">Mavi Gezegen &amp; Yaşam Beşiği</span>
				<p class="solar-popout-desc" id="solarPopoutDesc">
					Sıvı suya ve yaşama sahip tek bilinen gezegen. Yörüngesinde Ay, Uluslararası Uzay İstasyonu (ISS) ve James Webb teleskobu gibi insanlığın en büyük keşif fenerleri yer alır.
				</p>
			</div>
			<div class="solar-popout-footer">
				<a href="#" class="solar-popout-action" id="solarPopoutBtn">
					<span id="solarPopoutBtnText">Sayfayı Ziyaret Et</span>
					<span class="solar-popout-arrow">➔</span>
				</a>
			</div>
		</div>

		<!-- Canvas Interactive Hint (Initial Prompt) -->
		<div class="solar-canvas-hint" id="solarCanvasHint">
			<span class="solar-hint-icon">🔭</span>
			<span>İncelemek istediğiniz gezegenin veya uzay aracının (Apollo 11, ISS, JWST vb.) üzerine gelin ya da tıklayın</span>
		</div>
	</div>

	<!-- System Architecture Explanatory Cards (Student / User Information) -->
	<div class="solar-lab-info-grid">
		<div class="solar-info-card cosmic-glass-card">
			<div class="solar-info-icon">🪐</div>
			<h3 class="solar-info-title">Gezegenler = Ana Bölümler</h3>
			<p class="solar-info-p">
				Merkür'den Neptün'e 8 gezegen doğrudan sitenin temel astronomi sayfalarına bağlanır. Güneş'e olan gerçek astronomik mesafe sıralaması (Kepler elipsleri) korunmuştur.
			</p>
		</div>

		<div class="solar-info-card cosmic-glass-card">
			<div class="solar-info-icon">🛰️</div>
			<h3 class="solar-info-title">Uydular & Araçlar = Tarihi Olaylar</h3>
			<p class="solar-info-p">
				<strong>Apollo 11 (1969)</strong> ve <strong>ISS</strong> Dünya'nın yörüngesinde, <strong>James Webb (JWST)</strong> Lagrange L2 noktasında, <strong>Curiosity</strong> Mars'ta ve <strong>Voyager 1</strong> yıldızlararası sınırda yer alarak tarihteki büyük dönüm noktalarını temsil eder.
			</p>
		</div>

		<div class="solar-info-card cosmic-glass-card">
			<div class="solar-info-icon">🌌</div>
			<h3 class="solar-info-title">Güneş Dışı = Serbest Derin Uzay Köşeleri</h3>
			<p class="solar-info-p">
				Güneş Sistemi sınırının (Helyopoz) çok ötesinde; <strong>Karadelik Tekilliği (M87*)</strong>, <strong>Süpernova Bulutsusu (Yengeç)</strong>, <strong>Andromeda Galaksisi</strong> ve <strong>Karanlık Madde Ağı</strong> Güneş'e bağlı olmayan, evrenin uzak köşelerinde parıldayan bağımsız derin uzay sektörleri olarak konumlandırılmıştır.
			</p>
		</div>
	</div>

</div>
<!-- /wp:group -->
