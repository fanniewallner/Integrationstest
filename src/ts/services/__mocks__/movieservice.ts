import { IMovie } from "../../models/Movie";

let mockData: IMovie[] = [
    {Title:"Harry Potter 1", imdbID:"1091", Type:"Movie",Poster:"url1", Year:"2001"},
    {Title:"Harry Potter 2", imdbID:"1092", Type:"Movie",Poster:"url2", Year:"2002"},
    {Title:"Harry Potter 3", imdbID:"1093", Type:"Movie",Poster:"url3", Year:"2003"},
];

export const getData = async (): Promise<IMovie[]> => { //mock som simulerar vår axios, vi kan inte skriva await förrän i anropet
    return new Promise ((resolve) => {  //resultatet är ett löfte som vi får när vi får tillbaka något från vårt anrop och det är detta vi bör får tillbaka
        resolve(mockData);  //simulerar att anropet är klart när löftet infrias, vi får tillbaka mockData, detta är förutsatt att det går bra
    });
};