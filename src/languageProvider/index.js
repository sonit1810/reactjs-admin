import Enlang from './entries/en-US';
import Jplang from './entries/ja-JP';
import Vnlang from './entries/vi-VN';
import { addLocaleData } from 'react-intl';

const AppLocale = {
  en: Enlang,
  jp: Jplang,
  vi: Vnlang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.jp.data);
addLocaleData(AppLocale.vi.data);

export default AppLocale;
