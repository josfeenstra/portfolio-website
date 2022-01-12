// Author : Jos Feenstra

import { App } from "../system/app";
import { Route } from "../system/app-helpers";
import { dom, Dom } from "../system/dom";
import { View } from "./view";

export class Home extends View 
{
    constructor(route: Route) {
        super(route);
    }

    async onLoad() {
        // console.log("loading home...");

        App.ClearNav();
        let article = await App.ClearArticle();  
        App.ClearFooter();

        this.loadArticle(article);
        article.dataset.gotomain

        // fade in of the sphere
        Dom.TrySetElementAttributeById<HTMLCanvasElement>("canvas", "data-goto", "overview");
        Dom.TrySetElementAttributeById<HTMLCanvasElement>("canvas", "data-filled", "1");
    }

    async loadArticle(context: HTMLElement) {
        // this is the main page, codified
        dom.to(context);
        dom.addAndTo("div", "container-lg");
        dom.addAndTo("div", "row justify-content-center align-items-center");
        dom.set("style", "height: 90vh;")
        dom.addAndTo("div", "col-lg-6 text-center mt-5 align-middle")
        dom.add("h1", "display-1", "Jos Feenstra");
        let Enthusiastt = "";
        dom.add("h2", "display-6", "Software Engineer");
        // architect of all things digital
        dom.add("p", "lead my-4", "Welcome, feel free to look around");
        dom.addAndTo("div", "");
        App.RenderMainLinks(dom.pointer as HTMLElement);
        App.RenderSocials(dom.pointer as HTMLElement);
    }

    onUnload()
    {
        console.log("unloading home...");
    }
}