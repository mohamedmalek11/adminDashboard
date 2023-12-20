import router from "next/router";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    if (router.route === "/") {
      router.replace("/home");
    }
  }, []);
  return <>Home Page</>;
};

export default Home;
