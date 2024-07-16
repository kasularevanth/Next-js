import store from "@/app/store/index";
import { AppProps } from "../../../../node_modules/next/app";

import { Provider } from 'react-redux';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
