import "./App.css";
import { useState, useEffect } from "react";
import Dashboard from "./screens/dashboard";
import SignIn from "./components/user-com";
import { useSnackbar } from "./components/utils/use-snackbar.hook";
import { RecoilRoot } from "recoil";
import SnackbarWrapper from "./components/utils/snackbar";

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const snackbar = useSnackbar();
  const login = async (password, username) => {
    const formData = new FormData();
    formData.append("password", password);
    formData.append("username", username);
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    };
    const result = await fetch("http://localhost:8000/sign_in", requestOptions)
      .then((value) => value)
      .catch((error) => console.log(error));
    const json = await result
      .json()
      .then((valu) => valu)
      .catch((e) => console.log(e));

    if (result.status !== 500) setUserInfo(json);
    else snackbar.error("internal error");
  };

  const signUp = async (password, username) => {
    const formData = new FormData();
    formData.append("password", password);
    formData.append("username", username);
    const requestOptions = {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    };
    const result = await fetch("http://localhost:8000/sign_up", requestOptions)
      .then((value) => value)
      .catch((error) => console.log(error));
    const json = await result
      .json()
      .then((value) => value)
      .catch((error) => console.log(error));
    if (result.status !== 500) setUserInfo(json);
    else snackbar.error("internal error");
  };

  return (
    <>
      <SnackbarWrapper />
      {userInfo ? (
        <Dashboard userInfo={userInfo} />
      ) : (
        <SignIn login={login} signUp={signUp} />
      )}
    </>
  );
}

export default App;
