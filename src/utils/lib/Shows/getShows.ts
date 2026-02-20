import { getImage } from "../Images/getImage";
import { z } from "zod";
import { ShowsSchema } from "./ShowsSchema";

export const getShows = (entries: z.infer<typeof ShowsSchema>) => {
  return entries.map((entry) => {
    return {
      id: entry.id,
      title: entry.title.rendered,
      description: entry.excerpt.rendered,
      image: getImage(entry._embedded["wp:featuredmedia"]),
      slug: entry.slug,
    };
  });
};
