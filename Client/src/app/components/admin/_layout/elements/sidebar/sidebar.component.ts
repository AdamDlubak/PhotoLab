import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { UserService } from "../../../../../services/user.service";
import { FileService } from './../../../../../services/file.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit, OnDestroy {
  status: boolean;
  subscription: Subscription;
  errorMessage: any;
  newOrdersAmount: number = 0;
  constructor(private userService: UserService, private fileService: FileService) {}

  logout() {
    this.userService.logout();
  }


  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(
      status => (this.status = status)
    );
    this.getNewOrdersAmount();
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  getNewOrdersAmount() {
    this.fileService
    .getNewOrdersAmount()
    .subscribe(
      data => { this.newOrdersAmount = data },
      error => (this.errorMessage = error)
    );
  }
}
