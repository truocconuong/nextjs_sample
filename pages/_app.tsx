import { AppProps } from 'next/app';
import React from 'react';
import 'antd/dist/antd.css';
import '../styles/index.scss';
import { NextRouter, useRouter } from 'next/dist/client/router';
import { Provider } from 'react-redux';
import store, { persistor } from '../redux/store';
import NavigationBar from 'generals/NavigationBar';
import SizeBrowser from 'generals/SizeBrowser';
import { PersistGate } from 'redux-persist/integration/react';
const App = ({ Component, pageProps }: AppProps) => {
    const router: NextRouter = useRouter();
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <React.Fragment>
                    {(router?.pathname === '/start-your-will' ||
                        router?.pathname === '/start-your-will-upload' ||
                        router?.pathname === '/personal-information' ||
                        router?.pathname === '/personal-executor' ||
                        router?.pathname === '/personal-beneficiary' ||
                        router?.pathname ===
                            '/personal-estates-listing/property' ||
                        router?.pathname ===
                            '/personal-estates-listing/bank-account' ||
                        router?.pathname ===
                            '/personal-estates-listing/investment' ||
                        router?.pathname ===
                            '/personal-estates-listing/business-interest' ||
                        router?.pathname ===
                            '/personal-estates-listing/valuables' ||
                        router?.pathname ===
                            '/personal-estates-listing/insurance-policy' ||
                        router?.pathname === '/allocation' ||
                        router?.pathname === '/complete' ||
                        router?.pathname === '/payment-summary' ||
                        router?.pathname === '/lodge-will') && (
                        <NavigationBar />
                    )}
                    <Component {...pageProps} key={router?.route} />
                    <SizeBrowser />
                </React.Fragment>
            </PersistGate>
        </Provider>
    );
};

export default App;
