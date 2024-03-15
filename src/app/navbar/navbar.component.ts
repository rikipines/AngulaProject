import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';
import { AllCousesComponent } from '../all-couses/all-couses.component';
import { Router } from '@angular/router';
import { users } from '../user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent,SigninComponent,NavbarComponent],
  // AllCousesComponent,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
 
  constructor(private router:Router){ }

  toHomePage(){
    this.router.navigate(['/login'])
  }
  Register(){
    this.router.navigate(['/signin'])
  }

  All_Courses(){
    this.router.navigate(['/courses'])
  }

  toAddCourse(){
    this.router.navigate(['/Add-Courses'])
  }

  logOut(){
    sessionStorage.setItem('user', JSON.stringify(new users()))
    console.log(sessionStorage.getItem('user'))
    this.router.navigate(['/login'])
    }
    EditCours(){
      this.router.navigate(['/edit-Course'])
    }

  // toDeleteCustomer(){
  //   this.router.navigate(['/delete-customer'])
  // }

}
