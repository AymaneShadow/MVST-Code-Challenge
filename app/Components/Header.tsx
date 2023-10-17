"use client";
import {
  ButtonIcon,
  ButtonText,
  CheckIcon,
  EditIcon,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Pressable,
  RepeatIcon,
} from "@gluestack-ui/themed";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { getData } from "../functions/backend_functions";
import styles from "../page.module.css";
import { Check, Refresh } from "@mui/icons-material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type Props = {
  setUserData: React.Dispatch<React.SetStateAction<any>>;
  setReposData: React.Dispatch<React.SetStateAction<any>>;
  startGetData: () => void;
  performGetDataSuccess: (
    userData: any,
    reposData: any,
    languagesData: any
  ) => void;
  performGetDataFailure: () => void;
  endGetData: () => void;
};

// This component is responsible for rendering the header
export const Header = (props: Props) => {
  const {
    setUserData,
    setReposData,
    startGetData,
    performGetDataSuccess,
    performGetDataFailure,
    endGetData,
  } = props;

  // URL Params
  const router = useRouter();
  const urlParams = useSearchParams();
  const usernameFromURL = urlParams.get("username");

  // Username Editing
  const [isUsernameBeingEdited, setIsUsernameBeingEdited] = useState(false);
  const [username, setUsername] = useState("");

  // Called when editing the username after clicking on the username tag
  const editUsername = (value: string) => {
    console.log("value", value);
    console.log("usernameFromURL", usernameFromURL);

    setUsername(value);
    router.replace("?username=" + value);
  };

  return (
    <div className={styles.header}>
      {isUsernameBeingEdited ? (
        <div className={styles.editUsername}>

          <TextField
            label={'Username'}
            variant="outlined"
            size="small"
            value={username}
            onChange={(e: any) =>
              editUsername(e.target.value)
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

          <Button 
            variant="contained"
            onClick={() => {
              setIsUsernameBeingEdited(false);
              setUserData({});
              setReposData([]);
              getData(
                usernameFromURL,
                startGetData,
                performGetDataSuccess,
                performGetDataFailure,
                endGetData
              );
            }}
            endIcon={<Check />}
          >Done
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
        variant="contained"
        onClick={() => {
          getData(
            usernameFromURL,
            startGetData,
            performGetDataSuccess,
            performGetDataFailure,
            endGetData
          );
        }}
        endIcon={<Refresh />}
      >Refresh Data
      </Button>
    </div>
  );
};
