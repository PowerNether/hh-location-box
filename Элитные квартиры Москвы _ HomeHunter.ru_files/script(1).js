/**
 * @file
 * Javascript file for the easymeta module.
 */

(function ($, Drupal, window) {
  $(document).ready(function(){
    $('#seo-meta-form .seo-meta-open').click(function(){
      if ($(this).hasClass('open')) {
        $('#seo-meta-form').animate({ left: '-500px' }, function(){
          $('#seo-meta-form .seo-meta-open').removeClass('open');
        });
      }
      else {
        $('#seo-meta-form').animate({ left: 0 }, function(){
          $('#seo-meta-form .seo-meta-open').addClass('open');
        });
      }
    });
  });
})(jQuery, Drupal, window);
