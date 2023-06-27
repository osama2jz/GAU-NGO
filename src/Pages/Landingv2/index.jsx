import React, { useEffect, useState } from "react";
import Home from "./Home";
import About from "./About";
import { Box } from "@mantine/core";
import Services from "./Services";
import Header from "../../components/LandingHeaderv2";
import { useDisclosure } from "@mantine/hooks";
import Download from "./Download";
import AppReviews from "./AppReviews";
import Footer from "../../components/Footer";
import AppScreenshots from "./AppScreenshots";
import { ArrowNarrowUp } from "tabler-icons-react";
import { useStyles } from "./styles";
import Donations from "./Donations";

const Landing = () => {
  const { classes } = useStyles();
  const [isVisible, setIsVisible] = useState(false);
  const [opened, { toggle }] = useDisclosure(false);
  const scrollToDiv = (target) => {
    var targetElement = document.getElementById(target);
    targetElement.scrollIntoView({ behavior: "smooth" });
  };

  //   const scrolled = document.documentElement.scrollTop;
  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box>
      <Header opened={opened} toggle={toggle} onClick={scrollToDiv} />
      <ArrowNarrowUp
        style={{ display: isVisible ? "flex" : "none" }}
        className={classes.goToTop}
        size={"50px"}
        onClick={scrollToTop}
      />
      <div id="home">
        <Home />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="download">
        <Download />
      </div>
      <div id="reviews">
        <AppReviews />
      </div>
      <div id="donate">
        <Donations />
      </div>
      <div id="ss">
        <AppScreenshots />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </Box>
  );
};
export default Landing;
