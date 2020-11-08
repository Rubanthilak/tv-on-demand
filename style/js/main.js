import { movieList } from './const'

$( document ).ready(()=>{
    getSliderData("popular");
});

// NAVBAR CONTROLLER

$("nav p").click(function(event){

    $("#slider").css({opacity:0});
    $("nav p").removeClass("active");
    $(event.target).addClass("active");

    setTimeout(function(){
        $("#slider").animate({scrollLeft:'0'},0); /* Reset the silder to initial position*/
    },400);

    setTimeout(function(){
        getSliderData(event.target.id);
        $("#slider").animate({
            opacity:1,
        },300);
    },500);
    
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

// PROVIDES SILDER JSON DATA BASED ON THE NAVBAR

function getSliderData(text){
    let res = "";
    let data = [];

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
                            <div class="text-holder">
                                <p class="title">${movie.Title}</p>
                                <p class="subtitle">Imdb &nbsp;<span>${movie.imdbRating}</span>&nbsp;&nbsp;|&nbsp;&nbsp;${movie.Year} </p>
                            </div>
                            <div class="arrow-holder">
                                <div class="red-dot"></div>
                                <img src="../assets/svg/right-arrow.svg">
                            </div>
                        </div>
                    </div>
                `;
        });
        res +=`
            <div class="padding" ></div>
        `;
    $("#slider").html(res);

}
