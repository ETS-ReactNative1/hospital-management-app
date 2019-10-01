import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password)
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($deviceId: ID!) {
    createEvent(deviceId: $deviceId) {
      action
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const SEND_FORGOT_PASSWORD_EMAIL = gql`
  mutation SendForgotPasswordEmail($email: String!) {
    sendForgotPasswordEmail(email: $email)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($newPassword: String!) {
    changePassword(newPassword: $newPassword)
  }
`;
