export interface Tag {
  id: number;
  slug: string;
  name: string;
  color: number;
  match: string;
  matching_algorithm: 1;
  is_insensitive: boolean;
  url: string;
}
