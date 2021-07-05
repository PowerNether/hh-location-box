(function ($) { Drupal.behaviors.hhadmin = { attach: function (context, settings) {

	// Раскрыть все
	$('.admin-header-box').unbind('click').on('click', '.opens', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			var checked = false;
		} else {
			$(this).addClass('active');
			var checked = true;
		}
		$('#filter-main input[name="opens"]').prop('checked', checked);
		$.fn.ffilter('counter', {'count': '', 'pager': '', 'page': 'update'});
	});
	// delete cluster
	$('#page-content').on('click', '.lineproperty-editor .photo span.delete', function() {
		var t = $(this).closest('.lineproperty-editor');
		Swal.fire({
		  title: 'Вы уверены, что хотите удалить лот из кластера?',
		  showDenyButton: true,
		  confirmButtonText: 'Да',
		  denyButtonText: 'Нет'
		}).then((result) => {
		  if (result.isConfirmed) {
		  	var id = t.attr('data-id');
		  	var info = {
				'type': 'deletepropertycluster',
				'id': id
			}
			$.ajax({
				url: '/system/options',
				type: 'post',
				data: 'data=' + $.toJSON(info),
				success: function (data) {
					$('.lineproperty-editor[data-id="'+id+'"]').remove();
		    		Swal.fire('Удалено!', '', 'success');
		    	}
		    });
		  }
		});
	});
}}})(jQuery);

