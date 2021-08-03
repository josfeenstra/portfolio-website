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
        dom.addAndTo("div", "d-grid gap-2 col-6 mx-auto mt-5")
        App.getRoutes(RouteType.nav).forEach(route => 
        {
            dom.inner += `
                <a href="${route.hash}" class="btn btn-outline-light">${route.name}</a>
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
            });  

            let dom = DomWriter.new();
            dom.toId("auto-nav");
            dom.classes.add("navbar","navbar-dark", "navbar-expand-md");
            dom.inner = `
            <div class="container-xxl">
                <a class="navbar-brand text-light" href="#home">
                    <span class="text-light fw-bold">
                    Jos Feenstra
                    </span>
                </a>
                <button class="navbar-toggler btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#main-nav" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
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
        // footer.classList.add("row");
        // let footerblock = Dom.AddDiv(footer, "col")

        App.RenderSocials(footer); 

        let copyright = Dom.AddDiv(footer, "copyright");
            Dom.addText(copyright, "© 2020 Jos Feenstra", "text-muted");
        return footer;
    }

    static RenderSocials(context: Element) {
        let footers = Dom.AddDiv(context, "footer-links mt-3");

        footers.innerHTML = `
        <a href="mailto:me@josfeenstra.nl" type="button" class="btn btn-outline-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 20">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
            </svg>
        </a>

        <a href="https://github.com/josfeenstra" type="button" class="btn btn-outline-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-github" viewBox="0 0 16 20">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
            </svg>
        </a>

        <a href="https://www.linkedin.com/in/jos-feenstra-007369122/" type="button" class="btn btn-outline-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 20">
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
            </svg>
        </a>
        `

        // Dom.AddLink(footers,"mailto:me@josfeenstra.nl", "Email", "socials-link mx-1");
        // Dom.AddLink(footers,"https://github.com/josfeenstra", "Github", "socials-link mx-1");
        // Dom.AddLink(footers,"https://www.linkedin.com/in/jos-feenstra-007369122/", "LinkedIn", "socials-link mx-1");
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