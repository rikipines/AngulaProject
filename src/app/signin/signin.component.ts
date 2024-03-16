import { Component, OnInit } from '@angular/core';
import { users } from '../user.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiesService } from '../servies.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})


export class SigninComponent implements OnInit{
 
  public SigninForm!: FormGroup
  public user: users=new users();
  static flag :boolean |null=false;
  showRotatingIcon: boolean | undefined;
  hide: boolean | undefined;
  userExists: boolean | undefined;
  public nameFromLogin!:string
  constructor(private _UserServise: ServiesService,private router:ActivatedRoute,private router1:Router){}

ngOnInit(): void {
  this.setName();
  this.SigninForm = new FormGroup({
    'name': new FormControl(this.nameFromLogin,[Validators.required, Validators.minLength(3)]),
    'password': new FormControl( "",Validators.required),
    'address':new FormControl("",Validators.required),
    'email':new FormControl("",Validators.required)
  });
}

public setName(){
  this.router.params.subscribe((param) => {
    this.nameFromLogin = param['name'];
})
}

public getNewUsers(){
 if (this.SigninForm.valid) {
  this.user.id=0;
    this.user.name = this.SigninForm.get('name')?.value;
    this.user.password= this.SigninForm.get('password')?.value;
    this.user.Email = this.SigninForm.get('email')?.value;
    this.user.Address = this.SigninForm.get('address')?.value;
 this._UserServise.AddUser(this.user).subscribe({
  next: (res) => {
    console.log(res);
    Swal.fire({
      icon: 'success',
      title: 'User Added!',
      text: 'User join tothe site.'
    });
    sessionStorage.setItem('user', JSON.stringify(this.user))
    this.router1.navigate(["/courses"]);
  },
  error: (err) => {
    console.log(err);
  }
})
 
 



  










}


}
}
