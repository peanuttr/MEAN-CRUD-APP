import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class Book {
  _id!: String;
  name!: String;
  price!: String;
  description!: String;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  Rest_API: String = 'http://localhost:3000/api';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) { }

  AddBook(data: Book): Observable<any> {
    let API_URL = `${this.Rest_API}/add-book`;
    return this.httpClient.post(API_URL, data).pipe(
      catchError(this.handleError)
    )
  }

  GetBook() {
    return this.httpClient.get(`${this.Rest_API}`);
  }

  GetBookID(id: any): Observable<any> {
    let API_URL = `${this.Rest_API}/read-book/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  updateBook(id: any, data: any): Observable<any> {
    let API_URL = `${this.Rest_API}/update-book/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }

  deleteBook(id: any): Observable<any> {
    let API_URL = `${this.Rest_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }

  searchBook(query: any): Observable<any> {
    let API_URL = `${this.Rest_API}/search/${query}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
