import { notFound } from "next/navigation";
import fetchData from "utils/fetchData";
import getUrl from "utils/getUrl";
import { cache } from "react";
import { ShowSchema } from "./ShowSchema";
import { getShow } from "./getShow";

export const fetchShow = cache(async (slug: string) => {
  const url = getUrl({
    type: "shows",
    fields: ["title", "content", "excerpt"],
    image: true,
    slug,
  });

  const parsed = await fetchData(url, ShowSchema);

  if (!parsed.length) {
    notFound();
  }

  return getShow(parsed);
});
