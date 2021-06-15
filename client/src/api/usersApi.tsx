import axios from "axios";
import { ICredentials, ISignUpInfo } from "../interfaces/interfaces";

export const login = (credentials: ICredentials) =>
  axios.post("/users/login", credentials);

export const signup = (info: ISignUpInfo) => axios.post("/users/signup", info);
