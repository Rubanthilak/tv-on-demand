import AbstractView from "./AbstractView";

export default class extends AbstractView{

    constructor(params){
        super(params);
        this.setTitle("Home");
    }

    async getHtml(){
       
    }
}