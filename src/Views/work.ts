// Author : Jos Feenstra


import { App } from "../system/app";
import {Route, RouteType} from "../system/app-helpers";
import { Dom } from "../system/dom";
import { View } from "./view";

export class Work extends View 
{
    constructor(route: Route) 
    {
        super(route);
        Dom.AddCss('styles/work.css');
    }

    loadArticle(context: HTMLElement) 
    {

        Dom.TrySetElementAttributeById<HTMLCanvasElement>("canvas", "data-goto", "bottom");
        Dom.TrySetElementAttributeById<HTMLCanvasElement>("canvas", "data-filled", "1");
        const grid = Dom.AddDiv(context, "grid");

        App.GetRoutes(RouteType.portfolio).forEach(item => 
        {
            let div = Dom.AddDiv(grid, "card");
            let el = Dom.add(div, 'p', "tile-text").innerText = item.category!;
            Dom.add(div, 'h2', "tile-text").innerText = item.name!;
            Dom.add(div, 'p', "tile-text").innerText =  item.year!;
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
        item.onmouseup = function() {
            // item.style.transform = '';
            App.TryGo(hash);
        }   
    }

    onUnload()
    {
        Dom.RemoveCss('styles/work.css');
        super.onUnload();
    }
}