import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers() {
    // get from cache if there
    if (this.members.length > 0) return of(this.members);
    // else get from API
    return this.http.get<Member[]>(this.baseUrl + 'users').pipe(  
      map((members) => {
        this.members = members; // update cache
        return members;
      })
    );
  }

  getMember(username: string) {
    // get from cache if there
    const member = this.members.find(x => x.username === username);
    if (member !== undefined) return of(member);
    // else get from API
    return this.http.get<Member>(this.baseUrl + 'users/' + username);
  }

  updateMember(member: Member) {
    // update API
    return this.http.put(this.baseUrl + 'users', member).pipe(
      // update cache with an update
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = member;
      })
    );
  }
}
