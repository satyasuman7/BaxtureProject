import { Component } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  userData: any;

  constructor(private _data:DataService, private _router:Router){}

  ngOnInit(): void {
    this.getDetails();
  }

  // GET DETAILS OF USERS
  getDetails() {
    this._data.getData().subscribe((res)=>{
      this.userData = res;
    })
  }

  editDetails(data:any){
    this._data.setSelectedUser(data);
    console.log('Editing details:', data);
    this._data.setUpdateMode(true);
    this._router.navigate(['/upsert']);
  }

  // DELETE DETAILS OF USERS //
  deleteDetails(data: any) {
    this._data.deleteData(data.id).subscribe(res => {
      alert("Employee Deleted !");
      this.getDetails();
    })
  }
}
