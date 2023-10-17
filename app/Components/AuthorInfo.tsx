"use client";
import styles from "../page.module.css";

type Props = {
  userData: any;
};

// This component is responsible for rendering the author info
export const AuthorInfo = (props: Props) => {
  const { userData } = props;

  return (
    <>
     <img 
        src={userData?.avatarUrl}
        alt="new"
        width={296}
        height={296}
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
