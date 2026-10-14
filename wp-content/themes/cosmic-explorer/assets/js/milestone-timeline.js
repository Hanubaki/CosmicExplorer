/**
 * Cosmic Milestone Timeline Engine (Uzay Görevleri Dönüm Noktaları)
 *
 * Mouse tekerleğiyle (wheel) sayfanın aşağı kaymasını engelleyip
 * her tekerlek hareketinde bir sonraki/önceki milestone görevine geçiş sağlar.
 * Kesintisiz yatay ilerleme hattı (pipeline) ve etkileşimli pinler barındırır.
 */

(function () {
	'use strict';

	var app = document.getElementById('cosmicMilestoneApp');
	if (!app) return;

	var slides = app.querySelectorAll('.milestone-slide');
	var nodes = app.querySelectorAll('.milestone-node');
	var pipelineFill = document.getElementById('milestonePipelineFill');
	var counterEl = document.getElementById('milestoneCounter');
	var prevBtn = document.getElementById('milestonePrevBtn');
	var nextBtn = document.getElementById('milestoneNextBtn');
	var pinsContainer = document.getElementById('milestonePinsContainer');

	var total = slides.length;
	var currentIndex = 0;
	var isLocked = false;
	var lockCooldown = 550; // ms cinsinden tekerlek kilidi

	// Go to specific milestone index
	function goToMilestone(index, direction) {
		if (index < 0 || index >= total || index === currentIndex && direction === undefined) return;

		var prevIndex = currentIndex;
		currentIndex = index;

		// 1. Update Slides with Directional Animation
		slides.forEach(function (slide, idx) {
			slide.classList.remove('is-active', 'slide-from-right', 'slide-from-left');
			if (idx === currentIndex) {
				slide.classList.add('is-active');
				if (direction === 'next') {
					slide.classList.add('slide-from-right');
				} else if (direction === 'prev') {
					slide.classList.add('slide-from-left');
				}
			}
		});

		// 2. Update Milestone Nodes (Pipeline Pins)
		nodes.forEach(function (node, idx) {
			node.classList.remove('is-active', 'is-completed', 'is-pending');
			if (idx === currentIndex) {
				node.classList.add('is-active');
			} else if (idx < currentIndex) {
				node.classList.add('is-completed');
			} else {
				node.classList.add('is-pending');
			}
		});

		// 3. Update Pipeline Progress Fill Line
		if (pipelineFill && total > 1) {
			var percentage = (currentIndex / (total - 1)) * 100;
			pipelineFill.style.width = percentage + '%';

			var activeSlide = slides[currentIndex];
			var color = activeSlide ? activeSlide.getAttribute('data-color') : '#00f0ff';
			pipelineFill.style.background = 'linear-gradient(90deg, #ff5722 0%, #ffb703 35%, #00f0ff 70%, ' + color + ' 100%)';
			pipelineFill.style.boxShadow = '0 0 16px ' + color;
		}

		// 4. Update Counter Display (e.g. "02 / 07")
		if (counterEl) {
			var curNum = (currentIndex + 1 < 10 ? '0' : '') + (currentIndex + 1);
			var totNum = (total < 10 ? '0' : '') + total;
			counterEl.textContent = curNum + ' / ' + totNum;
		}

		// 5. Update Prev/Next Buttons Disabled State
		if (prevBtn) {
			prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
			prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
		}
		if (nextBtn) {
			nextBtn.style.opacity = currentIndex === total - 1 ? '0.4' : '1';
			nextBtn.style.pointerEvents = currentIndex === total - 1 ? 'none' : 'auto';
		}

		// 6. Smoothly auto-center active node on mobile / overflow
		var activeNode = nodes[currentIndex];
		if (activeNode && pinsContainer) {
			var nodeLeft = activeNode.offsetLeft;
			var nodeWidth = activeNode.offsetWidth;
			var containerWidth = pinsContainer.parentElement.offsetWidth;
			var targetScroll = nodeLeft - (containerWidth / 2) + (nodeWidth / 2);
			pinsContainer.parentElement.scrollTo({
				left: Math.max(0, targetScroll),
				behavior: 'smooth'
			});
		}
	}

	var isLocked = false;
	var lockCooldown = 600; // ms
	var wheelDebounceTimer = null;

	// Lock guard to prevent rapid-fire skipping
	function triggerStep(direction) {
		if (isLocked) return;

		if (direction === 'next' && currentIndex < total - 1) {
			isLocked = true;
			goToMilestone(currentIndex + 1, 'next');
			if (window.navigator && typeof window.navigator.vibrate === 'function') {
				try { window.navigator.vibrate(12); } catch (_) {}
			}
			clearTimeout(wheelDebounceTimer);
			wheelDebounceTimer = setTimeout(function () { isLocked = false; }, lockCooldown);
		} else if (direction === 'prev' && currentIndex > 0) {
			isLocked = true;
			goToMilestone(currentIndex - 1, 'prev');
			if (window.navigator && typeof window.navigator.vibrate === 'function') {
				try { window.navigator.vibrate(12); } catch (_) {}
			}
			clearTimeout(wheelDebounceTimer);
			wheelDebounceTimer = setTimeout(function () { isLocked = false; }, lockCooldown);
		}
	}

	// 1. Mouse Wheel & MacBook Trackpad Inertia-Safe Scroll-Jacking
	app.addEventListener('wheel', function (e) {
		var delta = e.deltaY;
		var threshold = 18; // Apple trackpad sensitive threshold

		// If locked, absorb momentum trackpad events and reset debounce timer
		if (isLocked) {
			if (Math.abs(delta) > 12) {
				clearTimeout(wheelDebounceTimer);
				wheelDebounceTimer = setTimeout(function () {
					isLocked = false;
				}, 320);
			}
			e.preventDefault();
			return;
		}

		// Boundary checks to allow native page scroll
		if (currentIndex === total - 1 && delta > threshold) {
			return; // Allow page to scroll down
		}
		if (currentIndex === 0 && delta < -threshold) {
			return; // Allow page to scroll up
		}

		if (Math.abs(delta) < threshold) {
			return;
		}

		// Hijack scroll and trigger milestone transition
		e.preventDefault();

		if (delta > threshold) {
			triggerStep('next');
		} else if (delta < -threshold) {
			triggerStep('prev');
		}
	}, { passive: false });

	// 2. Keyboard Arrows (Sol / Sağ ve Yukarı / Aşağı)
	window.addEventListener('keydown', function (e) {
		// Yalnızca milestone bileşeni görünür alandaysa veya odaklıysa
		var rect = app.getBoundingClientRect();
		var inView = (rect.top < window.innerHeight && rect.bottom > 0);
		if (!inView) return;

		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
			if (currentIndex < total - 1) {
				e.preventDefault();
				triggerStep('next');
			}
		} else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
			if (currentIndex > 0) {
				e.preventDefault();
				triggerStep('prev');
			}
		}
	});

	// 3. Direct Node Clicks (Pinlere Tıklama)
	nodes.forEach(function (node) {
		node.addEventListener('click', function () {
			var idx = parseInt(node.getAttribute('data-index'), 10);
			if (!isNaN(idx)) {
				var dir = idx > currentIndex ? 'next' : 'prev';
				goToMilestone(idx, dir);
				if (window.navigator && typeof window.navigator.vibrate === 'function') {
					try { window.navigator.vibrate(8); } catch (_) {}
				}
			}
		});
	});

	// 4. Prev & Next Buttons
	if (prevBtn) {
		prevBtn.addEventListener('click', function () {
			triggerStep('prev');
		});
	}
	if (nextBtn) {
		nextBtn.addEventListener('click', function () {
			triggerStep('next');
		});
	}

	// 5. Touch / Swipe Gestures for Mobile & iOS (Both Horizontal & Vertical Gestures)
	var touchStartX = 0;
	var touchStartY = 0;
	var touchStartTime = 0;

	app.addEventListener('touchstart', function (e) {
		if (e.touches && e.touches[0]) {
			touchStartX = e.touches[0].clientX;
			touchStartY = e.touches[0].clientY;
			touchStartTime = Date.now();
		}
	}, { passive: true });

	app.addEventListener('touchend', function (e) {
		if (e.changedTouches && e.changedTouches[0]) {
			var diffX = touchStartX - e.changedTouches[0].clientX;
			var diffY = touchStartY - e.changedTouches[0].clientY;
			var duration = Date.now() - touchStartTime;

			// Quick swipe under 500ms
			if (duration < 500) {
				if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
					// Horizontal swipe (left = next, right = prev)
					if (diffX > 0) {
						triggerStep('next');
					} else {
						triggerStep('prev');
					}
				} else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 55) {
					// Controlled vertical swipe (up = next, down = prev)
					if (diffY > 0 && currentIndex < total - 1) {
						triggerStep('next');
					} else if (diffY < 0 && currentIndex > 0) {
						triggerStep('prev');
					}
				}
			}
		}
	}, { passive: true });

	app.addEventListener('touchcancel', function () {
		touchStartX = 0;
		touchStartY = 0;
		touchStartTime = 0;
	}, { passive: true });

	// Initialize first milestone state
	goToMilestone(0);

})();
