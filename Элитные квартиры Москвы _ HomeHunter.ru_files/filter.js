jQuery(document).ready(function($){

var delay = (function() {
	var timer = 0;
	return function(callback, ms) {
		clearTimeout(timer);
		timer = setTimeout(callback, ms);
	};
})();
// Переменные
var spin = '<div class="cssload-box-loading"></div>';
var timeout;
var time = 500;
var speed = 150;
var delaytime = 500;
// open full
$('#filter-main').on('mouseup', '.more .select-btn', function() {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$('.full-search-options').hide(time);
	} else {
		$(this).addClass('active');
		$('.full-search-options').show(time);
	}
});
// Click btn
$('#filter-main').on('click', '.btn-search-full', function() {
	/*
	if ($('#filter-main .filter-field').hasClass('active')) {
		$('#filter-main .filter-field').removeClass('active');
		$('.full-filter-main-box').hide(time);
	} else {
		$('#filter-main .filter-field').addClass('active');
		$('.full-filter-main-box').show(time);
	}
	*/
	// count
	delay(function() { $.fn.ffilter('counter', {'count': 'update', 'pager': 'new', 'page': 'update', 'title': true}); }, delaytime);
});
// clean all
$('#filter-main').on('click', '.clean', function() {
	$('.filter-field input').val('');
	$('#filter-main .filter-field.number-list .list .i.disabled').removeClass('disabled');
	$('#filter-main .filter-field.line-check .item.active').removeClass('active');
	$('#filter-main .filter-field.selected1 .select-btn').text('Выбрать +');
	$('#filter-main .filter-field.selected1').removeClass('selected1');
	// fastlink
	$('#filter-main .veryfastlink .item').removeClass('disabled').removeClass('active');
	$('#filter-main input[name="legalstatus"]').val('');
	$('#filter-main input[name="order"]').val('');
	$('#filter-main input[name="order-by"]').val('');
	// count
	delay(function() { $.fn.ffilter('counter', {'count': 'update', 'pager': 'new', 'page': 'update', 'title': true}); }, delaytime);
});
$('#filter-main').on('change', '.select-list select', function() {
	var tid = $(this).find('option:selected').val();
	var name = $(this).find('option:selected').text();
	var vid = $(this).closest('.filter-field').data('type').replace('list', '');
	if (tid) {
		if ($('#filter-main select[name="'+vid+'"] option[value="'+tid+'"]').length == 0) {
			$('#filter-main select[name="'+vid+'"]').append('<option selected value="'+tid+'">'+name+'</option>');
			$('#filter-main .bottom-line .select-item').append('<div class="item" data-id="'+tid+'">ЖК '+name+' <span></span></div>');
		}
	}
	setTimeout(function () {
		if ($('#filter-main input[name="page"]').val()) $('#filter-main input[name="page"]').val('');
		$('#filter-main .cwsearch input[type="text"]').val('');
		$('#filter-main .btn-search-full').trigger('click');
	}, 1);
});
// selectparams
$('#filter-main').on('mouseup', '.selectparams .item', function() {
	/*
	var t = $(this);
	t.toggleClass('disabled');
	if (t.hasClass('disabled')) t.attr('data-val', 0);
	else t.attr('data-val', 1);
	*/
	$('#filter-main input[name="page"]').val('');
	$(this).remove();
	// agency
	if ($(this).data('type') == 'agency') {
		$('#filter-main .admin-line .filter-field[data-type="agency"] .item.active').removeClass('active');
		$('#filter-main .admin-line .filter-field[data-type="agency"]').removeClass('selected1');
		$('#filter-main .admin-line .filter-field[data-type="agency"] .count').html(0);
	}

	// Скрытие лишнего, удаление
	var id = $('#page-content').attr('data-id');
	$('h1').text('Элитные квартиры в Москве');
	window.history.replaceState({}, '', '/flats');

	setTimeout(function () {
		delay(function() { $.fn.ffilter('counter', {'count': 'update', 'pager': 'new', 'page': 'update', 'title': true}); }, delaytime);
	}, 100);

	$('.node-type-agency .header-info').hide(300);
	$('.breadcrumbs').html('<li itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/" itemprop="url"><span itemprop="title">Главная</span></a></li><li itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/flats" itemprop="url"><span itemprop="title">Элитные квартиры</span></a></li>');
	$('.node-type-agency .header-info').after('<h1>Элитные квартиры в Москве</h1>');
	setTimeout(function () {
		$('.node-type-agency .header-info').remove();
	}, 500);
});
// fastlinkcheck
$('#filter-main').on('mouseup', '.veryfastlink .item', function() {
	$('#filter-main input[name="page"]').val('');
	var t = $(this);
	var field = t.data('field');
	var type = t.data('type');
	var id = t.data('id');
	/*
	

	t.toggleClass('disabled');

	if (t.hasClass('disabled')) {
		// full disabled = not
		if ($('.veryfastlink .item[data-type="'+type+'"]:not([data-id="'+id+'"]').hasClass('disabled')) $('.veryfastlink .item[data-type="'+type+'"]:not([data-id="'+id+'"]').removeClass('disabled');
	}
	// Если выбраны все в группе, обнуляем список
	if (!$('.veryfastlink .item[data-type="'+type+'"].disabled').length) {
		if (field == 'legalstatus') {
			$('input[name="'+field+'"]').val('');
		} else if (field == 'decor') {
			$('#filter-main .filter-field[data-type="decor"] .list .item[data-val="1"] input, #filter-main .filter-field[data-type="decor"] .list .item[data-val="2"] input').prop('checked', true);
			$('#filter-main .filter-field[data-type="decor"] .list .item[data-val="1"], #filter-main .filter-field[data-type="decor"] .list .item[data-val="2"]').addClass('active');
			$('#filter-main .filter-field[data-type="decor"] .select-btn span span').html(2);
		}
	} else {
		var active = $('.veryfastlink .item[data-type="'+type+'"]:not(.disabled)').data('id');
		if (field == 'legalstatus') {
			$('input[name="'+field+'"]').val(active);
		} else if (field == 'decor') {
			$('#filter-main .filter-field[data-type="decor"] .list .item.active input').prop('checked', false);
			$('#filter-main .filter-field[data-type="decor"] .list .item.active').removeClass('active');
			$('#filter-main .filter-field[data-type="decor"] .list .item[data-val="'+active+'"]').addClass('active');
			$('#filter-main .filter-field[data-type="decor"] .list .item[data-val="'+active+'"] input').prop('checked', true);
			$('#filter-main .filter-field[data-type="decor"] .select-btn span span').html(1);
		}
	}
	*/


	if (!$(this).hasClass('active')) {
		$('.veryfastlink .item[data-type="'+type+'"]').removeClass('active').removeClass('disabled');
		$(this).addClass('active');
		$('.veryfastlink .item[data-type="'+type+'"]:not([data-id="'+id+'"]').addClass('disabled');
		if (field == 'legalstatus') {
			$('input[name="'+field+'"]').val(id);
		} else if (field == 'decor') {
			$('#filter-main .filter-field[data-type="decor"] .list .item.active input').prop('checked', false);
			$('#filter-main .filter-field[data-type="decor"] .list .item.active').removeClass('active');
			$('#filter-main .filter-field[data-type="decor"] .list .item[data-val="'+id+'"]').addClass('active');
			$('#filter-main .filter-field[data-type="decor"] .list .item[data-val="'+id+'"] input').prop('checked', true);
		}
	} else {
		$('.veryfastlink .item[data-type="'+type+'"]').removeClass('active').removeClass('disabled');
		if (field == 'legalstatus') {
			$('input[name="'+field+'"]').val('');
		} else if (field == 'decor') {
			$('#filter-main .filter-field[data-type="decor"] .list .item.active input').prop('checked', false);
			$('#filter-main .filter-field[data-type="decor"] .list .item.active').removeClass('active');
		}
	}
	
	delay(function() { $.fn.ffilter('counter', {'count': 'update', 'pager': 'new', 'page': 'update', 'title': true}); }, delaytime);
});
// line check
$('#filter-main').on('mouseup', '.select-list.line-check .select-btn', function() {
	$('#filter-main input[name="page"]').val('');
	var box = $(this).closest('.line-check');
	var type = box.data('type');
	box.toggleClass('active');
	if (box.hasClass('active')) {
		$('.select-list.line-check:not([data-type="'+type+'"])').removeClass('active');
		$('.select-list.line-check:not([data-type="'+type+'"]) .list').slideUp(time);
		box.find('.list').slideDown(time);
	} else {
		box.find('.list').slideUp(time);
	}
});
$('#filter-main').on('mouseup', '.line-check .item', function() {
	$('#filter-main input[name="page"]').val('');
	var t = $(this);
	var field = t.closest('.filter-field').data('type');
	var box = t.closest('.filter-field');
	t.toggleClass('active');
	if (field == 'decor') {
		if (!t.attr('data-parent')) {
			// active - active all child
			if (!t.hasClass('active')) {
				box.find('.item[data-parent="'+t.data('val')+'"]').removeClass('active');
				box.find('.item[data-parent="'+t.data('val')+'"] input').prop('checked', false);
			}
			// not all deactive
			if (!box.find('.item.active:not([data-parent]').length) {
				box.find('.item:not([data-parent]):not([data-val="'+t.data('val')+'"])').addClass('active');
				box.find('.item:not([data-parent]):not([data-val="'+t.data('val')+'"]) input').prop('checked', true);
			}
		} else {
			var parent = t.data('parent');
			if (t.hasClass('active')) {
				box.find('.item[data-val="'+parent+'"]').addClass('active');
				box.find('.item[data-val="'+parent+'"] input').prop('checked', true);
				// deactive other parent
				box.find('.item:not([data-parent]):not([data-val="'+parent+'"])').removeClass('active');
				box.find('.item:not([data-parent]):not([data-val="'+parent+'"]) input').prop('checked', false);
				// deactive other
				box.find('.item:not([data-parent="'+parent+'"]):not([data-val="'+parent+'"])').removeClass('active');
				box.find('.item:not([data-parent="'+parent+'"]):not([data-val="'+parent+'"]) input').prop('checked', false);
			}
		}

		// fast link
		$('#filter-main .bottom2-line .veryfastlink .item[data-field="decor"]').removeClass('disabled');
		if ($(this).closest('.filter-field').find('.item.active:not([data-parent])').length == 1) {
			$('#filter-main .bottom2-line .veryfastlink .item[data-field="decor"]:not([data-id="'+$(this).closest('.filter-field').find('.item.active:not([data-parent])').data('val')+'"])').addClass('disabled');
		}

	}
	/*
	if (!t.attr('data-parent')) {
		// active - active all child
		if (t.hasClass('active')) {
			box.find('.item[data-parent="'+t.data('val')+'"]').addClass('active');
			box.find('.item[data-parent="'+t.data('val')+'"] input').prop('checked', true);
		} else {
			box.find('.item[data-parent="'+t.data('val')+'"]').removeClass('active');
			box.find('.item[data-parent="'+t.data('val')+'"] input').prop('checked', false);
		}
	} else {
		var parent = t.data('parent');
		// active
		var all = true;
		box.find('.item[data-parent="'+parent+'"]').each(function() {
			if (!$(this).hasClass('active')) all = false;
		});

		box.find('.item[data-val="'+parent+'"] input').prop('checked', all);
		if (all) {
			box.find('.item[data-val="'+parent+'"]').addClass('active');
		} else {
			box.find('.item[data-val="'+parent+'"]').removeClass('active');
		}
	}
	*/

	if (box.hasClass('select-list')) {
		var btn = box.find('.select-btn');
		var count = box.find('.item.active').length;
		// btn.find('span').remove();
		// var name = btn.text();
		if (count > 0) {
			box.addClass('selected1');
			btn.find('.count span').html(count);
		} else {
			btn.find('.count span').html('0');
			btn.removeClass('selected1');
		}
	}
	// count
	delay(function() { $.fn.ffilter('counter', {'count': 'update', 'pager': 'new', 'page': 'update', 'title': true}); }, delaytime);
});
// price/area list check
$('#filter-main').on('mouseup', '.list .i:not(.disabled)', function() {
	$('#filter-main input[name="page"]').val('');
	var t = $(this);
	var val = t.data('val');
	var field = t.parent().parent();
	// delete other item
	t.parents('.list').find('.i').removeClass('active');
	// this add active
	t.toggleClass('active');
	// replace value input
	t.parent().parent().find('input').val(val);
	// disabled min value
	if (field.hasClass('from')) {
		val = parseInt(val+' '.replace(/\s+/g,''));
		// if val from > val to && val to > 0
		var to = parseInt(field.parent().find('.to input').val()+' '.replace(/\s+/g,''));
		if (to > '0' && val > to) field.parent().find('.to input').val(t.data('val'));
		// remove disabled all
		var list = t.parents('.filter-field').find('.to .list .i').removeClass('disabled');
		list.each(function() {
			if (parseInt($(this).data('val')) <= val) $(this).addClass('disabled');
		});
	}
	// count
	delay(function() { $.fn.ffilter('counter', {'count': 'update', 'pager': 'new', 'page': 'update', 'title': true}); }, delaytime);
});
$('#filter-main').on('mouseup', '.currency .item:not(.active)', function() {
	$('#filter-main input[name="page"]').val('');
	var val = $(this).data('cy');
	$('.currency .item').removeClass('active');
	$(this).addClass('active');
	if (val == 'r') {
		val = null;
		$('body').addClass('cu-r').removeClass('cu-u');
	} else $('body').addClass('cu-u').removeClass('cu-r');
	$('#filter-main input[name="currency"]').val(val);
	var update = false
	$('#filter-main .filter-field[data-type="price"] input').each(function() {
		if ($(this).val()) update = true;
	});
	if (update) delay(function() { $.fn.ffilter('counter', {'count': 'update', 'pager': 'new', 'page': 'update', 'title': true}); }, delaytime);
});
// rooms
$('#filter-main').on('mouseup', '.filter-field[data-type="rooms"] .checktype .type:not(.active)', function() {
	$('#filter-main input[name="page"]').val('');
	$('.filter-field[data-type="rooms"] .checktype .type').removeClass('active');
	$(this).addClass('active');
	var field = $(this).data('field');
	if (field == 'bedrooms') $('input[name="roomchoose"]').val(field);
	else $('input[name="roomchoose"]').val('');
	// clear
	if ($(this).closest('.filter-field').find('.content-field .item.active').length) {
		$(this).closest('.filter-field').find('.content-field .item.active').removeClass('active');
		delay(function() { $.fn.ffilter('counter', {'count': 'update', 'pager': 'new', 'page': 'update', 'title': true}); }, delaytime);
	}
	// $(this).closest('.filter-field').attr('data-type', field);
});



$('#filter-main').on('focusout', '.filter-field input:not([type="search"])', function() {
	$('#filter-main input[name="page"]').val('');
	var t = $(this);
	// Если просто тыкают, ничего не меняя
	if (!t.attr('data-val') && !t.val()) return false;
	// Если есть значение
	if (t.val()) {
		var val = parseInt(t.val()+' '.replace(/\s+/g,''));
		var to = parseInt(t.parents('.filter-field').find('.to input').val()+' '.replace(/\s+/g,''));
		// if val from > val to
		if (t.parent().hasClass('from') && to > '0' && val > to) t.parents('.filter-field').find('.to input').val(t.val());
	}
	if (t.attr('data-val') && t.val().replace(/\s+/g,'') == t.attr('data-val')) return false;
	t.attr('data-val', t.val().replace(/\s+/g,''));
	// count
	delay(function() { $.fn.ffilter('counter', {'count': 'update', 'pager': 'new', 'page': 'update', 'title': true}); }, delaytime);
});
$('#filter-main').on('keyup', '.filter-field input', function() {
	var t = $(this);
	var val = parseInt(t.val()+' '.replace(/\s+/g,''));
	/* if (val < '1000000') {
		val = val+'0 000 000';
		t.val(val);
	} */
});
// Открытие фильтра по географии
$('#filter-main').on('mouseup', '.filter-field[data-type="district-gorod"] .select-btn', function() {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$('.full-filter-main-box').hide(time);
	} else {
		$(this).addClass('active');
		$('.full-filter-main-box').show(time);
	}
});
// Выбор одного из пунктов в географии
$('#filter-main').on('click', '.full-filter-main-box .column li', function() {
	// Добавление в список
	if ($(this).hasClass('active')) {
		$('#filter-main .bottom-line .select-item .item[data-id="'+$(this).data('tid')+'"]').remove();
		$(this).removeClass('active');
	} else {
		$('#filter-main .bottom-line .select-item').append('<div class="item" data-id="'+$(this).data('tid')+'">'+$(this).text()+' <span></span></div>');
		$(this).addClass('active');
	}
	$(this).closest('.boxes').find('.title-box').removeClass('active');
	// Подсчет
	var count = $('.full-filter-main-box .table li.active').length;
	$('.filter-field[data-type="district-gorod"] .count').text(count);
	// Сохранение данных
	var select = [];
	$('.full-filter-main-box .table').each(function(){
		var type = $(this).data('type');
		if (type && $(this).find('li.active')) {
			var item = {};
			item[type] = $(this).find('li.active').map(function(){ return $(this).attr('data-tid'); }).get();
			select.push(item);
		}
	});	
	$('.filter-field[data-type="district-gorod"]').attr('data-select', $.toJSON(select));
	// Сразу вывод
	delay(function() { $.fn.ffilter('counter', {'count': 'update', 'pager': 'new', 'page': 'update', 'title': true}); }, delaytime);
});
$('#filter-main').on('click', '.full-filter-main-box .column .title-box', function() {
	if ($(this).hasClass('active')) {
		$(this).removeClass('active');
		$(this).closest('.boxes').find('li').removeClass('active');
	} else {
		$(this).addClass('active');
		$(this).closest('.boxes').find('li').addClass('active');
	}
	// Подсчет
	var count = $('.full-filter-main-box li.active').length;
	$('.filter-field[data-type="district-gorod"] .count').text(count);
	// Сохранение данных
	var select = [];
	$('.full-filter-main-box .table').each(function(){
		var type = $(this).data('type');
		if (type && $(this).find('li.active')) {
			var item = {};
			item[type] = $(this).find('li.active').map(function(){ return $(this).attr('data-tid'); }).get();
			select.push(item);
		}
	});
	delay(function() { $('.filter-field[data-type="district-gorod"]').attr('data-select', $.toJSON(select)); }, delaytime);
});
// Кнопка сохранить
$('#filter-main').on('click', '.full-filter-main-box .search-fast-boxes .btn-save', function() {
	$('.filter-field .select-btn.active').removeClass('active');
	$('.full-filter-main-box').hide(time);
	// count
	delay(function() { $.fn.ffilter('counter', {'count': 'update', 'pager': 'new', 'page': 'update', 'title': true}); }, delaytime);
});
// load more
$('#pager-wrap').on('click', '.load-more', function() {
	if ($('#filter-main input[name="page"]').val()) $('#filter-main input[name="page"]').val(parseInt($('#filter-main input[name="page"]').val())+1);
	else $('#filter-main input[name="page"]').val(1);
	delay(function() { $.fn.ffilter('counter', {'count': '', 'pager': 'load-more', 'page': 'update'}); }, delaytime);
});
// pagination
$('#pager-wrap').on('click', 'li a', function() {
	var val = $(this).data('page');
	$('#filter-main input[name="page"]').val(val);
	$('html, body').stop().animate({ scrollTop: $('#content-wrap').offset().top-80 }, 300);
	delay(function() { $.fn.ffilter('counter', {'count': '', 'pager': 'pager', 'page': 'update', 'title': true}); }, delaytime);
	return false;
});
// view
$('.header-main .view').unbind('click').on('click', '.line:not(.active)', function() {
	var view = $(this).data('type');
	if (view == 'map') {
		$('#content-wrap').html(spin);
		$('#map-overview').removeClass('hide');
		$('.header-main .sort, #pager-wrap').addClass('hide');
	} else {
		$('#map-overview').addClass('hide');
		$('.header-main .sort, #pager-wrap').removeClass('hide');
	}
	$('.header-main .view .line.active').removeClass('active');
	$(this).addClass('active');
	$('#filter-main input[name="view"]').val(view);
	
	delay(function() { $.fn.ffilter('counter', {'count': '', 'pager': '', 'page': 'update', 'title': true}); }, delaytime);
});
// build choosen
function sortbyname(a, b){
	var aName = a.name.toLowerCase();
	var bName = b.name.toLowerCase(); 
	return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}
