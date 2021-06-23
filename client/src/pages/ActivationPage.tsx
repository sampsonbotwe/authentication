import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import * as usersApi from "../api/usersApi";
import { IActivateRequest } from "../interfaces/interfaces";
import { Redirect } from "react-router-dom";

const ActivationPage: React.FC = () => {
  const { activationToken } = useParams<IActivateRequest>();

  useEffect(() => {
    usersApi
      .activate({ activationToken })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [activationToken]);

  return <Redirect to="/" />;
};

export default ActivationPage;
