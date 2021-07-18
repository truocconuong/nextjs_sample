import { AppProps } from "next/app";
import React from "react";
import "antd/dist/antd.css";
import "../styles/index.scss";
import { NextRouter, useRouter } from "next/dist/client/router";
import { Provider } from "react-redux";
import store from "../redux/store";
import NavigationBar from "generals/NavigationBar";
import SizeBrowser from "generals/SizeBrowser";
const App = ({ Component, pageProps }: AppProps) => {
  const router: NextRouter = useRouter();
  return (
    <Provider store={store}>
      <React.Fragment>
        {(router?.pathname === "/start-your-will" ||
          router?.pathname === "/start-your-will-upload" ||
          router?.pathname === "/personal-information" ||
          router?.pathname === "/personal-executor" ||
          router?.pathname === "/personal-beneficiary" ||
          router?.pathname === "/personal-estates-listing/property" ||
          router?.pathname === "/personal-estates-listing/bank-account" ||
          router?.pathname === "/personal-estates-listing/investment" ||
          router?.pathname === "/personal-estates-listing/business-interest" ||
          router?.pathname === "/personal-estates-listing/valuables" ||
          router?.pathname === "/personal-estates-listing/insurance-policy"
          ) && <NavigationBar />}
        <Component {...pageProps} key={router?.route} />
        <SizeBrowser />
      </React.Fragment>
    </Provider>
  );
};

export default App;
