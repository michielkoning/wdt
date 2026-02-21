import { z } from "zod";
import { parseData } from "./parseData";

const fetchData = async <T extends z.ZodTypeAny>(url: string, schema: T) => {

  const USER = "michiel"
  const PASSWORD = "gJmO zu21 ihkF QoY5 WqcS EWfQ"

  const credentials = `${USER}:${PASSWORD}`;
  const key = Buffer.from(credentials, "utf8").toString("base64");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Basic ${key}`,
    },
  });
  const data = await response.json();

  return parseData(data, schema);
};

export default fetchData;
