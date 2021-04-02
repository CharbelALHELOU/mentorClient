import { Component, OnInit } from "@angular/core";
// Services
import { AuthService } from "src/app/services/auth.service";
import { MentorService } from "src/app/services/mentor.service";
//Models
import { User } from "src/app/models/User";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.css"]
})
export class MainComponent implements OnInit {
  isAuth: boolean = false;
  user: User = null;
  mentorsTotal: number = 0;
  ordersTotal: number = 0;
  // modal & loading
  isLoading: boolean = true;
  display: string = "none";
  modalHeader: string = "";
  modalBody: string = "";

  constructor(private authService: AuthService, private mentorService: MentorService) {}

  ngOnInit() {
    // import shop inventory
    this.mentorService.getShopInventory().subscribe(
      res => {
        this.mentorsTotal = res.mentorsTotal;
        this.isLoading = false;
        // import user data
      },
      err => this.onError()
    );
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  // modal
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  onError() {
    this.isLoading=false
    this.modalHeader = "An Error Has Occurred";
    this.modalBody = "Could not load ngMarket orders & mentor information do to server communication problem. Please try again later.";
    this.openModal();
  }


  
}
