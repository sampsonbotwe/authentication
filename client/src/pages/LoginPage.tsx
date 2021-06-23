import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import SignUpForm from "../components/Signup/SignUpForm";
import { Pane } from "evergreen-ui";
import { IAlert } from "../interfaces/interfaces";

const LoginPage: React.FC = () => {
  const [toggleLogin, setToggleLogin] = useState(true);
  const [alert, setAlert] = useState<IAlert>();

  return (
    <Pane display="flex" justifyContent="center" paddingTop={130}>
      {toggleLogin && (
        <Pane width={500} padding={30}>
          <LoginForm
            onToggleLogin={setToggleLogin}
            onSetAlert={setAlert}
            alert={alert}
          />
        </Pane>
      )}

      {!toggleLogin && (
        <Pane width={500} padding={30}>
          <SignUpForm
            onToggleLogin={setToggleLogin}
            onSetAlert={setAlert}
            alert={alert}
          />
        </Pane>
      )}
    </Pane>
  );
};

export default LoginPage;
