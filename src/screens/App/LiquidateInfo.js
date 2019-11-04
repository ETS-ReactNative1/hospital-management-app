import React from 'react';

import { Typography } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';

const TextPackage = localization[AppData.language];

const LiquidateInfo = props => {
  return <Typography>null</Typography>;
};

LiquidateInfo.navigationOptions = () => ({
  title: TextPackage.LIQUIDATE_INFO
});

export default LiquidateInfo;
