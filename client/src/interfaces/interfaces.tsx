export interface ICredentials {
  email: string;
  password: string;
}

export interface ISignUpRequest {
  name: string;
  email: string;
  password: string;
}

export interface ISignUpResponse {
  activationUrl: string;
}

export interface IResponse {
  status: boolean;
  message: string;
}

export interface IActivateRequest {
  activationToken: string;
}

export interface IAlert {
  intent: "success" | "warning" | "danger";
  title: string;
  message?: string;
}
