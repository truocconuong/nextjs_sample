import { AppProps } from 'next/app';
import React from 'react';
import "../styles/antd.less";
import '../styles/index.scss';
const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    </>
);

export default App;
