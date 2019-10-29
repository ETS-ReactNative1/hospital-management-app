import * as localization from './localization';
import AppData from 'src/AppData';

const TextPackage = localization[AppData.language];

const categories = [
  {
    id: 1,
    name: TextPackage.SWITCH_DEVICE,
    description: TextPackage.SWITCH_DEVICE_DESC,
    icon: 'power-settings-new'
  },
  {
    id: 2,
    name: TextPackage.SEARCH_DEVICE,
    description: TextPackage.SEARCH_DEVICE_DESC,
    icon: 'search'
  },
  {
    id: 3,
    name: TextPackage.MAINTAIN_DEVICE,
    description: TextPackage.MAINTAIN_DEVICE_DESC,
    icon: 'build'
  },
  {
    id: 4,
    name: TextPackage.LIQUIDATE_DEVICE,
    description: TextPackage.LIQUIDATE_DEVICE_DESC,
    icon: 'attach-money'
  },
  {
    id: 5,
    name: TextPackage.ACCOUNT_DEVICE,
    description: TextPackage.ACCOUNT_DEVICE_DESC,
    icon: 'assignment'
  }
];

export { categories };
