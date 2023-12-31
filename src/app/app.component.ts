import { Component, OnInit } from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username = 'username';
  message = '';
  messages = [];

  constructor(private http: HttpClient) {
  }

  onMessageChange(event: any) {
    this.message = event.target.value;
  }
  
  ngOnInit(): void{
    Pusher.logToConsole = true;

    const pusher = new Pusher('d3a49da1536a6af334ff', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', data => {  
      this.messages.push(data);
    });
  }

  submit(): void {
    this.http.post('http://localhost:8000/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '');
  }
}
