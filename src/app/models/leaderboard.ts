export class Leaderboard{
    scores: UserScore[];
    currentScore: UserScore;

    constructor(data: any){
        this.scores = data.scores;
        this.currentScore = data.currentScore
    }
}

class UserScore{
    name: string;
    score: number;
    rank: number;
}


export enum ScoreRange{
    DAILY = 'daily',
    WEEK = 'week',
    MONTH = 'month',
    ALL = 'all'
}