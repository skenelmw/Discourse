import { z } from "zod";

export const ResultDataParser = z.object({
  id: z.number(),
  name: z.string(),
});

export const LocationLinkParser = z.object({
  name: z.string(),
  url: z.string(),
});

export const CharacterDataParser = ResultDataParser.extend({
  status: z.string(),
  species: z.string(),
  image: z.string(),
  location: LocationLinkParser,
  origin: LocationLinkParser,
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
