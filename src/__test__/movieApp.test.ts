/**
*@jest-environment jsdom
*/

//import { displayNoResult } from "../ts/movieApp";
import * as movieAppFunctions from "../ts/movieApp";
import * as movieServiceFunctions from "../ts/services/movieservice";
//import { getData } from "../ts/services/movieservice";
//import { IMovie } from "../ts/models/Movie";
//import { mockData } from "../ts/services/__mocks__/movieservice";
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



/*test("should be able to call fn handleSubmit", () => {
    //Arrange
    //let spy = jest.spyOn(movieAppFunctions, "handleSubmit").mockReturnThis(); //(Ska vara mockReturnValue(något här???)))
    let spy = jest.spyOn(movieAppFunctions, "handleSubmit").mockReturnValue(new Promise((resolve) =>{
      resolve();
    })
    ); 
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
    document.body.innerHTML ="";
  });

  test("should be able to submit form", () => {
    //Arrange
    //let spySubmit = jest.spyOn(movieAppFunctions, "handleSubmit").mockReturnThis(); //mock --new promise))
    let spySubmit = jest.spyOn(movieAppFunctions, "handleSubmit").mockReturnValue(new Promise((resolve) =>{
      resolve();
    })
    ); 
    document.body.innerHTML = `<form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
  </form>`;
    //Act
    movieAppFunctions.init();
    document.querySelector("button")?.click();
    //(document.getElementById("searchForm") as HTMLFormElement)?.submit();
    //Assert
    expect(spySubmit).toHaveBeenCalled();
    document.body.innerHTML ="";
  });
  */

  //FUNKAR INTE!!!!!!!!!!
  /*test("Should create HTML", async () => {
    //Arrange
    document.body.innerHTML = `<div id="movie-container"></div>`;
    let container: HTMLDivElement = document.getElementById("movie-container") as HTMLDivElement;
    let searchText: string = "Harry";
    let movies = await getData(searchText);
    //Act
    movieAppFunctions.createHtml(movies, container);
    //Assert
   expect(document.querySelectorAll("div.movie").length).toBe(3);
   document.body.innerHTML ="";
  });*/

  /*test("Should display a message", () => {
    //Arrange
    let container: HTMLDivElement = document.createElement("div") as HTMLDivElement;
    //Act
    movieAppFunctions.displayNoResult(container);
    //Assert
    expect(container.innerHTML).toBe(`<p>Inga sökresultat att visa</p>`);
  });*/

 /*describe("Tests for handleSubmit", () => {
    test("should call createHtml with parametres movies and container", async () => {
      //Arrange
      document.body.innerHTML =""; //Flytta denna till tidigare??
      document.body.innerHTML = `<form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" />
      </form><div id="movie-container></div>`;
      let spyCreateHtml = jest.spyOn(movieAppFunctions, "createHtml").mockReturnValue();
      let movies: IMovie[] = mockData;
      let container = document.getElementById("movie-container") as HTMLDivElement;
      

      await movieAppFunctions.handleSubmit();

      expect(spyCreateHtml).toHaveBeenCalledWith(movies, container); //Ha med parametrar???? toBECalledWith
    })
  })*/



  