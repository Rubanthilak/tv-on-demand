import AbstractView from "./AbstractView";

export default class extends AbstractView{
    
    constructor(params){
        super(params);
        this.setTitle("Results - Page" +this.params.page);
    }

    async getHtml(){
        let res = ``;
        let promise = await fetch("https://www.omdbapi.com/?s=" + this.params.query + "&page="+ this.params.page +"&apikey=47f58f6a");
        let data = await promise.json();
        if(data.Response == "True"){
            res = `
            <div class="search-res container row-max-3" style=${data.Search.length < 3?"justify-content:start":0}>
            `;  
            
            data.Search.forEach(function(movie) {
                    res += `
                                <div class="card" id="${movie.imdbID}">
                                    <img src="${movie.Poster}" alt="${movie.Title}">
                                    <div class="card-details">
                                        <div class="text-holder">
                                            <p class="title">${movie.Title}</p>
                                            <p class="subtitle"> ${movie.Year} </p>
                                        </div>
                                        <div class="arrow-holder">
                                            <div class="red-dot"></div>
                                            <img src="../svg/right-arrow.svg">
                                        </div>
                                    </div>
                                </div>
                            `;
            });
    
            res += `
            </div>
            <div class="container pagination">
                <button cpage=${this.params.page} tr=${data.totalResults} q=${this.params.query} class=${this.params.page == 1?"disabled":0}>Prev</button>
                <button cpage=${this.params.page} tr=${data.totalResults} q=${this.params.query} class=${data.totalResults < (this.params.page*10)?"disabled":0}>Next</button>
            </div>
            `
        }
        else{
            res = `
            <div class="search-res container">
                <h1>Movie Not found 🤣</h1>
                <h3>try again . . .</h3>
            </div>
            `; 
        }
       
        return res;
    }

}