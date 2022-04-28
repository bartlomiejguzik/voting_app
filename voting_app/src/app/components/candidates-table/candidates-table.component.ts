
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Candidat } from 'src/app/models/candidat.model';
import { CandidatService } from 'src/app/services/candidat.service';
import { VoterService } from 'src/app/services/voter.service';

@Component({
  selector: 'app-candidates-table',
  templateUrl: './candidates-table.component.html',
  styleUrls: ['./candidates-table.component.scss']
})
export class CandidatesTableComponent implements OnInit {

  candidatDialog: boolean = false;

  candidates: Candidat[] = [];

  candidat!: Candidat;

  submitted: boolean = false;

  cols: any[] = [];

  constructor(private candidatService: CandidatService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.candidatService.getCandidates().then(data => this.candidates = data);

    this.cols = [
      {
        header: 'Name',
        field: 'name',
        minWidth: '70%'
      },
      {
        header: 'Votes',
        field: 'votes',
        minWidth: '30%'
      }
    ];
  }

  openNew(): void {
    this.candidat = {};
    this.submitted = false;
    this.candidatDialog = true;
  }

  hideDialog() {
    this.candidatDialog = false;
    this.submitted = false;
  }

  saveCandidat() {
    this.submitted = true;

    if (this.candidat) {
      this.candidat.id = this.createId();
      this.candidat.votes = 0;
      this.candidates.push(this.candidat);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Candidat Created', life: 3000 });
    }

    this.candidatDialog = false;
    this.candidat = {};

  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}

