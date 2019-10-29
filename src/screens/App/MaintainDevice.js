import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useQuery, useMutation } from 'react-apollo';

import { GradientButton, Block, Typography, Input } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';
import { LASTEST_MAINTAIN_EVENT } from 'src/utils/graphqlQueries';
import {} from 'src/utils/graphqlMutations';

const TextPackage = localization[AppData.language];

let maintainState = true;

const displayData = {
  name: 'MAINTAIN_COMPANY',
  address: 'ADDRESS',
  phone: 'PHONE',
  cost: 'MAINTAIN_COST',
  note: 'NOTE'
};

const MaintainDevice = props => {
  const { navigation } = props;
  const { deviceId } = navigation.state.params;

  const { loading, error, data } = useQuery(LASTEST_MAINTAIN_EVENT, { variables: { deviceId } });

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (data) {
    if (data.lastestMaintainEvent) {
      maintainState = data.lastestMaintainEvent.actionType;
    }
  }

  if (error) {
    return (
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <Typography bold title height={theme.sizes.title * 2}>
          Error
        </Typography>
      </Block>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]}>
        <Typography bold title height={theme.sizes.title * 2}>
          {maintainState ? TextPackage.RECORD_START_MAINTAIN : TextPackage.RECORD_END_MAINTAIN}
        </Typography>
        {Object.entries(displayData).map(([key, title]) => {
          return <Input key={key} name={key} label={TextPackage[title]} style={styles.input} />;
        })}
      </Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={styles.actionButton}>
        <GradientButton gradient startColor={theme.colors.redDark} endColor={theme.colors.redLight}>
          <Typography body bold white center>
            {TextPackage.REPORT_STATE}
          </Typography>
        </GradientButton>
        <GradientButton gradient>
          <Typography title bold white center>
            {TextPackage.UPDATE_MAINTAIN}
          </Typography>
        </GradientButton>
      </Block>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

MaintainDevice.navigationOptions = () => ({
  title: TextPackage.MAINTAIN_DEVICE,
  headerTitleStyle: {
    marginLeft: 0,
    fontSize: theme.sizes.header,
    fontWeight: 'bold'
  }
});

export default MaintainDevice;
