import { Component, OnInit } from "@angular/core";
import { Course } from "../model/course";
import { createHttpObservable } from "../common/util";
import { map } from "rxjs/operators";
import { noop } from "rxjs";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}

  begginersCourses: Course[];
  advancedCourses: Course[];

  ngOnInit() {
    const http$ = createHttpObservable("/api/courses");

    const courses$ = http$.pipe(map((res) => Object.values(res["payload"])));

    courses$.subscribe(
      (courses) => {
        this.begginersCourses = courses.filter(
          (course) => course.category === "BEGINNER"
        );
        this.advancedCourses = courses.filter(
          (course) => course.category === "ADVANCED"
        );
      },
      noop,
      () => console.log("completed")
    );
  }
}
