import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($deviceId: ID!) {
    createEvent(deviceId: $deviceId) {
      action
    }
  }
`;

export const DEVICE_STATE = gql`
  query Device($id: ID!) {
    device(id: $id) {
      currentState
    }
  }
`;
