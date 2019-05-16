import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TextspeechService } from "../shared/services/textspeech.service";
import { SpeechtotextService } from "../shared/services/speechtotext.service";
import { SpeechNotification } from '../shared/models/speech-notification';
import { SpeechError } from '../shared/models/speech-error';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [
    TextspeechService, 
    SpeechtotextService
  ],
})
export class QuestionComponent implements OnInit{

  AvatarImages = ['jobs_full.png','jobs_mouth_wide5.png','jobs_mouth_wide5.png','jobs_mouth_narrow_o.png','jobs_mouth_wide_y.png',
	'jobs_mouth_wide5.png','jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_narrow_w.png','jobs_mouth_narrow_o.png',
	'jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_narrow_u.png','jobs_mouth_wide5.png','jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_wide_sh.png',
	'jobs_mouth_wide5.png','jobs_mouth_wide_sh.png','jobs_mouth_wide_sh.png','jobs_mouth_wide_th.png','jobs_mouth_wide_f.png',
  'jobs_mouth_wide_sh.png','jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_closed.png'];
  question_id = 1;
	question_label = "Algorithm definition";
	question = "What is an algorithm in computer science? What is the use of an algorithm?";
	question_visemes = [[7, 1, 19, 6, 15, 1, 19, 1, 14, 20, 5, 6, 17, 1, 21, 6, 19, 20, 1, 21, 21, 6, 7, 19, 5, 15, 11, 1, 19, 15, 0], [7, 1, 19, 6, 15, 17, 1, 6, 7, 15, 1, 18, 1, 19, 1, 14, 20, 5, 6, 17, 1, 21, 0], [0]];
  quetion_text = "An algorithm is a finite sequence of well-defined instructions to accomplish a given task, that is to transform the given input into the output. To solve any computational problem, an appropriate algorithm or the step-by-step procedure is followed to arrive at the desired solution.";

  finalTranscript = '';
  recognizing = false;
  notification: string;
  languages: string[] =  ['en-US', 'en-UK', 'en-IN'];
  currentLanguage: string;

  constructor(private TtsService: TextspeechService,
              private changeDetector: ChangeDetectorRef,
              private SttService: SpeechtotextService) { }

  ngOnInit() {
    this.currentLanguage = this.languages[0];
    this.SttService.initialize(this.currentLanguage);
    this.initRecognition();
    this.notification = null;
  }

  askQuestion(){
    console.log("Inside component");
    this.TtsService.speak(this.question, 'en-US');
  }

  startButton(event) {
    if (this.recognizing) {
      this.SttService.stop();
      return;
    }

    this.SttService.start(event.timeStamp);
  }

  onSelectLanguage(language: string) {
    this.currentLanguage = language;
    this.SttService.setLanguage(this.currentLanguage);
  }

  private initRecognition() {
    this.SttService.onStart()
      .subscribe(data => {
        this.recognizing = true;
        this.notification = 'I\'m listening...';
        this.detectChanges();
      });

    this.SttService.onEnd()
      .subscribe(data => {
        this.recognizing = false;
        this.detectChanges();
        this.notification = null;
      });

    this.SttService.onResult()
      .subscribe((data: SpeechNotification) => {
        const message = data.content.trim();
        if (data.info === 'final_transcript' && message.length > 0) {
          this.finalTranscript = `${this.finalTranscript}\n${message}`;
          this.detectChanges();
        }
      });

    this.SttService.onError()
      .subscribe(data => {
        switch (data.error) {
          case SpeechError.BLOCKED:
          case SpeechError.NOT_ALLOWED:
            this.notification = `Cannot run the demo.
            Your browser is not authorized to access your microphone. Verify that your browser has access to your microphone and try again.
            `;
            break;
          case SpeechError.NO_SPEECH:
            this.notification = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.NO_MICROPHONE:
            this.notification = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            this.notification = null;
            break;
        }
        this.recognizing = false;
        this.detectChanges();
      });
  }

  detectChanges() {
    this.changeDetector.detectChanges();
  }
}
