<?php
/**
 * Cosmic Explorer functions and definitions
 *
 * @package Cosmic_Explorer
 */

if ( ! function_exists( 'cosmic_explorer_setup' ) ) :
	function cosmic_explorer_setup() {
		// Add support for block styles.
		add_theme_support( 'wp-block-styles' );

		// Enqueue editor styles.
		add_editor_style( 'editor-style.css' );
	}
endif;
add_action( 'after_setup_theme', 'cosmic_explorer_setup' );

/**
 * Apple iOS & WebKit Optimization Meta Tags
 */
function cosmic_explorer_apple_ios_meta() {
	echo '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />' . "\n";
	echo '<meta name="apple-mobile-web-app-capable" content="yes" />' . "\n";
	echo '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />' . "\n";
	echo '<meta name="apple-mobile-web-app-title" content="Cosmic Explorer" />' . "\n";
	echo '<meta name="format-detection" content="telephone=no" />' . "\n";
	echo '<meta name="theme-color" content="#070b14" />' . "\n";
}
add_action( 'wp_head', 'cosmic_explorer_apple_ios_meta', 1 );

/**
 * Enqueue scripts and styles.
 */
function cosmic_explorer_scripts() {
	// Register Interactivity API script module
	wp_register_script_module(
		'cosmic-explorer-interactive',
		get_template_directory_uri() . '/assets/js/cosmic-interactivity.js',
		array( '@wordpress/interactivity' ),
		wp_get_theme()->get( 'Version' )
	);
	
	// Enqueue Interactivity API script module
	wp_enqueue_script_module( 'cosmic-explorer-interactive' );

	// Enqueue custom CSS
	wp_enqueue_style( 
		'cosmic-effects', 
		get_template_directory_uri() . '/assets/css/cosmic-effects.css', 
		array(), 
		filemtime( get_template_directory() . '/assets/css/cosmic-effects.css' )
	);

	// Enqueue NASA APOD interactive archive script
	wp_enqueue_script(
		'cosmic-apod',
		get_template_directory_uri() . '/assets/js/cosmic-apod.js',
		array(),
		wp_get_theme()->get( 'Version' ),
		true
	);

	// Enqueue Daily Space Puzzle & Challenge script
	wp_enqueue_script(
		'cosmic-daily-puzzle',
		get_template_directory_uri() . '/assets/js/cosmic-daily-puzzle.js',
		array(),
		wp_get_theme()->get( 'Version' ),
		true
	);

	// Enqueue Fullscreen Hardware-Accelerated WebGL Deep Space & Nebula Engine
	wp_enqueue_script(
		'cosmic-webgl-bg',
		get_template_directory_uri() . '/assets/js/cosmic-webgl-bg.js',
		array(),
		filemtime( get_template_directory() . '/assets/js/cosmic-webgl-bg.js' ),
		true
	);

	// Enqueue Solar System Navigation Menu Engine (Güneş Sistemi Navigasyon Portalı)
	wp_enqueue_script(
		'solar-menu-engine',
		get_template_directory_uri() . '/assets/js/solar-menu-engine.js',
		array(),
		filemtime( get_template_directory() . '/assets/js/solar-menu-engine.js' ),
		true
	);

	// Enqueue Interactive Scroll-Jacked Milestone Timeline Script
	wp_enqueue_script(
		'cosmic-milestone-timeline',
		get_template_directory_uri() . '/assets/js/milestone-timeline.js',
		array(),
		filemtime( get_template_directory() . '/assets/js/milestone-timeline.js' ),
		true
	);

	// Enqueue Kerr Black Hole 3D Relativistic Simulation Engine
	wp_enqueue_script(
		'cosmic-kerr-sim',
		get_template_directory_uri() . '/assets/js/cosmic-kerr-sim.js',
		array(),
		filemtime( get_template_directory() . '/assets/js/cosmic-kerr-sim.js' ),
		true
	);
}
add_action( 'wp_enqueue_scripts', 'cosmic_explorer_scripts' );

/**
 * Register block pattern categories.
 */
function cosmic_explorer_pattern_categories() {
	register_block_pattern_category(
		'cosmic-heroes',
		array( 'label' => __( 'Uzay Hero', 'cosmic-explorer' ) )
	);
	register_block_pattern_category(
		'cosmic-features',
		array( 'label' => __( 'Uzay Özellikler', 'cosmic-explorer' ) )
	);
	register_block_pattern_category(
		'cosmic-interactive',
		array( 'label' => __( 'İnteraktif Uzay', 'cosmic-explorer' ) )
	);
}
add_action( 'init', 'cosmic_explorer_pattern_categories' );

