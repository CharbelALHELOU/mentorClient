import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Mentor } from 'src/app/models/Mentor';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { MentorService } from 'src/app/services/mentor.service';

@Component({
  selector: "app-mentors",
  templateUrl: "./mentors.component.html",
  styleUrls: ["./mentors.component.css"],
})
export class MentorsComponent implements OnInit {
  @Input() user: User;
  filteredStatus: string = "";
  mentors: Mentor[];
  categories: Category[];
  orderStatus: boolean = false;
  currentMentor: Mentor;
  // modal & loading
  isLoading: boolean = true;
  display: string = "none";
  modalHeader: string = "";
  modalBody: string = "";

  constructor(
    private mentorService: MentorService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // orders
    this.mentorService.getAllMentors().subscribe(
      (res) =>
        (this.mentors = res.mentors.map((mentor) => {
          return {
            id: mentor._id,
            name: mentor.name,
            university: mentor.university,
            linkedinUrl: mentor.linkedinUrl,
            imageUrl: mentor.imageUrl,
            category: mentor.category.cat_name,
          };
        })),
      (err) => {
        if (!err.status) this.onError();
      }
    );
    // categories
    this.mentorService.currentCategories.subscribe(
      (categories) => (
        (this.categories = categories), (this.isLoading = false)
      ),
      (err) => this.onError()
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    // import mentor data
    this.mentorService.getAllMentors().subscribe(
      (res) =>
        (this.mentors = res.mentors.map((mentor) => {
          return {
            id: mentor._id,
            name: mentor.name,
            university: mentor.university,
            linkedinUrl: mentor.linkedinUrl,
            imageUrl: mentor.imageUrl,
            category: mentor.category.cat_name,
          };
        })),
      (err) => {
        if (!err.status) this.onError();
      }
    );

    // import categories
    this.mentorService.getAllCategories().subscribe(
      (res) =>
        (this.categories = res.categories.map((category) => {
          return {
            id: category._id,
            cat_name: category.cat_name,
            mentors: category.mentors,
          };
        })),
      (err) => {
        if (!err.status) this.onError();
      }
    );
  }

  onSearch(mentorName) {
    // http request for mentors by name or partial string, update mentors display
    this.mentorService.getMentorsByName(mentorName).subscribe(
      (res) => {
        this.isLoading = false;
        this.mentorService.displayedMentors(
          res.mentors.map((mentor) => {
            return {
              id: mentor._id,
              name: mentor.name,
              university: mentor.university,
              linkedinUrl: mentor.linkedinUrl,
              imageUrl: mentor.imageUrl,
              category: mentor.category.cat_name,
            };
          })
        );
      },
      (err) => (this.isLoading = false)
    );
  }

  onCategorySelected(categoryName) {
    this.isLoading = true;
    // http request for mentors by category, update mentors display
    this.mentorService.getMentorsByCategory(categoryName).subscribe(
      (res) => {
        this.isLoading = false;
        this.mentorService.displayedMentors(
          res.mentors.map((mentor) => {
            return {
              id: mentor._id,
              name: mentor.name,
              university: mentor.university,
              linkedinUrl: mentor.linkedinUrl,
              imageUrl: mentor.imageUrl,
              category: mentor.category.cat_name,
            };
          })
        );
      },
      (err) => (this.isLoading = false)
    );
  }

  onShowAllMentors() {
    this.isLoading = true;
    this.mentorService.getAllMentors().subscribe((res) => {
      this.isLoading = false;
      this.mentorService.displayedMentors(
        res.mentors.map((mentor) => {
          return {
            id: mentor._id,
            name: mentor.name,
            university: mentor.university,
            linkedinUrl: mentor.linkedinUrl,
            imageUrl: mentor.imageUrl,
            category: mentor.category.cat_name,
          };
        })
      );
    });
  }

  onMentorEdit(mentor) {
    this.mentorService.chosenMentor(mentor);
  }

  // modal
  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }
  onError() {
    this.isLoading = false;
    this.modalHeader = "An Error Has Occurred";
    this.modalBody =
      "Could not display mentors do to server communication problem. Please try again later.";
    this.openModal();
  }
}
