import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { categoryservice } from '../category.service';
import { category } from '../category.model';
import { CommonModule, NgFor } from '@angular/common';
import { courses } from '../courses.model';
import { coursesservice } from '../courses.server';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './edit-courses.component.html',
  styleUrl: './edit-courses.component.scss'
})
export class EditCoursesComponent {
  public EditForm!: FormGroup
  public syllibusArray: string[] = [];
  public categoryList!: category[];
  public course!: courses;
  public optinOfLearning: string[] = ["Frontaly", "Zoom"];
  coursesList: courses[] = [];

  constructor(private router1: ActivatedRoute, private router: Router, private _editService: coursesservice, private _category: categoryservice) {
  }

  ngOnInit(): void {
    this._editService.getCoursesDetails().subscribe({
      next: (res) => {
        this.coursesList = res;
        this.router1.params.subscribe((param) => {
          this.course = this.coursesList.filter(x => x.id.toString() == param['id'])[0];
          this.initForm();
        })
      }     
    })
    
    this._category.getCategoryDetails().subscribe({
      next: (res) => {
        this.categoryList = res
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('finish');
      }
    })
     if (this.EditForm.valid) 
      this.course = this.EditForm.value;      
  }
  initForm() {
    this.EditForm = new FormGroup({
      'id': new FormControl(this.course.id),
      'name': new FormControl(this.course.name, [Validators.required, Validators.minLength(3)]),
      'syllibus': new FormArray([new FormControl('', [Validators.required])]),
      'lessonsAmount': new FormControl(this.course.lessonsAmount, Validators.required),
      'categoryId': new FormControl(this.course.categoryId, Validators.required),
      'dateOfStart': new FormControl(this.course.dateOfStart),
      'lecturerId': new FormControl(this.course.lecturerId, Validators.required),
      'way_Of_Learning': new FormControl(this.course.way_Of_Learning, Validators.required),
      'image': new FormControl(this.course.image, Validators.required)
    })
  }

  onsubmit() {
    this.course = this.EditForm.value;
    this._editService.updatCours(this.course.id, this.course).subscribe({
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
  };

  get syllibus() {
    return this.EditForm.get('syllibus') as FormArray;
  }

  addSilabusItem() {
    this.syllibus.push(new FormControl('', [Validators.required]));
  }

  removeSilabusItem(index: number) {
    this.syllibus.removeAt(index);
  }
}