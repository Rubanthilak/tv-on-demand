import $ from 'jquery';
import Home from "./views/HomeView";
import Result from "./views/ResultView";
import { getSliderData } from "./helper/slider";
import Detail from './views/DetailView';

$( document ).ready(()=>{
    router();
});

$(document).on('click','.pagination button:last-of-type',function(e){
    let page = parseInt(e.target.getAttribute("cpage"));
    let tr = parseInt(e.target.getAttribute("tr"));
    let q = e.target.getAttribute("q");
    if( tr > page*10){
        navigateTo("/search/"+q+'/'+(page+1));
    }
});

$(document).on('click','.pagination button:first-of-type',function(e){
    let page = parseInt(e.target.getAttribute("cpage"));
    let q = e.target.getAttribute("q");
    if( page > 1){
        navigateTo("/search/"+q+'/'+(page-1));
    }
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
        { path: "/search/:query/:page", view: Result },
        { path: "/view/:id", view: Detail },
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

function searchHelper(){
    let s = $("#sinput").val();
    if(s == ''){

    }
    else{
        navigateTo("/search/"+s+'/1');
    }
}

//Search Logic
$(".search-iconbox img").click(()=>searchHelper()); 

$(document).on("keypress",'#sinput',(e)=>{
    if (e.keyCode == 13) {
        searchHelper();
        return false; // prevent the button click from happening
    }
});