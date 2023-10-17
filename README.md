## Short Description

This project is about displaying the basic info and public repositories of a Github account and allowing the user to filter through the repositories by name or language using a search bar, or name, last update time or language using the provided sort options.

## Deployment URL

You can find the fully working challenge under this url:

https://mvst-code-challenge-rd7jtljea-aymanes-projects-63a39b54.vercel.app/?username=AymaneShadow

## Instructions on how to run it

1 - Clone this repo to your desired destination.

```bash
git clone https://github.com/AymaneShadow/MVST-Code-Challenge.git
```

2 - Install the npm packages by running the following command in the root directory:

```bash
npm install
```

3 - To use the GraphQL API you must generate a personal access token in Github. Link on how to do it: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-to-the-api-with-a-personal-access-token

4 - Create a file named .env.local at the root of your directory and copy / past the following into it:

```bash
NEXT_PUBLIC_GRAPHQL_API_PERSONAL_ACCESS_TOKEN='<YOUR_PERSONAL_ACCESS_TOKEN>'
```

5 - Replace <YOUR_PERSONAL_ACCESS_TOKEN> by the personal access token your generated in the 3rd step.

6 - Run the project using the following command in the root directory:

```bash
npm run dev
```

7 - Visit the following address in your browser:

```bash
http://localhost:3000
```

8 - If you want to change which account the info is displayed from just change the variable username in the url or tap on the username on the top left corner of the page.

9 - Sort through the repositories either by using the search bar or the provided sort options.

## Future improvements

This project can be improved in so many ways. Here are a few ideas:

- The search and sort now are completely independent. One idea could be to combine searching and sorting and / or combine multiple sorts (e.g. language + last updated on).
- The design of the UI could be further refined to resemble Github to a greater extent.
