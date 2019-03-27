import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../models/question';
import { Attempt } from '../../models/attempt';

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  constructor() { }
  @Input('from') from: number = 0;
  @Input('to') to: number = 0;
  @Input('search') search: string = '';
  @Input('display') display: number = 0;
  @Input('questions') questions: Array<Question> = [];
  @Input('attempts') attempts: Array<Attempt> = [];

  getquestionattempt(q: Question): Attempt {
    let a: Attempt = null;
    if (this.attempts) a = this.attempts.find(x => x.question == q.id)
    a = a || new Attempt(q.id);
    return a;
  }

  FilteredQuestions(): Array<Question> {
    return this.questions.filter
      (question => {
        return (this.search == '' || question.title.toLowerCase().includes(this.search.toLowerCase()))
      });
    //TODO: handle display
  }


  ngOnInit() {
  }

}
