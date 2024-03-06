import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  constructor(public messageService: MessageService) {}
}
