type CircleType = {size:number, color:string}
export abstract class Settings
{
    protected circleSizes: CircleType[] = [
        {size: 5, color: "red"},
        {size: 10, color: "orangered"},
        {size: 20, color: "orange"},
        {size: 30, color: "yellow"},
        {size: 40, color: "greenyellow"},
        {size: 50, color: "green"}
    ];
    protected cursorPos: {x:number, y:number} = {x:0, y:40};
    protected cursorSpeed: number = 5;
    protected maxSize: number = 3;
    protected maxLeftPos: number = 0;
    protected maxRightPos: number = 0;
    protected timeBetweenLaunch: number = 1000;
}