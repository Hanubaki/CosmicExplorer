/**
 * Cosmic Explorer - High-Performance WebGL Deep Space & Volumetric Nebula Engine
 * 
 * Provides a 60/120 FPS hardware-accelerated deep-space canvas across all pages:
 * - 1,400+ true 3D point stars with brightness scintillation & spectral types.
 * - Dynamic volumetric nebula dust cloud fragment shader (FBM noise).
 * - Clean, natural starfield distribution without artificial gravitational distortions.
 * - Smooth mouse camera tilt & scroll parallax.
 * - Power-saving auto-pause via document.hidden and requestAnimationFrame.
 */

(function () {
	'use strict';

	var canvas = null;
	var gl = null;
	var isRunning = false;
	var animId = null;

	// Camera & Interaction State
	var mouseX = 0;
	var mouseY = 0;
	var targetMouseX = 0;
	var targetMouseY = 0;
	var scrollY = 0;
	var targetScrollY = 0;
	var time = 0;
	var lastFrameTime = performance.now();

	// Nebula Background Program
	var nebulaProgram = null;
	var nebulaQuadBuffer = null;
	var uNebulaRes = null;
	var uNebulaTime = null;
	var uNebulaCam = null;

	// Starfield Program
	var starProgram = null;
	var starBuffer = null;
	var uStarRes = null;
	var uStarTime = null;
	var uStarCam = null;
	var uStarScroll = null;
	var STAR_COUNT = 1400;

	// --- 1. Shader Sources ---

	// Nebula Quad Shaders
	var nebulaVsSource = [
		'attribute vec2 a_pos;',
		'varying vec2 v_uv;',
		'void main() {',
		'    v_uv = (a_pos + 1.0) * 0.5;',
		'    gl_Position = vec4(a_pos, 0.0, 1.0);',
		'}'
	].join('\n');

	var nebulaFsSource = [
		'precision mediump float;',
		'varying vec2 v_uv;',
		'uniform vec2 u_res;',
		'uniform float u_time;',
		'uniform vec2 u_cam;',
		'',
		'// Fast pseudo-noise and FBM for volumetric cosmic dust clouds',
		'float hash(vec2 p) {',
		'    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);',
		'}',
		'',
		'float noise(vec2 p) {',
		'    vec2 i = floor(p);',
		'    vec2 f = fract(p);',
		'    vec2 u = f * f * (3.0 - 2.0 * f);',
		'    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),',
		'               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);',
		'}',
		'',
		'float fbm(vec2 p) {',
		'    float val = 0.0;',
		'    float amp = 0.5;',
		'    for (int i = 0; i < 4; i++) {',
		'        val += amp * noise(p);',
		'        p = p * 2.02 + vec2(1.4, 0.7);',
		'        amp *= 0.48;',
		'    }',
		'    return val;',
		'}',
		'',
		'void main() {',
		'    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / min(u_res.x, u_res.y);',
		'    vec2 cam = u_cam * 0.12;',
		'    vec2 p = uv * 1.8 + cam;',
		'    float t = u_time * 0.022;',
		'',
		'    // Natural cosmic drift & swirling nebula dust filaments',
		'    float q1 = fbm(p + vec2(t * 0.4, -t * 0.2));',
		'    float q2 = fbm(p + vec2(-t * 0.3, t * 0.5) + vec2(q1 * 1.2));',
		'    float cloud = fbm(p + vec2(q2 * 1.5));',
		'',
		'    // Deep Cosmic Color Palette',
		'    vec3 deepVoid = vec3(0.024, 0.035, 0.065); // #060911',
		'    vec3 cosmicPurple = vec3(0.12, 0.045, 0.24); // #1f0b3d',
		'    vec3 nebulaViolet = vec3(0.42, 0.12, 0.65); // #6b1fa6',
		'    vec3 starlightCyan = vec3(0.0, 0.72, 0.88); // #00b8e0',
		'',
		'    float cloudEdge = smoothstep(0.32, 0.85, cloud);',
		'    vec3 col = mix(deepVoid, cosmicPurple, cloud * 0.9);',
		'    col = mix(col, nebulaViolet, cloudEdge * 0.65);',
		'    col = mix(col, starlightCyan, smoothstep(0.68, 0.95, cloud) * 0.35);',
		'',
		'    // Vignette towards edges to keep readability high',
		'    float vignette = 1.0 - smoothstep(0.5, 1.4, length(uv));',
		'    col *= (0.7 + 0.3 * vignette);',
		'',
		'    gl_FragColor = vec4(col, 1.0);',
		'}'
	].join('\n');

	// 3D Point Starfield Shaders
	var starVsSource = [
		'attribute vec3 a_star_pos; // x, y, z in [-1..1]',
		'attribute vec4 a_star_style; // size, spectral_type, twinkle_speed, phase',
		'varying vec4 v_star_color;',
		'varying float v_twinkle;',
		'uniform vec2 u_res;',
		'uniform float u_time;',
		'uniform vec2 u_cam;',
		'uniform float u_scroll;',
		'',
		'void main() {',
		'    vec3 pos = a_star_pos;',
		'',
		'    // Depth Parallax with Scroll & Camera Tilt',
		'    float depth = (pos.z + 1.0) * 0.5 + 0.15;',
		'    pos.x += u_cam.x * (0.08 / depth);',
		'    pos.y += (u_cam.y * 0.08 - u_scroll * 0.25) / depth;',
		'',
		'    // Seamless vertical coordinate loop',
		'    pos.y = mod(pos.y + 1.0, 2.0) - 1.0;',
		'    pos.x = mod(pos.x + 1.0, 2.0) - 1.0;',
		'',
		'    gl_Position = vec4(pos.xy, 0.0, 1.0);',
		'',
		'    // Point Size with Depth Perspective',
		'    float baseSize = a_star_style.x;',
		'    gl_PointSize = baseSize * (1.2 / depth) * (min(u_res.x, u_res.y) / 800.0);',
		'',
		'    // Twinkle modulation',
		'    float twSpeed = a_star_style.z;',
		'    float twPhase = a_star_style.w;',
		'    float twinkle = 0.55 + 0.45 * sin(u_time * twSpeed + twPhase);',
		'    v_twinkle = twinkle;',
		'',
		'    // Star Spectral Colors (O: Blue-White, A: Pure White, G: Solar Gold, M: Warm Red)',
		'    float spec = a_star_style.y;',
		'    vec3 color = vec3(1.0);',
		'    if (spec < 0.25) {',
		'        color = vec3(0.75, 0.90, 1.0); // O/B Hot Cyan-White',
		'    } else if (spec < 0.65) {',
		'        color = vec3(0.98, 0.98, 1.0); // A/F Brilliant White',
		'    } else if (spec < 0.88) {',
		'        color = vec3(1.0, 0.85, 0.45); // G Solar Gold',
		'    } else {',
		'        color = vec3(1.0, 0.55, 0.35); // M Warm Giant',
		'    }',
		'',
		'    v_star_color = vec4(color, twinkle);',
		'}'
	].join('\n');

	var starFsSource = [
		'precision mediump float;',
		'varying vec4 v_star_color;',
		'varying float v_twinkle;',
		'',
		'void main() {',
		'    // Soft circular point sprite with Gaussian falloff',
		'    vec2 coord = gl_PointCoord - vec2(0.5);',
		'    float dist = length(coord);',
		'    if (dist > 0.5) discard;',
		'',
		'    float core = exp(-dist * dist * 14.0);',
		'    float halo = exp(-dist * dist * 3.5) * 0.4;',
		'    float alpha = (core + halo) * v_star_color.a;',
		'',
		'    gl_FragColor = vec4(v_star_color.rgb, alpha);',
		'}'
	].join('\n');

	// --- 2. Shader Compilation Helpers ---

	function createShader(glCtx, type, source) {
		var s = glCtx.createShader(type);
		glCtx.shaderSource(s, source);
		glCtx.compileShader(s);
		if (!glCtx.getShaderParameter(s, glCtx.COMPILE_STATUS)) {
			console.warn('WebGL shader compile error:', glCtx.getShaderInfoLog(s));
			glCtx.deleteShader(s);
			return null;
		}
		return s;
	}

	function createProgram(glCtx, vsSrc, fsSrc) {
		var vs = createShader(glCtx, glCtx.VERTEX_SHADER, vsSrc);
		var fs = createShader(glCtx, glCtx.FRAGMENT_SHADER, fsSrc);
		if (!vs || !fs) return null;

		var prog = glCtx.createProgram();
		glCtx.attachShader(prog, vs);
		glCtx.attachShader(prog, fs);
		glCtx.linkProgram(prog);
		if (!glCtx.getProgramParameter(prog, glCtx.LINK_STATUS)) {
			console.warn('WebGL program link error:', glCtx.getProgramInfoLog(prog));
			glCtx.deleteProgram(prog);
			return null;
		}
		return prog;
	}

	// --- 3. Star Data Generation ---

	function initStarBuffer() {
		var starData = new Float32Array(STAR_COUNT * 7); // [x, y, z, size, spec, speed, phase]
		for (var i = 0; i < STAR_COUNT; i++) {
			var base = i * 7;
			// 3D coordinates in [-1 .. 1]
			starData[base + 0] = (Math.random() * 2.0 - 1.0);
			starData[base + 1] = (Math.random() * 2.0 - 1.0);
			starData[base + 2] = (Math.random() * 2.0 - 1.0);
			// Point size: small background stars (1.0 - 2.8px), few bright beacons (3.5 - 5.0px)
			var isMajor = Math.random() < 0.08;
			starData[base + 3] = isMajor ? (3.5 + Math.random() * 2.5) : (1.0 + Math.random() * 1.8);
			// Spectral type [0..1]
			starData[base + 4] = Math.random();
			// Twinkle speed (rad/s)
			starData[base + 5] = 1.2 + Math.random() * 3.5;
			// Twinkle phase offset
			starData[base + 6] = Math.random() * Math.PI * 2.0;
		}

		starBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, starBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, starData, gl.STATIC_DRAW);
	}

	function initNebulaQuad() {
		var quadData = new Float32Array([
			-1.0, -1.0,
			 1.0, -1.0,
			-1.0,  1.0,
			-1.0,  1.0,
			 1.0, -1.0,
			 1.0,  1.0
		]);
		nebulaQuadBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, nebulaQuadBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, quadData, gl.STATIC_DRAW);
	}

	// --- 4. Canvas Resize & Initialization ---

	function resize() {
		if (!canvas || !gl) return;
		var dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap at 1.5 for maximum GPU efficiency
		var w = window.innerWidth;
		var h = window.innerHeight;
		if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			gl.viewport(0, 0, canvas.width, canvas.height);
		}
	}

	// --- 5. Main Render Loop (60/120 FPS Composited) ---

	function render(now) {
		if (!isRunning) return;

		var delta = (now - lastFrameTime) * 0.001;
		lastFrameTime = now;
		if (delta > 0.1) delta = 0.1; // Clamp on frame drops/tabs
		time += delta;

		// Smooth Inertia Interpolation for Camera & Scroll (60-120Hz Lerp)
		mouseX += (targetMouseX - mouseX) * 0.06;
		mouseY += (targetMouseY - mouseY) * 0.06;
		scrollY += (targetScrollY - scrollY) * 0.08;

		gl.clearColor(0.015, 0.02, 0.04, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		// Render Pass 1: Volumetric Nebula Cloud Quad
		if (nebulaProgram && nebulaQuadBuffer) {
			gl.useProgram(nebulaProgram);
			gl.bindBuffer(gl.ARRAY_BUFFER, nebulaQuadBuffer);
			var aPosLoc = gl.getAttribLocation(nebulaProgram, 'a_pos');
			gl.enableVertexAttribArray(aPosLoc);
			gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

			gl.uniform2f(uNebulaRes, canvas.width, canvas.height);
			gl.uniform1f(uNebulaTime, time);
			gl.uniform2f(uNebulaCam, mouseX, mouseY);

			gl.disable(gl.BLEND);
			gl.drawArrays(gl.TRIANGLES, 0, 6);
		}

		// Render Pass 2: Additive 3D Point Starfield
		if (starProgram && starBuffer) {
			gl.useProgram(starProgram);
			gl.bindBuffer(gl.ARRAY_BUFFER, starBuffer);

			var aStarPosLoc = gl.getAttribLocation(starProgram, 'a_star_pos');
			var aStarStyleLoc = gl.getAttribLocation(starProgram, 'a_star_style');

			gl.enableVertexAttribArray(aStarPosLoc);
			gl.vertexAttribPointer(aStarPosLoc, 3, gl.FLOAT, false, 28, 0);

			gl.enableVertexAttribArray(aStarStyleLoc);
			gl.vertexAttribPointer(aStarStyleLoc, 4, gl.FLOAT, false, 28, 12);

			gl.uniform2f(uStarRes, canvas.width, canvas.height);
			gl.uniform1f(uStarTime, time);
			gl.uniform2f(uStarCam, mouseX, mouseY);
			gl.uniform1f(uStarScroll, scrollY * 0.001);

			// Additive Blending for Radiant Star Light
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
			gl.drawArrays(gl.POINTS, 0, STAR_COUNT);
		}

		animId = requestAnimationFrame(render);
	}

	// --- 6. Lifecycle & Event Management ---

	function start() {
		if (isRunning) return;
		isRunning = true;
		lastFrameTime = performance.now();
		animId = requestAnimationFrame(render);
	}

	function stop() {
		isRunning = false;
		if (animId) {
			cancelAnimationFrame(animId);
			animId = null;
		}
	}

	function init() {
		canvas = document.getElementById('cosmicWebglBg');
		if (!canvas) {
			canvas = document.createElement('canvas');
			canvas.id = 'cosmicWebglBg';
			canvas.className = 'cosmic-webgl-bg';
			canvas.setAttribute('aria-hidden', 'true');
			document.body.prepend(canvas);
		}

		var options = { alpha: false, antialias: false, depth: false, powerPreference: 'high-performance' };
		gl = canvas.getContext('webgl', options) || canvas.getContext('experimental-webgl', options);
		if (!gl) {
			console.info('Cosmic Explorer: WebGL not available, falling back to CSS galaxy gradient.');
			return;
		}

		nebulaProgram = createProgram(gl, nebulaVsSource, nebulaFsSource);
		if (nebulaProgram) {
			uNebulaRes = gl.getUniformLocation(nebulaProgram, 'u_res');
			uNebulaTime = gl.getUniformLocation(nebulaProgram, 'u_time');
			uNebulaCam = gl.getUniformLocation(nebulaProgram, 'u_cam');
			initNebulaQuad();
		}

		starProgram = createProgram(gl, starVsSource, starFsSource);
		if (starProgram) {
			uStarRes = gl.getUniformLocation(starProgram, 'u_res');
			uStarTime = gl.getUniformLocation(starProgram, 'u_time');
			uStarCam = gl.getUniformLocation(starProgram, 'u_cam');
			uStarScroll = gl.getUniformLocation(starProgram, 'u_scroll');
			initStarBuffer();
		}

		resize();
		window.addEventListener('resize', resize, { passive: true });

		// Mouse Camera Movement (Centered [-1 .. 1])
		window.addEventListener('mousemove', function (e) {
			var hw = window.innerWidth * 0.5;
			var hh = window.innerHeight * 0.5;
			targetMouseX = (e.clientX - hw) / hw;
			targetMouseY = (e.clientY - hh) / hh;
		}, { passive: true });

		// Touch Camera Movement for iOS (iPhone & iPad)
		window.addEventListener('touchmove', function (e) {
			if (e.touches && e.touches[0]) {
				var hw = window.innerWidth * 0.5;
				var hh = window.innerHeight * 0.5;
				targetMouseX = (e.touches[0].clientX - hw) / hw;
				targetMouseY = (e.touches[0].clientY - hh) / hh;
			}
		}, { passive: true });

		// WebGL Context Recovery for iOS (Lock screen & App Switcher)
		canvas.addEventListener('webglcontextlost', function (e) {
			e.preventDefault();
			stop();
		}, false);

		canvas.addEventListener('webglcontextrestored', function () {
			init();
		}, false);

		// Scroll Parallax Integration
		window.addEventListener('scroll', function () {
			targetScrollY = window.pageYOffset || document.documentElement.scrollTop;
		}, { passive: true });

		// Smart Tab Visibility Auto-Pause (Zero Battery Overhead)
		document.addEventListener('visibilitychange', function () {
			if (document.hidden) {
				stop();
			} else {
				start();
			}
		});

		start();
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
