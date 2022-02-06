import { Color } from "./colors";

export class Answer {
    isCorrect: boolean;
    color: Color;

    constructor(isCorrect: boolean, color: Color){
        this.isCorrect = isCorrect;
        this.color = color;
    }
}