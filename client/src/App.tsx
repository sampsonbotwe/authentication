import React, { useState } from "react";
import LoginForm from "./components/Login/LoginForm";
import SignUpForm from "./components/Signup/SignUpForm";
import { Pane } from "evergreen-ui";

const App: React.FC = () => {
  const [toggleLogin, setToggleLogin] = useState(true);

  return (
    <Pane display="flex" justifyContent="center" paddingTop={130}>
      {toggleLogin && (
        <Pane width={500} padding={30}>
          <LoginForm onToggleLogin={setToggleLogin} />
        </Pane>
      )}

      {!toggleLogin && (
        <Pane width={500} padding={30}>
          <SignUpForm onToggleLogin={setToggleLogin} />
        </Pane>
      )}
    </Pane>
  );
};

export default App;
