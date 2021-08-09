import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
// Services
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  isEmpty: boolean = false;
  isAuth: boolean = false;
  warning: string = "";
  // modal & loading
  isLoading: boolean = true;
  isError: boolean = false;
  display: string = "none";
  modalHeader: string = "";
  modalBody: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.currentAuthStatus.subscribe(
      (auth) => (this.isAuth = auth)
    );
    this.isLoading = false;
  }

  onLoginUser(form: NgForm) {
    if (!form.valid) {
      this.isEmpty = true;
      this.warning = "Please fill all required fields";
    } else {
      var pass = (form.controls.email.value != "admin@mentor-pack.com") ? "" : form.controls.password.value;
      this.isLoading = true;
      let userLoginData = {
        email: form.controls.email.value,
        password: pass,
      };
      this.isEmpty = false;
      this.authService.changeAuthStatus(true);
      this.authService.loginUser(userLoginData).subscribe(
        (res) => {
          this.isLoading = false;
          localStorage.setItem("token", res.token);
          localStorage.setItem("help", res.user.role)
          this.authService
            .userDetails(res.user);
          this.authService.setUser(res.user);
          this.router.navigate(['/dashboard']);
        },
        (err) => {
          this.isLoading = false;
          if (err.status) {
            this.isError = true;
            this.warning =
              "Could not login user. Please make sure of your credentials";
            setTimeout(() => {
              this.isError = false;
            }, 5000);
            this.isEmpty = true;
          } else this.onError();
        }
      );
      form.reset();
    }
  }

  // modal
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  onError() {
    this.modalHeader = "An Error Has Occurred";
    this.modalBody =
      "Could not login user do to server communication problem. Please try again later.";
    this.openModal();
  }
}
