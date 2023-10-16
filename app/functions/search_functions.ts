// Search the repositories using the provided search criteria
export function search(
  searchValue: string,
  reposData: any[],
  startSearch: (searchValue: string) => void,
  endSearch: (tempReposData: any) => void
) {
  startSearch(searchValue);

  if (reposData) {
    let tempReposData: any[] = reposData.filter((repo) =>
      searchCriteria(repo, searchValue)
    );

    if (searchValue) {
      endSearch(tempReposData);
    } else {
      endSearch(null);
    }
  }
}

// The provided search criteria, in this case they are the name
// and the primary language of the repository
export function searchCriteria(repo: any, searchValue: string) {
  if (repo)
    return (
      repo.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      (repo.primaryLanguage?.name ?? "None")
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    );
  else return null;
}
