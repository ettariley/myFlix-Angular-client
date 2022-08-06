import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent implements OnInit {
  directorName: string = '';
  directorBio: string = '';

  /**
   * Injects data from MovieCardComponent using MAT_DIALOG_DATA injection token
   * To use with getDirector (from FetchApiDataService) for populating dialog data
   * @param data 
   * @param fetchApiData 
   */
  constructor(@Inject(MAT_DIALOG_DATA) 
    public data: {name: string},
    public fetchApiData: FetchApiDataService,
  ) { }

  ngOnInit(): void {
    this.getDirector(this.data.name);
  }

  /**
   * get director information from API
   * set directorName and directorBio from API response
   * @param name 
   */
  getDirector(name: string): void {
    this.fetchApiData.getDirector(name).subscribe((resp: any) => {
      this.directorName = resp.Name;
      this.directorBio = resp.Bio;
      return (
        this.directorName,
        this.directorBio
      );
    })
  }

}
