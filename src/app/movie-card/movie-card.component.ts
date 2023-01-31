import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { DirectorViewComponent } from '../director-view/director-view.component';

// Fetch API from server
import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieViewComponent } from '../movie-view/movie-view.component';

// Different View

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.removeFavorite(movieId);
    } else {
      this.addFavorite(movieId);
    }
  }

  addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovies(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  removeFavorite(movieId: string): void {
    this.fetchApiData.removeFavoriteMovies(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  directorDialog(movie: any): void {
    const { name, bio } = movie.director;
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio },
      panelClass: 'director-dialog',
    });
  }

  movieDialog(movie: any): void {
    const { title, description } = movie;
    this.dialog.open(MovieViewComponent, {
      data: { title, description },
      panelClass: 'movie-dialog',
    });
  }
}
