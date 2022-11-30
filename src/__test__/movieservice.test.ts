/**
*@jest-environment jsdom
*/

import { IMovie } from "../ts/models/Movie";
import { getData } from "../ts/services/movieservice";

//jest.mock("./../ts/services/movieservice.ts");    //Vi vill mocka vår aixos get, se nedan (inte vår mock av getData-funktionen)

jest.mock("axios", () => ({
    get: async () =>{
        return new Promise((resolve) => {
            resolve({   //Vad vi får tillbaka från axios get
                data: { //Vi bygger upp den data som vi får från vår axios get
                    Search: [
                        {Title:"Harry Potter 1", imdbID:"1091", Type:"Movie",Poster:"url1", Year:"2001"},
                        {Title:"Harry Potter 2", imdbID:"1092", Type:"Movie",Poster:"url2", Year:"2002"},
                        {Title:"Harry Potter 3", imdbID:"1093", Type:"Movie",Poster:"url3", Year:"2003"},
                    ]
                }
            })
        })
    }
})); //mock axios

test("should get mock data", async () => {
    //Arrange
    let searchText:string = "harry";
    expect.assertions(2);

    //Act
    let movies: IMovie[] = await getData(searchText);

    //Assert
    expect(movies.length).toBe(3);
    expect(movies[0].Year).toBe("2001");
});


