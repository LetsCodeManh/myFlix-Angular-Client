import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';

// Fetch API from server
import { FetchApiDataService } from '../fetch-api-data.service';

// Different View

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
      return this.favoriteMovies;
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
}
