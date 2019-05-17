import { Injectable, OnInit } from '@angular/core';
import Speech from 'speak-tts';

@Injectable({
  providedIn: 'root'
})
export class Text2speechService implements OnInit {

  constructor(private tts: Speech) {}

  ngOnInit(){
    this.tts
      .init({
        volume: 0.5,
        lang: "en-US",
        rate: 0.9,
        pitch: 1,
        voice: 'Google US English Male',
      })
      .then(data => {
        console.log("Speech is ready", data);
      })
      .catch(e => {
        console.error("An error occured while initializing: ", e);
      });
  }

  speak(data) {
    console.log(data);
    this.tts
      .speak({
        text: data,
      })
      .then(data => {
        console.log("TTS success! ", data);
      })
      .catch(e => {
        console.error("Error occurred: ", e);
      })
  }
}