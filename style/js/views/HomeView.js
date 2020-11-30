import AbstractView from "./AbstractView";
import { movieList } from '../const'

export default class extends AbstractView{

    constructor(params){
        super(params);
        this.setTitle("Persons");
    }

    async getHtml(){
        let data = movieList.filter(movie => movie.popular === true);
        let res = `
            <nav class="container flex mt-30">
                <p id="popular" class="nav-link active">POPULAR</p>
                <p id="featured" class="nav-link">FEATURED</p>
                <p id="toprated" class="nav-link">TOP IMDB</p>
            </nav>
            <div id="slider" class="slider-container">`
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
        res += `</div>
            <div class="container slider-controller">
                <div class="lt-arrow">
                    <div class="bar bar1"></div>
                    <div class="bar bar2"></div>
                </div>
                <div class="rt-arrow">
                    <div class="bar bar1"></div>
                    <div class="bar bar2"></div>
                </div>
            </div>
        `;
        return res;
    }
}