import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "../model/course";
import {
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  startWith,
  switchMap,
  tap,
} from "rxjs/operators";
import { fromEvent, Observable, concat, forkJoin } from "rxjs";
import { Lesson } from "../model/lesson";
import { createHttpObservable } from "../common/util";
import { Store } from "../common/store.service";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
})
export class CourseComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}

  courseId: number;

  course$: Observable<Course>;

  lessons$: Observable<Lesson[]>;

  @ViewChild("searchInput", { static: true }) input: ElementRef;

  ngOnInit() {
    this.courseId = this.route.snapshot.params["id"];

    this.course$ = this.store.selectCourseById(this.courseId).pipe(first());
  }

  ngAfterViewInit() {
    const searchLessons$ = fromEvent<any>(
      this.input.nativeElement,
      "keyup"
    ).pipe(
      map((event) => event.target.value),
      startWith(""),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((search) => this.loadLessons(search))
    );

    const initialLessons$ = this.loadLessons();

    this.lessons$ = concat(initialLessons$, searchLessons$);
  }

  loadLessons(search = ""): Observable<Lesson[]> {
    return createHttpObservable(
      `/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`
    ).pipe(map((res) => res["payload"]));
  }
}
