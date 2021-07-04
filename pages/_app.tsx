import { AppProps } from 'next/app';
import React from 'react';
import 'antd/dist/antd.css';
import '../styles/index.scss';
const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Component {...pageProps} />
    </>
);

export default App;
