import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { createHttpObservable } from "../common/util";
import { map } from "rxjs/operators";
import { noop, Observable } from "rxjs";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}

  begginersCourses$: Observable<Course[]>;
  advancedCourses$: Observable<Course[]>;

  ngOnInit() {
    const http$: Observable<Course[]> = createHttpObservable("/api/courses");

    const courses$ = http$.pipe(map((res) => Object.values(res["payload"])));

    this.begginersCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course: Course) => course.category === "BEGINNER")
      )
    );

    this.advancedCourses$ = courses$.pipe(
      map((courses: Course[]) =>
        courses.filter((course: Course) => course.category === "ADVANCED")
      )
    );
  }
}
