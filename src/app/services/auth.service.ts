import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private url: string = "https://mentor-test-api.herokuapp.com/user/";

  private authStatus = new BehaviorSubject(false);
  currentAuthStatus = this.authStatus.asObservable();
  private userData = new BehaviorSubject(null);
  currentUserData = this.userData.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  changeAuthStatus(auth) {
    this.authStatus.next(auth);
  }

  userDetails(user) {
    this.userData.next(user);
  }

  registerUser(user) {
    return this.http.post<any>(this.url + "register", user);
  }

  loginUser(user) {
    return this.http.post<any>(this.url + "login", user);
  }

  logoutUser() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getCurrentUser() {
    let params = new HttpParams()
      .set("userId", this.userData.getValue()._id);
    return this.http.get<any>(
      "https://mentor-test-api.herokuapp.com/shop/current", {params: params}
    );
  }
}
