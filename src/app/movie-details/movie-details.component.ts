import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  description: string = '';
  title: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, description: string}) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.description = this.data.description;
  }


}
