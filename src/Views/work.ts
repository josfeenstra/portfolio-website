// Author : Jos Feenstra

import App from "../system/app";
import View from "./view";
import {Route, RouteType} from "../system/app-helpers";
import Render from "../system/render";

export default class Work extends View 
{
    constructor(route: Route) 
    {
        super(route);
        Render.AddCss('styles/work.css');
    }

    loadArticle(context: HTMLElement) 
    {
        const grid = Render.AddDiv(context, "grid");

        App.GetRoutes(RouteType.portfolio).forEach(item => 
        {
            let div = Render.AddDiv(grid, "card");
            let el = Render.AddElement(div, 'p', "tile-text").innerText = item.category!;
            Render.AddElement(div, 'h2', "tile-text").innerText = item.name!;
            Render.AddElement(div, 'p', "tile-text").innerText =  item.year!;
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
            item.style.transform = 'scale(1.00)';
        }
        item.onmouseup = function() {
            item.style.transform = '';
            App.TryGo(hash);
        }   
    }

    onUnload()
    {
        Render.RemoveCss('styles/work.css');
        super.onUnload();
    }
}