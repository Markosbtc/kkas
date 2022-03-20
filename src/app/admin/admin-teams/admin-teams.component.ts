import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SportsTeam } from 'src/app/shared/models/sportsTeam';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-admin-teams',
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss'],
})
export class AdminTeamsComponent implements OnInit {
  myteam: boolean = false;
  team: SportsTeam;

  constructor(
    private authService: AuthService,
    private teamService: TeamService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getUserProfile().subscribe((res) => {
      if (res) {
        const team = res.team;        
        if (team === '0') {
          this.myteam = true;
        } else {
          this.myteam = false;
          // TODO: display current team stats
          this.teamService.getSportsTeamById(team.id).subscribe((res) => {
            this.team = res;
            console.log(this.team);
          });
        }
      } else {
        this.myteam = false;
        console.log('no user');
      }
    });
  }

  registerTeam() {
    this.router.navigate(['/admin/team']);
  }

}
