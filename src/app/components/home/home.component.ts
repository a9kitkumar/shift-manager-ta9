import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators ,FormArray} from '@angular/forms';
import { Observable } from "rxjs";
import { first } from 'rxjs/operators';
const darkTheme ={
  container: {
      bodyBackgroundColor: '#424242',
      buttonColor: '#fff'
  },
  dial: {
      dialBackgroundColor: '#555',
  },
  clockFace: {
      clockFaceBackgroundColor: '#555',
      clockHandColor: '#7375f8',
      clockFaceTimeInactiveColor: '#fff'
  }
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  darkTheme = darkTheme
  auth: boolean = false;
  shiftData: FormGroup;
  step : number = 1
  startTime: string;
  endTime: string;
  shitScheduleForm: FormGroup
  constructor(private route: Router, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.buildForms();
    localStorage.getItem('authentication') === 'true' ? this.auth = true : this.auth = false;
    this.unauthorizedNavigation();
  }

  // navigate to login page if unauthorized access
  unauthorizedNavigation()
  {
    !this.auth ? this.route.navigate(['/login']) : this.route.navigate([''])
  }

  buildForms(){
    this.shiftData = this.formBuilder.group({
      'userName': ['',[Validators.required ]],
      'password': ['', Validators.required],
    });  

    this.shitScheduleForm = this.formBuilder.group({
      schedules: this.formBuilder.array([
         // load first row at start
         this.getShiftSchedule()
      ])
    });
  }



  private getShiftSchedule() {
    const numberPatern = '^[0-9.,]+$';
    return this.formBuilder.group({
      startTime: [''],
      endTime: ['', Validators.required],
      // qty: [1, [Validators.required, Validators.pattern(numberPatern)]],
      // unitPrice: ['', [Validators.required, Validators.pattern(numberPatern)]],
      // unitTotalPrice: [{value: '', disabled: true}]
    });
  }



  /**
   * Add new schedule row into form
   */
  addShiftSchedule()
  {
    const control = <FormArray>this.shitScheduleForm.controls['schedules'];
    control.push(this.getShiftSchedule());
  }


    /**
   * Remove schedule row from form on click delete button
   */
  removeShiftSchedule(i: number) {
    const control = <FormArray>this.shitScheduleForm.controls['schedules'];
    control.removeAt(i);
  }


}
