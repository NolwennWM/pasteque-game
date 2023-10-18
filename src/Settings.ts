export abstract class Settings
{
    protected cursorPos: {x:number, y:number} = {x:0, y:40};
    protected circleSizes: number[] = [5,10,20,40,60,80];
    protected timeBetweenLaunch: number = 1000;
    protected maxSize: number = 3;
}