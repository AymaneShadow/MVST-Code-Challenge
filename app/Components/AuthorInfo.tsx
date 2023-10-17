"use client";
import styles from "../page.module.css";
import {Image} from 'react-native';

type Props = {
  userData: any;
};

// This component is responsible for rendering the author info
export const AuthorInfo = (props: Props) => {
  const { userData } = props;

  return (
    <>
      <Image
        style={{
          borderRadius: 296,
          borderWidth: 1,
          borderColor: "#535150",
          width: 296,
          height: 296,
        }}
        source={{
          uri: userData?.avatarUrl,
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
