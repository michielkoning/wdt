import { getImage } from "../Images/getImage";
import { z } from "zod";
import { ShowSchema } from "./ShowSchema";

export const getShow = (data: z.infer<typeof ShowSchema>) => {
  const entry = data[0];

  return {
    id: entry.id,
    title: entry.title.rendered,
    content: entry.content.rendered,
    description: entry.excerpt.rendered,
    image: getImage(entry._embedded["wp:featuredmedia"]),
  };
};
