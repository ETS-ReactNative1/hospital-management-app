import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useQuery } from 'react-apollo';

import { Typography, Block } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';
import { LIQUIDATE_EVENT_BY_DEVICE } from 'src/utils/graphqlQueries';
import graphqlErrorHandler from 'src/utils/graphqlErrorHandler';

const TextPackage = localization[AppData.language];

const liquidateInfoDisplay = {
  name: TextPackage.LIQUIDATE_COMPANY,
  address: TextPackage.ADDRESS,
  phone: TextPackage.PHONE,
  price: TextPackage.LIQUIDATE_PRICE,
  note: TextPackage.NOTE
};

const LiquidateInfo = ({ navigation }) => {
  const { deviceId } = navigation.state.params;
  const { data, loading, error } = useQuery(LIQUIDATE_EVENT_BY_DEVICE, { variables: { deviceId } });

  if (loading) {
    return (
      <Block middle center>
        <ActivityIndicator />
      </Block>
    );
  }

  if (error) {
    graphqlErrorHandler(error, () => {
      navigation.goBack();
    });
    return null;
  }

  const {
    liquidateEventByDevice: { data: event }
  } = data;

  return (
    <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
      <Block key="creator" padding={[theme.sizes.padding, 0]} flex={false}>
        <Typography gray body>
          {TextPackage.LIQUIDATE_CREATOR}
        </Typography>
        <Typography bold body>
          {`${event.creator.lastName} ${event.creator.firstName}`}
        </Typography>
      </Block>

      <Block key="createdAt" padding={[theme.sizes.padding, 0]} flex={false}>
        <Typography gray body>
          {TextPackage.LIQUIDATE_TIME}
        </Typography>
        <Typography bold body>
          {event.createdAt.toLocaleDateTimeString()}
        </Typography>
      </Block>

      {Object.entries(liquidateInfoDisplay).map(([key, value]) => {
        return (
          <Block key={key} padding={[theme.sizes.padding, 0]} flex={false}>
            <Typography gray body>
              {value}
            </Typography>
            <Typography bold body gray={!event.liquidateInfo[key]}>
              {typeof event.liquidateInfo[key] === 'string' &&
                (event.liquidateInfo[key] || TextPackage.UNKNOWN)}
              {typeof event.liquidateInfo[key] === 'number' &&
                key === 'price' &&
                event.liquidateInfo[key].currencyFormat()}
            </Typography>
          </Block>
        );
      })}
    </Block>
  );
};

LiquidateInfo.navigationOptions = () => ({
  title: TextPackage.LIQUIDATE_INFO
});

export default LiquidateInfo;
