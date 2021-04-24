// author : Jos Feenstra 
export default class Render
{  
    static AddClass(element : Element, className: string)
    {
        if (!element.classList.contains(className))
            element.classList.add(className);
    }

    static RemoveClass(element : Element, className: string)
    {
        if (element.classList.contains(className))
            element.classList.remove(className);
    }

    static AddCss(fileName : string) 
    {
        // add a style sheet to the document
        var head = document.head;
        var link = document.createElement("link");
        
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = fileName;
        link.className = fileName;
        head.appendChild(link);
    }

    static RemoveCss(fileName : string)
    {
        // TODO
        var links = document.querySelectorAll("link")!;
        links.forEach(link => {
            console.log(link.href);
            if (link.className == fileName) link.remove();
        });
    }

    static AddLink(context : Element, link : string, name : string, className : string = "") {
        let el = document.createElement("a");
        el.href = link;
        el.className = className;
        el.innerHTML = name;
        context.appendChild(el);
        return el;
    }

    static AddDiv(context : Element, className : string= "") {
        let el = document.createElement("div");
        el.className = className;
        context.appendChild(el);
        return el;
    }

    static AddH1(context : Element, message : string, className : string="") {
        let h1 = document.createElement("h1");
        h1.innerText = message;
        h1.className = className;
        context.appendChild(h1);
    }

    static AddH2(context : Element, message : string, className : string="") {
        let h2 = document.createElement("h2");
        h2.innerText = message;
        h2.className = className;
        context.appendChild(h2);
    }


    static AddElement(context : Element, element : string, className : string = "") {
        let el = document.createElement(element)
        el.className = className;
        context.appendChild(el);
        return el;
    }

    static AddText(container : Element, message : string, className : string = "")
    {
        const p = document.createElement("p")
        p.className = className;
        const text = document.createTextNode(message);
        p.appendChild(text);
        container.appendChild(p);
    }

    static Clear(selector : string)
    {
        // clear a wrapper
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            while(element.firstChild) {
                // let child = element.firstChild as HTMLElement;
                // child.style.animation = 'hide 300ms';
                element.removeChild(element.firstChild);
            }
        });
    }

    static TrySetElementAttributeById<T extends HTMLElement>(id: string, attribute: string, value: string) : Boolean {
        // hide canvas
        let element = document.getElementById(id) as T;
        if (element) {
            element.setAttribute(attribute, value);
            return true;
        }
        return false
    }
}