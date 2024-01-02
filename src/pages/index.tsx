import router from "next/router";
import { useEffect } from "react";
import FallbackSpinner from "src/@core/components/spinner";

const Home = () => {
  useEffect(() => {
    if (router.route === "/") {
      router.replace("/tenants");
    }
  }, []);
  return <FallbackSpinner />;
};

export default Home;
