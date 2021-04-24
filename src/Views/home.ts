// Author : Jos Feenstra

import App from "../system/app";
import View from "./view";
import {Route} from "../system/app-helpers";
import Render from "../system/render";

export default class Home extends View 
{
    constructor(route: Route) {
        super(route);
    }

    async onLoad() {
        // console.log("loading home...");
        Render.AddCss("./styles/home.css");

        App.ClearNav();
        let article = await App.ClearArticle();  
        App.ClearFooter();

        this.loadArticle(article);
        article.dataset.gotomain

        // fade in of the sphere
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (canvas) {
            canvas.setAttribute("data-filled", "1");
        }
    }

    loadArticle(context: HTMLElement) {
        // this is the main page, codified
        let ts = Render.AddDiv(context, "titlescreen");
        
        let head = Render.AddDiv(ts, "title-header")
        Render.AddH1(head, "Jos Feenstra");
        Render.AddH2(head, "Master Student Geomatics @ TU Delft");
        // mabye subheader text? 
  
        let links = Render.AddDiv(ts, "title-navlinks");
        App.RenderMainLinks(links);
        App.RenderSocials(ts);
    }

    onUnload()
    {
        console.log("unloading home...");
        Render.RemoveCss("./styles/home.css");

        // hide canvas
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        if (canvas) {
            canvas.setAttribute("data-filled", "0");
        }
    }
}