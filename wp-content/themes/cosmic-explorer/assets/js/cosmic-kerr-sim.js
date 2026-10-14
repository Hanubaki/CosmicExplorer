/**
 * Cosmic Explorer - Interactive WebGL Kerr Black Hole Simulator
 * 
 * Provides a real-time, interactive 3D relativistic Kerr Black Hole laboratory:
 * - Gravitational light deflection & photon sphere rendering.
 * - Relativistic Doppler beaming on accretion disk (asymmetric brightness).
 * - Interactive mouse drag & touch orbital camera (pitch & yaw).
 * - Real-time telemetry HUD readout (spin parameter a/M, observer angle, FPS).
 */

(function () {
	'use strict';

	var canvas = null;
	var gl = null;
	var isRunning = false;
	var animId = null;

	// Camera & Interaction
	var pitch = 0.35; // rad
	var yaw = 0.0;
	var camDist = 4.2;
	var targetPitch = 0.35;
	var targetYaw = 0.0;
	var targetCamDist = 4.2;

	var defaultPitch = 0.35;
	var defaultYaw = 0.0;
	var defaultCamDist = 4.2;

	var isDragging = false;
	var isPinching = false;
	var lastPointerX = 0;
	var lastPointerY = 0;

	// Pinch tracking
	var initialPinchDist = 0;
	var initialPinchCamDist = 4.2;

	// Double-tap tracking
	var lastTapTime = 0;
	var lastTapPos = { x: 0, y: 0 };

	// Telemetry
	var frameCount = 0;
	var lastFpsCheck = performance.now();
	var fps = 60;
	var angleEl = null;
	var fpsEl = null;
	var distEl = null;

	// WebGL Program
	var program = null;
	var quadBuffer = null;
	var uResLoc = null;
	var uTimeLoc = null;
	var uCamAnglesLoc = null;

	var vsSource = [
		'attribute vec2 a_pos;',
		'void main() {',
		'    gl_Position = vec4(a_pos, 0.0, 1.0);',
		'}'
	].join('\n');

	var fsSource = [
		'precision mediump float;',
		'uniform vec2 u_res;',
		'uniform float u_time;',
		'uniform vec3 u_cam_angles; // x: yaw, y: pitch, z: distance',
		'',
		'#define PI 3.14159265359',
		'',
		'void main() {',
		'    vec2 uv = (gl_FragCoord.xy - 0.5 * u_res) / max(min(u_res.x, u_res.y), 1.0);',
		'    float yaw = u_cam_angles.x;',
		'    float pitch = clamp(u_cam_angles.y, 0.05, 1.45);',
		'    float camDist = clamp(u_cam_angles.z, 2.0, 7.8);',
		'',
		'    // 3D Camera Ray Generation',
		'    vec3 ro = vec3(sin(yaw) * cos(pitch), sin(pitch), cos(yaw) * cos(pitch)) * camDist;',
		'    vec3 ta = vec3(0.0, 0.0, 0.0);',
		'    vec3 ww = normalize(ta - ro);',
		'    vec3 uu = normalize(cross(ww, vec3(0.0, 1.0, 0.0)));',
		'    vec3 vv = normalize(cross(uu, ww));',
		'    vec3 rd = normalize(uv.x * uu + uv.y * vv + 1.6 * ww);',
		'',
		'    // Gravitational Lensing Deflection Vector towards the origin',
		'    float r = length(uv);',
		'    float bhRadius = 0.28;',
		'    float photonRingRadius = 0.36;',
		'',
		'    // Ray-plane intersection for thin accretion disk (Y = 0 plane)',
		'    vec3 col = vec3(0.02, 0.025, 0.04); // Deep space background',
		'',
		'    // Add starfield background with safe gravitational deflection (guard r == 0)',
		'    float deflection = 0.07 / (r * r + 0.025);',
		'    vec2 nUV = (r > 0.0001) ? (uv / r) : vec2(0.0);',
		'    vec2 deflectedUV = uv + nUV * deflection;',
		'    float starNoise = fract(sin(dot(floor(deflectedUV * 45.0), vec2(12.9898, 78.233))) * 43758.5453);',
		'    if (starNoise > 0.985 && r > bhRadius * 1.05) {',
		'        col += vec3(0.9, 0.95, 1.0) * pow((starNoise - 0.985) / 0.015, 3.0);',
		'    }',
		'',
		'    // Accretion Disk Physics (Upper and lower Einstein ring arcs)',
		'    // Primary Disk Intersection',
		'    if (abs(rd.y) > 0.001) {',
		'        float tDisk = -ro.y / rd.y;',
		'        if (tDisk > 0.0) {',
		'            vec3 pDisk = ro + rd * tDisk;',
		'            float distDisk = length(pDisk.xz);',
		'            if (distDisk > 0.75 && distDisk < 2.8) {',
		'                // Orbital angle & velocity for Doppler beaming',
		'                float phi = atan(pDisk.z, pDisk.x);',
		'                float v_orb = 0.55 / sqrt(distDisk); // Keplerian orbital speed',
		'                float doppler = 1.0 + v_orb * sin(phi - yaw);',
		'                doppler = clamp(doppler, 0.35, 2.2);',
		'',
		'                // Accretion disk radial plasma temperature',
		'                float temp = smoothstep(2.8, 0.9, distDisk);',
		'                vec3 diskColor = mix(vec3(0.85, 0.15, 0.02), vec3(1.0, 0.65, 0.05), temp);',
		'                diskColor = mix(diskColor, vec3(1.0, 0.96, 0.85), pow(temp, 2.5));',
		'',
		'                // Rotating plasma filaments',
		'                float spiral = sin(phi * 4.0 - u_time * 2.5 + distDisk * 5.0) * 0.5 + 0.5;',
		'                float density = (0.7 + 0.3 * spiral) * pow(doppler, 2.8);',
		'',
		'                col = mix(col, diskColor * density, smoothstep(2.8, 2.3, distDisk) * smoothstep(0.75, 0.95, distDisk) * 0.92);',
		'            }',
		'        }',
		'    }',
		'',
		'    // Gravitational Lensing Lensed Secondary Disk (Top and Bottom Arcs)',
		'    float diskArcDist = abs(r - photonRingRadius * 1.35);',
		'    if (diskArcDist < 0.18 && r > bhRadius) {',
		'        float arcAngle = atan(uv.y, uv.x);',
		'        float arcDoppler = clamp(1.0 - 0.7 * cos(arcAngle + yaw), 0.3, 1.9);',
		'        float arcIntensity = (1.0 - diskArcDist / 0.18) * pow(arcDoppler, 2.2);',
		'        vec3 arcColor = mix(vec3(1.0, 0.35, 0.05), vec3(1.0, 0.85, 0.4), arcIntensity);',
		'        col += arcColor * arcIntensity * 0.65;',
		'    }',
		'',
		'    // Photon Sphere Ring (Intense Golden-White Caustic)',
		'    float prDist = abs(r - photonRingRadius);',
		'    float prGlow = exp(-prDist * 60.0) * 1.5;',
		'    col += vec3(1.0, 0.92, 0.7) * prGlow;',
		'',
		'    // Event Horizon (Absolute Shadow Void)',
		'    if (r < bhRadius) {',
		'        col = vec3(0.0);',
		'    } else {',
		'        col *= smoothstep(bhRadius, bhRadius + 0.015, r);',
		'    }',
		'',
		'    gl_FragColor = vec4(col, 1.0);',
		'}'
	].join('\n');

	function initShader() {
		var vs = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vs, vsSource);
		gl.compileShader(vs);
		if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
			console.warn('Kerr VS compile err:', gl.getShaderInfoLog(vs));
			return false;
		}

		var fs = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fs, fsSource);
		gl.compileShader(fs);

		if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
			console.warn('Kerr FS compile err:', gl.getShaderInfoLog(fs));
			return false;
		}

		program = gl.createProgram();
		gl.attachShader(program, vs);
		gl.attachShader(program, fs);
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			console.warn('Kerr program link err:', gl.getProgramInfoLog(program));
			return false;
		}

		uResLoc = gl.getUniformLocation(program, 'u_res');
		uTimeLoc = gl.getUniformLocation(program, 'u_time');
		uCamAnglesLoc = gl.getUniformLocation(program, 'u_cam_angles');

		var quadData = new Float32Array([
			-1.0, -1.0,
			 1.0, -1.0,
			-1.0,  1.0,
			-1.0,  1.0,
			 1.0, -1.0,
			 1.0,  1.0
		]);
		quadBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, quadData, gl.STATIC_DRAW);
		return true;
	}

	function resize() {
		if (!canvas || !gl) return;
		var rect = canvas.getBoundingClientRect();
		var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
		var w = Math.floor((rect.width || canvas.clientWidth || 800) * dpr);
		var h = Math.floor((rect.height || canvas.clientHeight || 440) * dpr);
		if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
			canvas.width = w;
			canvas.height = h;
			gl.viewport(0, 0, w, h);
		}
	}

	function render(now) {
		if (!isRunning || !program || !gl) return;

		// Smooth camera lerp
		yaw += (targetYaw - yaw) * 0.12;
		pitch += (targetPitch - pitch) * 0.12;
		camDist += (targetCamDist - camDist) * 0.12;

		// Update telemetry
		frameCount++;
		if (now - lastFpsCheck >= 500) {
			fps = Math.round((frameCount * 1000) / (now - lastFpsCheck));
			frameCount = 0;
			lastFpsCheck = now;
			if (fpsEl) fpsEl.textContent = fps;
		}
		if (angleEl) {
			var deg = Math.round((pitch * 180) / Math.PI);
			angleEl.textContent = deg + '°';
		}
		if (distEl) {
			distEl.textContent = camDist.toFixed(1) + 'r';
		}

		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clear(gl.COLOR_BUFFER_BIT);

		gl.useProgram(program);
		gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
		var aPosLoc = gl.getAttribLocation(program, 'a_pos');
		if (aPosLoc >= 0) {
			gl.enableVertexAttribArray(aPosLoc);
			gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);
		}

		if (uResLoc) gl.uniform2f(uResLoc, canvas.width, canvas.height);
		if (uTimeLoc) gl.uniform1f(uTimeLoc, now * 0.001);
		if (uCamAnglesLoc) gl.uniform3f(uCamAnglesLoc, yaw, pitch, camDist);

		gl.drawArrays(gl.TRIANGLES, 0, 6);

		animId = requestAnimationFrame(render);
	}

	function resetCamera() {
		targetYaw = defaultYaw;
		targetPitch = defaultPitch;
		targetCamDist = defaultCamDist;
		if (window.navigator && typeof window.navigator.vibrate === 'function') {
			try { window.navigator.vibrate([15, 35, 15]); } catch (_) {}
		}
	}

	function initInteractions() {
		canvas.style.touchAction = 'none';

		// Desktop Mouse Drag
		canvas.addEventListener('mousedown', function (e) {
			isDragging = true;
			lastPointerX = e.clientX;
			lastPointerY = e.clientY;
			canvas.style.cursor = 'grabbing';
		});

		window.addEventListener('mousemove', function (e) {
			if (!isDragging) return;
			var dx = e.clientX - lastPointerX;
			var dy = e.clientY - lastPointerY;
			lastPointerX = e.clientX;
			lastPointerY = e.clientY;

			targetYaw += dx * 0.01;
			targetPitch += dy * 0.008;
			targetPitch = Math.max(0.08, Math.min(1.4, targetPitch));
		});

		window.addEventListener('mouseup', function () {
			if (isDragging) {
				isDragging = false;
				if (canvas) canvas.style.cursor = 'grab';
			}
		});

		// Desktop Wheel Zoom
		canvas.addEventListener('wheel', function (e) {
			e.preventDefault();
			targetCamDist += e.deltaY * 0.003;
			targetCamDist = Math.max(2.0, Math.min(7.8, targetCamDist));
		}, { passive: false });

		// Desktop Double-Click Reset
		canvas.addEventListener('dblclick', function () {
			resetCamera();
		});

		// Mobile & Tablet Touch Support (Touch Gesture Ergonomics)
		canvas.addEventListener('touchstart', function (e) {
			if (e.touches.length === 1) {
				isDragging = true;
				isPinching = false;
				lastPointerX = e.touches[0].clientX;
				lastPointerY = e.touches[0].clientY;

				// Double-tap recognition
				var now = performance.now();
				var dt = now - lastTapTime;
				var tapDist = Math.hypot(e.touches[0].clientX - lastTapPos.x, e.touches[0].clientY - lastTapPos.y);
				if (dt > 40 && dt < 320 && tapDist < 35) {
					resetCamera();
					lastTapTime = 0;
				} else {
					lastTapTime = now;
					lastTapPos.x = e.touches[0].clientX;
					lastTapPos.y = e.touches[0].clientY;
				}
			} else if (e.touches.length === 2) {
				// Two-finger pinch-to-zoom mathematical initiation
				isDragging = false;
				isPinching = true;
				var t1 = e.touches[0];
				var t2 = e.touches[1];
				initialPinchDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
				initialPinchCamDist = targetCamDist;
			}
		}, { passive: true });

		canvas.addEventListener('touchmove', function (e) {
			if (isPinching && e.touches.length === 2) {
				var t1 = e.touches[0];
				var t2 = e.touches[1];
				var currentDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
				if (initialPinchDist > 5) {
					// Ratio of distance: fingers separating (factor > 1) zooms in (camDist shrinks)
					var factor = currentDist / initialPinchDist;
					targetCamDist = Math.max(2.0, Math.min(7.8, initialPinchCamDist / factor));
				}
			} else if (isDragging && e.touches.length === 1) {
				var dx = e.touches[0].clientX - lastPointerX;
				var dy = e.touches[0].clientY - lastPointerY;
				lastPointerX = e.touches[0].clientX;
				lastPointerY = e.touches[0].clientY;

				targetYaw += dx * 0.012;
				targetPitch += dy * 0.01;
				targetPitch = Math.max(0.08, Math.min(1.4, targetPitch));
			}
		}, { passive: true });

		function handleTouchEnd(e) {
			if (e.touches.length === 0) {
				isDragging = false;
				isPinching = false;
			} else if (e.touches.length === 1) {
				// Seamlessly resume single finger drag without jump
				isPinching = false;
				isDragging = true;
				lastPointerX = e.touches[0].clientX;
				lastPointerY = e.touches[0].clientY;
			}
		}

		canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
		canvas.addEventListener('touchcancel', function () {
			isDragging = false;
			isPinching = false;
		}, { passive: true });
	}

	function init() {
		canvas = document.getElementById('kerrBhSimCanvas');
		if (!canvas) return; // Not on a page that contains the Kerr canvas

		angleEl = document.getElementById('kerrAngleVal');
		fpsEl = document.getElementById('kerrFpsVal');
		distEl = document.getElementById('kerrDistVal');

		var opts = { alpha: false, antialias: false, depth: false, powerPreference: 'high-performance' };
		gl = canvas.getContext('webgl', opts) || canvas.getContext('experimental-webgl', opts);
		if (!gl) {
			console.warn('WebGL is not supported for Kerr simulator.');
			return;
		}

		if (!initShader()) {
			return;
		}

		initInteractions();
		resize();
		window.addEventListener('resize', resize, { passive: true });

		isRunning = true;
		animId = requestAnimationFrame(render);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
