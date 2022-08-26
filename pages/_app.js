import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { AppWrapper } from "../Context";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </>
  );
}

export default MyApp;
