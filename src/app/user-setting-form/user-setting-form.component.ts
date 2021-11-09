import { DataService } from './../data/data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserSettings } from '../data/user-settings';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user-setting-form',
  templateUrl: './user-setting-form.component.html',
  styleUrls: ['./user-setting-form.component.css']
})
export class UserSettingFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name : '',
    emailOffers: true,
    interfaceStyle: 'Dark',
    subscriptionType: 'Monthly',
    notes: 'Here are some notes'
    
  };
  singleModel = "On";

  userSettings : UserSettings={...this.originalUserSettings};
  postError= false;
  postErrorMessage='';
  // subscriptionTypes = ['one', 'two', 'Three'];
  subscriptionTypes: Observable<string[]> | undefined;

  

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subscriptionTypes = this.dataService.getSubscriptionTuypes();
  }

  onBlur(field: NgModel){
    console.log("In onSubmit :", field.valid);
  }

  onHttpError(errorResponse: any){
    console.log("error", errorResponse);
    this.postError = true;
    this.postErrorMessage = errorResponse.console.error.errorMessage;
    

  }

  onSubmit(form: NgForm){
    console.log("In onSubmit :", form.valid);

    if(form.valid){
      this.dataService.postUserSettingsForm(this.userSettings).subscribe(
        result => console.log("success", result),
        //error => console.log("error", error)
        error => this.onHttpError(error)
      );
    }else{
      this.postError = true;
      this.postErrorMessage = "Please fix the above errors";
    }

  }

}
