import { Injectable } from '@angular/core';
// import Speech from 'speak-tts';

@Injectable({
  providedIn: 'root'
})
export class Text2speechService {

  message: any;

  constructor() {
    this.initSynthesis();
  }

  initSynthesis(): void {
    this.message = new SpeechSynthesisUtterance();
    this.message.volume = 1;
    this.message.rate = 1;
    this.message.pitch = 0.2; 
  }

  speak(message: string, language: string): void {
    this.message.lang = language;
    this.message.text = message;
    speechSynthesis.speak(this.message); 
  }
}
 