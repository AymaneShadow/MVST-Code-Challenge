"use client";
import {
  Button,
  ButtonIcon,
  ButtonText,
  ChevronDownIcon,
  CloseIcon,
  Icon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
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
} from "@gluestack-ui/themed";
import { useState } from "react";
import { search } from "../functions/search_functions";
import { sortByLanguage, sortRepos } from "../functions/sort_functions";
import styles from "../page.module.css";

type Props = {
  reposData: any;
  reposLanguages: any;
  isRepoDataFiltered: boolean;
  setIsRepoDataFiltered: any;
  setReposDataFiltered: any;
};

// This component is responsible for rendering the search and sort inputs
export const SearchAndSort = (props: Props) => {
  const {
    reposData,
    reposLanguages,
    isRepoDataFiltered,
    setIsRepoDataFiltered,
    setReposDataFiltered,
  } = props;

  // Search and sort data
  const [searchValue, setSearchRepoNameValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortLanguage, setSortLanguage] = useState("");

  // Called before searching repositories
  const startSearch = (searchValue: string) => {
    setSortBy("");
    setSortLanguage("");
    setSearchRepoNameValue(searchValue);
    setIsRepoDataFiltered(true);
  };

  // Called after searching repositories
  const endSearch = (tempReposData: any) => {
    if (tempReposData) {
      setReposDataFiltered(tempReposData);
    } else {
      setIsRepoDataFiltered(false);
    }
  };

  // Called before sorting repositories
  const startSortRepos = (value: string) => {
    setSortLanguage("");
    setSearchRepoNameValue("");
    setIsRepoDataFiltered(true);
    setSortBy(value[0].toUpperCase() + value.substring(1));
  };

  // Called after sorting repositories
  const endSortRepos = (sortedElements: any) => {
    setReposDataFiltered(sortedElements);
  };

  // Called before sorting repositories
  const startSortByLanguage = (value: string) => {
    setSortBy("");
    setSearchRepoNameValue("");
    setSortLanguage(value);
  };

  // Called after sorting repositories
  const endSortByLanguage = (sortedElements: any) => {
    console.log("sortedElements", sortedElements);

    setIsRepoDataFiltered(true);
    setReposDataFiltered(sortedElements);
  };

  return (
    <div className={styles.searchAndSort}>
      <Input>
        <InputSlot pl="$3">
          <InputIcon as={SearchIcon} />
        </InputSlot>
        <InputField
          style={{ color: "white" }}
          placeholder="Find a repository..."
          value={searchValue}
          onChange={(e: any) =>
            search(e.target.value, reposData, startSearch, endSearch)
          }
        />
      </Input>

      <Select
        onValueChange={(value) => {
          sortRepos(value, reposData, startSortRepos, endSortRepos);
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
          sortByLanguage(
            value,
            reposData,
            startSortByLanguage,
            endSortByLanguage
          );
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
            {reposLanguages.map((language: string, index: number) => {
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

      {isRepoDataFiltered ? (
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => {
            setIsRepoDataFiltered(false);
            setSearchRepoNameValue("");
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
  );
};
