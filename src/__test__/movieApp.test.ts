/**
*@jest-environment jsdom
*/

import * as movieAppFunctions from "../ts/movieApp";
import * as movieServiceFunctions from "../ts/services/movieservice";
import {expect, jest, test} from '@jest/globals';

jest.mock("./../ts/services/movieservice.ts");

describe ("init-function", () => {
  test("should run handlesubmit function when button clicked.", () => {
    // arr
    expect.assertions(1);
    let spy = jest.spyOn(movieAppFunctions, "handleSubmit").mockImplementation(() =>
    new Promise((resolve) => {
      resolve();
    })
    );
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
    </form>`;
    movieAppFunctions.init();
    //act
    document.getElementById("search")?.click();
    //assert
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });
});


describe("handleSubmit - if/else", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  test("should run the createhtml-function", async () => {
    //Arrange
    expect.assertions(1);
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" value="Harry" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>`;
    let spy = jest.spyOn(movieAppFunctions, "createHtml").mockReturnValue();
    //Act
    await movieAppFunctions.handleSubmit();
    //Assert
    expect(spy).toHaveBeenCalled();
    document.body.innerHTML = "";
  });

  test("should run displayNoResult, catch", async () => {
    //arr
    expect.assertions(1);
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" value="" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>`;
    let spy = jest.spyOn(movieAppFunctions,"displayNoResult").mockReturnValue();
    //act
    await movieAppFunctions.handleSubmit();
    //ass
    expect(spy).toHaveBeenCalled();
    //document.body.innerHTML = "";
  });

  test("Should display a message", () => {
    //Arrange
    let container: HTMLDivElement = document.createElement("div") as HTMLDivElement;
    //Act
    movieAppFunctions.displayNoResult(container);
    //Assert
    expect(container.innerHTML).toBe(`<p>Inga sökresultat att visa</p>`);
  });

});

test("should createhtml", async () => {
  //arrange
  document.body.innerHTML = `<div id="movie-container"></div>`; // container for the movies that are to be displayed in one div/movie-container
  let container: HTMLDivElement = document.getElementById("movie-container") as HTMLDivElement; // the containerdiv
  let searchText: string = "Harry";
  let movies = await movieServiceFunctions.getData(searchText); //////////////////////////////7
  //act
  await movieAppFunctions.createHtml(movies, container);
  // assert
  expect(document.querySelectorAll("div.movie").length).toBe(3);
});



  