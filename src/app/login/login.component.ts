
import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel, ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiesService } from '../servies.service';
import { users } from '../user.model';
import Swal from 'sweetalert2';
import { log } from 'console';
import { AllCousesComponent } from '../all-couses/all-couses.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',

  styleUrl: './login.component.scss',
  //providers: [FormsModule,NgModel,NgForm],


})

export class LoginComponent implements OnInit {
  public LoginForm!: FormGroup
  public users1: users[] = [];
  user: users = new users();

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


    if (!this.LoginForm.valid) {
      console.log("invalid")
    }
    else{
      console.log("valid")

      this.user = this.LoginForm.value;
      console.log(this.user)
    }
    // if (this.users1.filter(x => x.name == this.user.name).length > 0)
    let userr = this.users1.filter(x => x.name == this.user.name)
    if (userr.length > 0) {
      let p = userr.filter(x => x.password == this.user.password)
      if (p.length > 0) {
        // if (this.users1.filter(x => x.name == this.user.name) && this.users1.filter(x => x.password == this.user.password).length > 0) {
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
    this.router.navigate(["/login-Lecturer"])
  }
}


//     this._UserServise.getUserDetails().subscribe(
//       (users: users[]) => {
//         console.log("users", users)
//         console.log("this: ", username)
//         this.userExists = users.some(u => u.name == username);
//         console.log(users)
//         console.log(this.userExists, "exsist")
//         if (this.userExists) {

//           if (users.some(user => user.name == username && user.password == password)) {
//             console.log("ss")
//             // שמירת פרטי הגולש ב-SessionStorage
//             sessionStorage.setItem('username', username);
//             sessionStorage.setItem('password', password);
//             sessionStorage.setItem('userId', JSON.stringify(users.find(user => user.name == username && user.password == password)?.id));

//             Swal.fire({
//               icon: 'success',
//               title: 'User Exists!',
//               text: 'User was found in the system.'
//             });
//             this.router.navigate(["/courses"]);

//           }
//           else {
//             Swal.fire({
//               icon: 'error',
//               title: ' Not correct password!',
//               text: 'User does not exist in the system.'
//             });
//           }
//         } else {
//           this.showRotatingIcon = true; // הצגת האייקון המסתובב
//           setTimeout(() => {
//             this.router.navigate(["/signin"]);

//           }, 2000); // אם רוצים שהאנימציה תמשך שתי שניות
//         }
//       },
//       (error) => {
//         console.log('Error occurred while fetching users:', error);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error!',
//           text: 'An error occurred while fetching users.'
//         });
//       }
//     );
//   } else {
//   console.log('Form is invalid');
// }
//   }


// togglePasswordVisibility() {
//   this.hide = !this.hide;
// }


//   console.log("get")
//   this._UserServise.getUserDetails().subscribe({
//     next: (res) => {
//      this.users=[...res];
//      console.log('users----',res)

//      res.forEach(user=>{
//       if(user.name===this.LoginForm.get('name')?.value)
//       {
//        let flag=true;
//         console.log(user.name)
//         if(user.password===this.LoginForm.get('password')?.value)
//         {
//           console.log('ok')

//         }
//             // console.log(user.password)
//       }





//     })

//     },
//     error: (err) => {
//       console.log(err);
//     }




//   })




















