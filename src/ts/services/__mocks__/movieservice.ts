import { IMovie } from "../../models/Movie";

export const mockData: IMovie[] = [
    {Title:"Harry Potter 1", imdbID:"1091", Type:"movie",Poster:"url1", Year:"2001"},
    {Title:"Harry Potter 2", imdbID:"1092", Type:"movie",Poster:"url2", Year:"2002"},
    {Title:"Harry Potter 3", imdbID:"1093", Type:"movie",Poster:"url3", Year:"2003"},
];

export const getData = async (searchText:string): Promise<IMovie[]> => { 
    return new Promise ((resolve, reject) => {  
        if(searchText.length > 0) {
            resolve(mockData);
        } 
        else {
            reject(); //Lägg in error??  
        }
    });
};


