import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';
import { Router } from '@angular/router';
import { users } from '../user.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LoginComponent,SigninComponent,NavbarComponent],
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
     sessionStorage.setItem('lecture', JSON.stringify({}));
    sessionStorage.setItem('lectur', JSON.stringify({}));
    this.router.navigate(['/login'])
    }
    EditCours(){
      this.router.navigate(['/edit-Course'])
    }
}
