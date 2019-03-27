export class LessonAttempt {
   lesson:number;
   score:number;
   starttime:any;
   lasttime:any;
   questions:number;
   attempts:number;

   constructor(id:number) {
      this.lesson = id;
      this.score = 0;
      this.questions = 0;
      this.attempts = 0;
   }
}