import { Component, OnInit } from '@angular/core';
import { MentorService } from 'src/app/services/mentor.service';
import { Mentor } from 'src/app/models/Mentor';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  ages = ["1998", "1999", "2000", "2001", "2002", "2003"];
  placeholders ={"name" : "Full name", "age" : "Birth year", "major" : "Major", "university" : "University", "email" : "Email"};
  step : number = 1;
  firstTime : boolean = true;
  persInfo ;
  success : boolean;
  mentors : Mentor[] ;
  selected: Mentor[] = [];
  clicked: number = -1;
  loading : boolean = true ;
  title = ["Personal Information","Select three mentors",""];
  error: any;
  constructor(private mentorService: MentorService, private authService: AuthService) { }

  ngOnInit() {
    this.mentorService.getAllMentors().subscribe(
      (res) =>
      (this.mentors = this.shuffle(res.mentors.map((mentor) => {
        return {
          id: mentor._id,
          name: mentor.name,
          university: mentor.university,
          position: mentor.position,
          linkedinUrl: mentor.linkedinUrl,
          imageUrl: mentor.imageUrl,
          desc: mentor.description,
          show : mentor.show
          //category: mentor.category.cat_name,--------------------------------------------------------------
        };
      }))),
      (err) => {
        if (!err.status) console.log(err);
      }
    );
  }

  shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  next(){
    this.step ++ ;
  }

  back (){
    this.step --;
  }

  select(i) {
    this.clicked = -1;
    if (this.here(i)) {
      this.delete(i);
    }
    else {
      if(this.selected.length < 3){
      this.selected.push(this.mentors[i]);
      }
    }
  }


  delete(i) {
    this.selected.splice(this.selected.indexOf(this.mentors[i], 0), 1);
  }

  here(i) {
    return this.selected.find(element => element === this.mentors[i]);
  }

  full() {
    return this.selected.length > 2;
  }

  disable(i) {
    if (this.full()) {
      if (this.here(i)) {
        return false;
      }
      return true;
    }
  }

  click(i) {
    this.clicked = i;
  }

  setData(data){
    console.log(data)
    if (data.name != "") this.placeholders.name = data.name;
    if (data.age != "") this.placeholders.age = data.age;
    if (data.major != "") this.placeholders.major = data.major;
    if (data.university != "") this.placeholders.university = data.university;
    if  (data.email != "") this.placeholders.email = data.email;
    this.firstTime = false;
    this.step ++;
  }

  submit(){
    this.step ++;
    let regData = {
      email: this.placeholders.email,
      name: this.placeholders.name,
      age : this.placeholders.age,
      major : this.placeholders.major,
      university : this.placeholders.university,
      mentors : [this.selected[0].id, this.selected[1].id, this.selected[2].id],
      password: "123456789",
    };
    this.authService.registerUser(regData).subscribe(
      (res) => {
        this.loading = false;
        console.log("success");
        this.success = true;
      },
      (err) => {
        this.loading = false;
        this.success = false;
        this.error = err.error.message;
        
        console.log(err.error.message);
      }
    );
  }
  
}
