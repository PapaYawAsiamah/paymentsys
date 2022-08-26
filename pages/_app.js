import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { AppWrapper } from "../context";

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
