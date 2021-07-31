// Author : Jos Feenstra

import { App } from "../system/app";
import { Route } from "../system/app-helpers";
import { Dom } from "../system/dom";
import { View } from "./view";

export class Home extends View 
{
    constructor(route: Route) {
        super(route);
    }

    async onLoad() {
        // console.log("loading home...");
        Dom.AddCss("./styles/home.css");

        App.ClearNav();
        let article = await App.ClearArticle();  
        App.ClearFooter();

        this.loadArticle(article);
        article.dataset.gotomain

        // fade in of the sphere
        Dom.TrySetElementAttributeById<HTMLCanvasElement>("canvas", "data-goto", "overview");
        Dom.TrySetElementAttributeById<HTMLCanvasElement>("canvas", "data-filled", "1");
    }

    loadArticle(context: HTMLElement) {
        // this is the main page, codified
        let ts = Dom.AddDiv(context, "titlescreen");
        
        let head = Dom.AddDiv(ts, "title-header")
        Dom.AddH1(head, "Jos Feenstra", "");
        Dom.addH2(head, "Master Student Geomatics @ TU Delft", "");
        // mabye subheader text? 
  
        let links = Dom.AddDiv(ts, "title-navlinks");
        App.RenderMainLinks(links);
        App.RenderSocials(ts);
    }

    onUnload()
    {
        console.log("unloading home...");
        Dom.RemoveCss("./styles/home.css");
    }
}