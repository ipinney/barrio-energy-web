document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.property-carousel').forEach(function(carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var total = slides.length;
    if (total <= 1) return;
    var idx = 0;
    var prevBtn = carousel.querySelector('.carousel-btn.prev');
    var nextBtn = carousel.querySelector('.carousel-btn.next');
    var dots = carousel.querySelectorAll('.carousel-dots .dot');
    var counter = carousel.querySelector('.carousel-counter');

    function go(n) {
      idx = (n + total) % total;
      track.style.transform = 'translateX(-' + (idx * 100) + '%)';
      dots.forEach(function(d, i) { d.classList.toggle('active', i === idx); });
      if (counter) counter.textContent = (idx + 1) + ' / ' + total;
    }

    prevBtn && prevBtn.addEventListener('click', function(e) { e.stopPropagation(); go(idx - 1); });
    nextBtn && nextBtn.addEventListener('click', function(e) { e.stopPropagation(); go(idx + 1); });
    dots.forEach(function(d, i) { d.addEventListener('click', function(e) { e.stopPropagation(); go(i); }); });

    // Swipe support
    var startX = 0;
    carousel.addEventListener('touchstart', function(e) { startX = e.touches[0].clientX; }, {passive: true});
    carousel.addEventListener('touchend', function(e) {
      var diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) go(idx + (diff > 0 ? 1 : -1));
    });
  });
});
