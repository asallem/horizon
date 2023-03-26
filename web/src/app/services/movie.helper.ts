import { MovieDto } from '../model/MovieDto';
import { Movie } from '../model/Movie';

export class MovieHelper {

    public static deserialize(dto: MovieDto): Movie {
        return {
          id: dto.id,
          title: dto.Title,
          usGross: dto['US DVD Sales'],
          usDvdSales: dto['US DVD Sales'],
          worldwideGross: dto['Worldwide Gross'],
          productionBudget: dto['Production Budget'],
          releaseDate: dto['Release Date'],
          distributor: dto.Distributor,
          iMDBRating: dto['IMDB Rating'],
          iMDBVotes: dto['IMDB Votes'],
          majorGenre: dto['Major Genre'],
          director: dto.Director,
          rottenTomatoesRating: dto['Rotten Tomatoes Rating'],
        }
    }
}
