import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
// Services
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  isAuth: boolean = false;
  isEmpty: boolean = false;
  warning: string = "";
  Register1: boolean = false;

  // modal & loading
  isLoading: boolean = true;
  display: string = "none";
  modalHeader: string = "";
  modalBody: string = "";
  selectedFile: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoading = false;
    this.authService.currentAuthStatus.subscribe(
      (auth) => (this.isAuth = auth)
    );
  }

  timeout() {
    var that = this;
    setTimeout(function () {
      that.timeout();
    }, 1000 / 60);
  }
  refresh(form: NgForm): void {
    document.getElementById("name-section").classList.remove("fold-up");
    document.getElementById("email-section").classList.add("folded");
    document.getElementById("email-section").classList.remove("fold-up");
    document.getElementById("pass-section").classList.add("folded");
    document.getElementById("pass-section").classList.remove("fold-up");
    form.reset();
  }

  submitName(form: NgForm) {
    console.log("Something");
    if (!form.controls.name.errors) {
      document.getElementById("name-section").classList.add("fold-up");
      document.getElementById("email-section").classList.remove("folded");
    }
  }

  submitEmail(form: NgForm) {
    console.log("Something");
    if (!form.controls.email.errors) {
      document.getElementById("email-section").classList.add("fold-up");
      document.getElementById("pass-section").classList.remove("folded");
    }
  }

  submitPass(form: NgForm) {
    console.log("Something");
    if (!form.controls.password.errors) {
      document.getElementById("pass-section").classList.add("fold-up");
      document.getElementById("file-section").classList.remove("folded");
    }
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }

  submit(form: NgForm) {
    document.getElementById("file-section").classList.add("fold-up");
    this.isEmpty = false;
    let fd = new FormData();
    fd.append("name", form.controls.name.value);
    fd.append("email", form.controls.email.value);
    fd.append("password", form.controls.password.value);
    fd.append("resumeUrl", this.selectedFile, this.selectedFile.name);
    this.isLoading = true;
    this.authService.registerUser(fd).subscribe(
      (res) => {
        document.getElementById("success").classList.add("done");
        this.isLoading = false;
         setTimeout(() => {
           this.router.navigate(["/login"]);
         }, 2000);
      },
      (err) => {
        document.getElementById("unsuccess").classList.add("done");
        this.isLoading = false;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    );
  }
}
