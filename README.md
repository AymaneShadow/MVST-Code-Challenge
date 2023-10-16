## Short Description

This project is about displaying the basic info and public repositories of a Github account and allowing the user to filter through the repositories by name or language using a search bar, or name or last update time using the provided sort options.

## Instructions on how to run it

1 - Clone this repo to your desired destination.

```bash
git clone https://github.com/AymaneShadow/MVST-Code-Challenge.git
```

2 - Install the npm packages by running the following command in the root directory:

```bash
npm install
```

2 - Run the project using the following command in the root directory:

```bash
npm run dev
```

3 - Visit the following address in your browser:

```bash
http://localhost:3000/?username=AymaneShadow
```

Note: Make sure the parameter username exists in the url.

4 - If you want to change which account the info is displayed from just change the variable username in the url or tap on the username on the top left corner of the page.

5 - Sort through the repositories either by using the search bar or the provided sort options.

## Future improvements

This project can be improved in so many ways. Here are a few ideas:

- The search and sort now are completely independent. One idea could be to combine searching and sorting and / or combine multiple sorts (e.g. language + last updated on).
- The design of the UI could be further refined to resemble Github to a greater extent.
