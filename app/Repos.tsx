"use client";
import { Spinner } from "@gluestack-ui/themed";
import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import { format_date } from "./utils_functions";

type Props = {
  isSendingGetDataRequest: any;
  isSendingGetDataRequestSuccessful: any;
  reposData: any;
  reposDataFiltered: any;
  isRepoDataFiltered: any;
};

export const Repos = (props: Props) => {
  const {
    isSendingGetDataRequest,
    isSendingGetDataRequestSuccessful,
    reposData,
    isRepoDataFiltered,
    reposDataFiltered,
  } = props;

  // URL Params
  const urlParams = useSearchParams();
  const usernameFromURL = urlParams.get("username");

  return (
    <div className={styles.repos}>
      {isSendingGetDataRequest ? (
        <div className={styles.spinner}>
          <Spinner size="large" />
        </div>
      ) : isSendingGetDataRequestSuccessful ? (
        reposData.length > 0 ? (
          isRepoDataFiltered && reposDataFiltered.length === 0 ? (
            <div className={styles.repo}>
              <p>Your search did not match any repositories.</p>
            </div>
          ) : (
            (isRepoDataFiltered ? reposDataFiltered : reposData).map(
              (repo: any, index: number) => {
                return (
                  <div className={styles.repo} key={index + "Repo"}>
                    <a href={repo.url} target="_blank">
                      <p className={styles.repoTitle}>{repo.name}</p>
                    </a>

                    {repo.description ? (
                      <p className={styles.repoDescription}>
                        {repo.description}
                      </p>
                    ) : null}

                    <div className={styles.repoDetails}>
                      <p className={styles.repoPrimaryLanguage}>
                        {repo.primaryLanguage?.name ?? "None"}
                      </p>
                      <p className={styles.repoLastUpdated}>
                        {"Updated on " + format_date(repo.updatedAt)}
                      </p>
                    </div>
                  </div>
                );
              }
            )
          )
        ) : (
          <div className={styles.repo}>
            <p>
              Username {usernameFromURL} was found but there are no public repos
              for this user.
            </p>
          </div>
        )
      ) : (
        <div className={styles.repo}>
          <p>Couldn't find username {usernameFromURL}.</p>
        </div>
      )}
    </div>
  );
};
