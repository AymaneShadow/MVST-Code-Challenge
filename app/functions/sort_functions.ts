export const sortRepos = (
  value: string,
  reposData: any[],
  startSortRepos: (value: string) => void,
  endSortRepos: (sortedElements: any) => void
) => {
  startSortRepos(value);

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

  endSortRepos(sortedElements);
};

export const sortByLanguage = (
  value: string,
  reposData: any[],
  startSortByLanguage: (value: string) => void,
  endSortByLanguage: (sortedElements: any) => void
) => {
  startSortByLanguage(value);

  let sortedElements = [...reposData];

  sortedElements = sortedElements.filter((repo: any) => {
    if (
      (repo.primaryLanguage?.name ?? "none").toLowerCase() ===
      value.toLowerCase()
    ) {
      return repo;
    }
  });

  endSortByLanguage(sortedElements);
};
