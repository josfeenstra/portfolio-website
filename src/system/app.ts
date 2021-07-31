// Author : Jos Feenstra

import { Route, RouteType } from "./app-helpers";
import CD from "../utils/constant-data";
import { dom, Dom, DomWriter } from "./dom";
// import Canvas from "../canvas/canvas";

// TODO split away the router itself
export class SpaRouter {

    route: Route;
    routeDefault: Route;

    constructor(public routes: Route[], currentHash: string) {
        this.routes = routes;
        this.route = this.routes[0];
        this.routeDefault = this.routes[0];
        this.setup();
        this.tryGo(currentHash);
    }

    // single page application setup
    setup() {
        console.log("setting up router...");

        // setup browser functionalities for single page app
        onpopstate = function(event) { 
            // console.log("triggereded!");
            App.tryGo(location.hash); 
        }
        
        // reroute internal href links to fake hash links
        document.body.addEventListener("click", e => {
            // console.log("trigger!");
            const target = e.target as HTMLLinkElement;
            if (target.matches("[data-link]")) {
                //e.preventDefault();
                //Router.Go(new URL(target.href));
            }
        }) 
    }

    async tryGo(hash : string) {
        // console.log("setting route to hash:", hash)
        const potentialMatches = App.routes.map(route => {
            return {
                route: route,
                isMatch: hash === route.hash
            };
        }); 

        let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
        
        if (!match)
        {
            console.log(`hash "${hash}" was invalid! going to main menu...`)
            //App.route = App.routeDefault;
        }
        else 
        {
            console.log("found a match!: " + match.route.name);
            App.route = match.route;
        }
        history.pushState(hash, document.title, hash);    
        App.render(); 
    }

    redirect(path : string) {
        window.location.replace(path);
    }

    getRoutes(type : RouteType) : Route[] {
        return App.routes.filter(route => route.type == type);
    } 
}

// single page app singleton
export class App {

    static isArticleRendered: boolean;
    static isNavRendered: boolean;
    static isFooterRendered: boolean;

    static routes: Route[];
    static route: Route;
    static routeDefault: Route;
    static view: any;

    static Init(routes: Route[], currentHash: string) {
        App.isArticleRendered = false;
        App.isNavRendered = false;
        App.isFooterRendered = false;
        
        App.routes = routes;

        App.setup(currentHash);
    }

    //#region Routing

    static setup(currentHash: string) {
        console.log("setting up router...");
        // console.log(currentHash);
        App.route = App.routes[0];

        // 
        App.routeDefault = App.routes[0];

        // setup browser functionalities for single page app
        onpopstate = function(event) { 
            // console.log("triggereded!");
            App.tryGo(location.hash); 
        }
        
        // reroute internal href links to fake hash links
        document.body.addEventListener("click", e => {
            // console.log("trigger!");
            const target = e.target as HTMLLinkElement;
            if (target.matches("[data-link]")) {
                //e.preventDefault();
                //Router.Go(new URL(target.href));
            }
        }) 

        // setup the environment for popState.
        App.tryGo(currentHash);
    }

    static async tryGo(hash : string) {
        // console.log("setting route to hash:", hash)
        const potentialMatches = App.routes.map(route => {
            return {
                route: route,
                isMatch: hash === route.hash
            };
        }); 

        let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
        
        if (!match)
        {
            console.log(`hash "${hash}" was invalid! going to main menu...`)
            //App.route = App.routeDefault;
        }
        else 
        {
            console.log("found a match!: " + match.route.name);
            App.route = match.route;
        }
        history.pushState(hash, document.title, hash);    
        App.render(); 
    }

    static render() {
        if (App.view != null) 
            App.view.onUnload();
        App.view = new this.route.view(App.route);
        App.view.onLoad();
        // Canvas.onResizeCanvas();
    }

    static redirect(path : string) {
        window.location.replace(path);
    }

    static getRoutes(type : RouteType) : Route[] {
        return App.routes.filter(route => route.type == type);
    } 

    //#endregion

    //#region Rendering Html

    static RenderMainLinks(context: HTMLElement) {
        dom.to(context);
        dom.addAndTo("div", "d-grid gap-2 col-6 mx-auto")
        App.getRoutes(RouteType.nav).forEach(route => 
        {
            dom.inner += `
                <a href="${route.hash}" class="btn btn-secondary">${route.name}</a>
            `
        }); 
    }

    static RenderNav() {
        if (!App.isNavRendered) 
        {
            App.isNavRendered = true;

            let items: string[] = [];
            App.getRoutes(RouteType.nav).forEach(route => 
            {
                items.push(`
                <li class="nav-item">
                    <a class="nav-link" href="${route.hash}">${route.name}</a>
                </li>
                `)
                console.log("lala");
            });  

            let dom = DomWriter.new();
            dom.toId("auto-nav");
            dom.classes.add("navbar","navbar-expand-md","navbar-");
            dom.inner = `
            <div class="container-xxl">
                <a class="navbar-brand" href="#home">
                    <span class="text-secondary fw-bold">
                    Jos Feenstra
                    </span>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end align-center" id="main-nav">
                    <ul class="navbar-nav">
                        ${items.join("")}
                    </ul>
                </div>
            </div>`; 
        } 

        // set nav highlight
        document.querySelectorAll(".nav-item").forEach(div => 
        {
            let link = div.children[0] as HTMLAnchorElement;
            if (new URL(link.href).hash  == App.route.hash &&
                div.classList.contains(".nav-item"))
            {
                // console.log("we are now at " + link.href);
                Dom.AddClass(div, CD.navlinkHighlight);
            }
            else
            {
                // console.log("removing from" + link.href);
                Dom.RemoveClass(div, CD.navlinkHighlight);
            } 
        });  
    }

    static RenderFooter() {
        if (App.isFooterRendered) return;
        App.isFooterRendered = true;

        let footer = document.querySelector("footer")!;

        App.RenderSocials(footer); 

        let copyright = Dom.AddDiv(footer, "copyright");
            Dom.addText(copyright, "© 2020 Jos Feenstra");
        return footer;
    }

    static RenderSocials(context: Element) {
        let footers = Dom.AddDiv(context, "footer-links mt-3");
        Dom.AddLink(footers,"mailto:me@josfeenstra.nl", "Email", "socials-link mx-1");
        Dom.AddLink(footers,"https://github.com/josfeenstra", "Github", "socials-link mx-1");
        Dom.AddLink(footers,"https://www.linkedin.com/in/jos-feenstra-007369122/", "LinkedIn", "socials-link mx-1");
    }

    static ClearNav() {
        Dom.clear("nav");
        App.isNavRendered = false;
    }

    static ClearArticle() : HTMLElement
    {
        Dom.clear("article");
        App.isArticleRendered = false;
        return document.querySelector("article")!;
    }  

    static ClearFooter() 
    {
        Dom.clear("footer");
        App.isFooterRendered = false;
    }    

    //#endregion
}