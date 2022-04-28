import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Voter } from 'src/app/models/voter.model';
import { VoterService } from 'src/app/services/voter.service';

@Component({
  selector: 'app-voters-table',
  templateUrl: './voters-table.component.html',
  styleUrls: ['./voters-table.component.scss']
})
export class VotersTableComponent implements OnInit {

  voterDialog: boolean = false;

  voters: Voter[] = [];

  voter!: Voter;

  submitted: boolean = false;

  cols: any[] = [];

  constructor(private voterService: VoterService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.voterService.getVoters().then(data => this.voters = data);

    this.cols = [
      {
        header: 'Name',
        field: 'name',
        minWidth: '70%'
      },
      {
        header: 'Has voted',
        field: 'has_voted',
        minWidth: '30%'
      }
    ];
  }

  openNew(): void {
    this.voter = {};
    this.submitted = false;
    this.voterDialog = true;
  }

  hideDialog() {
    this.voterDialog = false;
    this.submitted = false;
  }

  saveVoter() {
    this.submitted = true;

    if (this.voter) {
      this.voter.id = this.createId();
      this.voter.has_voted = false;
      this.voters.push(this.voter);
      this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Voter Created', life: 3000 });
    }

    this.voterDialog = false;
    this.voter = {};

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
