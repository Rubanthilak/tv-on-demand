import { movieList } from './const'

$( document ).ready(()=>{
    getSliderData("popular");
});

// NAVBAR CONTROLLER

$("nav p").click(function(event){

    $("#slider").css({opacity:0});
    setTimeout(function(){$("#slider").animate({scrollLeft:'0'},0);},400);

    $("nav p").removeClass("active");
    $(event.target).addClass("active");
    
    setTimeout(function(){
        getSliderData(event.target.id);
        $("#slider").animate({
            opacity:1,
        },300);
    },500)
});

// SLIDER CONTROLLER

$(".rt-arrow").click(function(){
    if(getScrollPosition() < getScrollLength()){
        $(".slider-container").animate({
            scrollLeft:'+=960'
        },1000);
    }
});

$(".lt-arrow").click(function(){
    if(getScrollPosition() > 0){
        $(".slider-container").animate({
            scrollLeft:'-=960'
        },1000);
    }
});

// SLIDER HELPER FUNCTION

/* Returns the horizontal scroll position */
function getScrollPosition(){
    return $(".slider-container").first().scrollLeft();  
}

/* To get horizontal scroll length */
function getScrollLength(){
    return (320*(10 - ($(window).width()/320))) + 50;
}

// RETURN SILDER JSON DATA BASED ON THE NAVBAR

function getSliderData(text){
    let res = "";
    let data;

    if(text === "popular"){
        data = movieList.filter(movie => movie.popular === true);
    }
    else if(text === "featured"){
        data = movieList.filter(movie => movie.featured === true);
    }
    else{
        data = movieList.filter(movie => movie.toprated === true);
    }

    data.forEach(function(movie) {
        res += `
                    <div class="card" id="${movie.imdbID}">
                    <img src="${movie.Poster}" alt="${movie.Title}">
                    <div class="card-details">
                    </div>
                    </div>
                `;
        });
        res +=`
            <div class="padding" ></div>
        `;
    $("#slider").html(res);

}
