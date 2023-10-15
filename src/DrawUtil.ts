export class DrawUtil {
    static drawLine(
        ctx: CanvasRenderingContext2D, 
        x1: number,
        y1: number,
        x2: number,
        y2: number): void {
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke()
        }
}