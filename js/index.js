jQuery(function($){
	'use strict';
	// -------------------------------------------------------------
	// -------------------------------------------------------------
	(function () {
		var $frame  = $('#inbar-slide');
		var $slidee = $frame.children('ul').eq(0);
		var $wrap   = $frame.parent();

		// Call Sly on frame
		$frame.sly({
			horizontal: 1,
			itemNav: 'basic',
			smart: 1,
			mouseDragging: 1,
			touchDragging: 1,
			releaseSwing: 1,
			scrollBy: 1,
			activatePageOn: 'click',
			speed: 1000,
			elasticBounds: 1,
			dragHandle: 1,
			dynamicHandle: 1,
			clickBar: 1,

			// Buttons
			prevPage: $wrap.find('.prevPage'),
			nextPage: $wrap.find('.nextPage')
		});

		// Add item
		$wrap.find('.add').on('click', function () {
			$frame.sly('add', '<li>' + $slidee.children().length + '</li>');
		});

		// Remove item
		$wrap.find('.remove').on('click', function () {
			$frame.sly('remove', -1);
		});
		//select bottle
		$slidee.children('li').on('click', function(){
			$(this).addClass('selected');
		});
		//unselected
		$slidee.find('.slide-x').on('click', function(event){
			event.stopPropagation();
			$(this).closest('li').removeClass('selected');
		});

	}());

////////////////////////////end sly

	$(document).ready(function(){
		////filter
		var filter = {

			$filterList: $('.filter-list'),
			$filterLi: $('.filter-list li'),
			$filterItem: $('.filter-list').find('.filter-item'),
			$filterAll: $('.filter-list .filter-all'),

			init: function(){
				this.addFilter();
				this.resetFilter();
			},
			addFilter: function(){
				var self = this;
				this.$filterItem.on('click', function(){
						$(this).parent().toggleClass('active');
						if(self.$filterAll.parent('li').hasClass('active'))
							self.$filterAll.parent('li').removeClass('active')
				});
			},
			resetFilter: function(){
				var self = this;
				$('.filter-reset').on('click', function(){
					self.$filterLi.removeClass('active');
					self.$filterAll.parent('li').addClass('active');
				});
			}
		};
		filter.init();
		//end filter

		//card user 

		var userCard = {

			$charList: $('.chart-list'),
			$inbarList: $('.inbar-list'),

			init: function(){
				this.clickInbar();
				this.clickChart();
			},
			addItem: function(title, id){
				$('.chart-list').append('<li data-id="' + id + '"><span class="chart-list-text">' + title + '<span class="char-list-x"></span></span></li>');
				this.$inbarList.find('[data-id="' + id + '"]').addClass('selected');
			},
			removeItem: function(id){
				this.$charList.find('[data-id="' + id + '"]').remove();
				this.$inbarList.find('[data-id="' + id + '"]').removeClass('selected');
			},
			clickInbar: function(){
				var self  = this;
				this.$inbarList.find('.inbar-li-icon').on('click',function(){

					var selected = $(this).parent().hasClass('selected')? true : false;

					if(selected){
						self.removeItem($(this).parent().attr('data-id'));
					}else{
						self.addItem($(this).closest('li').find('.inbar-title').text(), $(this).parent().attr('data-id'));
					}

				});
			},
			clickChart: function(){
				var self = this;
				this.$charList.on('click', '.char-list-x',function(){
					self.removeItem( $(this).closest('li').attr('data-id') );
				});
			}
		};
		userCard.init();
		//end

		//user name hover
		$('.header-user-profile').on('mouseover','.header-user-name',function(){
			$('.header-user-profile').addClass('hover');
		});
		$('.header-user-profile').on('mouseleave',function(){
			
			$('.header-user-profile').removeClass('hover');
		});
		//end

	});


});