import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as usersApi from "../../api/usersApi";
import {
  Button,
  Heading,
  Link,
  Pane,
  Paragraph,
  TextInputField,
  Text,
  Alert,
} from "evergreen-ui";
import PasswordTextInputField from "../Shared/PasswordTextInputField";
import { IAlert, ICredentials } from "../../interfaces/interfaces";

import DOMPurify from "dompurify";
import React from "react";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface IProps {
  onToggleLogin: (state: boolean) => void;
  onSetAlert: (alert: IAlert) => void;
  alert?: IAlert;
}

const LoginForm: React.FC<IProps> = ({ onToggleLogin, ...props }) => {
  const [alert, setAlert] = useState<IAlert | undefined | null>(props.alert);
  const [loggedIn, setLoggedIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (credentials: ICredentials) => {
    setAlert(null);
    usersApi
      .login(credentials)
      .then((response) => {
        setAlert({ intent: "success", title: "Login successfull!" });

        setTimeout(() => {
          setLoggedIn(true);
        }, 300);
      })
      .catch((error) =>
        setAlert({ intent: "danger", title: error.response.data.message })
      );
  };

  return (
    <Pane>
      {loggedIn && <Redirect to="/dashboard" />}
      <Heading size={800} marginBottom={5}>
        Login
      </Heading>
      <Paragraph size={300}>
        Provide your email and password to login.
      </Paragraph>

      {alert && (
        <Alert
          intent={alert.intent}
          title={alert.title}
          marginBottom={5}
          marginTop={15}
        >
          {alert.message && (
            <Pane
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(alert.message),
              }}
            ></Pane>
          )}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputField
          type="text"
          placeholder="Email"
          autoComplete="off"
          marginBottom={10}
          validationMessage={errors.email?.message}
          label=""
          {...register("email")}
        />

        <PasswordTextInputField
          placeholder="Password"
          autoComplete="off"
          label=""
          validationMessage={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" appearance="primary" marginRight={10}>
          Login
        </Button>
        <Text size={300}>
          You don't have an account?{" "}
          <Link
            size={300}
            cursor="pointer"
            onClick={() => onToggleLogin(false)}
          >
            Sign Up
          </Link>
        </Text>
      </form>
    </Pane>
  );
};

export default LoginForm;
