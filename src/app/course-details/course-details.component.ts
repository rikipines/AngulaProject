import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { courses } from '../courses.model';
import { coursesservice } from '../courses.server';
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
  public course!: courses
  public coursesrId!: number
  isSoon: boolean = true;
lacturer!:lecture
  constructor(private router: ActivatedRoute, private router1: Router, private _coursesService: coursesservice) { }

  ngOnInit(): void {
    this.router.params.subscribe((param) => {
      this.coursesrId = param['id'];
      this._coursesService.getCoursesrById(this.coursesrId).subscribe({
        next: (res) => {
          this.course = res
          this.isSoon = differenceInDays(this.course.dateOfStart, new Date()) <= 7;
          this.lacturer=JSON.parse(sessionStorage.getItem('lecture')!)
        },
        error: (err) => 
          console.log(err)
      })
    })
  }

  update() {
    this.router1.navigate(["/edit-Course", this.course.id])
  }
}
