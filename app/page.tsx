"use client";
import { config } from "@gluestack-ui/config";
import { GluestackUIProvider, Spinner } from "@gluestack-ui/themed";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthorInfo } from "./AuthorInfo";
import { Header } from "./Header";
import { Repos } from "./Repos";
import { SearchAndSort } from "./SearchAndSort";
import { Tabs } from "./Tabs";
import { getData } from "./backend_functions";
import styles from "./page.module.css";

export default function Home() {
  // URL Params
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
    getData(
      usernameFromURL,
      startGetData,
      performGetDataSuccess,
      performGetDataFailure,
      endGetData
    );
  }, []);

  return (
    <GluestackUIProvider config={config}>
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
              <Spinner size="large" />
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
    </GluestackUIProvider>
  );
}
