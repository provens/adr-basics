$(function(){
	$("scroll-to-top").click(function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, 2000);
	});
});