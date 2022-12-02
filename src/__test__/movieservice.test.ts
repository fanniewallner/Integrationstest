import { IMovie } from "../ts/models/Movie";
import { getData } from "../ts/services/movieservice";
import { mockData } from "../ts/services/__mocks__/movieservice";

jest.mock("axios", () => ({
    get: async(searchText: string)=> {
        return new Promise((resolve, reject) => {
            let stringQuery: string = searchText;
            let url: URLSearchParams = new URLSearchParams(stringQuery);
            let t = url.get("t");
            let newSearchText: string = `${t}`;
            if (newSearchText.length > 3) {
                resolve({movie: {Search: mockData}});
            } else {
                reject ({ movie: [] });
            }
        });
    },
}));

describe ("getDatafn", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    test("should get the mockData", async () => {
        //arr
        //expect.assertions(3);
        let searchText: string = "Harry";
        //act
        let movies: IMovie[] = await getData(searchText);
        //assert
        expect(movies.length).toBe(3);
    });

    test("should not get the mockData", async () => {
        //arr
        let searchText: string = "";
        //act
        try {
            await getData(searchText);
        } catch (movie: any) {
            //assert
            expect(movie.data.length).toBe(0);
        }
    });
});

/*test("should get mock data", async () => {
    //Arrange
    let searchText:string = "harry";
    expect.assertions(2);

    //Act
    let movies: IMovie[] = await getData(searchText);

    //Assert
    expect(movies.length).toBe(3);
    expect(movies[0].Year).toBe("2001");
});

 /*test("Should handle error if no get"), async () => {
    expect.assertions(1);
    let searchText:string = "harry";
    let movies = getData(searchText);	//Deklarera och ge ett värde
    try {
    //act – denna måste vi göra mer global, annars finns variabeln bara inom {}. Vi deklarerar den ovanför vår try och använder den bara i vår try
    movies = await getData(searchText);
    }
    catch {
    //Assert
    expect(movies.length).toBe(0);	//längden i reject blir 0 iom att vi inte får någon data när det blir fel
    }*/

    /*test("should get mock data", async () => {
        let searchText:string = "harry";
        let movies: IMovie[] = await getData(searchText);
        expect.assertions(2);
        try {
            movies = await getData(searchText);
        } catch (movies: any) {
            expect(movies.length).toBe(0);
        }
    });*/
    


