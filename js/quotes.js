(function() {
  'use strict';

  function buildQuotesCarousel(quotes) {
    var container = document.getElementById('quotes_carousel');
    if (!container) return;

    // Pick 5 random quotes
    var shuffled = quotes.slice().sort(function() { return Math.random() - 0.5; });
    var selected = shuffled.slice(0, 5);

    var html = selected.map(function(q) {
      return [
        '<div class="testimonial testimonial-item">',
        '  <div class="testimonial-content">',
        '    <div class="testimonial-text">',
        '      <p>' + q.en + '</p>',
        '    </div>',
        '    <div class="testimonial-author-info">',
        '      <h5 class="testimonial-author">&mdash; ' + q.author + '</h5>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('\n');
    }).join('\n');

    container.innerHTML = html;

    if (typeof jQuery !== 'undefined' && jQuery.fn.owlCarousel) {
      jQuery(container).owlCarousel({
        items: 1,
        loop: true,
        dots: true,
        nav: false,
        autoplay: true,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        smartSpeed: 600,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn'
      });
    }
  }

  // Relative path works both locally and on GitHub Pages
  var base = window.location.pathname.replace(/\/[^/]*$/, '');
  var url  = base + '/quotes.json';

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      try {
        buildQuotesCarousel(JSON.parse(xhr.responseText));
      } catch (e) {
        console.warn('Could not parse quotes.json');
      }
    }
  };
  xhr.onerror = function() { console.warn('Could not load quotes.json'); };
  xhr.send();
})();
