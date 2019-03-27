import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../../models/question';
import { Attempt } from '../../models/attempt';

@Component({
  selector: 'question-tile',
  templateUrl: './question-tile.component.html',
  styleUrls: ['./question-tile.component.scss']
})
export class QuestionTileComponent implements OnInit {

  @Input('question') question: Question;
  @Input('attempt') attempt: Attempt;

  constructor() { }

  ngOnInit() {
  }

}
