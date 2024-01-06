// notification.component.ts
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './beandau-notification.component.html',
  styleUrls: ['./beandau-notification.component.css'],
})
export class NotificationComponent implements OnInit {
  message: string | null;
  isVisible: boolean = false;
  isError: boolean = false;

  constructor(private notificationService: NotificationService) {
    this.message = null;
  }

  ngOnInit() {
    this.notificationService.notification$.subscribe(({ message, type }) => {
      this.message = message;
      this.isVisible = true;
      this.isError = type === 'error';

      // Déclenche la disparition du bandeau après 3000 millisecondes (3 secondes)
      setTimeout(() => {
        this.isVisible = false;
      }, 3000);
    });
  }
}
