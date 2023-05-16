import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { UserStorageService } from 'src/app/services/storage/user-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL']

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private http: HttpClient,) { }

  getAllTenants(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/tenant/apartments`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Apartments Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Apartments', []))
      );
  }

  postTenant(tenantDto: any): Observable<any> {
    tenantDto.userId = UserStorageService.getUserId();
    tenantDto.interests=tenantDto.interests.toString();
    
    console.log(tenantDto)
    return this.http
      .post<[]>(BASIC_URL + "api/near-circle/tenant/", tenantDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Tenant posted successfully')),
        catchError(this.handleError<[]>('Error posting Tenant', []))
      );
  }

  postPic(imageDto: any): Observable<any> {
 
    imageDto.userId=UserStorageService.getUserId();
    console.log("hi"+imageDto)
    console.log("user"+imageDto.userId)
    const formData: FormData = new FormData();
    formData.append('img', imageDto);
    formData.append('userId', UserStorageService.getUserId());
    
    return this.http
      .post<[]>(BASIC_URL + "api/near-circle/tenant/pic",formData, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Tenant Profile pic uploaded successfully')),
        catchError(this.handleError<[]>('Error posting Tenant picture', []))
      );
  }

  getTenantByUserId(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/tenant/user/${UserStorageService.getUserId()}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Tenant Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Tenant', []))
      );
  }

  getTenantProfilePic(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/tenant/pic/${UserStorageService.getUserId()}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Tenant Profile Pic Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Tenant', []))
      );
  }

  searchTenant(sarchTenantDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/near-circle/tenant/search", sarchTenantDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Tenants fetched successfully')),
        catchError(this.handleError<[]>('Error getting Tenants', []))
      );
  }

  addTenantToFriendList(FriendsDto: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + "api/near-circle/tenant/friend", FriendsDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Tenant Added into Friend List successfully')),
        catchError(this.handleError<[]>('Error adding into Friend List', []))
      );
  }
/*
  getTenantsByApartmentId(apartmentId): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/tenant/${apartmentId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Tenants Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Tenants', []))
      );
  }
*/
  viewTenantsByApartmentId(apartmentId,tenantId): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/tenant/${apartmentId}/${tenantId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Tenants Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Tenants', []))
      );
  }


  getFriendListByUserId(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/tenant/friends/${UserStorageService.getUserId()}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Friends Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Friends', []))
      );
  }

  getTenantFriendByTenantId(tenantId: any): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/tenant/friend/${tenantId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Friend Fetched successfully')),
        catchError(this.handleError<[]>('Error Getting Friend', []))
      );
  }

  tenantPostSomething(postDto: any, tenantId: any): Observable<any> {
    return this.http
      .post<[]>(BASIC_URL + `api/near-circle/tenant/post/${tenantId}`, postDto, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Post added successfully')),
        catchError(this.handleError<[]>('Error while adding post', []))
      );
  }

  getFriendsCountByUserId(): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/tenant/friends-count/${UserStorageService.getUserId()}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Friends Counted successfully')),
        catchError(this.handleError<[]>('Error counting Friend', []))
      );
  }

  getAllPosts(tenantId: any): Observable<any> {
    return this.http
      .get<[]>(BASIC_URL + `api/near-circle/tenant/posts/${tenantId}`, {
        headers: this.createAuthorizationHeader(),
      })
      .pipe(
        tap((_) => this.log('Posts Fetched successfully')),
        catchError(this.handleError<[]>('Error getting Posts', []))
      );
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    console.log("token"+UserStorageService.getToken())
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
