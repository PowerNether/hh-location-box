jQuery(document).ready(function($){
// проверка num
function isNumber(n) { return !isNaN(parseFloat(n)) && isFinite(n); }
// yandex map
if (window.location.pathname == '/map') $.fn.ffilter('maps');

});