import { IMovie } from "./models/Movie";

export const movieSort = (movies: IMovie[], desc: boolean = true) => { //funktion som sorterar filmerna baserat på interface Imovie[]
  return movies.sort((a: IMovie, b: IMovie) => {
    if (desc) { //om boolean:true (desc, kör nedan kod)
      if (a.Title > b.Title) return 1;
      if (a.Title < b.Title) return -1;

      return 0;
    } else { // om boolean=false, kör nedan kod
      if (a.Title > b.Title) return -1;
      if (a.Title < b.Title) return 1;

      return 0;
    }
  });
};
