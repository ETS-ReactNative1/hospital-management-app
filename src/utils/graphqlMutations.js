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
    signUp(userInput: { email: $email, password: $password })
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateActiveEvent($deviceId: ID!) {
    createActiveEvent(deviceId: $deviceId) {
      id
      actionType
    }
  }
`;

export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export const AVATAR_UPLOAD = gql`
  mutation AvatarUpload($file: Upload!) {
    avatarUpload(file: $file)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($userInput: UserInput!) {
    updateUser(userInput: $userInput) {
      id
    }
  }
`;

export const CREATE_MAINTAIN_EVENT = gql`
  mutation CreateMaintainEvent($deviceId: ID!, $maintainInfo: MaintainInfo!) {
    createMaintainEvent(deviceId: $deviceId, maintainInfo: $maintainInfo) {
      id
    }
  }
`;

export const CREATE_LIQUIDATE_EVENT = gql`
  mutation CreateLiquidateEvent($deviceId: ID!, $liquidateInfo: LiquidateInfo!) {
    createLiquidateEvent(deviceId: $deviceId, liquidateInfo: $liquidateInfo) {
      id
    }
  }
`;