jQuery(document).ready(function($) {
	$('#page-content').on('click', '.copy-open', function() {
		var box = $(this).closest('.termin-main-box');
		if (box.hasClass('open')) {
			box.removeClass('open');
			// box.find('.copys').animate({height : '0px'}, 500);
			// $(this).find('span').text('Развернуть');
		} else {
			box.addClass('open');
			//var height = box.find('.copys').find('.termin-main-box').length;
			// height = height*24+height*box.height();
			// box.find('.copys').animate({height : height},  750);
			// $(this).find('span').text('Свернуть');
		}
	});
	$('#page-content').on('click', '.update', function() {
		var info = {
			'type': 'update-dev',
			'id': $(this).data('id')
		}
		M.toast({html: 'Обновление запущено!'});
		$.ajax({
			url: '/system/options',
			type: 'post',
			data: 'data=' + $.toJSON(info),
			success: function (data) {
				// M.Toast.dismissAll();
				M.toast({html: 'Обновление выполнено за '+data+' сек.!'});
			}
		});
	});
	$('#page-content .datepick input').datepicker();

	// cluster
	$('#content-wrap').on('change', '.termin-main-box .check input', function() {
		if ($('#content-wrap .check input:checked').length == 1) $('#btn-block .cluster').hide(100);
		else if ($('#content-wrap .check input:checked').length > 1) {
			// check only one complex
			var unique = true;
			var complex = null;
			$('#content-wrap .check input:checked').closest('.termin-main-box').each(function() {
				if (!complex) complex = $(this).find('a.complex').text();
				else if (complex !== $(this).find('a.complex').text()) unique = false;
			});
			if (unique) $('#btn-block .cluster').show(100);
			else $('#btn-block .cluster').hide(100);
		}
		if ($('#content-wrap .check input:checked').length > 0) $('#btn-block').show(300);
		else $('#btn-block').hide(300);
		$('#btn-block span').text('('+$('#content-wrap .check input:checked').length+')');
	});
	// Сгруппировать
	$('#btn-block').on('click', '.cluster', function() {
		var list = [];
		$('#content-wrap .check input:checked').each(function(key) {
			list.push({'id': $(this).val(), 'rating': $(this).closest('.termin-main-box').find('.rating span').text()});
		});
		var info = {
			'type': 'addcluster',
			'list': list
		}
		$.ajax({
			url: '/system/options',
			type: 'post',
			data: 'data=' + $.toJSON(info),
			success: function (data) {
				$('#btn-block').hide(300);
				$('#btn-block span').text(0);
				$('#content-wrap .check input:checked').each(function(key) {
					$(this).closest('.termin-main-box').remove();
				});
				$('#content-wrap').prepend(data);
				$('html, body').stop().animate({ scrollTop: $('#content-wrap').offset().top-80 }, 300);
				$('#content-wrap > .termin-main-box > .photo-box .slidercar:not(.tns-slider)').each(function() {
					var box = $(this).attr('id');
					const slider = tns({
						container: '#'+box,
						items: 1,
					    nav: false,
					    lazyload: true,
					    lazyloadSelector: '.owl-lazy',
					    mouseDrag: true,
					    swipeAngle: false,
					    speed: 400,
					    controlsText: ['<span></span>', '<span></span>']
					});
					$(this).lightGallery({
					    selector: '.item:not(.tns-slide-cloned)',
					    fullscreen: true,
					    autoplayControls: false,
					    download: false,
					    actualSize: false,
					    hash: false,
					    getCaptionFromTitleOrAlt: false,
					    share: false,
					    showThumbByDefault: false,
					    download: false,
					    enableDrag: true,
					    enableSwipe: true,
					    thumbnail: true
					});
				});

			}
		});
	});
	// Разгруппировать
	$('#btn-block').on('click', '.no-cluster', function() {
		var list = [];
		$('#content-wrap .check input:checked').each(function(key) {
			list.push({'id': $(this).val()});
		});
		var info = {
			'type': 'uncluster',
			'list': list
		}
		$.ajax({
			url: '/system/options',
			type: 'post',
			data: 'data=' + $.toJSON(info),
			success: function (data) {
				$('#btn-block').hide(300);
				$('#btn-block span').text(0);
				$('#content-wrap .check input:checked').each(function(key) {
					$(this).closest('.termin-main-box').remove();
				});
				$('#content-wrap').prepend(data);
				$('html, body').stop().animate({ scrollTop: $('#content-wrap').offset().top-80 }, 300);
				$('#content-wrap > .termin-main-box > .photo-box .slidercar:not(.tns-slider)').each(function() {
					var box = $(this).attr('id');
					const slider = tns({
						container: '#'+box,
						items: 1,
					    nav: false,
					    lazyload: true,
					    lazyloadSelector: '.owl-lazy',
					    mouseDrag: true,
					    swipeAngle: false,
					    speed: 400,
					    controlsText: ['<span></span>', '<span></span>']
					});
					$(this).lightGallery({
					    selector: '.item:not(.tns-slide-cloned)',
					    fullscreen: true,
					    autoplayControls: false,
					    download: false,
					    actualSize: false,
					    hash: false,
					    getCaptionFromTitleOrAlt: false,
					    share: false,
					    showThumbByDefault: false,
					    download: false,
					    enableDrag: true,
					    enableSwipe: true,
					    thumbnail: true
					});
				});
			}
		});
	});
	// Отгруппровано
	$('#btn-block').on('click', '.yes-cluster', function() {
		var list = [];
		$('#content-wrap .check input:checked').each(function(key) {
			list.push({'id': $(this).val()});
		});
		var info = {
			'type': 'yescluster',
			'list': list
		}
		$.ajax({
			url: '/system/options',
			type: 'post',
			data: 'data=' + $.toJSON(info),
			success: function (data) {
				$('#btn-block').hide(300);
				$('#btn-block span').text(0);
				$('#content-wrap .check input:checked').each(function(key) {
					$(this).closest('.termin-main-box').find('.cluster').removeClass('false').addClass('true').text('Откластеризован');
					$(this).prop('checked', false);
				});
			}
		});
	});
	// обработано
	$('#btn-block').on('click', '.checkin', function() {
		var list = [];
		$('#content-wrap .check input:checked').each(function(key) {
			list.push({'id': $(this).val()});
		});
		var info = {
			'type': 'checkin',
			'list': list
		}
		$.ajax({
			url: '/system/options',
			type: 'post',
			data: 'data=' + $.toJSON(info),
			success: function (data) {
				$('#btn-block').hide(300);
				$('#btn-block span').text(0);
				$('#content-wrap .check input:checked').each(function(key) {
					if ($(this).closest('.termin-main-box').find('.cluster.true').length > 0 && $(this).closest('.termin-main-box').find('.checkin').length == 0) {
						$(this).closest('.termin-main-box').find('.cluster').after('<div class="checkin">Обработан</div>');
						$(this).prop('checked', false);
					}
				});
			}
		});
	});
	// scroll admin edit blog
	$(window).scroll(function() {
		var top = $(this).scrollTop();
		if (top > 600) {
			$('.user-login.node-type-blog .admin-panel').addClass('top');
		} else {
			$('.user-login.node-type-blog .admin-panel').removeClass('top');
		}
	});
	// cluster window
	$('#content-wrap').on('click', '.info-box .second-box .clusteradd', function() {
		$('#addclusternid .savebtn').hide();
		var id = $(this).attr('data-id');
		var info = {
			'type': 'lineobject',
			'id': id
		}
		$('#addclusternid .lot-content').html('');
		$.ajax({
			url: '/system/options',
			type: 'post',
			data: 'data=' + $.toJSON(info),
			success: function (data) {
				$('#addclusternid .lot-content').html(data);
				$('#addclusternid').attr('data-original', true);
			}
		});
		// Загрузка данных для выбора в этом ЖК
		var info = {
			'type': 'chipslineobject',
			'id': id
		}
		$.ajax({
			url: '/system/options',
			type: 'post',
			data: 'data=' + $.toJSON(info),
			success: function (data) {
				var obj = {};
				$.each(data, function(i, v) {
					obj[v] = null;
				});
				$('#addclusternid .chips-autocomplete').chips({
					autocompleteOptions: {
						data: obj,
						limit: Infinity,
						minLength: 2
					},
					onChipAdd: function() {
						if ($('#addclusternid .chips .chip').length > 0) {
							$('#addclusternid .savebtn').show();
						} else {
							$('#addclusternid .savebtn').hide();
						}
					},
					onChipDelete: function() {
						if ($('#addclusternid .chips .chip').length > 0) {
							$('#addclusternid .savebtn').show();
						} else {
							$('#addclusternid .savebtn').hide();
						}
					}
				});
			}
		});
	});
	$('#addclusternid h5 input').on('change', function() {
		var id = $(this).val();
		var info = {
			'type': 'lineobject',
			'id': id,
			'input': true
		}
		$('#addclusternid .lot-content').html('<div class="progress"><div class="indeterminate"></div></div>');
		$.ajax({
			url: '/system/options',
			type: 'post',
			data: 'data=' + $.toJSON(info),
			success: function (data) {
				$('#addclusternid').attr('data-original', false);
				if (!data) data = '<span class="no-found">Объект не найден</span>';
				$('#addclusternid .lot-content').html(data);
			}
		});
	});
	// Сохранить
	$('#addclusternid .savebtn').on('click', function() {
		var list = [];
		list.push({'id': parseInt($('#addclusternid .lineproperty-editor').attr('data-id')), 'rating': 1});
		$('#addclusternid .chips .chip').each(function(key) {
			list.push({'id': parseInt($(this).text().replace(/\D+/g, '')), 'rating': false});
		});
		var info = {
			'type': 'addcluster',
			'list': list
		}
		var update = $('#addclusternid').attr('data-original');

		$.ajax({
			url: '/system/options',
			type: 'post',
			data: 'data=' + $.toJSON(info),
			success: function (data) {
				M.toast({html: 'Данные успешно сохранены'});				
				if (update) {
					$.each(list, function(i, v) {
						$('.termin-main-box[data-id="'+v.id+'"]').remove();
					});
				}
				$('#addclusternid .chips-autocomplete').chips('deleteChip');
				$('.lot-content').html('<span class="no-found">Объект не выбран</span>');
				$('#addclusternid .savebtn').hide();
				$('#content-wrap').prepend(data);
			}
		});
	});

});