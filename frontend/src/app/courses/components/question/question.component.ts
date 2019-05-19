import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, Inject, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Text2speechService } from "../../services/text2speech.service";
import { Speech2textService } from "../../services/speech2text.service";
import { SpeechNotification } from '../../models/speech-notification';
import { SpeechError } from '../../models/speech-error';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Question } from '../../models/question';
import { Attempt } from '../../models/attempt';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  providers: [
    Text2speechService, 
    Speech2textService
  ],
})
export class QuestionComponent implements OnInit{
  @ViewChild("avatar") avatarImage:ElementRef;

  AvatarImages = ['jobs_full.png','jobs_mouth_wide5.png','jobs_mouth_wide5.png','jobs_mouth_narrow_o.png','jobs_mouth_wide_y.png',
	'jobs_mouth_wide5.png','jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_narrow_w.png','jobs_mouth_narrow_o.png',
	'jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_narrow_u.png','jobs_mouth_wide5.png','jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_wide_sh.png',
	'jobs_mouth_wide5.png','jobs_mouth_wide_sh.png','jobs_mouth_wide_sh.png','jobs_mouth_wide_th.png','jobs_mouth_wide_f.png',
  'jobs_mouth_wide_sh.png','jobs_mouth_wide_d_f_k_r_s.png','jobs_mouth_closed.png'];

  curr_question : Question;
  curr_attempt : Attempt;

  finalTranscript = '';
  recognizing = false;
  notification: string;
  languages: string[] =  ['en-US', 'en-UK', 'en-IN'];
  currentLanguage: string;

  speaking: boolean = false;
	sentenceIndex: number = -1;
	sentences: Array<string>;
	speakinterval: number;
  speakAndAnimateFlag: number = 1;
  speechRate = 0.9;
  variable: any;
  imagePath: string = "~/assets/images/avatar/";

  constructor(private TtsService: Text2speechService,
              private changeDetector: ChangeDetectorRef,
              private SttService: Speech2textService,
              private zone: NgZone,
              public dialogRef: MatDialogRef<QuestionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.curr_question = this.data.question;
    this.curr_attempt = this.data.attempt;
    this.currentLanguage = this.languages[0];
    this.SttService.initialize(this.currentLanguage);
    this.initRecognition();
    this.notification = null;
    this.variable = this.curr_question.question;
		this.variable.replace(".","?");
		this.sentences = this.variable.split("? ");
  }

  speakNextSentence(){
		console.log("speakNextSentence called ", this.speakAndAnimateFlag, this.speaking, this.sentenceIndex);
		this.speakAndAnimateFlag++;
		if(this.speaking && this.speakAndAnimateFlag == 2) {
			this.speakAndAnimateFlag = 0;
			this.sentenceIndex++;
			if(this.sentenceIndex<this.sentences.length) {
				// this.speakOptions.text = this.sentences[this.sentenceIndex];
				this.TtsService.speak(this.sentences[this.sentenceIndex])
				// .then(()=>{
        console.log("calling animate avatar"); 
				this.animateAvatar();
				// (err)=>{console.log(err);});
			} else {
				this.sentenceIndex = -1;
				this.speaking = false;
				this.speakAndAnimateFlag = 1;
			}
		}
	}

	animateAvatar(): void {
		let i = 0;
    this.speakinterval = window.setInterval(() => { 
      console.log(this.imagePath + this.AvatarImages[this.curr_question.visemes[this.sentenceIndex][i]]);
			this.avatarImage.nativeElement.src = this.imagePath + this.AvatarImages[this.curr_question.visemes[this.sentenceIndex][i]];
      i++;
      if (i == this.curr_question.visemes[this.sentenceIndex].length) {
				clearInterval(this.speakinterval);
				this.speakNextSentence();
			}
		}, this.speechRate*85);
	}

  askQuestion(){
    console.log("Inside component");
    this.speaking = true;
    this.speakNextSentence();
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
