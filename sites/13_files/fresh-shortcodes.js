jQuery(document).ready( function($) {
	
	/* Tabs Content
	 * ---------------------------------------------- */
	$('ul.fresh-tabs-nav').tabs('div.fresh-panes > div');
	
	/* Accordion
	 * ---------------------------------------------- */
	$('.fresh-accordion').tabs('.fresh-accordion div.fresh-accordion-pane', {
		tabs: '.fresh-accordion-title', 
		effect: 'slide', 
		initialIndex: null
	});
	
	/* Close Alert
	 * ---------------------------------------------- */
	$('.fresh-alert').each(function(index, element) {
        $(this).append('<span class="close">x</span>');
		 $(this).children('.close').click(function() {
			$(this).parent().slideUp();
		});
    });
	
});