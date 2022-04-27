import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person.model';

@Injectable()
export class VoterService {

  constructor(private http: HttpClient) { }

  getVoters() {
    return this.http.get<any>('assets/voters.json')
      .toPromise()
      .then(res => <Person[]>res.data)
      .then(data => { return data; });
  }
}
