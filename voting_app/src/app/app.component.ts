import { Component } from '@angular/core';
import { Candidat } from './models/candidat.model';
import { Voter } from './models/voter.model';
import { CandidatService } from './services/candidat.service';
import { VoterService } from './services/voter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'voting_app';

  voters: Voter[] = [];
  selectedVoter!: Voter;

  candidates: Candidat[] = [];
  selectedCandidat!: Candidat;

  constructor(private candidatService: CandidatService, private voterService: VoterService) { }

  ngOnInit(): void {
    this.voterService.getVoters().then(data => this.voters = data);
    this.candidatService.getCandidates().then(data => this.candidates = data);
  }
}
