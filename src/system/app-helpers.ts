/*  Singleton SPA Router 
*/
// an idea for a nicer showing and hiding scheme
class SceneElement {

    constructor() {

    }


    show() {
        
    }

    hide() {

    }
}

export enum RouteType {
    notFound = 404, // default if router cannot resolve a path
    default = 0, // entry page
    nav = 1, // 
    portfolio = 2 // 
}

export interface Route {
    type : RouteType, // the classification of this route. 
    name : string,    // general name. Displayed as webpage title 
    hash : string,    // hash to be used in links 
    view : any      // path to a typescript object
    
    page? : string,   // present if view == View
    
    thumb? : string, // present if type == page
    year?: string,
    category?: string
}

