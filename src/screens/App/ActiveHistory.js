import React from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from 'react-apollo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Typography, Block, Card, Badge } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';
import { ACTIVE_EVENTS_BY_DEVICE } from 'src/utils/graphqlQueries';

const TextPackage = localization[AppData.language];

const ActiveHistory = ({ navigation }) => {
  const { deviceId } = navigation.state.params;
  const { data, loading, error } = useQuery(ACTIVE_EVENTS_BY_DEVICE, {
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

  const { activeEventsByDevice: events } = data;

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
          <Card key={event.id} center middle shadow row fullWidth style={styles.card}>
            <Badge
              size={56}
              color={event.actionType ? 'rgba(41,216,143,0.20)' : 'rgba(243,83,74,0.2)'}
            >
              <Icon
                name={event.actionType ? 'power-plug' : 'power-plug-off'}
                size={36}
                color={event.actionType ? theme.colors.green : theme.colors.redDark}
              />
            </Badge>
            <Block padding={[0, theme.sizes.base]}>
              <Typography bold body>
                {`${event.creator.lastName} ${event.creator.firstName}`}
              </Typography>
              <Typography gray caption>
                {`${TextPackage.CREATED_AT}: ${event.createdAt.toLocaleDateTimeString()}`}
              </Typography>
              {!event.actionType && (
                <Typography gray caption>
                  {`${TextPackage.USED_TIME}: ${event.usedInterval.milliSecToDuration()}`}
                </Typography>
              )}
            </Block>
          </Card>
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
  card: {
    padding: theme.sizes.base
  },
  EOLPadding: {
    paddingVertical: theme.sizes.base
  }
});

ActiveHistory.navigationOptions = () => ({
  title: TextPackage.ACTIVE_HISTORY
});

export default ActiveHistory;
