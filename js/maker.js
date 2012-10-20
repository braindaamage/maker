/**
 * Funciones JS
 * For Maker
 * Octubre 2012
 *   
 * Author: Leonardo Olivares
 * 		   leonardo.olivares@me.com
 * 		   @lucyan
 */

$(document).ready(function() {

	//INFO PANEL
	var infoShowed = false
	var menuShowed = true
	
	$('#info-btn').click(function(){
		if(!infoShowed){
			//alert('going to show')
			$('#info').slideDown(900, 'easeInOutExpo')
			$('#info-btn').html('ok, thanks! now you can close this.')
			$("#menu").stop().animate({opacity: 0}, "fast");
			infoShowed = true
			menuShowed = false
		}else{
			$('#info').slideUp(900, 'easeInOutExpo')
			$('#info-btn').html('be social .. keep in touch!')
			$("#menu").stop().animate({opacity: 1}, "fast");
			//alert('going to hide')
			infoShowed = false
			menuShowed = true
		}
	});

	// Se esconde al hacer scroll!
	$(window).scroll(function() {	
		if(infoShowed){
			$('#info').slideUp(900, 'easeInOutExpo')
			$('#info-btn').html('be social .. keep in touch!')
			$("#menu").stop().animate({opacity: 1}, "fast");
			infoShowed = false
			menuShowed = true
		}
	});

	// Botones menú
	$('#home-btn img').click(function(){
		$('html, body').stop().animate({
			scrollTop: $("#info-btn").offset().top 
		}, 2100,'easeInOutExpo');				   
	});

	$('#servicios-btn img').click(function(){
		$('html, body').stop().animate({
			scrollTop: $("#servicios").offset().top 
		}, 2100,'easeInOutExpo');				   
	});

	$('#portafolio-btn img').click(function(){
		$('html, body').stop().animate({
			scrollTop: $("#portafolio").offset().top 
		}, 2100,'easeInOutExpo');				   
	});

	$('#contacto-btn img').click(function(){
		$('html, body').stop().animate({
			scrollTop: $("#footer").offset().top 
		}, 2100,'easeInOutExpo');				   
	});
});