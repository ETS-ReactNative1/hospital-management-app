import gql from 'graphql-tag';

export const DEVICE_INFO_CONDENSE = gql`
  query Device($id: ID!) {
    device(id: $id) {
      activeState
      availability
      model
      manufacturer
      title
    }
  }
`;

export const DEVICE_INFO = gql`
  query Device($id: ID!) {
    device(id: $id) {
      title
      model
      manufacturer
      origin
      manufacturedYear
      startUseTime
      startUseState
      originalPrice
      currentPrice
      faculty
      availability
      activeState
    }
  }
`;

export const LASTEST_MAINTAIN_EVENT = gql`
  query LastestMaintainEvent($deviceId: ID!) {
    lastestMaintainEvent(deviceId: $deviceId) {
      maintainance {
        name
        address
        cost
        phone
        note
      }
    }
  }
`;

export const ME = gql`
  query {
    me {
      email
      role
      phone
      firstName
      lastName
      avatar
    }
  }
`;
