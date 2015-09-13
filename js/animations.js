$(document).ready(function(){    
$('#first').delay(1000).fadeIn(3500);
$('#second').delay(1300).fadeIn(3500);
$('#third').delay(1600).fadeIn(3500);

});

$(window).load(function() {
    

});

$(document).ready(function() {
    
    /* Every time the window is scrolled ... */
    $(window).scroll( function(){
    
        /* Check the location of each desired element */
        $('.hideme').each( function(i){
            
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            
            /* If the object is completely visible in the window, fade it it */
            if( bottom_of_window > bottom_of_object ){
                
                $(this).animate({'opacity':'1'},500);
                      $('#thisIs').delay(100).fadeIn(1500);

                    
            }
            
        }); 
    
    });
    
});