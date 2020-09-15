import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  auth: boolean = false;
  shiftData: FormGroup;
  stepOne: boolean = true;
  stepTwo: boolean = false;
  stepThree: boolean = false;

  constructor(private route: Router, private fb: FormBuilder) 
  {
    this.shiftData = this.fb.group({
      'userName': ['',[Validators.required ]],
      'password': ['', Validators.required],
    });  
  }

  ngOnInit(): void {
    localStorage.getItem('authentication') === 'true' ? this.auth = true : this.auth = false;
    this.unauthorizedNavigation();
  }

  // navigate to login page if unauthorized access
  unauthorizedNavigation()
  {
    !this.auth ? this.route.navigate(['/login']) : this.route.navigate([''])
  }

  //activates when next button clicked
  nextButton(slide: any)
  {
    switch(slide)
    {
      case '1':
        {
        this.stepOne = false;
        this.stepThree = false;
        this.stepTwo = true;
        break;
        }
        case '2':
          {
            this.stepTwo = false;
            this.stepOne = false;
            this.stepThree = true;
            break;
          }
          case '3':
            {
              this.stepTwo = false;      
              this.stepThree = false;
              this.stepOne = true;
            }    
    }
  }

  backButton(slide: any)
  {
    switch(slide)
    {
    case '2':
        {
          this.stepThree = false;
          this.stepTwo = false;
          this.stepOne = true;
        break;
        }
        case '3':
          {
            this.stepOne = false;
            this.stepThree = false;
            this.stepTwo = true;
            break;
          }
        }
  }

  //adding details on plus icon click
  addDetails()
  {
    
  }

}
