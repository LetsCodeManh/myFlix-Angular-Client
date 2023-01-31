import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

// Fetch API from server
import { FetchApiDataService } from '../fetch-api-data.service';

// Different View
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { MovieViewComponent } from '../movie-view/movie-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';

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
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.favoriteMovies;
      console.log(this.favoriteMovies);
    });
  }

  isFavorite(movieId: string): boolean {
    let favorite = this.favoriteMovies.includes(movieId);
    return favorite;
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

  genreDialog(movie: any): void {
    this.dialog.open(GenreViewComponent, {
      data: { arrayData: movie.genre },
    });
  }

  directorDialog(movie: any): void {
    const { name, bio } = movie.director;
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio },
    });
  }

  movieDialog(movie: any): void {
    const { title, description } = movie;
    this.dialog.open(MovieViewComponent, {
      data: { title, description },
    });
  }
}
