import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { createHttpObservable } from "../common/util";

@Component({
  selector: "about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  ngOnInit() {
    const subject = new Subject();

    const series$ = subject.asObservable();

    subject.next(1);
    subject.next(2);
    subject.next(3);

    series$.subscribe(console.log);

    setTimeout(() => {
      series$.subscribe(console.log);

      subject.next(4);
    }, 3000);
  }
}
