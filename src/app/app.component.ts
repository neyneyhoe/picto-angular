import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MessageContainerComponent } from './message-container/message-container.component';
import { PictoService } from './picto.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule, MessageContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'picto';
  messages: { text: string, timestamp: string, type: 'user' | 'response', images?: string[] }[] = [];
  messageText: string = '';
  showLogin: boolean = false;
  showSignUp: boolean = false;

  constructor(private pictoService: PictoService) { }

  sendMessage() {
    const trimmedMessage = this.messageText.trim();
    if (trimmedMessage) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.messages.push({ text: trimmedMessage, timestamp: timestamp, type: 'user' });
      this.messageText = '';

      this.pictoService.sendInquiry(trimmedMessage).subscribe(response => {
        const responseTimestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        if (response.reply && response.images) {
          if (response.images.length > 0) {
            this.messages.push({
              text: 'This is the result of your image inquiry:',
              timestamp: responseTimestamp,
              type: 'response',
              images: response.images 
            });
            console.log(this.messages);
          } else {
            console.error('No image found in the response.');
          }
        }
      });
    }
  }


  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  toggleLogin() {
    this.showLogin = !this.showLogin;
    if (this.showLogin) {
      this.showSignUp = false;
    }
  }

  toggleSignUp() {
    this.showSignUp = !this.showSignUp;
    if (this.showSignUp) {
      this.showLogin = false;
    }
  }

  closeForms() {
    this.showLogin = false;
    this.showSignUp = false;
  }
}