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
} from "evergreen-ui";
import PasswordTextInputField from "../Shared/PasswordTextInputField";
import { ISignUpInfo } from "../../interfaces/interfaces";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

interface IProps {
  onToggleLogin: (state: boolean) => void;
}

const SignUpForm: React.FC<IProps> = ({ onToggleLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (info: ISignUpInfo) => {
    usersApi
      .signup(info)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
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
          {...register("email")}
        />
        <PasswordTextInputField
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