/**
 * NASA APOD Live API Data Service (Last 7 Days)
 *
 * Dynamically fetches the latest 7 days of verified NASA APOD photography
 * from official science.nasa.gov APOD endpoint, caches via WordPress transients,
 * and formats all dates and descriptions into Turkish.
 */
function cosmic_get_nasa_apod_data() {
	$transient_key = 'cosmic_nasa_apod_7days';
	$cached        = get_transient( $transient_key );
	$today         = gmdate( 'Y-m-d' );

	if ( false !== $cached && is_array( $cached ) && ! empty( $cached ) ) {
		if ( isset( $cached[0]['date'] ) && $cached[0]['date'] === $today ) {
			return $cached;
		}
	}

	$api_url  = 'https://science.nasa.gov/wp-json/wp/v2/apod-basic?per_page=7';
	$response = wp_remote_get( $api_url, array(
		'timeout'    => 8,
		'user-agent' => 'CosmicExplorer/1.0 (WordPress Block Theme)',
	) );

	$month_names = array(
		'01' => 'Ocak', '02' => 'Şubat', '03' => 'Mart',
		'04' => 'Nisan', '05' => 'Mayıs', '06' => 'Haziran',
		'07' => 'Temmuz', '08' => 'Ağustos', '09' => 'Eylül',
		'10' => 'Ekim', '11' => 'Kasım', '12' => 'Aralık',
	);

	if ( ! is_wp_error( $response ) && 200 === (int) wp_remote_retrieve_response_code( $response ) ) {
		$body  = wp_remote_retrieve_body( $response );
		$items = json_decode( $body, true );

		if ( is_array( $items ) && ! empty( $items ) ) {
			$formatted = array();
			foreach ( $items as $i => $item ) {
				$date_raw = $item['date'] ?? '';
				$d_parts  = explode( '-', $date_raw );
				$day_str  = $d_parts[2] ?? '';
				$m_str    = $month_names[ $d_parts[1] ?? '' ] ?? '';
				$y_str    = $d_parts[0] ?? '';
				$tr_date  = trim( "$day_str $m_str $y_str" );

				if ( 0 === $i ) {
					$status = 'BUGÜN';
				} elseif ( 1 === $i ) {
					$status = 'DÜN';
				} else {
					$status = $i . ' GÜN ÖNCE';
				}

				$img_url = ! empty( $item['hdurl'] ) ? $item['hdurl'] : ( ! empty( $item['url'] ) ? $item['url'] : '' );

				// Clean explanation text
				$exp       = strip_tags( $item['explanation'] ?? '' );
				$exp       = preg_replace( '/^\s*Explanation:\s*/i', '', $exp );
				$split_exp = preg_split( '/Tomorrow(\'s|s)?\s*(picture|image):/i', $exp );
				$clean_exp = trim( $split_exp[0] ?? $exp );

				// Clean credit
				$credit = strip_tags( $item['credit'] ?? ( $item['copyright'] ?? 'NASA Goddard Space Flight Center' ) );
				$credit = trim( preg_replace( '/\s+/', ' ', $credit ) );
				if ( empty( $credit ) ) {
					$credit = 'NASA / Uluslararası Gözlemevleri';
				}

				$formatted[] = array(
					'day'           => $i,
					'status'        => $status,
					'date'          => $date_raw,
					'dateStr'       => $tr_date,
					'title'         => $item['title'] ?? 'Kozmik Gözlem',
					'image'         => $img_url,
					'tag'           => 'Doğrulanmış NASA APOD Yayını',
					'credit'        => $credit,
					'instrument'    => 'NASA / Uluslararası Gözlemevleri',
					'distance'      => 'Astrofiziksel Koordinat Arşivi',
					'classType'     => 'Kozmolojik Fenomen & Gözlem',
					'archiveStatus' => 'Canlı NASA APOD Servisi (' . $date_raw . ')',
					'desc'          => $clean_exp,
					'mediaType'     => $item['media_type'] ?? 'image',
				);
			}

			if ( ! empty( $formatted ) ) {
				set_transient( $transient_key, $formatted, 1800 ); // Cache 30 minutes
				return $formatted;
			}
		}
	}

	if ( false !== $cached && is_array( $cached ) && ! empty( $cached ) ) {
		return $cached;
	}

	return cosmic_get_nasa_apod_fallback();
}

