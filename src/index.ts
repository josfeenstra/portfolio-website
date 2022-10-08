// author : Jos Feenstra
// entry point 

import { App } from "./system/app";
import { Route } from "./system/app-helpers";
import { Home } from "./Views/home";
import { View } from "./Views/view";
import { Work } from "./Views/work";

// import Canvas from "./canvas/canvas";
// import CD from "./utils/constant-data";

// this is a setup of the entire website. 
// All possible loadable pages are represented by this table
// TODO move this somewhere else 
const ROUTES : Route[] = 
[
    { 
        type: 0,
        name: "Home", 
        hash: "#home", 
        view: Home
    },
    { 
        type: 1,
        name: "Works", 
        hash: "#works", 
        view: Work 
    },
    { 
        type: 1,
        name: "Demo", 
        hash: "https://josfeenstra.nl/demo/geon", 
        view: View,
    },

    { 
        type: 1,
        name: "About Me", 
        hash: "#about", 
        view: View,
        page: "nav/About.md"
    },
]; 

const ENTRIES : string[] = 
[
    "Island | 2022 | Hobby",
    "Geofront | 2022 | Study",
    "Geon | 2020-now | Study",
    "Sfered | 2018-now | Job",
    "Website | 2020-now | Hobby",
    "Bamimoth | 2019-now | Hobby",
    "OV3 | 2019-2020 | Job",
    "Comboom | 2021 | Volunteering",
    "Synthesis | 2020 | Study",
    "Geomatics | 2019 | Study",
    "Minor | 2017-2018 | Study", 
    "Architecture | 2015-2018 | Study",
    "Groover | 2016-2021 | Volunteering",
    "Chess | 2020 | Hobby",
    "Gazelle | 2018-2020 | Job",
];

// when loaded, try to route to one of these pages. 
// else, default to the first route.
document.addEventListener("DOMContentLoaded", () => 
{
    ROUTES.push(...LoadPortfolioItems(ENTRIES, "_text.md", "thumb.png"));
    App.Init(ROUTES, location.hash);

    document.getElementById("canvas")?.setAttribute("data-sub-count", "1");
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
        let namelower = name.toLowerCase();
        return {
            type: 2,
            name: name,
            hash: "#"+namelower,
            view: View,
            page: "./portfolio/" + namelower + "/" + textname,
            thumb: "./portfolio/" + namelower + "/" + thumbname,
            year: year,
            category: category
        }
    });
}


