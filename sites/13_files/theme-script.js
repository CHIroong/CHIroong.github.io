(function($) {
	/* Edited by AHN. 2013.06.05
	var ClassicPress = {
	   initOnReady: function() {
		   $('.sf-menu').superfish({
			   onInit: function() {
				   $('.sf-sub-indicator').html('<i class="icon-chevron-right"></i>');
			   }
		   });
		   
		   if( $('ul#ticker li').size() !== 1) {
			   $('ul#ticker').webTicker();
		   }
	   },
	   
	   initOnLoad: function() {
		  $('#featured-slider').flexslider({
			  controlNav: true,
			  directionNav: true,
			  prevText: '<span class="icon-chevron-left"></span>',
			  nextText: '<span class="icon-chevron-right"></span>'
		  });
	   }
	}

	jQuery(document).ready(function($) {
		ClassicPress.initOnReady();
	});
	
	jQuery(window).load(function($) {
		ClassicPress.initOnLoad();
	});


	//Featured Module Slider
	jQuery(document).ready(function($) {
		$('#featured-slider').flexslider({
			controlNav: true,
			directionNav: true,
			prevText: '<span class="icon-chevron-left"></span>',
			nextText: '<span class="icon-chevron-right"></span>'
		});
	});
	*/	

	//Go Top Button
	jQuery(window).scroll(function () {
		if (jQuery(this).scrollTop() > 100) {
			jQuery('#back-top').fadeIn();
		} else {
			jQuery('#back-top').fadeOut();
		}
	});	
	$( '#back-top' ).hide();
	$( window ).scroll( function () {
		if ( $( this ).scrollTop() > 100 ) {
			$( '#back-top' ).fadeIn( 300 );
		}
		else {
			$( '#back-top' ).fadeOut( 300 );
		}
	} );
	
	$( '#back-top' ).click( function() {
		$( 'html, body' ).animate( { scrollTop:0 }, 500 );
		return false;
	} );

})(jQuery);

