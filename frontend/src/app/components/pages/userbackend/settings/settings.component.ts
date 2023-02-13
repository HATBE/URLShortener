import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  // TODO:

  modalTypes = {
    default: 0,
    account: 1,
    url: 2
  }

  modalData = {
    state: this.modalTypes.default,
    type: 0,
    title: "",
    text: "",
    confirmBtnText: "",
  }

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  onModalClose() {
    this.resetModel();
  }

  private launchModal(title: string, text: string, confirmBtnText: string, type: number) {
    this.modalData.title = title;
    this.modalData.text = text;
    this.modalData.confirmBtnText = confirmBtnText;
    this.modalData.type = type;
    if(this.modalData.state == 0) {
      this.modalData.state++;
      return;
    }
  }

  private resetModel() {
    this.modalData.state = 0;
    this.modalData.title = '';
    this.modalData.text = '';
    this.modalData.type = this.modalTypes.default
  }

  onConfirmModal() {
    if(this.modalData.type == this.modalTypes.account) {
      // delete account
      this.confirmDeleteAccount();
    } else if(this.modalData.type == this.modalTypes.url) {
      // delete urls
      this.confirmDeleteUrls();
    }
    this.resetModel();
  }

  onDeleteAllUrls() {
    this.launchModal('Are you sure?', 'Are you shure you want to delete all your Urls?', 'Yes, delete them', this.modalTypes.url);

  }

  onDeleteAccount() {
    this.launchModal('Are you sure?', 'Are you shure you want to delete your account?', 'Yes, delete it', this.modalTypes.account);
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  confirmDeleteAccount() {
      this.userService.delete().subscribe(data => {
        this.userService.logout();
        this.router.navigate(['/login']);
      });
  }

  confirmDeleteUrls() {
     this.userService.deleteUrls().subscribe(data => {
        this.launchModal("Successfully deleted", "All your URLs are deleted!", "Ok", this.modalTypes.default);
      });
  }

}
