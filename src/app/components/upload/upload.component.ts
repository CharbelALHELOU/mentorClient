import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  id: string;
  private sub: any;
  loading : boolean = false;
  success : boolean = false;
  done : boolean = false;
  message : string = "";

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  fileName = '';

  constructor(private http: HttpClient, private route: ActivatedRoute, private authService : AuthService) { }

  onFileSelected(event) {

    const file: File = event.target.files[0];

    if (file) {

      this.fileName = file.name;
      this.loading = true
      this.message = "The upload may take some time, please don't leave this page"

      const formData = new FormData();

      formData.append("resume", file);

      this.authService.upload(formData, this.id).subscribe(
        (res) => {
          this.loading = false;
          this.success = res.success;
          if(res.success){
            this.message = "Resume succesfully uploaded !"
          } else{
          this.message = res.message;
          }
        },
        (err) => {
          this.loading = false;
          this.success = false;
          
          console.log(err.error.message);
        }
      );

      this.done = true;

    }
  }

}
