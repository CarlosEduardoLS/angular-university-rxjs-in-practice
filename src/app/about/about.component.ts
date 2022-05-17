import { Component, OnInit } from "@angular/core";
import { noop, Observable } from "rxjs";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    const http$ = Observable.create((observer) => {
      fetch("/api/courses")
        .then((res) => {
          return res.json();
        })
        .then((body) => {
          observer.next(body);
          observer.complete();
          observer.next();
        })
        .catch((err) => {
          observer.error(err);
        });
    });

    http$.subscribe(
      (http) => console.log(http),
      noop,
      () => console.log("completed")
    );
  }
}
