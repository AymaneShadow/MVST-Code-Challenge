import axios from "axios";

const authHeader = "bearer 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";

export const getData = async (
  usernameFromURL: string | null,
  startGetData: () => void,
  performGetDataSuccess: (
    userData: any,
    reposData: any,
    languagesData: any
  ) => void,
  performGetDataFailure: () => void,
  endGetData: () => void
) => {
  console.log("getting data...");

  if (!usernameFromURL) return;

  const fullQuery = {
    query:
      '{ user(login: "' +
      usernameFromURL +
      '") { id name avatarUrl login bio repositories(first: 100) { pageInfo { hasPreviousPage hasNextPage startCursor endCursor } nodes { name primaryLanguage { name } updatedAt url description } } }}',
  };

  startGetData();

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

      performGetDataSuccess(userData, reposData, tempLanguagesData);
    })
    .catch(function (error) {
      // handle error
      console.log(error.response);

      performGetDataFailure();
    })
    .finally(() => {
      endGetData();
    });
};