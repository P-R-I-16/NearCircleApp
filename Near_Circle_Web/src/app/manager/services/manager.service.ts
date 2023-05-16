import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL']

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http: HttpClient,) { }

  postApartment(formData: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + `api/near-circle/apartment/${UserStorageService.getUserId()}`, formData, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Apartment posted successfully')),
        catchError(this.handleError<[]>('Error posting Apartment', []))
      );
  }

  getAllApartmentsByUserId(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/apartment/all/${UserStorageService.getUserId()}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Apartments Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Apartments', []))
      );
  }

  getTenantsByManagerId(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/apartment/tenants/${UserStorageService.getUserId()}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Apartments Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Apartments', []))
      );
  }

  approveTenant(tenantDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/near-circle/apartment/tenant/approve", tenantDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Tenant approved successfully')),
        catchError(this.handleError<[]>('Error approving Tenant', []))
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
