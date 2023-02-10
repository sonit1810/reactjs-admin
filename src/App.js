import React from 'react';
import {Helmet} from "react-helmet";
import PublicRoutes from './Router';
import Boot from './redux/boot';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { store, history } from './redux/store';
import { getCurrentLanguage } from "./helpers/Ultis";
import siteConfig from "./configs/siteConfig";
import AppLocale from "./languageProvider";
import './assets/css/app.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ConfigProvider } from "antd";

const currentAppLocale = AppLocale[getCurrentLanguage(siteConfig.language.default || "vietnam").locale];

class App extends React.Component {
    render() {
        return (
            <ConfigProvider locale={currentAppLocale.antd}>
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}
                >
                <Provider store={store}>
                  <Helmet>
                    <meta charSet="utf-8" />
                    <title>{siteConfig.title}</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                  </Helmet>
                    <PublicRoutes history={history} />
                </Provider>
                </IntlProvider>
            </ConfigProvider>
        )
    }
}

Boot()
    .then(() => App())
    .catch(error => console.error(error));

export default App;
