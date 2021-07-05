import { AppProps } from "next/app";
import React from "react";
import "antd/dist/antd.css";
import "../styles/index.scss";
import { useRouter } from "next/dist/client/router";
import { Provider } from "react-redux";
import store from "../redux/store";
import NavigationBar from "generals/NavigationBar";
const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  return (
    <Provider store={store}>
      <React.Fragment>
        <NavigationBar />
        <Component {...pageProps} key={router?.route} />
      </React.Fragment>
    </Provider>
  );
};

export default App;
