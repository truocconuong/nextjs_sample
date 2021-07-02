import { AppProps } from 'next/app';
import React from 'react';
import "../styles/antd.less";
import GlobalBaseStyle from '../styles/GlobalStyle';
import '../styles/index.scss'
const App = ({ Component, pageProps }: AppProps) => (
  <>
    <GlobalBaseStyle />
    <Component {...pageProps} />
    </>
);

export default App;
