export class GuessFeedback {
    compliment: string;
    insult: string;
    constructor(){
        this.compliment = compliments[Math. floor(Math. random()* compliments.length)];
        this.insult = insults[Math. floor(Math. random()* insults.length)];
    }
}


const compliments:string [] =
[
    "Great Job!!!",
    "You are Amazing",
    "Such a great eye for colors!",
    "You are a rockstar",
    "You have a better eye than Da Vinci",
    "Look at you Van Gogh!!",
    "Show your friends how awesome you are at guessing colors",
    "You chose wisely"
];

const insults:string [] =
[
    "You suck! What are you? Color Blind?",
    "Life can be tough, but guessing colors shouldn't be",
    "Pathetic. Pathetic. Pathetic.",
    "HAA! haaa hahahahahaahaha",
    "Wow... just wow",
    "You thought this game would have only basic colors?!?",
    "You chose... Poooorly",
    "Matt Murdock has better vision than you"
]