export interface IPlatform {
  id: number;
  name: string;
  slug: string;
}

export interface IGame {
  id: number;
  first_release_date: number;
  name: string;
  platforms: IPlatform[];
  slug: string;
}
