import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  image: File | undefined;

  constructor(
    private api: ApiService
  ) {}

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  onSubmit() {
    if (this.image) {
      const formData = new FormData();
      formData.append("image", this.image!);
  
      this.api.post("upload", formData).subscribe((res) => {
        console.log(res)
      })

    } else {
      console.log("No file selected")
    }

  }

}
