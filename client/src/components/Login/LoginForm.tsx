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
} from "evergreen-ui";
import PasswordTextInputField from "../Shared/PasswordTextInputField";
import { ICredentials } from "../../interfaces/interfaces";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface IProps {
  onToggleLogin: (state: boolean) => void;
}

const LoginForm: React.FC<IProps> = ({ onToggleLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (credentials: ICredentials) => {
    usersApi
      .login(credentials)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <Pane>
      <Heading size={800} marginBottom={5}>
        Login
      </Heading>
      <Paragraph size={300}>
        Provide your email and password to login.
      </Paragraph>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputField
          type="text"
          placeholder="Email"
          marginBottom={10}
          validationMessage={errors.email?.message}
          {...register("email")}
        />

        <PasswordTextInputField
          placeholder="Password"
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
