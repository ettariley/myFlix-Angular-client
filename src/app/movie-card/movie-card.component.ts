import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  user: any = {};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
    ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    })
  }

  getUser(): void {
    this.fetchApiData.getUserInfo().subscribe((resp: any) => {
      this.user = resp;
      return this.user;
    })
  }

  openGenreDialog(name: any): void {
    this.dialog.open(GenreComponent, {
      data: { name: name },
      width: '350px'
      });
  }

  openDirectorDialog(name: any): void {
    this.dialog.open(DirectorComponent, {
      data: { name: name },
      width: '350px'
      });
  }

  openMovieDetailsDialog(title: any, description: any): void {
    this.dialog.open(MovieDetailsComponent, {
      data: { 
        title: title,
        description: description
       },
      width: '350px'
      });
  }

  addMovieToFavorites(movieID: string): void {
    const token = localStorage.getItem('token');
    this.fetchApiData.addToFavorites(movieID).subscribe((response: any) => {
      this.ngOnInit();
    });

    // show snackbar that favorite was added with option to view favorites
    this.snackBar.open('Movie Added to Favorites', 'View Favorites', {
      duration: 2000
    }).onAction().subscribe(() => {
      this.router.navigate(['profile']);
    });
  }

  isFavorite(id: string): boolean {
    return this.user.FavoriteMovies.includes(id);
  }
  
  deleteMovieFromFavorites(movieID: string): void {
    const token = localStorage.getItem('token');
    this.fetchApiData.deleteFromFavorites(movieID).subscribe((response: any) => {
      // show snackbar that favorite was added with option to view favorites
      this.snackBar.open('Movie Removed from Favorites', 'Undo', {
        duration: 2000
      }).onAction().subscribe(() => {
        this.addMovieToFavorites(movieID);
      });
      this.ngOnInit();
    });
  }
}
