import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent implements OnInit {
  genreName: string = '';
  genreDescription: string = '';

  /**
   * Injects data from MovieCardComponent using MAT_DIALOG_DATA injection token
   * To use with getGenre (from FetchApiDataService) for populating dialog data
   * @param data 
   * @param fetchApiData 
   */
  constructor(@Inject(MAT_DIALOG_DATA) 
    public data: {name: string},
    public fetchApiData: FetchApiDataService,
    ) { }

  ngOnInit(): void {
    this.getGenre(this.data.name);
  }

  /**
   * Get genre information from API
   * @param name 
   * @returns genre name and genre description
   */
  getGenre(name: string): void {
    this.fetchApiData.getGenre(name).subscribe((resp: any) => {
      // this.genres = resp;
      this.genreName = resp.Name;
      this.genreDescription = resp.Description;
      return (
        this.genreName,
        this.genreDescription
      );
    })
  }

}
