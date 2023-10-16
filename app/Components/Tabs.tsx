"use client";
import { Spinner } from "@gluestack-ui/themed";
import styles from "../page.module.css";

type Props = {
  reposData: any[];
  isSendingGetDataRequest: boolean;
};

export const Tabs = (props: Props) => {
  const { reposData, isSendingGetDataRequest } = props;

  return (
    <div className={styles.tabs}>
      <div className={styles.tab}>
        <div className={styles.selected}>
          <p>Repositories</p>
          <div className={styles.tabNumber}>
            {isSendingGetDataRequest ? (
              <Spinner size="small" />
            ) : (
              reposData.length
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
