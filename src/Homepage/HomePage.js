import React, { useState, useEffect } from 'react';
import TypingHeader from '../component/Header';
import Banner from './Banner';
import AfterBanner from './AfterBanner';
import MainFooter from '../Footermain/Footer';
import HomePageDescription from './HomePageDescription';
import BrowseExam from './BrowseExam';
const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <TypingHeader />
      <Banner />
      <AfterBanner />
      <HomePageDescription/>
      <BrowseExam/>
      <MainFooter/>
     
    </>
  );
};

export default HomePage;
