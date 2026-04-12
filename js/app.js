/* A1EKS Portfolio — minimal JS, no interceptors */
$(function () {

  /* --------------------------------------------------
     Preloader
  -------------------------------------------------- */
  $('.preloader').delay(200).fadeOut(500);

  /* --------------------------------------------------
     Mobile nav toggle
  -------------------------------------------------- */
  $('#fw-nav-toggle').on('click', function () {
    $('#fw-nav-links').toggleClass('open');
    $(this).toggleClass('open');
  });
  // Close on link click (mobile)
  $('#fw-nav-links a').on('click', function () {
    $('#fw-nav-links').removeClass('open');
    $('#fw-nav-toggle').removeClass('open');
  });

  /* --------------------------------------------------
     Text rotation (hero subtitle)
  -------------------------------------------------- */
  if ($('.text-rotation').length) {
    $('.text-rotation').owlCarousel({
      loop: true,
      dots: false,
      nav: false,
      items: 1,
      autoplay: true,
      autoplayHoverPause: false,
      autoplayTimeout: 3500,
      animateOut: 'fadeOut',
      animateIn: 'fadeIn'
    });
  }

  /* --------------------------------------------------
     Skill bars
  -------------------------------------------------- */
  var skillCSS = '';
  $('.skill-container').each(function () {
    var val = $(this).data('value');
    var id  = $(this).attr('id');
    if (id && typeof val !== 'undefined') {
      skillCSS += '#' + id + ' .skill-percentage { width: ' + val + '%; } ';
    }
  });
  if (skillCSS) {
    $('head').append('<style type="text/css">' + skillCSS + '</style>');
  }

  /* --------------------------------------------------
     Portfolio filter (plain CSS — no shuffle.js)
  -------------------------------------------------- */
  if ($('.portfolio-grid').length) {
    $('.portfolio-filters').on('click', '.filter', function (e) {
      e.preventDefault();
      $('.portfolio-filters li').removeClass('active');
      $(this).parent().addClass('active');

      var group = $(this).attr('data-group');
      $('.portfolio-grid figure').each(function () {
        if (group === 'category_all') {
          $(this).show();
        } else {
          var groups = $(this).attr('data-groups') || '';
          if (groups.indexOf(group) !== -1) {
            $(this).show();
          } else {
            $(this).hide();
          }
        }
      });
    });
  }

  /* --------------------------------------------------
     Testimonials / quotes carousel
     (quotes.js handles the quotes_carousel separately)
  -------------------------------------------------- */
  if ($('.testimonials.owl-carousel').not('#quotes_carousel').length) {
    $('.testimonials.owl-carousel').not('#quotes_carousel').owlCarousel({
      nav: true,
      loop: true,
      dots: true,
      items: 1,
      margin: 25,
      autoplay: true,
      autoplayTimeout: 6000,
      responsive: {
        0:    { items: 1 },
        768:  { items: 2 },
        1200: { items: 2 }
      }
    });
  }

  /* --------------------------------------------------
     Lightbox (image links with class="lightbox")
  -------------------------------------------------- */
  if ($.fn.magnificPopup) {
    $('a.lightbox').magnificPopup({
      type: 'image',
      gallery: { enabled: true },
      removalDelay: 200,
      mainClass: 'mfp-fade'
    });
  }

});
