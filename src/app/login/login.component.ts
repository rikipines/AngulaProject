
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiesService } from '../servies.service';
import { users } from '../user.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})

export class LoginComponent implements OnInit {
  public LoginForm!: FormGroup
  public users1: users[] = [];
  user: users = new users();
  user1:users=new users();
  static flag: boolean | null = false;
  showRotatingIcon: boolean | undefined;
  hide: boolean | undefined;
  userExists: boolean | undefined;
  constructor(private _UserServise: ServiesService, private router: Router) { }
  ngOnInit(): void {
    this.LoginForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'password': new FormControl("", Validators.required),
    });
    this._UserServise.getUserDetails().subscribe({
      next: (res) => {
        this.users1 = res;
      }
    })
  }
  public submit() {
    if (this.LoginForm.valid) 
      this.user = this.LoginForm.value;
    let userr = this.users1.filter(x => x.name == this.user.name)
    if (userr.length > 0) {
      let p = userr.filter(x => x.password == this.user.password)
      if (p.length > 0) {
        Swal.fire({
          icon: 'success',
          title: 'User Exists!',
          text: 'User was found in the system.'
        });
        sessionStorage.setItem('user', JSON.stringify(this.user))
        this.router.navigate(["/courses"]);
      }
      else {
        Swal.fire({
          icon: 'error',
          title: ' Not correct password!',
          text: 'User does not exist in the system.'
        });
      }
    }
    else {
      this.showRotatingIcon = true; // הצגת האייקון המסתובב
      setTimeout(() => {
        this.router.navigate(["/signin", this.user.name]);
      }, 2000); // אם רוצים שהאנימציה תמשך שתי שניות
    }
  }

  lacturer() {
    this.user1= this.LoginForm.value;
    this.router.navigate(["/login-Lecturer",this.user1.name]);
  }
}
