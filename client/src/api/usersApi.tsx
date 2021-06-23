import axios from "axios";
import {
  IActivateRequest,
  ICredentials,
  ISignUpRequest,
} from "../interfaces/interfaces";

export const login = (credentials: ICredentials) =>
  axios.post("/account/login", credentials);

export const signup = (data: ISignUpRequest) =>
  axios.post("/account/signup", data);

export const activate = (data: IActivateRequest) =>
  axios.post("/account/activate", data);
