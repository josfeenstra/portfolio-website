// Author : Jos Feenstra

import Render from "./render";
import { Route, RouteType } from "./app-helpers";
import CD from "../utils/constant-data";
// import Canvas from "../canvas/canvas";

// single page app singleton
export default class App {

    static isArticleRendered: boolean;
    static isNavRendered: boolean;
    static isFooterRendered: boolean;

    static routes: Route[];
    static route: Route;
    static routeDefault: Route;
    static view: any;

    static Init(routes: Route[], currentHash: string) 
    {
        App.isArticleRendered = false;
        App.isNavRendered = false;
        App.isFooterRendered = false;
        
        App.routes = routes;

        App.SetupRouter(currentHash);
    }

    static Print(message: string) {
        console.log(message);
    }

    //#region Routing

    static SetupRouter(currentHash: string) 
    {
        console.log("setting up router...");
        // console.log(currentHash);
        App.route = App.routes[0];

        // 
        App.routeDefault = App.routes[0];

        // setup browser functionalities for single page app
        onpopstate = function(event) 
        { 
            // console.log("triggereded!");
            App.TryGo(location.hash); 
        }
        
        // reroute internal href links to fake hash links
        document.body.addEventListener("click", e => 
        {
            // console.log("trigger!");
            const target = e.target as HTMLLinkElement;
            if (target.matches("[data-link]")) {
                //e.preventDefault();
                //Router.Go(new URL(target.href));
            }
        }) 

        // setup the environment for popState.
        App.TryGo(currentHash);
    }

    static async TryGo(hash : string) 
    {
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
            console.log("hash was invalid! going to main menu...")
            //App.route = App.routeDefault;
        }
        else 
        {
            console.log("found a match!: " + match.route.name);
            App.route = match.route;
        }
        history.pushState(hash, document.title, hash);    
        App.Render(); 
    }

    static Render() 
    {
        if (App.view != null) 
            App.view.onUnload();
        App.view = new this.route.view(App.route);
        App.view.onLoad();
        // Canvas.onResizeCanvas();
    }

    static Redirect(path : string) 
    {
        window.location.replace(path);
    }

    static GetRoutes(type : RouteType) : Route[] {
        return App.routes.filter(route => route.type == type);
    } 

    //#endregion

    //#region Rendering Html

    static RenderMainLinks(context: Element)
    {
        App.GetRoutes(RouteType.nav).forEach(route => 
        {
            Render.AddLink(Render.AddDiv(context, CD.navlink), route.hash, route.name);
        }); 
    }

    static RenderNav() 
    {
        if (!App.isNavRendered) 
        {
            App.isNavRendered = true;

            let nav = document.querySelector("nav")!;
            let left = Render.AddDiv(nav, "left-side");
            let brand = Render.AddDiv(left, "brand");
            let hash = App.GetRoutes(RouteType.default)[0].hash;
            Render.AddLink(brand, hash, "JOS FEENSTRA");
            
            let right = Render.AddDiv(nav, "right-side");
            App.GetRoutes(RouteType.nav).forEach(route => 
            {
                Render.AddLink(Render.AddDiv(right, CD.navlink), route.hash, route.name);
            });  
        } 

        // set nav highlight
        document.querySelectorAll("." + CD.navlink).forEach(div => 
        {
            let link = div.children[0] as HTMLAnchorElement;
            if (new URL(link.href).hash  == App.route.hash &&
                div.classList.contains(CD.navlink))
            {
                // console.log("we are now at " + link.href);
                Render.AddClass(div, CD.navlinkHighlight);
            }
            else
            {
                // console.log("removing from" + link.href);
                Render.RemoveClass(div, CD.navlinkHighlight);
            } 
        });  
    }

    static RenderFooter() 
    {
        if (App.isFooterRendered) return;
        App.isFooterRendered = true;

        let footer = document.querySelector("footer")!;

        App.RenderSocials(footer); 

        let copyright = Render.AddDiv(footer, "copyright");
            Render.AddText(copyright, "© 2020 Jos Feenstra");
        return footer;
    }

    static RenderSocials(context: Element) 
    {
        let footers = Render.AddDiv(context, "footer-links");
        Render.AddLink(footers,"mailto:me@josfeenstra.nl", "Email", "socials-link");
        Render.AddLink(footers,"https://github.com/josfeenstra", "Github", "socials-link");
        Render.AddLink(footers,"https://www.linkedin.com/in/jos-feenstra-007369122/", "LinkedIn", "socials-link");
    }

    static ClearNav() 
    {
        Render.Clear("nav");
        App.isNavRendered = false;
    }

    // static ArticleCounter = 0;

    // static async GetNewArticle() : Promise<HTMLElement>
    // {
    //     if (this.ArticleCounter == 0)
    //         return this.FirstArticle();
    //     else 
    //         return this.NextArticle();
    // }

    // private static FirstArticle() : HTMLElement
    // {
    //     let article = document.querySelector('article')!;
    //     article.className = "article" + App.ArticleCounter;
    //     App.ArticleCounter += 1;
    //     return article;
    // }

    // private static NextArticle()  : HTMLElement
    // {
        
    //     let articleOldName = ".article" + (App.ArticleCounter - 1);
    //     let articleNewName = "article" + App.ArticleCounter;
        
    //     console.log(articleOldName);

    //     let articleOld = document.querySelector(articleOldName)! as HTMLElement;
    //     let articleNew = document.createElement('article');
    //     articleNew.className = articleNewName;
    //     articleOld.insertAdjacentElement("afterend", articleNew);

        
    //     // articleOld.insertAdjacentHTML("afterend", articleNew.innerHTML);
    //     articleOld.style.animation = 'remove 300ms'
    //     articleOld.onanimationend = function() {
    //         console.log("delete me!");
    //         document.querySelector('.app')!.removeChild(articleOld)
    //     }
        
    //     App.ArticleCounter += 1;

    //     return articleNew
    // }

    static ClearArticle() : HTMLElement
    {
        Render.Clear("article");
        App.isArticleRendered = false;
        return document.querySelector("article")!;
    }  

    static ClearFooter() 
    {
        Render.Clear("footer");
        App.isFooterRendered = false;
    }    

    //#endregion
}