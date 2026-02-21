
'use client'

import { FunctionComponent, useEffect, useState } from "react";
import { fetchShows } from "utils/lib/Shows/fetchShows";
import { ThemeProvider } from "../ThemeProvider/ThemeProvider";
import { CenterWrapper } from "../CenterWrapper/CenterWrapper";
import Link from "next/link";
import Image from "next/image";
import styles from "./Shows.module.css";
import z from "zod";
import { ImageType } from "../HeroImage/ImageType";

export const Shows: FunctionComponent<{
  excludeId?: number;
  variant?: "highlights" | "list";
}> = ({ excludeId, variant }) => {

  const [page, setPage] = useState(1)
   
  const [data, setData] = useState<{
    id: number;
    title: string;
    description: string;
    image: ImageType | undefined;
    slug: string;
}[]>([])

  useEffect(() => {
    fetchShows({
      excludeId,
      page: page,
    }).then((response) => {
      setData(response)
    })
  }, [page])  


  if (!data) return <p>No profile data</p>  
  if (!data.length) {
    return <p>Geen voorstellingen gevonden</p>;
  }
  const title = excludeId ? "Overige voorstellingen" : "Onze voorstellingen";

 const list = data.map((item) => (
    <li key={item.id} className={styles["list-item"]}>
        {item.image && (
          <Image
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            src={item.image.src}
            sizes="25vw"
            loading="lazy"
            className={styles.image}
          />
        )}
        <h3 className={styles.title}>
          <Link className={styles.link} href={item.slug}>{item.title}</Link>
        </h3>
    </li>
  ));

  const updatePage = () => {
    setPage(page + 1)
  }

  return (
    <ThemeProvider>
        <CenterWrapper>
          <button onClick={updatePage} type="button">togglePage - {page}</button>
          <ul className={styles.list}>{list}</ul>
        </CenterWrapper>
    </ThemeProvider>
  );
};
