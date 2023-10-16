"use client";
import { config } from "@gluestack-ui/config";
import {
  Button,
  ButtonIcon,
  ButtonText,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  EditIcon,
  GluestackUIProvider,
  Icon,
  Image,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Pressable,
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
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const searchParams = useSearchParams();
  const usernameFromURL = searchParams.get("username");
  const router = useRouter();

  const [searchValue, setSearchValue] = useState("");

  const [reposData, setReposData] = useState([]);
  const [reposLanguages, setReposLanguages] = useState<any[]>([]);

  const [isSendingGetDataRequest, setIsSendingGetDataRequest] = useState(true);
  const [
    isSendingGetDataRequestSuccessful,
    setIsSendingGetDataRequestSuccessful,
  ] = useState(false);
  // const [getUserRequestResponseMessage, setGetUserRequestResponseMessage] =
  //   useState(false);
  const [userData, setUserData] = useState<any>({});

  const [entityDataFiltered, setEntityDataFiltered] = useState<any>([]);
  const [isEntityDataFiltered, setIsEntityDataFiltered] = useState(false);

  const [sortBy, setSortBy] = useState("");
  const [sortLanguage, setSortLanguage] = useState("");

  const [isUsernameBeingEdited, setIsUsernameBeingEdited] = useState(false);
  const [username, setUsername] = useState("");

  const getData = async () => {
    console.log("getting data...");

    const authHeader = "bearer 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";

    const fullQuery = {
      query:
        '{ user(login: "' +
        usernameFromURL +
        '") { id name avatarUrl login bio repositories(first: 100) { pageInfo { hasPreviousPage hasNextPage startCursor endCursor } nodes { name primaryLanguage { name } updatedAt url description } } }}',
    };

    setIsSendingGetDataRequest(true);

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
        setIsSendingGetDataRequestSuccessful(true);
        const reposData = response.data.data.user.repositories.nodes;
        const userData = {
          name: response.data.data.user.name,
          login: response.data.data.user.login,
          avatarUrl: response.data.data.user.avatarUrl,
          bio: response.data.data.user.bio,
        };
        console.log("reposData", reposData);
        console.log("userData", userData);

        let tempLanguagesData: any[] = [];

        reposData.forEach((repo: any) => {
          let languageExists = false;
          tempLanguagesData.map((language) => {
            if (language === (repo.primaryLanguage?.name ?? "None")) {
              languageExists = true;
            }
          });
          if (!languageExists)
            tempLanguagesData.push(repo.primaryLanguage?.name ?? "None");
        });

        console.log("tempLanguagesData", tempLanguagesData);

        setReposLanguages(tempLanguagesData);
        setUserData(userData);
        setReposData(reposData);
      })
      .catch(function (error) {
        setIsSendingGetDataRequestSuccessful(false);

        // handle error
        console.log(error.response);
      })
      .finally(() => {
        setIsSendingGetDataRequest(false);
      });
  };

  // Search
  function search(searchValue: string) {
    setSortBy("");
    setSortLanguage("");
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
    setSortLanguage("");
    setSearchValue("");

    setIsEntityDataFiltered(true);
    setSortBy(value[0].toUpperCase() + value.substring(1));

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

    setEntityDataFiltered(sortedElements);
  };

  const sortByLanguage = (value: string) => {
    setSortBy("");
    setSearchValue("");
    setSortLanguage(value);

    let sortedElements = [...reposData];

    sortedElements = sortedElements.filter((repo: any) => {
      if (
        (repo.primaryLanguage?.name ?? "none").toLowerCase() ===
        value.toLowerCase()
      ) {
        return repo;
      }
    });

    console.log("sortedElements", sortedElements);

    setIsEntityDataFiltered(true);
    setEntityDataFiltered(sortedElements);
  };

  const editUsername = (value: string) => {
    setUsername(value);
    router.replace("?username=" + value);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <GluestackUIProvider config={config}>
      <main className={styles.main}>
        <div className={styles.header}>
          {isUsernameBeingEdited ? (
            <div className={styles.editUsername}>
              <Input>
                <InputSlot pl="$3">
                  <InputIcon as={EditIcon} />
                </InputSlot>
                <InputField
                  style={{ color: "white" }}
                  placeholder={usernameFromURL}
                  value={username}
                  onChange={(e: any) => editUsername(e.target.value)}
                />
              </Input>
              <Button
                size="md"
                variant="solid"
                action="primary"
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => {
                  setIsUsernameBeingEdited(false);
                  setUserData({});
                  setReposData([]);
                  getData();
                }}
              >
                <ButtonText>Done </ButtonText>
                <ButtonIcon as={CheckIcon} />
              </Button>
            </div>
          ) : (
            <div className={styles.tag}>
              <Pressable
                onPress={() => {
                  setIsUsernameBeingEdited(true);
                }}
              >
                <p>{usernameFromURL}</p>
              </Pressable>
            </div>
          )}
          <Button
            size="md"
            variant="solid"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => {
              getData();
            }}
          >
            <ButtonText>Refresh Data </ButtonText>
            <ButtonIcon as={RepeatIcon} />
          </Button>
        </div>
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
        <div className={styles.mainContent}>
          <div
            className={styles.mainContentLeft}
            style={isSendingGetDataRequest ? { justifyContent: "center" } : {}}
          >
            {isSendingGetDataRequest ? (
              <Spinner size="large" />
            ) : (
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
            )}
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
                  <SelectInput
                    style={{ color: "white" }}
                    placeholder="Sort"
                    value={sortBy}
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
                    value={sortLanguage}
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
                          value={language}
                        />
                      );
                    })}
                  </SelectContent>
                </SelectPortal>
              </Select>

              {isEntityDataFiltered ? (
                <Button
                  size="md"
                  variant="solid"
                  action="primary"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={() => {
                    setIsEntityDataFiltered(false);
                    setSearchValue("");
                    setSortLanguage("");
                    setSortBy("");
                  }}
                >
                  <ButtonText>Clear </ButtonText>
                  <ButtonIcon as={CloseIcon} />
                </Button>
              ) : (
                <></>
              )}
            </div>

            <div className={styles.repos}>
              {isSendingGetDataRequest ? (
                <div className={styles.spinner}>
                  <Spinner size="large" />
                </div>
              ) : isSendingGetDataRequestSuccessful ? (
                reposData.length > 0 ? (
                  isEntityDataFiltered && entityDataFiltered.length === 0 ? (
                    <div className={styles.repo}>
                      <p>Your search did not match any repositories.</p>
                    </div>
                  ) : (
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
                  )
                ) : (
                  <div className={styles.repo}>
                    <p>
                      Username {usernameFromURL} was found but there are no
                      public repos for this user.
                    </p>
                  </div>
                )
              ) : (
                <div className={styles.repo}>
                  <p>Couldn't find username {usernameFromURL}.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </GluestackUIProvider>
  );
}
