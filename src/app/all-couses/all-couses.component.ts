import { Component, OnInit } from '@angular/core';
import { courses } from '../courses.model';
import { coursesservice } from '../courses.server';
import {  ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { users } from '../user.model';
import { categoryservice } from '../category.service';
import { category } from '../category.model';

@Component({
  selector: 'app-all-couses',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './all-couses.component.html',
  styleUrl: './all-couses.component.scss'
})

export class AllCousesComponent implements OnInit {
  temp: string | null = null;
  public selectedCourses!: courses;
  public coursesList!: courses[];
  selectedCategoryId: number = -1;
  public selectedCategory: string = '';
  public categoryList!: category[];
  isConnect: boolean = false;
  temp1: string | null=null;
  constructor(private router: Router, private _coursesService: coursesservice, private _categoryService: categoryservice) {
  }

  ngOnInit(): void {
    this.toShow()
    this._coursesService.getCoursesDetails().subscribe({
      next: (res) => {
        this.coursesList = res
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('finish');
      }
    });
    // רקריאת שרת-קטגוריה
    this._categoryService.getCategoryDetails().subscribe({
      next: (res) => {
        this.categoryList = res
        if (this.categoryList.filter(c => c.id == -1).length == 0)
          this.categoryList.unshift({ id: -1, name: "all categories", pathicon: "" })
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('finish');
      }
    })
  }

  details(c: courses) {
    this.selectedCourses = c
    this.router.navigate(["/CoursesDetailes", c.id])
  }

  toShow() {
    this.temp = sessionStorage.getItem('user');
    this.temp1 = sessionStorage.getItem('lectur');
    if (this.temp != JSON.stringify(new users())||this.temp1!= JSON.stringify(new users()))
      this.isConnect = true
  }

  onCategoryChange(event: any) {
    this.selectedCategoryId = event.target.value;
  }
}