import $ from 'jquery';
import Home from "./views/HomeView";
import { getSliderData } from "./helper/slider";

$( document ).ready(()=>{
    router();
});

const pathToRegex = path => new RegExp("^" + path.replace(/\//g,"\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result =>result[1]);
    return Object.fromEntries(keys.map((key,i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {

    const routes = [
        { path: "/", view: Home },
    ]

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }

    const view = new match.route.view(getParams(match));
    document.querySelector('#app').innerHTML = await view.getHtml();
};

window.addEventListener("popstate", router);

//NAVBAR CONTROLLER
$(document).on('click','.nav-link',function(e) {
    $("#slider").css({opacity:0});
    $(".nav-link").removeClass("active");
    $(event.target).addClass("active");

    setTimeout(function(){
        $("#slider").animate({scrollLeft:'0'},0); /* Reset the silder to initial position*/
    },400);

    setTimeout(function(){
        getSliderData(e.target.id);
        $("#slider").animate({
            opacity:1,
        },300);
    },500);
});

// SLIDER CONTROLLER
$(document).on('click','.rt-arrow',function(){
    if(getScrollPosition() < getScrollLength()){
        $(".slider-container").animate({
            scrollLeft:'+=960'
        },1000);
    }
});

$(document).on('click','.lt-arrow',function(){
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

//Search Logic
$(".search-iconbox img").click(function(){
    let s = $("#sinput").val();
    fetch("https://www.omdbapi.com/?s=" + s + "&apikey=47f58f6a")
    .then(res => res.json())
    .then(data => {
        
    });
}); 
