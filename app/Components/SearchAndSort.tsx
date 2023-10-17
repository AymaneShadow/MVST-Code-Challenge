"use client";
import {
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
import Button from '@mui/material/Button'
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { createMuiTheme } from "@mui/material/styles";
import { HighlightOff } from "@mui/icons-material";

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

      <TextField
        label="Find a repository..."
        variant="outlined"
        size="small"
        value={searchValue}
        onChange={(e: any) =>
          search(e.target.value, reposData, startSearch, endSearch)
        }
        sx={{ 
          input: { color: 'white' }, 
          '& .MuiSvgIcon-root': {color: 'white'},
          "& .MuiOutlinedInput-notchedOutline": {
            "border-color": "white !important",
            "border-width": "1px !important",
          }
        }}
        InputLabelProps={{
          style: { color: 'white' },
        }}
      />

      <TextField
        select
        value={sortBy.toLowerCase()}
        label="Sort"
        // defaultValue="EUR"
        sx={{ 
          input: { color: 'white' }, 
          width: 150, 
          '& .MuiSvgIcon-root': {color: 'white'},
          "& .MuiOutlinedInput-notchedOutline": {
            "border-color": "white !important",
            "border-width": "1px !important",
          },
          '& .MuiOutlinedInput-input': {
            color: 'white',
          },
        }}
        InputLabelProps={{
          style: { color: 'white' },
        }}
        onChange={(value) => {
          sortRepos(value.target.value, reposData, startSortRepos, endSortRepos);
        }}
      >
        <MenuItem value={'name'}>Name</MenuItem>
        <MenuItem value={'updated'}>Last Updated</MenuItem>
      </TextField>

      <TextField
        select
        value={sortLanguage}
        label="Language"
        // defaultValue="EUR"
        sx={{ 
          input: { color: 'white' }, 
          width: 150, 
          '& .MuiSvgIcon-root': {color: 'white'},
          "& .MuiOutlinedInput-notchedOutline": {
            "border-color": "white !important",
            "border-width": "1px !important",
          },
          '& .MuiOutlinedInput-input': {
            color: 'white',
          },
        }}
        InputLabelProps={{
          style: { color: 'white' },
        }}
        onChange={(value) => {
          sortByLanguage(
            value.target.value,
            reposData,
            startSortByLanguage,
            endSortByLanguage
          );
        }}
      >
        {reposLanguages.map((language: string, index: number) => {
          return (
            <MenuItem key={index + "RepoLanguages"} value={language}>{language}</MenuItem>
          );
        })}
      </TextField>

      {isRepoDataFiltered ? (
        <Button 
          variant="contained"
          onClick={() => {
            setIsRepoDataFiltered(false);
            setSearchRepoNameValue("");
            setSortLanguage("");
            setSortBy("");
          }}
          endIcon={<HighlightOff />}
        >Clear
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
};
