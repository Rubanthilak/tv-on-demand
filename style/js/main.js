import { movieList } from './const'

$( document ).ready(()=>{
    let res = "";
    movieList.forEach(function(movie) {
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
});

// NAVBAR CONTROLLER

$("nav p").click(function(event){
    $("nav p").removeClass("active");
    $(event.target).addClass("active");
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

// HELPER FUNCTION

/* Returns the horizontal scroll position of the home screen slider */
function getScrollPosition(){
    return $(".slider-container").first().scrollLeft();  
}

/* To get scroll length */
function getScrollLength(){
    return (320*(10 - ($(window).width()/320))) + 50;
}
