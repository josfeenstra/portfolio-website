// Author : Jos Feenstra


import { App } from "../system/app";
import {Route, RouteType} from "../system/app-helpers";
import { Dom, DomWriter } from "../system/dom";
import { View } from "./view";

export class Work extends View 
{
    constructor(route: Route) 
    {
        super(route);
    }

    async loadArticle(context: HTMLElement) 
    {
        let dom = new DomWriter();
        dom.toId("canvas")
            .set("data-goto", "bottom")
            .set("data-filled", "1")
        
        dom.to(context)
        
        const grid = dom.add("div", "grid");

        App.getRoutes(RouteType.portfolio).forEach(item => 
        {
            let div = dom.to(grid).add("div", "card");
            dom.to(div);
            dom.add("p", "tile-text", item.category!);
            dom.add("h2", "tile-text", item.name!);
            dom.add("p", "tile-text", item.year!);
            div.style.backgroundImage = "url("+ item.thumb! + ")";
            this.addListeners(div, item.hash);
        });

        // builds samples
        // for (let i = 0; i < 9; i++)
        // {
        //     let item = Render.AddDiv(grid, "card");
        //     let text = Render.AddText(item, i.toString());
        //     this.addListeners(item, "#todo");
        // }
    }

    addListeners(item : HTMLElement, hash:string)
    {
        item.onmousedown = function() {
            // item.style.transform = 'scale(1.00)';
        }
        item.onmouseup = function(ev) {
            if (ev.button == 2) return;
            // item.style.transform = '';
            App.tryGo(hash);
        }   
    }
}