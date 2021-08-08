// Author : Jos Feenstra


import { App } from "../system/app";
import {Route, RouteType} from "../system/app-helpers";
import { Dom, DomWriter } from "../system/dom";
import { View } from "./view";

export class ImageView extends View 
{
    constructor(route: Route) 
    {
        super(route);
    }

    async loadArticle(context: HTMLElement) 
    {
        let dom = new DomWriter();
        // dom.toId("canvas")
        //     .set("data-goto", "top")
        //     .set("data-filled", "1")
        
        // dom.to(context)
        
        // dom.addAndTo("div", "my-5")
        // dom.add("div", "container my-5 mx-5");
        // let grid = dom.add("div", "row justify-content-center");

        // App.getRoutes(RouteType.portfolio).forEach(item => 
        // {
        //     let a = dom.to(grid).add("a", "col-11 col-md-5 col-lg-3 btn btn-outline-light m-2") as HTMLLinkElement;
        //     a.href = item.hash;
        //     dom.to(a).addAndTo("div", "container my-5 ");
        //     dom.add("p", "text-light", item.category!);
        //     dom.add("h2", "text-light", item.name!);
        //     dom.add("p", "text-light mt-3", item.year!);
            
        //     // div.style.backgroundImage = "url("+ item.thumb! + ")";
        //     // this.addListeners(a, item.hash);
        // });

        // builds samples
        // for (let i = 0; i < 9; i++)
        // {
        //     let item = Render.AddDiv(grid, "card");
        //     let text = Render.AddText(item, i.toString());
        //     this.addListeners(item, "#todo");
        // }
    }
}