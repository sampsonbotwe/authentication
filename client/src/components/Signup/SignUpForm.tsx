import { useForm } from "react-hook-form";
import * as usersApi from "../../api/usersApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
import { IAlert, ISignUpRequest } from "../../interfaces/interfaces";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface IProps {
  onToggleLogin: (state: boolean) => void;
  onSetAlert: (alert: IAlert) => void;
  alert?: IAlert;
}

const SignUpForm: React.FC<IProps> = ({
  onToggleLogin,
  onSetAlert,
  ...props
}) => {
  const [alert, setAlert] = useState<IAlert | undefined>(props.alert);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (info: ISignUpRequest) => {
    usersApi
      .signup(info)
      .then((response) => {
        onSetAlert({
          intent: "success",
          title: "Sign up Successfull",
          message: `An activation email has been sent to your email. 
          <a href='${response.data.activationUrl}' target='_blank'>Click here to proceed.</a>`,
        });
        onToggleLogin(true);
      })
      .catch((error) => {
        setAlert({ intent: "danger", title: error.response.data.message });
      });
  };

  return (
    <Pane>
      <Heading size={800} marginBottom={5}>
        Sign Up
      </Heading>
      <Paragraph size={300}>
        Provide your details to complete the sign up process. A confirmation
        email will be sent to activate your account.
      </Paragraph>

      {alert && (
        <Alert
          intent={alert.intent}
          title={alert.title}
          marginBottom={5}
          marginTop={15}
        />
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputField
          type="text"
          placeholder="Enter your name"
          marginBottom={10}
          validationMessage={errors.name?.message}
          {...register("name")}
        />

        <TextInputField
          type="text"
          placeholder="Enter your email"
          marginBottom={10}
          validationMessage={errors.email?.message}
          label=""
          {...register("email")}
        />
        <PasswordTextInputField
          label=""
          placeholder="Choose a password"
          validationMessage={errors.password?.message}
          {...register("password")}
        />

        <Button type="submit" appearance="primary" marginRight={10}>
          Sign Up
        </Button>
        <Text size={300}>
          Already have an account?{" "}
          <Link cursor="pointer" size={300} onClick={() => onToggleLogin(true)}>
            Login
          </Link>
        </Text>
      </form>
    </Pane>
  );
};

export default SignUpForm;
