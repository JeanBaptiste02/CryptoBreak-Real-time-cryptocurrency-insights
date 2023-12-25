import { Component, OnInit } from '@angular/core';
import { CommunityService, Message } from '../service/community.service';

@Component({
  selector: 'app-community-section',
  templateUrl: './community-section.component.html',
  styleUrls: ['./community-section.component.css'],
})
export class CommunitySectionComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.communityService.getMessages().subscribe((messages: Message[]) => {
      this.messages = messages;
    });
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const newMessage: Message = {
        content: this.newMessage,
        username: 'Username',
      };

      this.communityService
        .sendMessage(newMessage)
        .subscribe((message: Message) => {
          this.messages.push(message);
          this.newMessage = '';
        });
    }
  }
}
