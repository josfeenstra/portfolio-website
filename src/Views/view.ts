// Author : Jos Feenstra

import App from "../system/app";
import {Route} from "../system/app-helpers";
import Render from "../system/render";
import {extractExtension} from "../utils/stringhelpers";

// base class for every autogenerated html page
export default class View 
{
    route: Route;
    title: string;

    constructor(route: Route) 
    {
        this.route = route;
        this.title = "Jos Feenstra - " + route.name;
        document.title = this.title; 
    }

    onLoad() 
    {
        App.RenderNav();
        let article  = App.ClearArticle();
        this.loadArticle(article);
        this.afterLoadArticle(article);
        App.RenderFooter();
    }

    loadArticle(context: HTMLElement) 
    {  
        let path = this.route.page!;
        fetch(path)
        .then(response => {
            return response.text();
        })
        .then(data => {
            this.initMarkdownPage(context, data, ["button", "img"]);
        });
    }

    // fill the entire context with whatever we find in markdown
    // build two columns, put all 'extractnodes' into the first, and the text in the second 
    private initMarkdownPage(context : HTMLElement, markdown : string, extractNodes: string[])
    {
        
        let showdown  = require('../plugins/showdown');
        let converter = new showdown.Converter();
        let html = converter.makeHtml(markdown);

        let columns = Render.AddDiv(context, "columns");
        let col1 = Render.AddDiv(columns, "col1");
        let col2 = Render.AddDiv(columns, "col2");

        col2.innerHTML = html;

        extractNodes.forEach(nodename => {
            col2.querySelectorAll(nodename).forEach(img => {
                col1.appendChild(img);
            });
        });
    }

    afterLoadArticle(context: HTMLElement)
    {

    }

    onUnload() 
    {
        App.ClearFooter();
    }
}