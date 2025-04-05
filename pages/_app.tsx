/* eslint-disable import/no-extraneous-dependencies */
import EventListeners from "@/components/EventListener/EventListener";
import { PlayMusic } from "@/components/MusicPlayer/PlayMusic";
import { useAppSelector } from "@/hooks/redux/useAppSelector";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import { store } from "@/reduxtoolkit/store/store";
import "@/styles/global.scss";
import createEmotionCache from "@/themes/createEmotionCache";
import MuiThemeProvider from "@/themes/MuiThemeProvider";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppContext, AppProps } from "next/app";
import App from "next/app";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

/**
 * It suppresses the useLayoutEffect warning when running in SSR mode
 */
function fixSSRLayout() {
  // suppress useLayoutEffect (and its warnings) when not running in a browser
  // hence when running in SSR mode
  if (!checkWindow()) {
    React.useLayoutEffect = () => {
      // console.log("layout effect")
    };
  }
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0
    }
  }
});

export interface CustomAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function GlobalAudioPlayer() {
  const { playlist } = useAppSelector((s) => s.audio);

  return <>{playlist.length > 0 && <PlayMusic />}</>;
}

const clientSideEmotionCache = createEmotionCache();
export default function CustomApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}: CustomAppProps) {
  fixSSRLayout();

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={emotionCache}>
          <MuiThemeProvider>
            <CssBaseline />
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={8}
              containerClassName=""
              containerStyle={{}}
              toastOptions={{
                duration: 2000
              }}
            />

            <EventListeners />
            <Component {...pageProps} />
            <GlobalAudioPlayer />
          </MuiThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}

/* Getting the current user from the server and passing it to the client. */
CustomApp.getInitialProps = async (context: AppContext) => {
  // // const client = initializeApollo({ headers: context.ctx.req?.headers });

  // // resetServerContext();
  const appProps = await App.getInitialProps(context);

  // return { user: data?.authenticatedItem, ...appProps };

  return { ...appProps };
};
