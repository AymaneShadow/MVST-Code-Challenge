"use client";
import { Image } from "@gluestack-ui/themed";
import styles from "../page.module.css";

type Props = {
  userData: any;
};

// This component is responsible for rendering the author info
export const AuthorInfo = (props: Props) => {
  const { userData } = props;

  return (
    <>
      <Image
        size="2xl"
        source={{
          uri: userData?.avatarUrl,
        }}
        style={{
          borderRadius: 296,
          borderWidth: 1,
          borderColor: "#535150"
        }}
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
