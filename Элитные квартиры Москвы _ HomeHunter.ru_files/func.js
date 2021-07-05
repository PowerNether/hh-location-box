(function( $ ) {
var spinner = '<div class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div><div class="text">Выполняется загрузка<span id="blink1">...</span></div>';
// проверка num
function isNumber(n) { return !isNaN(parseFloat(n)) && isFinite(n); }
var methods = {
    counter: function(options) {
    	// Вдруг нам просто требуется получить id
    	$('body').addClass('loading');
		$('#content-wrap').prepend('<div id="loading"><div class="windows8"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div></div>');

    	var ids = false
    	if (options['ids']) ids = true;
    	// Тип недвижимости
		var type = $('#filter-main input[name="type"]').val();
		// select`ы
		var values = {};
		$('#filter-main .filter-field:not(.select-list) select').each(function() {
			var type = $(this).attr('name').replace('[]', '');
			var count = $('#search-filter .type-property .'+type+' .input-select select:first option:selected').length;
			if (count > 0) {
				var value = $('#search-filter .type-property .'+type+' .input-select select:first option:selected');
				value = $.map(value, function(obj){ return obj.value}).join(',');
				values[type] = value;
			}
		});
		// Прочее
		$('#filter-main input[type="checkbox"]:checked:not(.filled-in)').each(function() {
			var	type = $(this).attr('name');
			var value = $(this).val();
			value = value.replace(/ /g, '');
			if (value > 0 && type !== 'decor[]') values[type] = value;
		});
		// housing
		$('#filter-main .build-choseen .listing input[type="checkbox"]').each(function() {
			var type = $(this).attr('name').replace('[]', '');
			var count = $('#filter-main .build-choseen .listing input[type="checkbox"]:checked').length;
			if (count > 0) {
				var value = $('#filter-main .build-choseen .listing input[type="checkbox"]:checked');
				value = $.map(value, function(obj){ return obj.value}).join(',');
				values[type] = value;
			}
		});
		// input
		$('#filter-main .filter-field input[type=text]').each(function() {
			var	type = $(this).parents('.filter-field').data('type');
			if ($(this).parents('div').attr('class') == 'from' || $(this).parents('div').attr('class') == 'to') type = type+'-'+$(this).parents('div').attr('class');
			var value = $(this).val();
			value = value.replace(/ /g, '');
			if (value > 0 || value.length) values[type] = value;
		});
		// Прочие параметры
		$('#filter-main .filter-field .item.active').each(function() {
			var type = $(this).parents('.filter-field').data('type');
			var value = $(this).data('val');
			if (value !== undefined && value !== null) {
				if (values[type] == null) values[type] = value;
				else values[type] += ','+value;
			}
		});
		// Выбранные параметры
		$('#filter-main .selectparams .item').each(function() {
			var type = $(this).data('type');
			var value = $(this).attr('data-val');
			values[type] = value;
		});
		// decor fix
		if ($('#filter-main .filter-field[data-type="decor"] .list .item[data-val="1"]').hasClass('active') &&
			$('#filter-main .filter-field[data-type="decor"] .list .item[data-val="2"]').hasClass('active')) {
			if (values['decor'] == '1,2') values['decor'] = values['decor'].replace('1,2', '');
			if (!values['decor']) delete values['decor'];
		}
		// Прочие параметры
		$('#filter-main input[type="hidden"]').each(function() {
			var	type = $(this).attr('name');
			var value = $(this).val();
			value = value.replace(/ /g, '');
			if ((value > 0 || value) && type !== 'type') values[type] = value;
		});
		// Прочие, скрытые параметры
		$('#filter-main select.hide-select').each(function() {
			var type = $(this).attr('name').replace('[]', '');
			var value = $('#filter-main .hide-select[name="'+type+'"] option:selected');
			if (value.length > 0) {
				value = $.map(value, function(obj){ return obj.value}).join(',');
				values[type] = value;
			}
		});
		// Разделы
		$('#filter-main .filter-field.active').each(function() {
			var type = $(this).data('type');
			var value = $(this).attr('data-select');
			value = eval(value);
			$.each(value, function(index, val) {				
				$.each(val, function(i, v) {
					values[i] = v;
				});
			});
		});
		// change url
		var data = $.map(values, function(val, key){ return key+'='+val; }).join('&');
		if (data) var url = window.location.pathname+'?'+data;
		else var url = window.location.pathname;
		
		if (!ids) window.history.replaceState({}, '', url);
		// send params
		var info = {
        	'type': 'filter',
        	'values': values,
        	'url': window.location.pathname,
        	'ids': ids
		};
		var node = false;
		if ($('.npc').data('nid')) {
			info['url'] = '/node/'+$('.npc').data('nid');
			node = true;
		}
		// params
		if (!ids && options['count'] == 'update') {
			$('#filter-main .btn-search-full span').html('...');
		}
		if (!ids && options['pager'] == 'new') {
			$('input[name="page"]').val('');
			$('#pager-wrap').html('');
		}
		$.ajax({
			url: '/system/options',
			type: 'post',
			data: 'data=' + $.toJSON(info),
			success: function(data) {
				if (ids) $('#filter-main .search-input').attr('data-ids', data);
				if (window.location.pathname == '/map' || $('input[name="view"]').val() == 'map') {
					if (data['title']) {
						$('.header-main .count').html(data['title']);
						$('#map-overview').attr('data-points',  $.toJSON(data['content']));
						if ($('#map-overview').length == 0) $.fn.ffilter('maps');
					} else {
						$('#map-overview').attr('data-points',  $.toJSON(data));
					}
					$.fn.ffilter('maps');
				} else {
					// count
					if (options['count'] == 'update') $('#filter-main .btn-search-full span').html(data['countresult']);
					if (data['title']) {
						$('.header-main .count').html(data['title']);
					}
					// new content
					if (options['pager'] == 'load-more') {
						if (node) {
							$('.fl-table #content-wrap').append(data['content']);
						} else {
							$('#content-wrap').append(data['content']);
						}
						$('#pager-wrap').html(data['pager']);
					} else if (options['pager'] == 'pager') {
						$('#content-wrap').html(data['content']);
						$('#pager-wrap').html(data['pager']);
					} else {
						$('#content-wrap').html(data['content']);
						$('#pager-wrap').html(data['pager']);
					}
					 var sliders = new Object();
					$('.termin-main-box > .photo-box .slidercar:not(.tns-slider)').each(function() {
						var box = $(this).attr('id');
				        sliders[box] = tns({
				          container: '#'+box,
							items: 1,
					        nav: false,
					        lazyload: true,
					        mouseDrag: true,
					        swipeAngle: false,
					        speed: 400,
					        controlsText: ['<span></span>', '<span></span>']
						});
						sliders[box].events.on('transitionEnd', function(info, eventName) {
							$('#'+box).closest('.termin-main-box').find('.count .current').html(info.displayIndex);
						});
						$('.termin-main-box.object .info .video').on('click', function() {
					        var box = 'slider-'+$(this).closest('.object').attr('data-id');
        					sliders[box].goTo(1);
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
					        thumbnail: false,
					        download: false,
					        enableDrag: true,
					        enableSwipe: true,
					        thumbnail: true,
					        rotate: false
					    });
					    $('.termin-main-box.object .photo-box').lightGallery({
				        	selector: '.planbox',
				        	fullscreen: false,
				        	autoplayControls: false,
				        	download: false,
				        	actualSize: false,
				        	hash: false,
				        	showThumbByDefault: false,
				        	thumbnail: false,
				        	getCaptionFromTitleOrAlt: false,
				        	share: false,
				        	showThumbByDefault: false,
				        	download: false,
				        	enableDrag: false,
				        	enableSwipe: false,
				        	rotate: false
				        });
					});
					$('#content-wrap .termin-main-box').find('.use-ajax').once('ajax').each(function (i, ajaxLink) {
						var $linkElement = $(ajaxLink);
				    	var elementSettings = {
				        	progress: { type: 'throbber' },
				        	dialogType: $linkElement.data('dialog-type'),
				        	dialog: $linkElement.data('dialog-options'),
				        	dialogRenderer: $linkElement.data('dialog-renderer'),
				        	base: $linkElement.attr('id'),
				        	element: ajaxLink
						};
						
						var href = $linkElement.attr('href');

						if (href) {
				    		elementSettings.url = href;
				    		elementSettings.event = 'click';
				    	}
				    	Drupal.ajax(elementSettings);
				    });
				}
				$('#content-wrap #loading').remove();
				if ($('body').hasClass('cu-u')) {
					$('.price-box').each(function() {
						$(this).find('.num').text($(this).find('.num').data('usd'));
						$(this).find('.s').text('$');
					});
				}
			}
		});
		// update
		/*
		setTimeout(function() {
			jQuery.each(Drupal.views.instances, function(i, view) {
				var id = '.js-view-dom-id-'+view.settings.view_dom_id;
				if (view.settings.view_name == 'taxonomy_term') {
					view.settings.view_args = values;
					console.log(view.settings);
					jQuery(id).once().triggerHandler('RefreshView');
				}
				jQuery(id).unbind();
		    });
		}, 100);
		*/
	    /*
	    $.ajax({
		    url: '/views/ajax',
		    type: 'POST',
		    data: {
		      view_name: 'taxonomy_term',
		      view_display_id: 'page_1',
		      view_args: 269,
		      values: values
		    },
		    dataType: 'json',
		    success: function (response) {
		        $('.contextual-region').html(response[2].data);
		    }
		});
		*/
    },
    maps: function() {
    	ymaps.ready(function () {
	    	var spin = '<div class="cssload-box-loading"></div>';
    		$('#map-overview').html('');
			var map = new ymaps.Map('map-overview', {center: [55.7517318022522, 37.61691485505143], zoom: 12, controls: []});
			// Элементы управления
			map.controls.add('typeSelector', {float: 'left'});
			map.controls.add('zoomControl', {float: 'left'});
			// Объекты
			// ymaps.modules.require(['PieChartClusterer'], function (PieChartClusterer) {
			var clusterer = new ymaps.Clusterer({
				clusterIconLayout: 'default#pieChart',
				clusterIconPieChartRadius: 25,
				clusterIconPieChartCoreRadius: 10,
				clusterIconPieChartStrokeWidth: 3,
				hasBalloon: false
			});
			var objects = eval($('#map-overview').attr('data-points'));
			if (!objects) objects = eval($('#content-wrap').attr('data-points'));
			var points = [];
			// Выводим объекты
			$.each(objects, function (index, val) {
				points[index] = new ymaps.Placemark(
					[val.lon, val.lat],
					{balloonContent: val.id, iconContent: val.type, clusterCaption: val.title},
					{preset: val.preset, iconColor: '#4C4DA2', hasBalloon: false}
				);
			});
			clusterer.add(points);
			map.geoObjects.add(clusterer);
			map.geoObjects.events.add('click', function (e) {
				$('body').addClass('open-map-content');
				map.container.fitToViewport(true);
				var obj = e.get('target');
				var ids = [];
				$.each(obj.properties.get('geoObjects'), function(index, val) {
					ids.push(val.properties.get('balloonContent'));
				});
				ids = $.toJSON(ids);
				// сверха
				if (!$('.map-content').attr('data-content') || ($('.map-content').attr('data-content') && $('.map-content').attr('data-content') !== ids)) {
					$('.map-content').html(spin);
					// Обновление
					$('.map-content').attr('data-content', ids);
					// Загрузка контента (объектов)
					var info = {
						'type': 'ballooncontent',
						'ids': ids
					}
					$.ajax({
						url: '/system/options',
						type: 'post',
						data: 'data=' + $.toJSON(info),
						success: function(data) {
							$('.map-content').html(data);
						}
					});
				}
			});
			// center
			var centerAndZoom = ymaps.util.bounds.getCenterAndZoom(map.geoObjects.getBounds(), map.container.getSize());
			map.setCenter(centerAndZoom.center);
			// zoom
			var mapSize = map.container.getSize();
			var centerAndZoom = ymaps.util.bounds.getCenterAndZoom(
				map.geoObjects.getBounds(),
				mapSize,
				ymaps.projection.wgs84Mercator, {margin: 30}
			);
			map.setZoom(centerAndZoom.zoom <= 16 ? centerAndZoom.zoom : 16);
			$('.cssload-box-loading').remove();
		});
    }
};


$.fn.ffilter = function( method ) {
	if ( methods[method] ) { return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) { return methods.init.apply( this, arguments );
	} else { $.error('error'); } 
};


})(jQuery);