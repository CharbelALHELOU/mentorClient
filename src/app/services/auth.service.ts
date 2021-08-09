import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "../models/User";

@Injectable({ providedIn: "root" })
export class AuthService {
  private url: string = "https://thawing-journey-90753.herokuapp.com/user";

  private authStatus = new BehaviorSubject(false);
  currentAuthStatus = this.authStatus.asObservable();
  private userData = new BehaviorSubject(null);
  currentUserData = this.userData.asObservable();
  user : User;

  constructor(private http: HttpClient, private router: Router) {}

  changeAuthStatus(auth) {
    this.authStatus.next(auth);
  }

  userDetails(user) {
    this.userData.next(user);
  }

  registerUser(user) {
    return this.http.post<any>(this.url + "/register", user);
  }

  loginUser(user) {
    return this.http.post<any>(this.url + "/login", user);
  }

  delete(userId){
    return this.http.delete<any>(this.url + "/"+ userId);
  }

  logoutUser() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  editMentors(selection, userId) {
    console.log(selection);
    this.user.mentors = selection;
    return this.http.put<any>(this.url + '/' + userId ,{ mentors : selection})
  }

  getToken() {
    return localStorage.getItem("token");
  }

  upload(form,id){
    return this.http.post<any>(this.url + "/upload/" + id, form);
  }

  assign(userId, mentor){
    return this.http.post<any>(this.url + "/assign", {userId : userId, mentor : mentor});
  }

  setUser(user){
    this.user = user;
  }

  getAllUsers() {
    return this.http.get<any>(this.url + "/all");
  }

  getUser(){
    return this.user;
  }
}
