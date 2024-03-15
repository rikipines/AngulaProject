import { Component, NgModule, OnInit, ɵisNgModule } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { category } from '../category.model';
import { categoryservice } from '../category.service';
import { CommonModule, NgFor } from '@angular/common';
import { courses } from '../courses.model';
import { coursesservice } from '../courses.server';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './add-courses.component.html',
  styleUrl: './add-courses.component.scss'
})
export class AddCoursesComponent implements OnInit {

  public AddForm!: FormGroup
  public syllibusArray: string[] = [];
  public categoryList!: category[];
  public course: courses = new courses();
  constructor(private router: Router, private _categoryService: categoryservice, private _CourseService: coursesservice) {
  }

  ngOnInit(): void {

    this.AddForm = new FormGroup({
      'id': new FormControl(0, Validators.required),
      'name': new FormControl(" ", [Validators.required, Validators.minLength(2)]),
      // 'password': new FormControl(null, Validators.required),
      'categoryId': new FormControl("", Validators.required),
      'lessonsAmount': new FormControl( "",Validators.required),
      'dateOfStart': new FormControl(null),
      'syllibus': new FormArray([new FormControl('', [Validators.required])]),
      'lecturerId': new FormControl( "",Validators.required),
      'image': new FormControl("", Validators.required),
      'way_Of_Learning': new FormControl( "",Validators.required),



    });


    if (this.AddForm.valid) {
      this.course = this.AddForm.value;

    }

    this._categoryService.getCategoryDetails().subscribe({

      next: (res) => {
        this.categoryList = res

        console.log(res)
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('finish');


      }
    })


  };

  get syllibus() {
    return this.AddForm.get('syllibus') as FormArray;
  }
  addSilabusItem() {
    this.syllibus.push(new FormControl('', Validators.required));
  }

  removeSilabusItem(i: number) {
    const silibusFormArray = this.AddForm.get('syllabus') as FormArray;
    silibusFormArray.removeAt(i);
  }


  submit() {


    // if (this.AddForm.valid) {
    this.course = this.AddForm.value;
    console.log("this.course", this.course )
    this._CourseService.AddCourse(this.course).subscribe({

      next: (res) => {

        Swal.fire({
          icon: 'success',
          title: 'Course Add!',
          text: 'course exist in our site.'
        });
        this.router.navigate(["/courses"])

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
}



