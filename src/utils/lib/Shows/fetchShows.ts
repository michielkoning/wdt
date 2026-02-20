import fetchData from "utils/fetchData";
import getUrl from "utils/getUrl";
import { cache } from "react";
import { ShowsSchema } from "./ShowsSchema";
import { getShows } from "./getShows";

export const fetchShows = cache(async (props?: { excludeId?: number }) => {
  const url = getUrl({
    type: "shows",
    fields: ["title", "excerpt", "slug"],
    image: true,
    excludeId: props?.excludeId,
  });

  const parsed = await fetchData(url, ShowsSchema);

  return getShows(parsed);
});
