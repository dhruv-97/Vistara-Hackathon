import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Chat} from '../../providers/chat';
import { Content } from 'ionic-angular';
/*
  Generated class for the ChatBot page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-chat-bot',
  templateUrl: 'chat-bot.html',
  providers: [Chat]
})
export class ChatBotPage {
  @ViewChild(Content) content: Content;
  responses = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private service: Chat) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatBotPage');
  }
  sendText(x){
    this.service.getResponse({question:x._value}).then(res=>{
      this.responses.push({question:x._value,answer:res.answers[0].answer})
      this.scrollToBottom();
    },
    err=>alert("Cannot get any response from api"))
  }
  scrollToBottom() {
    this.content.scrollToBottom();
  }

}
