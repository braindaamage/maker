/**
 * Funciones JS
 * For Maker
 * Octubre 2012
 *   
 * Author: Leonardo Olivares
 * 		   leonardo.olivares@me.com
 * 		   @lucyan
 */
var infoShowed = false
var posInicialHome = -330;

$(document).ready(function() {

	// Tamaño de ventana
	$('.clientes-info').css('width', $(window).width() + 'px');
	$('.capas').css('width', $(window).width() + 'px');
	$('.story').css('width', $(window).width() + 'px');

	// Lighbox
	$('.gallery').colorbox();
	
	//INFO PANEL
	//var infoShowed = false
	var menuShowed = true
	
	$('#info-btn').click(function(){
		if(!infoShowed){
			for (var i = 0; i <= 330; i++) {
				setTimeout("$('#home, #home div').css('background-position-y', '"+(posInicialHome+i)+"px');",i*2);
			};
			//alert('going to show')
			$('#info').slideDown(900, 'easeInOutExpo');
			$('#info-btn').html('ok, thanks! now you can close this.');
			$("#menu").stop().animate({opacity: 0}, "fast");
			infoShowed = true;
			menuShowed = false;
		}else{
			j = 0;
			for (var i = 330; i >= 0; i--) {
				setTimeout("$('#home, #home div').css('background-position-y', '"+(posInicialHome+i)+"px');",j*2);
				j++;
			};
			$('#info').slideUp(900, 'easeInOutExpo');
			$('#info-btn').html('be social .. keep in touch!');
			$("#menu").stop().animate({opacity: 1}, "fast");
			//alert('going to hide')
			infoShowed = false;
			menuShowed = true;
		}
	});

	// Se esconde al hacer scroll!
	$(window).scroll(function() {	
		if(infoShowed){
			j = 0;
			for (var i = 330; i >= 0; i--) {
				setTimeout("$('#home, #home div').css('background-position-y', '"+(posInicialHome+i)+"px');",j*2);
				j++;
			};
			$('#info').slideUp(900, 'easeInOutExpo');
			$('#info-btn').html('be social .. keep in touch!');
			$("#menu").stop().animate({opacity: 1}, "fast");
			infoShowed = false;
			menuShowed = true;
		}
	});

	// Botones menú
	$('#home-btn span').click(function(){
		$('html, body').stop().animate({
			scrollTop: $("#home").offset().top-30
		}, 2100,'easeInOutExpo');				   
	});

	$('#servicios-btn span').click(function(){
		$('html, body').stop().animate({
			scrollTop: $("#servicios").offset().top-30
		}, 2100,'easeInOutExpo');				   
	});

	$('#portafolio-btn span').click(function(){
		$('html, body').stop().animate({
			scrollTop: $("#portafolio").offset().top-30
		}, 2100,'easeInOutExpo');				   
	});

	$('#contacto-btn span').click(function(){
		$('html, body').stop().animate({
			scrollTop: $("#contacto").offset().top-30
		}, 2100,'easeInOutExpo');				   
	});


	// Corrección última imagen

	if ($(window).height() != 751) {
		porcentaje = ($(window).height() * 100) / 751;
		nuevoY = (porcentaje * 460) / 100;
		$('#contacto .imagen').attr('data-offsetY', nuevoY);
	}


	// scroll 
	$(window).scroll(function() {
		if (!infoShowed) {
			$('[data-type="div-sprite"]').each(function() {
				
				// Cache the sprite
				var $sprite = $(this);
				
				// Use the same calculation to work out how far to scroll the sprite
				var yPos = -($window.scrollTop() / $sprite.data('speed'));
				var coords = (yPos + $sprite.data('offsetY')) + 'px';
				
				$sprite.css( 'margin-top', coords );													
				
			}); // sprites
		};
		
	});

	// Envio de E-mail
	$('#enviarcorreo').submit(function(event){
		$('input[type="submit"]').attr('disabled','disabled');
    	$.post(this.action, $(this).serialize(), function(returnData){
    		var data = $.parseJSON(returnData);
    		if (data.status == 0) {
    			alert("Tu correo se envió correctamente");
    			$('input[type="text"]').val('');
    			$('textarea').val('');
    			$('#captcha').attr('src', 'bgcaptcha.gif');
    		} else {
    			alert(data.error);
    		}
    		$('input[type="submit"]').removeAttr('disabled');
   	 	})
		return false; //do not submit form the normal way
	});
});