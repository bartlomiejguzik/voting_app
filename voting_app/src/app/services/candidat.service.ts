import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidat } from '../models/candidat.model';

@Injectable()
export class CandidatService {

  constructor(private http: HttpClient) { }

  getCandidates() {
    return this.http.get<any>('assets/candidates.json')
      .toPromise()
      .then(res => <Candidat[]>res.data)
      .then(data => { return data; });
  }
}

