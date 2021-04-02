import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class MentorService {
  private url = "https://mentor-test-api.herokuapp.com/shop";

  private mentors = new BehaviorSubject(null);
  currentMentors = this.mentors.asObservable();

  private mentor = new BehaviorSubject(null);
  currentMentor = this.mentor.asObservable();

  private categories = new BehaviorSubject(null);
  currentCategories = this.categories.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  getShopInventory() {
    return this.http.get<any>(this.url + "/info");
  }

  displayedCategories(categories) {
    this.categories.next(categories);
  }

  displayedMentors(mentors) {
    this.mentors.next(mentors);
  }

  chosenMentor(mentor) {
    this.mentor.next(mentor);
  }

  getAllMentors() {
    return this.http.get<any>(this.url + "/mentors");
  }

  getAllCategories() {
    return this.http.get<any>(this.url + "/category");
  }

  getMentorsByCategory(categoryName) {
    return this.http.get<any>(this.url + "/category/" + categoryName);
  }

  getMentorsByName(mentorName) {
    return this.http.get<any>(this.url + "/search/" + mentorName);
  }

  createMentor(newMentor) {
    return this.http.post<any>(this.url, newMentor);
  }

  editMentor(mentorId, updatedMentor) {
    return this.http.put<any>(this.url + "/" + mentorId, updatedMentor);
  }

  deleteMentor(mentorId) {
    return this.http.delete<any>(this.url + "/" + mentorId);
  }

  createCategory(category) {
    return this.http.post<any>(this.url + "/category", category);
  }
}
