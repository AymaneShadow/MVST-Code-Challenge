"use client";
import { config } from "@gluestack-ui/config";
import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronDownIcon,
  GluestackUIProvider,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  RepeatIcon,
  SearchIcon,
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectIcon,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
  Spinner,
} from "@gluestack-ui/themed";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import imgAuthor from "./10123098.jpg";
import styles from "./page.module.css";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");

  // House REQUESTS TO BACKEND
  const [isSendingGetReposRequest, setIsSendingGetReposRequest] =
    useState(false);
  const [
    isSendingGetReposRequestSuccessful,
    setIsSendingGetReposRequestSuccessful,
  ] = useState(false);
  // const [getReposRequestResponseMessage, setGetReposRequestResponseMessage] =
  //   useState(false);
  const [reposData, setReposData] = useState([]);
  const [reposLanguages, setReposLanguages] = useState<any[]>([]);

  const [entityDataFiltered, setEntityDataFiltered] = useState<any>([]);
  const [isEntityDataFiltered, setIsEntityDataFiltered] = useState(false);

  const [sortBy, setSortBy] = useState("updated");

  const getGithubRepos = async () => {
    console.log("getting repos...");

    const authHeader = "bearer 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";
    const query =
      "{ \
        viewer { \
          repositories(first: 100) { \
            pageInfo { \
              hasPreviousPage \
              hasNextPage \
              startCursor \
              endCursor \
            } \
            nodes { \
              name, \
              primaryLanguage { \
                name \
              } \
              updatedAt, \
              url, \
              description \
            } \
          } \
        } \
      }";

    const fullQuery =
      ' \
    { \
      "query": "' +
      query +
      '" \
    } \
    ';

    setIsSendingGetReposRequest(true);

    // GET request for remote image in node.js
    axios({
      method: "post",
      url: "https://api.github.com/graphql",
      data: fullQuery,
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        setIsSendingGetReposRequestSuccessful(true);
        const responseData = response.data.data.viewer.repositories.nodes;
        console.log("responseData", response.data.data);

        setReposData(responseData);

        let tempLanguagesData: any[] = [];

        responseData.forEach((repo: any) => {
          let languageExists = false;
          tempLanguagesData.map((language) => {
            if (language === repo.primaryLanguage?.name) {
              languageExists = true;
            }
          });
          if (!languageExists)
            tempLanguagesData.push(repo.primaryLanguage?.name ?? "None");
        });

        console.log("tempLanguagesData", tempLanguagesData);

        setReposLanguages(tempLanguagesData);
      })
      .catch(function (error) {
        setIsSendingGetReposRequestSuccessful(false);

        // handle error
        console.log(error.response);
      })
      .finally(() => {
        setIsSendingGetReposRequest(false);
      });
  };

  // Search
  function search(searchValue: string) {
    setSearchValue(searchValue);

    setIsEntityDataFiltered(true);

    if (searchValue) {
      if (reposData) {
        let tempReposData: any[] = reposData.filter((repo) =>
          searchCriteria(repo, searchValue)
        );

        setEntityDataFiltered(tempReposData);
      }
    } else {
      setIsEntityDataFiltered(false);
    }
  }

  function searchCriteria(repo: any, searchValue: string) {
    if (repo)
      return (
        repo.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        (repo.primaryLanguage?.name ?? "None")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
    else return null;
  }

  const format_date = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.toLocaleString("default", { month: "long" });
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${month} ${day}, ${year}`;
  };

  const sortRepos = (value: string) => {
    setIsEntityDataFiltered(false);

    let sortedElements = [...reposData];

    sortedElements.sort((a: any, b: any) => {
      const condition1 =
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      const condition2 = a.name.localeCompare(b.name);
      const condition3 = a.primaryLanguage?.name.localeCompare(
        b.primaryLanguage?.name
      );

      return value === "updated" ? condition1 : condition2;
    });

    setReposData(sortedElements);
  };

  const sortByLanguage = (value: string) => {
    let sortedElements = [...reposData];

    sortedElements = sortedElements.filter((repo: any) => {
      console.log("value", repo.primaryLanguage?.name.toLowerCase());
      console.log("value", value);

      if ((repo.primaryLanguage?.name ?? "none").toLowerCase() === value) {
        console.log("true");
        return repo;
      }
    });

    console.log("sortedElements", sortedElements);

    setIsEntityDataFiltered(true);
    setEntityDataFiltered(sortedElements);
  };

  useEffect(() => {
    getGithubRepos();
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <main className={styles.main}>
        <div className={styles.header}>
          <div className={styles.tag}>
            <p>AymaneShadow</p>
          </div>
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => {
              getGithubRepos();
            }}
          >
            <ButtonText>Refresh Repos </ButtonText>
            <ButtonIcon as={RepeatIcon} />
          </Button>
        </div>
        <div className={styles.tabs}>
          <div className={styles.tab}>
            <div className={styles.selected}>
              <p>Repositories</p>
              <div className={styles.tabNumber}>{reposData.length}</div>
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
                  style={{ color: "white" }}
                  placeholder="Find a repository..."
                  value={searchValue}
                  onChange={(e: any) => search(e.target.value)}
                />
              </Input>

              <Select
                onValueChange={(value) => {
                  sortRepos(value);
                }}
              >
                <SelectTrigger variant="rounded" size="md">
                  <SelectInput style={{ color: "white" }} placeholder="Sort" />
                  <SelectIcon mr="$3">
                    <Icon style={{ color: "white" }} as={ChevronDownIcon} />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Name" value="name" />
                    <SelectItem label="Last Updated" value="updated" />
                  </SelectContent>
                </SelectPortal>
              </Select>

              <Select
                onValueChange={(value) => {
                  sortByLanguage(value);
                }}
              >
                <SelectTrigger variant="rounded" size="md">
                  <SelectInput
                    style={{ color: "white" }}
                    placeholder="Language"
                  />
                  <SelectIcon mr="$3">
                    <Icon style={{ color: "white" }} as={ChevronDownIcon} />
                  </SelectIcon>
                </SelectTrigger>
                <SelectPortal>
                  <SelectBackdrop />
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    {reposLanguages.map((language, index) => {
                      return (
                        <SelectItem
                          key={index + "RepoLanguages"}
                          label={language}
                          value={language.toLowerCase()}
                        />
                      );
                    })}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </div>

            <div className={styles.repos}>
              {isSendingGetReposRequest ? (
                <div className={styles.spinner}>
                  <Spinner size="large" />
                </div>
              ) : isSendingGetReposRequestSuccessful ? (
                (isEntityDataFiltered ? entityDataFiltered : reposData).map(
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
              ) : (
                <div className={styles.repo}>
                  <p>There was an error fetching the repos.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </GluestackUIProvider>
  );
}
