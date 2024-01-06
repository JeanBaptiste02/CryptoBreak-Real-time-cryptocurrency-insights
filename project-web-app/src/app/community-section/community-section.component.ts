import { Component, OnInit } from '@angular/core';
import { CommunityService, Message } from '../service/community.service';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-community-section',
  templateUrl: './community-section.component.html',
  styleUrls: ['./community-section.component.css'],
})
export class CommunitySectionComponent implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  showEmojiPopup: boolean = false;
  selectedEmoji = '';
  emojis: string[] = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😙',
    '😚',
    '😋',
    '😜',
    '😝',
    '😛',
    '🤑',
    '🤗',
    '🤓',
    '😎',
    '🤩',
    '🥳',
    '😏',
    '😒',
    '😞',
    '😔',
    '😟',
    '😕',
    '🙁',
    '☹️',
    '😣',
    '😖',
    '😫',
    '😩',
    '😢',
    '😭',
    '😤',
    '😠',
    '😡',
    '🤬',
    '🤯',
    '😳',
    '🥺',
    '😨',
    '😰',
    '😥',
    '😓',
    '🤔',
    '🤭',
    '😪',
    '🤫',
    '🥴',
    '😷',
    '🤒',
    '🤕',
    '🤢',
    '🤮',
    '🤧',
    '🥵',
    '🥶',
    '🥳',
    '🥺',
    '🤥',
    '🤠',
    '😈',
    '👿',
    '👹',
    '👺',
    '💀',
    '👻',
    '👽',
    '👾',
    '🤖',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
    '😽',
    '🙀',
    '😿',
    '😾',
  ];
  onlineUsers: any[] = [];

  constructor(
    private communityService: CommunityService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
    this.getOnlineUsers();
    this.updateCurrentUser();
  }

  loadMessages() {
    this.communityService.getMessages().subscribe((messages: Message[]) => {
      this.messages = messages;
      const currentUser = this.userService.getUsername();
      if (currentUser) {
        this.messages.forEach((message) => {
          message.username = currentUser;
        });
      }
    });
  }

  updateCurrentUser() {
    const currentUser = this.userService.getUsername();
    if (currentUser) {
      this.messages.forEach((message) => {
        message.username = currentUser;
      });
    }
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

  toggleEmojiPopup() {
    this.showEmojiPopup = !this.showEmojiPopup;
  }

  selectEmoji(emoji: string) {
    this.selectedEmoji = emoji;
    this.showEmojiPopup = false;
    this.newMessage += emoji;
  }

  sendMessageWithEmoji() {
    const trimmedMessage = this.newMessage.trim();

    if (trimmedMessage !== '' || this.selectedEmoji.trim() !== '') {
      const messageWithEmoji = trimmedMessage + this.selectedEmoji;

      const newMessage: Message = {
        content: messageWithEmoji,
        username: 'Username',
      };

      this.communityService
        .sendMessage(newMessage)
        .subscribe((message: Message) => {
          this.messages.push(message);
          this.newMessage = '';
          this.selectedEmoji = '';
        });
    }
  }

  getOnlineUsers() {
    this.onlineUsers = [{ username: 'User1' }, { username: 'User2' }];
  }
}
