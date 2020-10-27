// import { GuestsHouseService } from './guests-house.service';
import { GuestHouse } from './geustHouse.interface';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
// let userTestStatus: { id: number, name: string }[];
// const modal: GuestHouse;
export class GuestsHouseService {
  private guesthousesUrl = 'api/guestHousesList'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  guestHouse = {} as GuestHouse;


  getguestLousesList(): Observable<GuestHouse[]> {
    return this.http.get<GuestHouse[]>(this.guesthousesUrl)  .pipe(
      catchError(this.handleError<GuestHouse[]>('getguestLousesList', []))
    );
  }


  updateGuestHouse(guesHouse: GuestHouse): Observable<any> {
    return this.http.put(this.guesthousesUrl, guesHouse, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id=${guesHouse.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }

  addGuestHouse(guestHouse: GuestHouse): Observable<GuestHouse> {
    return this.http.post<GuestHouse>(this.guesthousesUrl, guestHouse, this.httpOptions).pipe(
      tap((newguestHouse: GuestHouse) => console.log(`added GuestHouse w/ id=${newguestHouse.id}`)),
      catchError(this.handleError<GuestHouse>('addGuestHouse'))
    );
  }


  deleteGuestHouse(guestHouse: GuestHouse | number): Observable<GuestHouse> {
    const id = typeof guestHouse === 'number' ? guestHouse : guestHouse.id;
    const url = `${this.guesthousesUrl}/${id}`;

    return this.http.delete<GuestHouse>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<GuestHouse>('deleteGuestHouse'))
    );
  }

}
