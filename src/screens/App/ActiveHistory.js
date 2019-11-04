import React from 'react';

import { Typography } from 'src/components';
import { theme, localization } from 'src/constants';
import AppData from 'src/AppData';

const TextPackage = localization[AppData.language];

const ActiveHistory = props => {
  return <Typography>null</Typography>;
};

ActiveHistory.navigationOptions = () => ({
  title: TextPackage.ACTIVE_HISTORY
});

export default ActiveHistory;