function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
}
$('.build-choseen .select-btn').on('click', function() {
	// list build housing
	var box = $(this).parent();
	var listing = box.find('.listing');
	if (box.hasClass('active')) {
		box.removeClass('active');
		listing.slideUp(500);
	} else {
		box.addClass('active');
		listing.slideDown(500);
	}
});
$('.build-choseen').on('change', '.listing input', function() {
	delay(function() { $.fn.ffilter('counter', {'count': '', 'pager': '', 'page': 'update', 'title': true}); }, delaytime);
});



// text line
/*
$('#filter-main .cwsearch').on('keyup', 'input', function() {
	var t = $(this).val();
	if (t.length >= 3) {
		$(this).attr('data-original', t);
		// Исключенные
		var exclude = [];
		$('#filter-main .bottom-line .select-item .item').each(function() {
			exclude.push($(this).data('id'));
		});
		// Тогда лишь начинаем поиск, разбор и т.п.
		var info = {
			'type': 'cwsearch',
			'val': t,
			// 'ids': $('#filter-main .search-input').attr('data-ids'),
			'exclude': exclude
		};
		$('body').addClass('actives-search');
		$.ajax({
			url: '/system/options',
			type: 'post',
			data: 'data=' + $.toJSON(info),
			success: function(data) {
				if ($('.cwsearch #search-result').length == 0) $('.cwsearch').append('<div id="search-result">'+data+'</div>');
				else $('.cwsearch #search-result').html(data);
			}
		});
	} else {
		$('body').removeClass('actives-search');
		$('.cwsearch #search-result').html('');
	}
});
*/
// click result
$('#filter-main .cwsearch').on('click', '.search-result .line', function() {
	var t = $(this);
	var tid = t.data('sid');
	var vid = t.data('vid');

	if (vid == 'district') {
		$('.table[data-type="'+vid+'"] li[data-tid="'+tid+'"]').trigger('click');
	} else {
		if ($('#filter-main select[name="'+vid+'"] option[value="'+tid+'"]').length == 0) {
			$('#filter-main select[name="'+vid+'"]').append('<option selected value="'+tid+'">'+t.text()+'</option>');
			$('#filter-main .bottom-line .select-item').append('<div class="item" data-id="'+tid+'">'+t.find('.type').text()+' '+t.find('.name').text()+' <span></span></div>');
		}
	}
	setTimeout(function () {
		if ($('#filter-main input[name="page"]').val()) $('#filter-main input[name="page"]').val('');
		$('#filter-main .cwsearch input[type="text"]').val('');
		$('#filter-main .btn-search-full').trigger('click');
	}, 100);

});
Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        // Второй параметр - число элементов, которые необходимо удалить
        return this.splice(idx, 1);
    }
    return false;
}
// remove result
$('#filter-main').on('click', '.select-item .item span', function() {
	var tid = $(this).parent().data('id');
	if ($('#filter-main select.hide-select option[value="'+tid+'"]').length) $('#filter-main select.hide-select option[value="'+tid+'"]').remove();
	else {
		// check termin
		$('#filter-main .filter-field.active').each(function() {
			var value = $(this).data('select');
			var count = null;
			$.each(value, function(index, val) {
				$.each(val, function(i, v) { 
					v.remove(tid.toString());
					count = v.length;
				});
			});
			$(this).attr('data-select', $.toJSON(value)).find('span.count').text(count);
		});
	}
	$(this).parent().remove();
	setTimeout(function () {
		$('#filter-main .btn-search-full').trigger('click');
	}, 50);
});


// map view
if ($('input[name="view"]').val() == 'map') {
	$('#map-overview').removeClass('hide');
	$.fn.ffilter('maps');
}


// order
$('.header-main .sort').on('click', '.line', function() {
	var type = $(this).data('type');
	var order = $(this).attr('data-order-by');
	if (!order) order = 'desc';
	else {
		if (order == 'desc') order = 'asc';
		else order = 'desc';
	}
	$(this).attr('data-order-by', order);
	
	if (!$(this).hasClass('active')) {
		$('.header-main .sort .line').removeClass('active');
		$(this).addClass('active');
	}
	$('#filter-main input[name="order"]').val(type);
	$('#filter-main input[name="order-by"]').val(order);
	$('#filter-main input[name="page"]').val('');

	// update
	delay(function() { $.fn.ffilter('counter', {'count': '', 'pager': '', 'page': 'update'}); }, delaytime);
});


});