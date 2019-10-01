import gql from 'graphql-tag';

export const DEVICE_STATE = gql`
  query Device($id: ID!) {
    device(id: $id) {
      id
      currentState
    }
  }
`;

export const ME = gql`
  {
    me {
      email
      id
    }
  }
`;
