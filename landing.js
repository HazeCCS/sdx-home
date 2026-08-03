(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var canvas = document.getElementById('hero-canvas');

    if (canvas) {
        var context = canvas.getContext('2d');
        var columns = 56;
        var rows = 30;
        var frame = null;

        function resizeCanvas() {
            var ratio = Math.min(2, window.devicePixelRatio || 1);
            var rect = canvas.getBoundingClientRect();
            canvas.width = Math.round(rect.width * ratio);
            canvas.height = Math.round(rect.height * ratio);
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            columns = rect.width < 720 ? 22 : 56;
        }

        function roundedSquare(x, y, size) {
            var radius = Math.min(2, size * 0.12);
            context.beginPath();
            context.roundRect(x, y, size, size, radius);
            context.fill();
        }

        function draw(time) {
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
            var gap = 2;
            var cell = (width - gap * (columns - 1)) / columns;
            rows = Math.ceil(height / (cell + gap));

            context.clearRect(0, 0, width, height);
            context.fillStyle = '#050505';
            context.fillRect(0, 0, width, height);

            var t = time * 0.001;
            for (var row = 0; row < rows; row += 1) {
                for (var column = 0; column < columns; column += 1) {
                    var nx = column / columns;
                    var ny = row / Math.max(1, rows - 1);
                    var waveOne = 0.48 + 0.15 * Math.sin(nx * 4.2 - t * 0.72) + 0.05 * Math.sin(nx * 8 + t * 0.3);
                    var waveTwo = 0.54 - 0.12 * Math.sin(nx * 3.4 - t * 0.52 + 1.1);
                    var distance = Math.min(Math.abs(ny - waveOne), Math.abs(ny - waveTwo));
                    var strength = Math.max(0, 1 - distance / 0.105);
                    var opacity = 0.025 + Math.pow(strength, 1.8) * 0.55;

                    context.fillStyle = 'rgba(255, 69, 58, ' + opacity.toFixed(3) + ')';
                    roundedSquare(column * (cell + gap), row * (cell + gap), cell);
                }
            }

            if (!reduceMotion) frame = requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resizeCanvas, { passive: true });
        resizeCanvas();
        frame = requestAnimationFrame(draw);

        document.addEventListener('visibilitychange', function () {
            if (document.hidden && frame) {
                cancelAnimationFrame(frame);
                frame = null;
            } else if (!document.hidden && !frame && !reduceMotion) {
                frame = requestAnimationFrame(draw);
            }
        });
    }

    var navigation = document.getElementById('main-nav');
    if (navigation) {
        function updateNavigation() {
            navigation.classList.toggle('is-scrolled', window.scrollY > 24);
        }

        window.addEventListener('scroll', updateNavigation, { passive: true });
        updateNavigation();
    }
})();
