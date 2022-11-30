/**
*@jest-environment jsdom
*/

import { displayNoResult } from "../ts/movieApp";
import * as movieAppFunctions from "../ts/movieApp";
import { getData } from "../ts/services/movieservice";
import { IMovie } from "../ts/models/Movie";

jest.mock("./../ts/services/movieservice.ts");

test("should be able to call fn handleSubmit", () => {
    //Arrange
    let spy = jest.spyOn(movieAppFunctions, "handleSubmit").mockReturnThis();
    document.body.innerHTML = `
    <form id="searchForm">
    <button type="submit" id="search">Sök</button>
    </form>
    `;
    movieAppFunctions.init();
    //Act
    (document.getElementById("searchForm") as HTMLFormElement)?.submit();
    //Assert
    expect(spy).toHaveBeenCalled();
  });
  
  test("should be able to submit form by clicking button", () => {
    //Arrange
    let spySubmit = jest.spyOn(movieAppFunctions, "handleSubmit").mockReturnThis();
    document.body.innerHTML = `<form id=“searchForm”>
    <input type=“text” id=“searchText” placeholder=“Skriv titel här” />
    <button type=“submit” id=“search”>Sök</button>
  </form>`;
    //let form = (document.querySelector("searchForm") as HTMLFormElement);
    //Act
    document.querySelector("button")?.click();
    //Assert
    expect(spySubmit).toHaveBeenCalledTimes(1);
  });

/*
Bidrar inte med mer coverage!
test("should be able to submit form through click", () => {
    //Arrange
    let spy = jest.spyOn(movieAppFunctions, "handleSubmit").mockReturnThis();
    document.body.innerHTML = `<form id="searchForm"><button type="submit" id="search">Sök</button></form>`;

    //Act
    document.querySelector("button")?.click();

    //Assert
    expect(spy).toHaveBeenCalled();
});*/

  test("Should create HTML", async () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById("movie-container") as HTMLDivElement;
    let searchText: string = "Harry";
    let movies = await getData(searchText);
    //Act
    movieAppFunctions.createHtml(movies, container);
    //Assert
   expect(document.querySelectorAll("div.movie").length).toBe(3);
  });

  test("Should display a message", () => {
    //Arrange
    document.body.innerHTML = "";
    let container: HTMLDivElement = document.createElement("div") as HTMLDivElement;
    //Act
    movieAppFunctions.displayNoResult(container);
    //Assert
    expect(container.innerHTML).toBe(`<p>Inga sökresultat att visa</p>`);
  });

