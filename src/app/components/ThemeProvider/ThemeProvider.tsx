import { FunctionComponent, PropsWithChildren } from "react";
import styles from "./ThemeProvider.module.css";

export const ThemeProvider: FunctionComponent<
  PropsWithChildren & {
    className?: string;
  }
> = ({ children }) => (
  <div className={styles.wrapper}>
    {children}
  </div>
);
