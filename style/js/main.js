$(".rt-arrow").click(function(){
    $(".slider-container").animate({
        scrollLeft:'+=930'
    },1000);
});

$(".lt-arrow").click(function(){
    $(".slider-container").animate({
        scrollLeft:'-=900'
    },1000);
});
