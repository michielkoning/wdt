import Link from "next/link";
import { CenterWrapper } from "../CenterWrapper/CenterWrapper";
import styles from "./Header.module.css";
import { FunctionComponent } from "react";

export const Header: FunctionComponent = async () => {

  const mainItems = [
    {
      title: 'Home',
      url: '/'
    },
    {
      title: 'Voorstellingen',
      url: '/voorstellingen'
    }
  ]

  const items = mainItems.map((mainItem) => {
    return (
      <li key={mainItem.title} className={styles["list-item"]}>
        <Link href={mainItem.url}>{mainItem.title}</Link>
      </li>
    );
  });

  return (
    <header className={styles.header}>
      <nav className="nav">
        <CenterWrapper>
          <ul className={styles.list}>{items}</ul>
        </CenterWrapper>
      </nav>
    </header>
  );
};
