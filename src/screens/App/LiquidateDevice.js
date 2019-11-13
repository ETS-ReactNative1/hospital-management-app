import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { GradientButton, Block, Typography, Input } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';
import { DEVICE_INFO } from 'src/utils/graphqlQueries';
import { CREATE_EVENT } from 'src/utils/graphqlMutations';
import { useQuery, useMutation } from 'react-apollo';

const TextPackage = localization[AppData.language];

const displayData = {
  name: 'LIQUIDATE_COMPANY',
  address: 'ADDRESS',
  phone: 'PHONE',
  price: 'LIQUIDATE_PRICE',
  note: 'NOTE'
};

const LiquidateDevice = props => {
  const { navigation } = props;
  const { deviceId } = navigation.state.params;
  const [createEvent] = useMutation(CREATE_EVENT);

  const { loading, error, refetch } = useQuery(DEVICE_INFO, {
    variables: {
      id: deviceId
    }
  });

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
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
        {Object.entries(displayData).map(([key, title]) => {
          return <Input key={key} name={key} label={TextPackage[title]} style={styles.input} />;
        })}
      </Block>
      <Block padding={[theme.sizes.base, theme.sizes.base * 2]} style={styles.actionButton}>
        <GradientButton gradient startColor={theme.colors.redDark} endColor={theme.colors.redLight}>
          <Typography title bold white center>
            {TextPackage.LIQUIDATE}
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

LiquidateDevice.navigationOptions = () => ({
  title: TextPackage.LIQUIDATE_DEVICE
});

export default LiquidateDevice;
