export class Color{
    hex: string;
    name: string;

    constructor(data: { hex: string; name: string;}){
        this.hex = data.hex;
        this.name = data.name;
    }
}


export class MockColor{
    hex: string;
    name: string;

    constructor(data: string[]){
        this.hex = data[0]
        this.name = data[1];
    }
}


export class ColorData{
    options: Color[];
    correctAnswer: Color;

    constructor(responseData: { options: Color[], correctAnswer: Color}){
        this.options = responseData.options;
        this.correctAnswer = responseData.correctAnswer;
    }
}

export class MockColorsResponse {

    options: Color[];
    correctAnswer: Color;

    constructor(data: any){
        this.options = [];

        for(let item of data){
            this.options.push(new Color(new MockColor(item)));
        }
        this.correctAnswer = this.selectCorrectColor();
    }

    selectCorrectColor(){
        return this.options[Math.floor(Math.random() * this.options.length)];
    }
}

export enum Points{
    FIVE = 5,
    TWO = 2,
    ONE = 1
}