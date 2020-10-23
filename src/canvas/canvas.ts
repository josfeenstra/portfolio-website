// author : Jos Feenstra 
// purpose : draw things on a canvas

import View from "../Views/view";

export default class Canvas {
   
    private static selector = "";

    static init(canvasQuerySelector: string) 
    {     
        Canvas.selector = canvasQuerySelector;
        let canvas = this.get();
        window.addEventListener("resize", Canvas.resizeCanvas, false);
        this.resizeCanvas();
        Canvas.Redraw();
    }

    public static Redraw()
    {
        Canvas.drawGrid(Canvas.get(), 16, 5);
    }

    static get() : HTMLCanvasElement
    {
        return document.querySelector(Canvas.selector)! as HTMLCanvasElement;
    }

    static resizeCanvas()
    {
        let canvas = Canvas.get();
        canvas.width = window.innerWidth;
        canvas.height = Math.max(window.innerHeight, document.querySelector(".app")!.scrollHeight);
        Canvas.drawGrid(canvas, 16, 5);
    }

    static drawWip(canvas : HTMLCanvasElement)
    {
        let ctx = canvas.getContext("2d")!;
        ctx.font = "15px Arial";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.strokeText("WORK IN PROGRESS", 20, 20);
        ctx.closePath();
    }

    static drawGrid(canvas : HTMLCanvasElement, step:number, highlight:number)
    {
        let c = canvas.getContext("2d")!;
        let counter = 0;
        let color1 = "#1a1a1a";
        let color2 = "#111111";

        // vertical lines 
        for (let i = 0; i < canvas.width; i += step)
        {
            c.beginPath();
            if (counter % highlight == 0)
            {
                c.strokeStyle = color2;
            }
            else
            { 
                c.strokeStyle = color1; 
            }
            c.moveTo(i, 0);
            c.lineTo(i, canvas.height);

            counter += 1;
            c.stroke();
            c.closePath();
        }

        // horizontal lines 
        for (let i = 0; i < canvas.height; i += step)
        {
            c.beginPath();
            if (counter % highlight == 0)
            {
                c.strokeStyle = color2;
            }
            else
            { 
                c.strokeStyle = color1; 
            }

            c.moveTo(0, i);
            c.lineTo(canvas.width, i);

            counter += 1;
            c.stroke();
            c.closePath();
        }     
    }
}