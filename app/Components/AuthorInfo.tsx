"use client";
import { Image } from "@gluestack-ui/themed";
import styles from "../page.module.css";

type Props = {
  userData: any;
};

export const AuthorInfo = (props: Props) => {
  const { userData } = props;

  return (
    <>
      <Image
        size="2xl"
        borderRadius="$full"
        source={{
          uri: userData?.avatarUrl,
        }}
        className={styles.imgAuthor}
      />
      <div className={styles.authorName}>
        <p>{userData?.name}</p>
      </div>
      <div className={styles.authorUsername}>
        <p>{userData?.login}</p>
      </div>
      <div className={styles.authorBio}>
        <p>{userData?.bio}</p>
      </div>
    </>
  );
};
