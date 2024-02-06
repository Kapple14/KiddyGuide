"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Button from "@mui/material/Button";

import styles from "@/styles/header.module.scss";

export const NavbarLanding: React.FC = (props) => {
  let pathname: string | null = usePathname();
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  return (
    <nav className={[styles.nav].join(" ")}>
      <Link href={`/`} className={[styles.logo].join(" ")}>
        <Image src={"/logo.png"} alt="logo" width={50} height={50} />
        <h2>Kiddy Guide</h2>
      </Link>

      <div
        onClick={() => {
          handleClick();
        }}
        className={styles.hamburgerContainer}
      >
        <div
          className={[
            styles.mobileHamburger,
            active ? styles.hamburgerActive : "",
          ].join(" ")}
        ></div>
      </div>

      <ul
        className={[
          styles.section,
          styles.relativeContainer,
          styles.menuLinks,
          active ? styles.menuActive : "",
        ].join(" ")}
      >
        <li>
          <Link
            href={`/`}
            onClick={() => {
              handleClick();
            }}
            aria-label={"Home"}
            className={[styles.menuLinkPadding].join(" ")}
          >
            Home
          </Link>
        </li>
      </ul>
    </nav>
  );
};
