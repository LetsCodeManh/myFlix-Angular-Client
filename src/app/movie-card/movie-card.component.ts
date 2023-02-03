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

  /**
   * GET movies from server
   * @returns array holding movies objects
   * @function getMovies
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  /**
   * GET all favorite movies from user
   * @returns array holding IDs of favorites
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp.favoriteMovies;
      console.log(this.favoriteMovies);
    });
  }

  /**
   * Check if the movie have the same id as the favoriteMovies from the user
   * @param {string} movieId
   * @returns boolean
   * @function isFavorite
   */
  isFavorite(movieId: string): boolean {
    let favorite = this.favoriteMovies.includes(movieId);
    return favorite;
  }

  /**
   * Switch between addFavorite and removeFavorite
   * @param {string} movieId
   * @function toggleFavorite
   */
  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.removeFavorite(movieId);
    } else {
      this.addFavorite(movieId);
    }
  }

  /**
   * Add to moivesFavorite from user
   * @param {string} movieId
   * @function addFavorite
   */
  addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovies(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  /**
   * DELETE favoriteMovies from user
   * @param {string} movieId
   * @function removeFavorite
   */
  removeFavorite(movieId: string): void {
    this.fetchApiData.removeFavoriteMovies(movieId).subscribe((resp: any) => {
      this.getFavoriteMovies();
    });
  }

  /**
   * Opens genre information from GenreComponent
   * @param {any} movie
   * @function genreDialog
   */
  genreDialog(movie: any): void {
    this.dialog.open(GenreViewComponent, {
      data: { arrayData: movie.genre },
    });
  }

  /**
   * Opens director information from DirectorComponent
   * @param {any} movie
   * @function directorDialog
   */
  directorDialog(movie: any): void {
    const { name, bio } = movie.director;
    this.dialog.open(DirectorViewComponent, {
      data: { name, bio },
    });
  }

  /**
   * Opens movie details from MovieDetailsComponent
   * @param {any} movie
   * @function movieDialog
   */
  movieDialog(movie: any): void {
    const { title, description } = movie;
    this.dialog.open(MovieViewComponent, {
      data: { title, description },
    });
  }
}
