import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { AllCousesComponent } from './all-couses/all-couses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginLecturerComponent } from './login-lecturer/login-lecturer.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';






  export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    // { path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent) },
    // { path: 'signin', loadComponent: () => import('./signin/signin.component').then(c => c.SigninComponent) },
    { path: "login", component: LoginComponent },
    { path: "signin", component: SigninComponent },
    { path: "signin/:name", component: SigninComponent },
    { path: "edit-Course/:id", component:EditCoursesComponent },
    {path:'courses',component:AllCousesComponent},
    {path: 'CoursesDetailes/:id',component:CourseDetailsComponent},
    {path: 'Add-Courses',component:AddCoursesComponent},
    {path: 'login-Lecturer',component:LoginLecturerComponent},
    { path: "**", component: NavbarComponent }

  ]



//   export const routes: Routes = [
//     { path: "", redirectTo: "home", pathMatch: "full" },
//     { path: "home", component: HomeCustomerComponent },
//     { path: "customer", component: CustomerComponent },
//     { path: "details-customer/:id", component: DetailsCustomerComponent },
//     { path: "add-customer", component: AddCustomerComponent },
//     { path: "delete-customer/:id", component: DeleteCustomerComponent },
//     { path: "update-customer/:id", component: UpdateCustomerComponent },
//     { path: "**", component: NoFoundCustomerComponent }];
    