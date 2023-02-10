import antdJp from 'antd/lib/locale-provider/ja_JP';
import appLocaleData from 'react-intl/locale-data/ja';
import jpMessages from '../locales/ja-JP.json';

const JpLan = {
  messages: {
    ...jpMessages
  },
  antd: antdJp,
  locale: 'ja-JP',
  data: appLocaleData
};
export default JpLan;
