import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,) { }

  getAllApartments(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/admin/apartments`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Apartments fetched successfully')),
        catchError(this.handleError<[]>('Error getting Apartments', []))
      );
  }

  approveApartment(approveApartmentDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + `api/near-circle/admin/apartment`, approveApartmentDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Apartment Approved successfully')),
        catchError(this.handleError<[]>('Error approving Apartment', []))
      );
  }

  rejectApartment(approveApartmentDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + `api/near-circle/admin/reject-apartment`, approveApartmentDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Apartment Approval request rejected')),
        catchError(this.handleError<[]>('Error approving Apartment', []))
      );
  }
  getFile(apartmentId: any): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/admin/file/${apartmentId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Apartment fetched successfully')),
        catchError(this.handleError<[]>('Error getting Apartment', []))
      );
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + UserStorageService.getToken()
    );
  }

  log(message: string): void {
    console.log(`User Auth Service: ${message}`);
  }

  handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
