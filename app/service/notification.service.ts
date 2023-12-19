import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  countSubject = new BehaviorSubject<any>('');
  count$ = this.countSubject.asObservable();

  constructor() {}

  updateCount(count: any) {
    this.countSubject.next(count);
  }
}
