interface LoginCredentials {
    username: string;
    password: string;
    staySignedIn: boolean;
}
  
interface SignupCredentials {
    name: string;
    email: string;
    username: string;
    password: string;
    staySignedIn: boolean;
}

  export type { SignupCredentials, LoginCredentials };
