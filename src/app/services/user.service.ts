import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInformation } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfoSubject = new BehaviorSubject<UserInformation>(
    this.getUserInfoFromLocalStorage()
  );
  userInfo$ = this.userInfoSubject.asObservable();

  get userInfo(): UserInformation {
    return this.userInfoSubject.getValue();
  }

  set userInfo(info: UserInformation) {
    this.userInfoSubject.next(info);
    this.saveUserInfoToLocalStorage(info);
  }

  saveUserInfo(info: UserInformation): void {
    this.userInfo = info;
  }

  private saveUserInfoToLocalStorage(info: UserInformation): void {
    localStorage.setItem('userInfo', JSON.stringify(info));
  }

  private getUserInfoFromLocalStorage(): UserInformation {
    const info = localStorage.getItem('userInfo');
    return info
      ? JSON.parse(info)
      : {
          name: '',
          phoneNumber: '',
          email: '',
          cardNumber: '',
          cardName: '',
          validationDate: '',
          securityCode: '',
          address: '',
          userNote: '',
        };
  }
}
