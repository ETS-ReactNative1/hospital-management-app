import React from 'react';

import { Typography } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';

const TextPackage = localization[AppData.language];

const MaintainHistory = props => {
  return <Typography>null</Typography>;
};

MaintainHistory.navigationOptions = () => ({
  title: TextPackage.MAINTAINING_HISTORY
});

export default MaintainHistory;
