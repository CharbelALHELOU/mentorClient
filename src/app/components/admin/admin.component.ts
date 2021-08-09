import { Component, OnInit } from '@angular/core';
import { element } from '@angular/core/src/render3';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Mentor } from 'src/app/models/Mentor';
import { AuthService } from 'src/app/services/auth.service';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  mentors: Mentor[];
  users: any;
  newUsers: boolean = false;
  user: boolean = true;
  url = "";
  NumOfNew = 0;
  NoResume = 0;
  currentUser = {
    id: "",
    university: "",
    major: "",
    age: "",
    name: "",
    email: "",
    resumeUrl: "",
    mentors: [],
  };

  constructor(private mentorService: MentorService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.mentorService.getAllMentors().subscribe(
      (res) =>
      (this.mentors = res.mentors.map((mentor) => {
        return {
          id: mentor._id,
          name: mentor.name,
          university: mentor.university,
          position: mentor.position,
          linkedinUrl: mentor.linkedinUrl,
          imageUrl: mentor.imageUrl,
          desc: mentor.description,
          show: mentor.show
          //category: mentor.category.cat_name,--------------------------------------------------------------
        };
      })),
      (err) => {
        if (!err.status) console.log(err);
      }
    );


    this.authService.getAllUsers().subscribe(
      (res) =>
      (this.users = res.users.map((user) => {
        if (user.mentors.length == 3) {
          this.newUsers = true;
          this.NumOfNew = this.NumOfNew + 1;
          if (user.resumeUrl == 'none') {
            this.NoResume = this.NoResume + 1;
          }
        }

        return {
          id: user._id,
          university: user.university,
          major: user.major,
          age: user.age,
          name: user.name,
          email: user.email,
          resumeUrl: user.resumeUrl,
          mentors: user.mentors,
        };

      }).sort(function (a, b) {
        return -a.resumeUrl.length + b.resumeUrl.length;
      })),
      (err) => {
        if (!err.status) console.log(err);
      }
    );

  }

  getName(id) {
    return this.capitalize(this.mentors.find(element => element.id == id).name);
  }

  logout() {
    this.authService.logoutUser();
    this.authService.userDetails(null);
    this.router.navigate["/"];
  }

  capitalize(word) {
    const name = word.split(" ");
    const first = name[0][0].toUpperCase() + name[0].slice(1).toLowerCase();
    var init = "";
    for (let i = 1; i < name.length; i++) {
      init = init + name[i][0].toUpperCase() + ".";
    }
    return first + " " + init;
  }


  getMentees(id) {
    var mentees = [];
    this.users.map((user) => {
      if (user.mentors.length == 1 && user.mentors[0] == id) {
        mentees.push(user.name.split(" ")[0].toLowerCase());
      }
    })
    return mentees;
  }

  switch(j) {
    this.mentorService.show(this.mentors[j].id, !this.mentors[j].show).subscribe(response => { console.log(response) });
    this.mentors[j].show = !this.mentors[j].show;
  }

  detailsOf(i) {
    this.currentUser = this.users[i];
    this.url = this.getPreview(this.currentUser.resumeUrl);
    document.getElementById("modal").style.display = "flex";
  }

  avgAge() {
    var avg = 0;
    const currentYear = new Date().getFullYear();
    this.users.map((user) => {
      if (user.name != 'admin') {
        avg = avg + (-user.age + currentYear);
      }
    })
    return (avg / (this.users.length - 1)).toFixed(2);
  }

  getPreview(url){
    return url.split('view')[0]+"&embedded=true";
  }

  closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  avgMentees() {
    var avg = 0;
    this.mentors.map((mentor) => {
      avg = avg + this.getMentees(mentor.id).length;
    })
    return (avg / this.mentors.length).toFixed(2)
  }

  submit(form: NgForm, i) {
    //var mentorId = this.mentors.find(element => element.name === form.controls.name.value).id;
    if (form.controls.name.value == 0) {
      this.authService.delete(this.users[i].id).subscribe(response => { console.log(response) })
    } else {
      this.authService.assign(this.users[i].id, form.controls.name.value).subscribe(response => { console.log(response) });
    }
    this.newUsers = false;
    this.authService.getAllUsers().subscribe(
      (res) =>
      (this.users = res.users.map((user) => {
        if (user.mentors.length == 3) {
          this.newUsers = true;
          this.NumOfNew = this.NumOfNew + 1;
          if (user.resumeUrl == 'none') {
            this.NoResume = this.NoResume + 1;
          }
        }

        return {
          id: user._id,
          university: user.university,
          major: user.major,
          age: user.age,
          name: user.name,
          email: user.email,
          resumeUrl: user.resumeUrl,
          mentors: user.mentors,
        };

      }).sort(function (a, b) {
        return -a.resumeUrl.length + b.resumeUrl.length;
      })),
      (err) => {
        if (!err.status) console.log(err);
      }
    );
  }

}
