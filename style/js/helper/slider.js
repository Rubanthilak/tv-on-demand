import { movieList } from '../const'
import $ from 'jquery';

// PROVIDES SILDER JSON DATA BASED ON THE NAVBAR
export function getSliderData(text){
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
                                <img src="../svg/right-arrow.svg">
                            </div>
                        </div>
                    </div>
                `;
        });
        res +=`
            <div class="padding"></div>
        `;
    $("#slider").html(res);
}
