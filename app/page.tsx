"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthorInfo } from "./Components/AuthorInfo";
import { Header } from "./Components/Header";
import { Repos } from "./Components/Repos";
import { SearchAndSort } from "./Components/SearchAndSort";
import { Tabs } from "./Components/Tabs";
import { getData } from "./functions/backend_functions";
import styles from "./page.module.css";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  // URL Params
  const router = useRouter();
  const urlParams = useSearchParams();
  const usernameFromURL = urlParams.get("username");

  // Data from Github GraphQL
  const [isSendingGetDataRequest, setIsSendingGetDataRequest] = useState(true);
  const [
    isSendingGetDataRequestSuccessful,
    setIsSendingGetDataRequestSuccessful,
  ] = useState(false);
  const [userData, setUserData] = useState<any>({});
  const [reposData, setReposData] = useState([]);
  const [reposLanguages, setReposLanguages] = useState<any[]>([]);

  // Data Filtering
  const [reposDataFiltered, setReposDataFiltered] = useState<any>([]);
  const [isRepoDataFiltered, setIsRepoDataFiltered] = useState(false);

  // Called before getting data from Github GraphQL
  const startGetData = () => {
    setIsSendingGetDataRequest(true);
  };

  // Called if getting data from Github GraphQL was successful
  const performGetDataSuccess = (
    userData: any,
    reposData: any,
    languagesData: any
  ) => {
    console.log("languagesData", languagesData);

    setIsSendingGetDataRequestSuccessful(true);
    setUserData(userData);
    setReposData(reposData);
    setReposLanguages(languagesData);
  };

  // Called if getting data from Github GraphQL was unsuccessful
  const performGetDataFailure = () => {
    setIsSendingGetDataRequestSuccessful(false);
  };

  // Called before getting data (successfully or not) from Github GraphQL
  const endGetData = () => {
    setIsSendingGetDataRequest(false);
  };

  // Called when the page is loaded
  useEffect(() => {

    let tempUsername = usernameFromURL;

    // If user forgets to have username in the url
    // it will automtically be added for them.
    if(!usernameFromURL)
    {
      router.replace("?username=" + "AymaneShadow");
      tempUsername = "AymaneShadow";
    }

    getData(
      tempUsername,
      startGetData,
      performGetDataSuccess,
      performGetDataFailure,
      endGetData
    );
  }, []);

  return (
      <main className={styles.main}>
        <Header
          setUserData={setUserData}
          setReposData={setReposData}
          startGetData={startGetData}
          performGetDataSuccess={performGetDataSuccess}
          performGetDataFailure={performGetDataFailure}
          endGetData={endGetData}
        />
        <Tabs
          reposData={reposData}
          isSendingGetDataRequest={isSendingGetDataRequest}
        />
        <div className={styles.mainContent}>
          <div
            className={styles.mainContentLeft}
            style={isSendingGetDataRequest ? { justifyContent: "center" } : {}}
          >
            {isSendingGetDataRequest ? (
              <CircularProgress />
            ) : (
              <AuthorInfo userData={userData} />
            )}
          </div>
          <div className={styles.mainContentRight}>
            <SearchAndSort
              reposData={reposData}
              reposLanguages={reposLanguages}
              isRepoDataFiltered={isRepoDataFiltered}
              setIsRepoDataFiltered={setIsRepoDataFiltered}
              setReposDataFiltered={setReposDataFiltered}
            />

            <Repos
              isSendingGetDataRequest={isSendingGetDataRequest}
              isSendingGetDataRequestSuccessful={
                isSendingGetDataRequestSuccessful
              }
              reposData={reposData}
              isRepoDataFiltered={isRepoDataFiltered}
              reposDataFiltered={reposDataFiltered}
            />
          </div>
        </div>
      </main>
  );
}
