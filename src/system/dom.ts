// author : Jos Feenstra 

export type ElementType = "div" | "h1" | "h2" | "a" | "p"; 

export class DomHead {
    
    constructor() {

    }

    AddCss(fileName : string) 
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

    RemoveCss(fileName : string)
    {
        // TODO
        var links = document.querySelectorAll("link")!;
        links.forEach(link => {
            console.log(link.href);
            if (link.className == fileName) link.remove();
        });
    }
}

// TODO add some more jquery functionalities
export class DomWriter {

    constructor(
        public pointer: HTMLElement | Document = document,
    ) {
        
    }

    static new() {
        return new DomWriter();
    }

    to(obj: HTMLElement | Document) {
        this.pointer = obj;
        return this;
    }

    addAndTo(type : ElementType, classes="", content="") {
        return this.to(this.add(type, classes, content));
    }

    toId(id: string) {
        this.pointer = document.getElementById(id)!;
        return this;
    }

    toSelect(selector: string) {
        this.pointer = document.querySelector(selector)! as HTMLElement;
        return this;
    }

    add(type : ElementType, classes="", content="") {
        let el = document.createElement(type)
        el.innerText = content;
        el.className = classes;
        this.pointer.appendChild(el);
        return el;
    }

    clear() {
        while(this.pointer.firstChild) {
            // let child = element.firstChild as HTMLElement;
            // child.style.animation = 'hide 300ms';
            this.pointer.removeChild(this.pointer.firstChild);
        }
        return this
    }

    set(attribute: string, value: string) {
        if (this.pointer instanceof Document) {
            throw new Error("not possible with document selected!")
        } 
        this.pointer.setAttribute(attribute, value);
        return this;
    }

    get inner() {
        if (this.pointer instanceof Document) {
            throw new Error("not possible with document selected!")
        } 
        return this.pointer.innerHTML;
    }

    set inner(str: string) {
        if (this.pointer instanceof Document) {
            throw new Error("not possible with document selected!")
        } 
        this.pointer.innerHTML = str;
    }

    get classes() {
        if (this.pointer instanceof Document) {
            throw new Error("not possible with document selected!")
        } 
        return this.pointer.classList;
    }
}

export const dom = DomWriter.new();


export class DomNew {
    constructor(
        public head= new DomHead(),
        public body= new DomWriter()
    ) {}
}

export class Dom
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

    static add(context : Element, type : ElementType, classes="", content="") {
        let el = document.createElement(type)
        el.innerText = content;
        el.className = classes;
        context.appendChild(el);
        return el;
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
        return h1
    }

    static addH2(context : Element, message : string, className : string="") {
        let h2 = document.createElement("h2");
        h2.innerText = message;
        h2.className = className;
        context.appendChild(h2);
        return h2;
    }

    static addText(container : Element, message : string, className : string = "")
    {
        const p = document.createElement("p")
        p.className = className;
        const text = document.createTextNode(message);
        p.appendChild(text);
        container.appendChild(p);
    }

    static clear(selector : string)
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