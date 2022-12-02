/**
*@jest-environment jsdom
*/

import { IMovie } from "../ts/models/Movie"
import { mockData } from "../ts/services/__mocks__/movieservice";
import * as movieSortFunction from  "./../ts/functions"

test("should sort test from descending a-B", () => {
    //Arrange
    let sortedMovies: IMovie[] = mockData;
    //Act
    movieSortFunction.movieSort(sortedMovies);
    //Assert
    expect(sortedMovies[0].Title).toBe("Harry Potter 1");
    expect(sortedMovies[2].imdbID).toBe("1093");

});
