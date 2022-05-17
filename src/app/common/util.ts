import { Observable } from "rxjs";

export function createHttpObservable(url: string) {
  return Observable.create((observer) => {
    fetch(url)
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
}
