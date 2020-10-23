// author : Jos Feenstra
// entry point 

import Home from "./Views/home";
import Work from "./Views/work";
import View from "./Views/view";

import {Route} from "./system/app-helpers";
import App from "./system/app";
import Canvas from "./canvas/canvas";
import CD from "./utils/constant-data";

// this is a setup of the entire website. 
// All possible loadable pages are represented by this table
// TODO move this somewhere else 
const ROUTES : Route[] = 
[
    { 
        type: 0,
        name: "Home", 
        hash: "#Home", 
        view: Home
    },
    // { 
    //     type: 1,
    //     name: "Highlight", 
    //     hash: "#Highlight", 
    //     view: View,
    //     page: "nav/Highlight.md" 
    // },
    { 
        type: 1,
        name: "Works", 
        hash: "#Works", 
        view: Work 
    },
    { 
        type: 1,
        name: "About", 
        hash: "#About", 
        view: View,
        page: "nav/About.md"
    },
]; 

const ENTRIES : string[] = [

    "Sfered | 2018-2020 | Job",
    "OV3 | 2019 | Job",

    "Thesis | 2021-2022 | Study",
    "Synthesis | 2020 | Study",
    "Geomatics | 2019 | Study",
    "Minor | 2017-2018 | Study",
    "Architecture | 2015-2018 | Study",

    "Website | 2020 | Hobby",
    "Chess | 2020 | Hobby",

    "Groover | 2016-2021 | Volunteering",
];

// when loaded, try to route to one of these pages. 
// else, default to the first route.
document.addEventListener("DOMContentLoaded", () => 
{
    ROUTES.push(...LoadPortfolioItems(ENTRIES, "_text.md", "thumb.png"));
    console.log(ROUTES);
    App.Init(ROUTES, location.hash);
    Canvas.init('canvas');
})


// helper function to turn portfolio entries into 'Views'
function LoadPortfolioItems(
    entries: string[], 
    textname: string, 
    thumbname: string) : Route[]
{
    return entries.map(function(entry) { 
        let strings = entry.replace(' ', '').split("|");
        let name = strings[0];
        let year = strings[1];
        let category = strings[2];
        return {
            type: 2,
            name: name,
            hash: "#"+name,
            view: View,
            page: "./portfolio/" + name.toLowerCase() + "/" + textname,
            thumb: "./portfolio/" + name.toLowerCase() + "/" + thumbname,
            year: year,
            category: category
        }
    });
}