/**
 * Dynamic fallback with relative dates if NASA API is momentarily unreachable
 */
function cosmic_get_nasa_apod_fallback() {
	$theme_uri   = get_template_directory_uri();
	$month_names = array(
		'01' => 'Ocak', '02' => 'Şubat', '03' => 'Mart',
		'04' => 'Nisan', '05' => 'Mayıs', '06' => 'Haziran',
		'07' => 'Temmuz', '08' => 'Ağustos', '09' => 'Eylül',
		'10' => 'Ekim', '11' => 'Kasım', '12' => 'Aralık',
	);

	$static_topics = array(
		array(
			'title'      => 'NGC 3324: Karina Nebulası Kozmik Uçurumlar',
			'image'      => $theme_uri . '/assets/images/hero-webb.jpg',
			'tag'        => 'Yıldız Doğumevi • Yakın Kızılötesi (NIRCam)',
			'credit'     => 'NASA, ESA, CSA, STScI (JWST NIRCam)',
			'instrument' => 'JWST NIRCam (0.6 - 5.0 mikron)',
			'distance'   => '7.600 Işık Yılı (Karina Kolu)',
			'classType'  => 'H II Emisyon Bulutu & Moleküler Sırt',
			'desc'       => "James Webb Uzay Teleskobu'nun NIRCam enstrümanıyla kaydedilen bu görüntü, Karina Nebulası'ndaki genç yıldızların oluşturduğu morötesi rüzgarların oyduğu gaz ve toz kulelerini gözler önüne seriyor.",
		),
		array(
			'title'      => 'Messier 87 Karadeliği ve Polarize Manyetik Alanlar',
			'image'      => $theme_uri . '/assets/images/blackhole.jpg',
			'tag'        => 'Aşırı Kütleçekim • 1,3 mm VLBI Ağı',
			'credit'     => 'Event Horizon Telescope (EHT) Konsorsiyumu',
			'instrument' => 'EHT Küresel İnterferometri',
			'distance'   => '55 Milyon Işık Yılı (Başak Kümesi)',
			'classType'  => 'Süperkütleli Karadelik (6,5 Milyar M☉)',
			'desc'       => "Dünya çapındaki radyo teleskopların oluşturduğu EHT ağıyla kaydedilen Messier 87 galaksisinin kalbindeki süperkütleli karadeliğin olay ufku silueti ve foton küresi.",
		),
		array(
			'title'      => 'Yengeç Nebulası (M1): Süpernova Kalıntısı ve Pulsar',
			'image'      => $theme_uri . '/assets/images/supernova.jpg',
			'tag'        => 'Tip II Süpernova • Çoklu Dalga Boyu',
			'credit'     => 'NASA, ESA, J. Hester (Hubble & Chandra)',
			'instrument' => 'Hubble WFC3 & Chandra X-Ray Gözlemevi',
			'distance'   => '6.500 Işık Yılı (Boğa Takımyıldızı)',
			'classType'  => 'Süpernova Kalıntısı & Nötron Yıldızı (Pulsar)',
			'desc'       => "MS 1054 yılında gözlemlenen tarihi süpernovanın genişleyen gaz kalıntısı ve kalbinde saniyede 30 kez dönen yüksek manyetik enerjili Yengeç Pulsarı.",
		),
		array(
			'title'      => 'Yaratılış Sütunları: Kartal Nebulası Moleküler Kuleleri',
			'image'      => $theme_uri . '/assets/images/pillars.jpg',
			'tag'        => 'Moleküler Gaz Bulutu • Protostellar Çöküş',
			'credit'     => 'NASA, ESA, CSA, STScI (JWST NIRCam)',
			'instrument' => 'JWST NIRCam & MIRI Kompoziti',
			'distance'   => '6.500 Işık Yılı (Yılan Takımyıldızı)',
			'classType'  => 'Soğuk Moleküler Hidrojen & Toz Sütunları',
			'desc'       => "Kartal Nebulası'nın kalbinde yer alan, 4-5 ışık yılı uzunluğundaki gaz ve toz sütunlarında yeni parlayan taze bebek yıldızlar (protostars).",
		),
		array(
			'title'      => 'Jüpiter\'in Fırtınalı Atmosferi ve Büyük Kırmızı Leke',
			'image'      => $theme_uri . '/assets/images/jupiter.jpg',
			'tag'        => 'Gaz Devi Dinamiği • JunoCam Telemetrisi',
			'credit'     => 'NASA / JPL-Caltech / SwRI / MSSS (Juno Misyonu)',
			'instrument' => 'JunoCam Kutupsal Görüntüleyici',
			'distance'   => '778 Milyon km (5.2 AU)',
			'classType'  => 'Antisiklonik Fırtına & Gaz Devi Atmosferi',
			'desc'       => "NASA Juno uzay aracının kutupsal yörüngesinden kaydedilen Büyük Kırmızı Leke antisiklonu ve karmaşık atmosferik türbülans girdapları.",
		),
		array(
			'title'      => 'Mars: Jezero Krateri ve Antik Nehir Deltası',
			'image'      => $theme_uri . '/assets/images/mars.jpg',
			'tag'        => 'Gezegen Jeolojisi • Biyo-imza Taraması',
			'credit'     => 'NASA / JPL-Caltech / USGS (MRO & Perseverance)',
			'instrument' => 'HiRISE & Mastcam-Z Yüksek Çözünürlüklü Kamera',
			'distance'   => '228 Milyon km (1.52 AU)',
			'classType'  => 'Paleo-Göl Tortul Havzası & Çökel Katmanları',
			'desc'       => "Antik bir nehir deltasının tortul katmanlarını koruyan Jezero Krateri'nde geçmiş yaşam izlerini araştıran Perseverance gezgininin gözlem alanı.",
		),
		array(
			'title'      => 'Güneş Dinamikleri: Koronal Kütle Atımı ve Plazma Döngüleri',
			'image'      => $theme_uri . '/assets/images/sun.jpg',
			'tag'        => 'Güneş Fiziği • Aşırı Morötesi (171 & 304 Å)',
			'credit'     => 'NASA / SDO AIA Spektrometresi',
			'instrument' => 'SDO Atmospheric Imaging Assembly (AIA)',
			'distance'   => '149,6 Milyon km (1.0 AU)',
			'classType'  => 'G2V Anakol Yıldızı • Koronal İlmek Püskürmesi',
			'desc'       => "Güneş manyetik alan çizgileri boyunca milyonlarca dereceye ısınan plazma ilmekleri ve uzay havasını şekillendiren koronal kütle atımları.",
		),
	);

	$fallback = array();
	for ( $i = 0; $i < 7; $i++ ) {
		$time_offset = strtotime( "-$i day" );
		$date_raw    = gmdate( 'Y-m-d', $time_offset );
		$day_val     = gmdate( 'd', $time_offset );
		$month_val   = gmdate( 'm', $time_offset );
		$year_val    = gmdate( 'Y', $time_offset );
		$tr_date     = $day_val . ' ' . ( $month_names[ $month_val ] ?? '' ) . ' ' . $year_val;

		if ( 0 === $i ) {
			$status = 'BUGÜN';
		} elseif ( 1 === $i ) {
			$status = 'DÜN';
		} else {
			$status = $i . ' GÜN ÖNCE';
		}

		$meta = $static_topics[ $i ];

		$fallback[] = array(
			'day'           => $i,
			'status'        => $status,
			'date'          => $date_raw,
			'dateStr'       => $tr_date,
			'title'         => $meta['title'],
			'image'         => $meta['image'],
			'tag'           => $meta['tag'],
			'credit'        => $meta['credit'],
			'instrument'    => $meta['instrument'],
			'distance'      => $meta['distance'],
			'classType'     => $meta['classType'],
			'archiveStatus' => 'NASA Veri Kataloğu (' . $date_raw . ')',
			'desc'          => $meta['desc'],
			'mediaType'     => 'image',
		);
	}

	return $fallback;
}

/**
 * Register REST API route for real-time NASA APOD fetching
 */
function cosmic_register_apod_rest_route() {
	register_rest_route( 'cosmic-explorer/v1', '/apod', array(
		'methods'             => 'GET',
		'callback'            => 'cosmic_get_nasa_apod_data',
		'permission_callback' => '__return_true',
	) );
}
add_action( 'rest_api_init', 'cosmic_register_apod_rest_route' );
