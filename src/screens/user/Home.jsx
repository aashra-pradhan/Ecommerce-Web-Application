import React from "react";
import Navbar from "../../components/Navbar";

const Home = () => {
  const accesstoken = localStorage.getItem("access_token");

  return (
    <>
      <>
        {accesstoken ? (
          <Navbar isLoggedIn={true} />
        ) : (
          <Navbar isLoggedIn={false} />
        )}
      </>
      ;
    </>
  );
};

export default Home;
