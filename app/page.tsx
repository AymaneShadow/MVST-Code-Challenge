"use client";
import { config } from "@gluestack-ui/config";
import {
  GluestackUIProvider,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SearchIcon,
} from "@gluestack-ui/themed";
import Image from "next/image";
import { useState } from "react";
import imgAuthor from "./10123098.jpg";
import styles from "./page.module.css";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  const searchRepos = (searchValue: any) => {
    console.log("searching repos...");
    setSearchValue(searchValue);
  };

  return (
    <GluestackUIProvider config={config}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.tag}>
            <p>AymaneShadow</p>
          </div>
        </div>
        <div className={styles.tabs}>
          <div className={styles.tab}>
            <div className={styles.selected}>
              <p>Repositories</p>
              <div className={styles.tabNumber}>13</div>
            </div>
          </div>
        </div>
        <div className={styles.mainContent}>
          <div className={styles.mainContentLeft}>
            <Image
              src={imgAuthor}
              width={296}
              height={296}
              className={styles.imgAuthor}
              alt="Picture of the author"
            />
            <div className={styles.authorName}>
              <p>Aymane Chaoui</p>
            </div>
            <div className={styles.authorUsername}>
              <p>AymaneShadow</p>
            </div>
          </div>
          <div className={styles.mainContentRight}>
            <div className={styles.searchAndSort}>
              <Input>
                <InputSlot pl="$3">
                  <InputIcon as={SearchIcon} />
                </InputSlot>
                <InputField
                  placeholder="Find a repository..."
                  value={searchValue}
                  onChange={(e: any) => searchRepos(e.target.value)}
                />
              </Input>
            </div>
          </div>
        </div>
      </main>
    </GluestackUIProvider>
  );
}
