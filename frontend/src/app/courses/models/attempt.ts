export class Attempt {
    question: number;
    count:number;
    score:number;
    totalscore: number;

    constructor(q){
        this.question = q;
        this.count = 0;
        this.score = 0;
        this.totalscore = 0;
    }
}