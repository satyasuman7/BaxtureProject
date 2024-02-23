import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../User/user.module';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-user-upsert',
  templateUrl: './user-upsert.component.html',
  styleUrls: ['./user-upsert.component.scss']
})
export class UserUpsertComponent {
  baxtureForm:FormGroup;
  userObj:User = new User;
  userData: any;
  isUpdateMode: boolean = false;
  
  constructor(private _router:Router, private _data:DataService) {
    this.baxtureForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
      address: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.userObj.numberRegEx), Validators.maxLength(10), Validators.minLength(10)]),
    })
  }

  ngOnInit() {
    const selectedUser = this._data.getSelectedUser();
    
    if (selectedUser) {
        this.baxtureForm.patchValue({
            firstname: selectedUser.firstname,
            lastname: selectedUser.lastname,
            address: selectedUser.address,
            email: selectedUser.email,
            phone: selectedUser.phone,
        });
    }
  }

  // UPDATE DETAILS OF USERS //
  updateEmp: any = {
    id: 0,
    Fullname: '',
    Email: '',
    Address: '',
    Phone: '',
    Password:'',
    Premium: '',
    Offer:'',
    isactive:'',
  }

  getDetails() {
    this._data.getData().subscribe((res)=>{
      this.userData = res;
    })
  }


  get error() {
    return this.baxtureForm.controls;
  }

  onSubmit() {
    if (this.isUpdateMode) {
      this.updateDetails(); 
    } 
    else {
      this.addDetails(); 
    }
  }

  // FUNCTION TO ADD DETAILS TO JSON-SERVER
  addDetails(){
    if(this.baxtureForm.valid){

      this._data.postData(this.baxtureForm.value).subscribe({
        next:() => {
          alert('Account Created');
          this.baxtureForm.reset(); 
          console.log(this.baxtureForm.value.offer);
        }
      })
    }
    else{
      alert('Please enter Valid Data !!');
    }
  }

  //FUNCTION TO UPDATE DETAILS TO JSON-SERVER
  updateDetails() {
    if(this.baxtureForm.valid){
      this._data.updateData(this.updateEmp.id, this.baxtureForm.value).subscribe(res => {
        alert("Updated Successfully");
        this.baxtureForm.reset();
        this.getDetails();
      });
    }
  }

}
