import React from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from 'react-apollo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Typography, Block, Card, Badge, ExpansionPanel } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';
import { MAINTAIN_EVENTS_BY_DEVICE } from 'src/utils/graphqlQueries';

const TextPackage = localization[AppData.language];

const maintainInfoDisplay = {
  name: TextPackage.MAINTAIN_COMPANY,
  address: TextPackage.ADDRESS,
  phone: TextPackage.PHONE,
  cost: [TextPackage.MAINTAIN_COST, TextPackage.MAINTAIN_COST_EXPECT],
  note: TextPackage.NOTE
};

const MaintainHistory = ({ navigation }) => {
  const { deviceId } = navigation.state.params;
  const { data, loading, error } = useQuery(MAINTAIN_EVENTS_BY_DEVICE, {
    variables: { deviceId }
  });

  if (loading) {
    return (
      <Block middle center>
        <ActivityIndicator />
      </Block>
    );
  }

  if (error) {
    return (
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <Typography bold title height={theme.sizes.title * 2}>
          {TextPackage.DEVICE_INFO}
        </Typography>
        <Typography bold title height={theme.sizes.title * 2}>
          {error}
        </Typography>
      </Block>
    );
  }

  const { maintainEventsByDevice: events } = data;

  if (events.length === 0) {
    return (
      <Block middle center>
        <Image style={styles.image} source={require('src/assets/images/no_data.jpg')} />
        <Block center padding={[0, theme.sizes.base * 5]}>
          <Typography bold title uppercase>
            {TextPackage.NO_DATA}
          </Typography>
          <Typography center gray>
            {TextPackage.NO_DATA_MESSAGE}
          </Typography>
        </Block>
      </Block>
    );
  }

  return (
    <ScrollView>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        {events.reverse().map(event => (
          <ExpansionPanel
            key={event.id}
            title={
              <Block row center>
                <Badge size={56} color="rgba(255,238,88,0.20)">
                  <Icon name="wrench-outline" size={36} color={theme.colors.yellowDark} />
                </Badge>
                <Block padding={[0, theme.sizes.base]}>
                  <Typography bold body>
                    {`${event.creator.lastName} ${event.creator.firstName}`}
                  </Typography>
                  <Block flex={false} row center>
                    <Typography caption>{`${TextPackage.CREATED_AT}: `}</Typography>
                    <Typography gray caption>
                      {event.createdAt.toLocaleDateTimeString()}
                    </Typography>
                  </Block>
                </Block>
              </Block>
            }
          >
            <Block>
              <Typography bold>
                {event.finished ? TextPackage.MAINTAIN_DONE : TextPackage.MAINTAIN_UNDONE}
              </Typography>
              {event.finished && (
                <Block>
                  <Block key="receiver" flex={false} row>
                    <Typography caption>{`${TextPackage.RECEIVER}: `}</Typography>
                    <Typography gray caption>
                      {`${event.receiver.lastName} ${event.receiver.firstName}`}
                    </Typography>
                  </Block>
                  <Block key="maintainInterval" flex={false} row>
                    <Typography caption>{`${TextPackage.MAINTAIN_INTERVAL}: `}</Typography>
                    <Typography gray caption>
                      {event.maintainInterval.milliSecToDuration()}
                    </Typography>
                  </Block>
                </Block>
              )}
              {Object.entries(maintainInfoDisplay).map(([key, value]) => {
                return (
                  <Block key={key} flex={false} row>
                    {key !== 'cost' && <Typography caption>{`${value}: `}</Typography>}
                    {key === 'cost' && (
                      <Typography caption>{`${event.finished ? value[0] : value[1]}: `}</Typography>
                    )}
                    <Typography gray caption>
                      {typeof event.maintainInfo[key] === 'string' &&
                        (event.maintainInfo[key] || TextPackage.UNKNOWN)}
                      {typeof event.maintainInfo[key] === 'number' &&
                        key === 'cost' &&
                        event.maintainInfo[key].currencyFormat()}
                    </Typography>
                  </Block>
                );
              })}
            </Block>
          </ExpansionPanel>
        ))}
        <Typography title gray center style={styles.EOLPadding}>
          {TextPackage.END_OF_LIST}
        </Typography>
      </Block>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 10
  },
  EOLPadding: {
    paddingVertical: theme.sizes.padding
  }
});

MaintainHistory.navigationOptions = () => ({
  title: TextPackage.MAINTAIN_HISTORY
});

export default MaintainHistory;
