import AbstractView from "./AbstractView";

export default class extends AbstractView{

    constructor(params){
        super(params);
        this.setTitle("Home");
    }

    async getHtml(){
       let res = ``;
       let promise = await fetch("https://www.omdbapi.com/?i=" + this.params.id + "your-api-key")
       let data = await promise.json();
       if(data.Response != "False"){
       res += `
       <div class="detail-sec container">
            <div class="flex">
                <div class="d-card">
                    <img src="${data.Poster}">
                </div>
                <div>
                    <h1>${data.Title}</h1>
                    <p>directed by <span>${data.Director}<span></p>
                    <br>
                    <h3>IMDb &nbsp;<span>${data.imdbRating}</span>&nbsp;&nbsp;|&nbsp;&nbsp;${data.Year}</h3>
                    <br>
                    <p><span>Genre</span> : ${data.Genre}</p>
                    <br>
                    <p>${data.Plot}</p>
                </div>
            </div>
       </div>
       `;
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
