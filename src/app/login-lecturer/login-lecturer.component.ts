import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { users } from '../user.model';
import { lecture } from '../lucture.model';
import { LecturerService } from '../lecture.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { coursesservice } from '../courses.server';
import { courses } from '../courses.model';


@Component({
  selector: 'app-login-lecturer',
  standalone: true,
  imports: [ReactiveFormsModule,],
  templateUrl: './login-lecturer.component.html',
  styleUrl: './login-lecturer.component.scss'
})
export class LoginLecturerComponent implements OnInit {

  public lecture: lecture = new lecture();
  public lectures!: lecture[];
  public le!: lecture[];
  public courses1!: courses[];
  public cours!: string;
  static flag: boolean | null = false;
  showRotatingIcon: boolean | undefined;
  // hide: boolean | undefined;
  // userExists: boolean | undefined;
  public nameFromLogin!: string
  constructor(private _coursesServise: coursesservice, private _LectureServise: LecturerService, private router: Router) { }
  public LoginLecturerForm!: FormGroup

  ngOnInit(): void {
    this.LoginLecturerForm = new FormGroup({
      'name': new FormControl("", [Validators.required, Validators.minLength(3)]),
      'password': new FormControl("", Validators.required),
      'course': new FormControl("", Validators.required),

    });

    this._LectureServise.getLecturerDetails().subscribe({
      next: (res) => {
        this.lectures = res;
      }
    })
    this._coursesServise.getCoursesDetails().subscribe({
      next: (res) => {
        this.courses1 = res;
      }
    })

  }
  public lacturer() {

    if (this.LoginLecturerForm.valid) {
      this.lecture = this.LoginLecturerForm.value;
      this.cours = this.LoginLecturerForm.get('course')?.value;
      console.log(this.lecture)
    }

    let l = this.lectures.filter(x => x.name == this.lecture.name);
    console.log("ok");
    console.log(this.lecture.password);
    console.log(this.lectures);
    if (l.length > 0) {
    let p = l.filter(x => x.password == this.lecture.password)
    if (p.length > 0) {
      this.lecture.id=p[0].id;
      console.log("ok");
      //(this.lectures.filter(x => x.name == this.lecture.name) && this.lectures.filter(x => x.password == this.lecture.password)
      let s =this.courses1.filter(x => x.name== this.cours)
      let c=s.filter(x => x.lecturerId == this.lecture.id)
      console.log(c)


      if (c.length>0){
        console.log('gfgs')
      Swal.fire({
        icon: 'success',
        title: 'User Exists!',
        text: 'User was found in the system.'
      });
      this.lecture.id=p[0].id;
      console.log(this.lecture.id);
      sessionStorage.setItem('lecture', JSON.stringify(this.lecture.id));
    
      sessionStorage.setItem('lectur', JSON.stringify(this.lecture));
      
      console.log(this.lecture);

  
      this.router.navigate(["/courses"]);
    }

    else{


      Swal.fire({
        icon: 'error',
        title: 'User not  Exists!',
        text: 'User was not found in the this cours.'
      });
    }
    }
    else {
      Swal.fire({
        icon: 'error',
        title: ' Not correct password!',
        text: 'User does not exist in the system.'
      });
    }
  }
    
  else{
    this.showRotatingIcon = true; // הצגת האייקון המסתובב
    setTimeout(() => {
      Swal.fire({
        icon: 'error',
        title: 'User not Exists!',
        text: 'User was not found in the system.'
      });
      this.router.navigate(["/signin"]);
    
    }, 2000); // אם רוצים שהאנימציה תמשך שתי שניות
    }
  }

}
