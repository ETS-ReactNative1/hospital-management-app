import gql from 'graphql-tag';

export const DEVICE_AVAILABILITY = gql`
  query Device($id: ID!) {
    device(id: $id) {
      id
      availability
    }
  }
`;

export const DEVICE_INFO_CONDENSE = gql`
  query Device($id: ID!) {
    device(id: $id) {
      id
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
      id
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

export const ME = gql`
  query {
    me {
      id
      email
      role
      phone
      firstName
      lastName
      avatar
    }
  }
`;

export const ACTIVE_EVENTS_BY_DEVICE = gql`
  query ActiveEventsByDevice($deviceId: ID!) {
    activeEventsByDevice(deviceId: $deviceId) {
      id
      actionType
      createdAt
      usedInterval
      creator {
        firstName
        lastName
      }
    }
  }
`;

export const LASTEST_MAINTAIN_EVENT = gql`
  query LastestMaintainEvent($deviceId: ID!) {
    lastestMaintainEvent(deviceId: $deviceId) {
      id
      finished
      device {
        availability
      }
      maintainInfo {
        name
        address
        cost
        phone
        note
      }
    }
  }
`;

export const MAINTAIN_EVENTS_BY_DEVICE = gql`
  query MaintainEventsByDevice($deviceId: ID!) {
    maintainEventsByDevice(deviceId: $deviceId) {
      id
      finished
      createdAt
      maintainInterval
      creator {
        email
        lastName
        firstName
      }
      maintainInfo {
        name
        address
        cost
        phone
        note
      }
      receiver {
        firstName
        lastName
      }
    }
  }
`;

export const LIQUIDATE_EVENT_BY_DEVICE = gql`
  query LiquidateEventByDevice($deviceId: ID!) {
    liquidateEventByDevice(deviceId: $deviceId) {
      id
      createdAt
      creator {
        lastName
        firstName
        email
      }
      liquidateInfo {
        name
        address
        price
        phone
        note
      }
    }
  }
`;
