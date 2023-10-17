"use client";
import {
  Button,
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
          <Input>
            <InputSlot pl="$3">
              <InputIcon as={EditIcon} />
            </InputSlot>
            <InputField
              style={{ color: "white" }}
              placeholder={usernameFromURL ?? ''}
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
              getData(
                usernameFromURL,
                startGetData,
                performGetDataSuccess,
                performGetDataFailure,
                endGetData
              );
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
          getData(
            usernameFromURL,
            startGetData,
            performGetDataSuccess,
            performGetDataFailure,
            endGetData
          );
        }}
      >
        <ButtonText>Refresh Data </ButtonText>
        <ButtonIcon as={RepeatIcon} />
      </Button>
    </div>
  );
};
