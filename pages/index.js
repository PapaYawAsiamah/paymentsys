import Head from "next/head";
import Members from "./Members";
import  Login from "./login";

const Home = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="School System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <Login/>
    </>
  );
};

export default Home;