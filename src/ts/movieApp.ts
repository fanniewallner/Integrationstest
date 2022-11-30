import { IMovie } from "./models/Movie";
import { getData } from "./services/movieservice";

let movies: IMovie[] = [];

export const init = () => { //funktion som körs direkt när sidan laddas
  let form = document.getElementById("searchForm") as HTMLFormElement;  //hittar formulär och tilldelar variabel form
  form.addEventListener("submit", (e: SubmitEvent) => { //submit på formulär, triggas på enter = submit
    e.preventDefault(); //förhindrar sidan att laddas om när formuläret skickas 
    exports.handleSubmit(); //callar funktionen handleSubmit
  });
};

export async function handleSubmit() {  //asynkron funktion som hantera hämtning av sökresultat
  let searchText = (document.getElementById("searchText") as HTMLInputElement)  //searchText = input på formulär
    .value;

  let container: HTMLDivElement = document.getElementById(  //hämtar div för att presentera filmer i, id #movie-container
    "movie-container"
  ) as HTMLDivElement;
  container.innerHTML = ""; //Tömmer innerHTML på div inför varje sökning för att inte behålla gamla sökresultat

  try { //vi försöker hära data baserat på searchText, dvs användarens input i sökrutan
    movies = await getData(searchText); //Vi inväntar användarens input, får vi ett resultat lagrar vi det i variabeln movies. movies är en lista baserat på IMovie[]

    if (movies.length > 0) {  //om antalet filmer i listan är större än 0, dvs minst 1, call funktionen createHtml
      exports.createHtml(movies, container);
    } else {  //Om antalet flmer i listan inte är större än 1, call funktionen displayNoResults och skicka med parametern container
      exports.displayNoResult(container);
    }
  } catch {
    exports.displayNoResult(container); //Här fångas vårt undantag om koden i vår try inte kan utföras. Vi kommer då köra funktionen displayNoResult
  }
}

export const createHtml = (movies: IMovie[], container: HTMLDivElement) => { //funktion createHtml. PArametrar movies (är en lista baserat på Imovie, Div-element med variabelnamn container)
  for (let i = 0; i < movies.length; i++) { //For loop Loopar igenom listan med filmer vi fått i vårt sökresultat
    let movie = document.createElement("div"); //Skapar div, variabelnamn movie
    let title = document.createElement("h3"); //Skapar h3-element, variabelnamn title
    let img = document.createElement("img"); //Skapar img-element, variabelnamn img

    movie.classList.add("movie"); //Lägger till klassnamn movie på vår div med variabelnamn movie
    title.innerHTML = movies[i].Title; //Sätter innerHTML på vår h3 till filmens titel när vi loopar i for loop
    img.src = movies[i].Poster; //Sätter img-elementets src till Poster (bild)
    img.alt = movies[i].Title; //Alt-beskrivning sätts till titeln på filmen

    movie.appendChild(title); //Appendar titeln till div
    movie.appendChild(img); //Appendar bild till div

    container.appendChild(movie); //Appendar vår film-div till container-div
  }
};

export const displayNoResult = (container: HTMLDivElement) => { //Funktion displayNoResult, skickar med vår container-div som parameter i anonym funktion
  let noMessage = document.createElement("p"); //Skapar p-tagg med variabelnamn noMessage

  noMessage.innerHTML = "Inga sökresultat att visa"; //Sätter p-taggens (noMessage) innerHTML till en string

  container.appendChild(noMessage); //Appendar vår p-tagg till div-containern
};

