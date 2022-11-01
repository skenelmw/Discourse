import { z } from "zod";
import { rick } from '@prisma/client';

export const dbConverter = (rick: rick) => {
  return {
      id: rick.id,
      name: rick.name,
      species: rick.species,
      status: rick.status,
      image: rick.image,
      origin: {
          name: rick.origin_name,
          url: rick.origin_url
      },
      location: {
          name: rick.location_name,
          url: rick.location_url
      }
  }
}

export const characterConverter = (character: CharacterData) => {
  return {
    id: character.id,
    name: character.name,
    species: character.species,
    status: character.status,
    image: character.image,
    origin_name: character.origin.name,
    origin_url: character.origin.url,
    location_name: character.location.name,
    location_url: character.location.url
  }
}


export const ResultDataParser = z.object({
  id: z.number(),
  name: z.string(),
});

export const LocationLinkParser = z.object({
  name: z.string(),
  url: z.string().nullable(),
});

export const CharacterDataParser = ResultDataParser.extend({
  status: z.string().nullable(),
  species: z.string().nullable(),
  image: z.string().nullable(),
  location: LocationLinkParser,
  origin: LocationLinkParser
});

export const SearchTypeParser = z
  .enum(["character", "location", "episode"])
  .nullable();

export type SearchType = z.infer<typeof SearchTypeParser>;

export type CharacterData = z.infer<typeof CharacterDataParser>;



export const ResultsInfoParser = z.object({
  count: z.number(),
  pages: z.number(),
  next: z.string().nullable(),
  prev: z.string().nullable(), // these can be null where you are at the start or end of the list
});

export type ResultsInfo = z.infer<typeof ResultsInfoParser>;

export const ResultsParser = z.object({
  info: ResultsInfoParser,
  results: z.array(
    CharacterDataParser
  ),
});

export type Response = z.infer<typeof ResultsParser>;
