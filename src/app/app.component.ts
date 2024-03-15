import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { FormGroup, FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { Router } from 'express';
import { AllCousesComponent } from './all-couses/all-couses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { AddCoursesComponent } from './add-courses/add-courses.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginLecturerComponent } from './login-lecturer/login-lecturer.component';
import { EditCoursesComponent } from './edit-courses/edit-courses.component';
import { LearningWayPipe } from './learning-way.pipe';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CommonModule, SigninComponent, CommonModule, RouterOutlet,FormsModule ,
    RouterModule, ReactiveFormsModule, FormsModule,LearningWayPipe, CourseDetailsComponent, AddCoursesComponent, NavbarComponent, LoginLecturerComponent, EditCoursesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Cours';
}
