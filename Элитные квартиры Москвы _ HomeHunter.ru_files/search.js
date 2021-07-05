jQuery(document).ready(function($){

	$('.search-box, #filter-main .cwsearch').on('keyup', 'input[type="text"]', function() {
		var val = $(this).val();
		var type = $(this).parent().hasClass('cwsearch');
		if (val.length >= 2) {
			$(this).attr('data-original', val);
			if (type) {
				$.ajax({
					url: '/system/search',
					type: 'post',
					data: 'data=' + $.toJSON(val)+'&search',
					success: result_cw
				});
			} else {
				$.ajax({
					url: '/system/search',
					type: 'post',
					data: 'data=' + $.toJSON(val),
					success: result
				});
			}
			$('body').addClass('actives-search');
		} else {
			$('body').removeClass('actives-search');
			$('.search-result').html('');
	    }
	    return true;
	});
	// Если на главной, переход в раздел с квартирами
	$('#front-top-search .search-box a').unbind('click').on('click', function() {
		var val = $('.search-box input[type="text"]').val();
		if (val.length >= 2) return false;
	});
	// Обработка результатов
	function result(data) {
		var result_html = $('.search-box .search-result');
		var data = eval(data);
		var count = data['count'];
		var val = data['val'];
		var rule = data['rule'];
		var translit = data['translit'];
		if (count == 0) {
			result_html.html('<div class="line">К сожалению, результаты не найдены.</div>');
		} else {
			$('#search-context .result').html('');
			result_html.html(data['val']);
		    $('#search-context .result .line .name').highlight(val);
		    $('#search-context .result .line .name').highlight(rule);
		    $('#search-context .result .line .name').highlight(translit);
		}
	}
	function result_cw(data) {
		if ($('.cwsearch .search-result').length == 0) $('.cwsearch').append('<div class="search-result"></div>');
		var result_html = $('.cwsearch .search-result');
		var data = eval(data);
		var count = data['count'];
		var val = data['val'];
		var rule = data['rule'];
		var translit = data['translit'];
		if (count == 0) {
			result_html.html('<div class="line">К сожалению, результаты не найдены.</div>');
		} else {
			$('#search-context .result').html('');
			result_html.html(data['val']);
		    $('#search-context .result .line .name').highlight(val);
		    $('#search-context .result .line .name').highlight(rule);
		    $('#search-context .result .line .name').highlight(translit);
		}
	}
	// Скрытие при клике вне
	$(document).on('click', 'body.actives-search', function(event) {
	  if ($(event.target).closest('.search-result').length == 0 && $(event.target).attr('name') != 'search') {
	    $('.search-result').html('');
	    $('body').removeClass('actives-search');
	  }
	});
	
	$('#search-context').bind('keydown', function(e) {
		var selected_li = null;
		var key_pressed = (typeof(e.keyCode) != 'undefined' ? e.keyCode : e.which);
		if (key_pressed == 40 || key_pressed == 38) {
			if (selected_li == null) selected_li = $('#search-context .search-result div:eq(0)');
			else {
				if (key_pressed == 40) next_li = selected_li.next();
				else next_li = selected_li.prev();
				if (next_li.size() > 0) selected_li = next_li;
				else selected_li = null;
			}
			$('#search-context .search-result div').css('background', '#fff');
		    if (selected_li == null) var name = $('#search-context input[name=search-context]').attr('data-original-key');
			else {
				selected_li.focus().css('background', '#e5e5e5');
				var name = selected_li.find('.name').text();
			}
			$('#search-context input[name=search-context]').val(name);
		} else if (key_pressed == 13) {
			if (selected_li != null) {
				var url = selected_li.attr('data-url');
				window.location = url;
			} else {
				var url = $('#search-context .result div:eq(0)').attr('data-url');
				if (url) window.location = url;
			}
			$('#search-context .result').html('');
		}
	});
	$('#search-context').on('click', '.result .line', function() {
		var url = $(this).attr('data-url');
		window.location = url;
	});
	$('.search-box').on('click', '.search-result .line', function() {
		var url = $(this).attr('data-url');
		window.location = url;
	});



});