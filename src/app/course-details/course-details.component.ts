import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courses } from '../courses.model';
import { coursesservice } from '../courses.server';
import { category } from '../category.model';
import { EditCoursesComponent } from '../edit-courses/edit-courses.component';
import { differenceInDays } from 'date-fns';
import { NgClass } from '@angular/common';
import { lecture } from '../lucture.model';
import { LearningWayPipe } from '../learning-way.pipe';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [EditCoursesComponent, NgClass, LearningWayPipe],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})




export class CourseDetailsComponent implements OnInit {
  temp: string | null = null;
  // public temp=new lecture();
  public course!: courses
  public coursesrId!: number
  isSoon: boolean = true;
  // public selectedCourses!: courses;
  // public selectedCoursesId!:Number
  // public coursesList!: courses[];
  isConnect: boolean = false;

  constructor(private router: ActivatedRoute, private router1: Router, private _coursesService: coursesservice) { }

  ngOnInit(): void {



    this.router.params.subscribe((param) => {
      this.coursesrId = param['id'];
      this._coursesService.getCoursesrById(this.coursesrId).subscribe({

        next: (res) => {
          this.course = res
          console.log(this.course, "coursessss")
          this.isSoon = differenceInDays(this.course.dateOfStart, new Date()) <= 7;
        },
        error: (err) => {
          console.log(err);
        }
      })
    })
    this.toShow();

  }


  update() {
    this.router1.navigate(["/edit-Course", this.course.id])
  }

  toShow() {
    this.temp = sessionStorage.getItem('lecture');
    console.log(this.isConnect + "isconneect")
    console.log(this.course.lecturerId)
    if (this.temp == JSON.stringify(this.course?.lecturerId))
      // if (this.temp != JSON.stringify(new lecture()))
      this.isConnect = true
  }




}
