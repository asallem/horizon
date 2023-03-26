export   interface Movie {
  id: number;
  title: string;
  usGross?: number;
  usDvdSales?: number;
  worldwideGross?: number;
  productionBudget?: number;
  releaseDate?: string;
  distributor?: string;
  iMDBRating?: number;
  iMDBVotes?: number;
  majorGenre?: string;
  director?: string;
  rottenTomatoesRating?: string;
}
