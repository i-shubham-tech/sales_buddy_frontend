import React, { useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import { getData, postData } from '../../backendservices/FetchNodeServices';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CachedIcon from '@mui/icons-material/Cached';
import { LoaderCircle } from "lucide-react"

// Components
import MainSlider from '../components/MainSlider/Mainslider';
import BrandSlider from '../components/BrandScoller/BrandSlider';
import Scroller from '../components/ProductScroller/Scroller';
import ShowAdvertisment from '../components/Advertisement/ShowAdvertisment';
import ShowMultipleAds from '../components/Advertisement/ShowMultipleAds';
import CategoryCard from '../components/CategoryCard';
import FourAds from '../components/Advertisement/FourAds';
import { useSelector } from 'react-redux';

export default function Home() {
  const user = useSelector((state) => state.user)
  console.log("X", Boolean(user?.userid))
  // Media query for responsive design
  // const laptop = useMediaQuery('(max-width:1200px)');

  // State management for different data lists
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState([]);
  const [banner, setBanner] = useState([]);
  const [singleImageAds, setSingleImageAds] = useState([])
  const [towImageAds, setTwoImageAds] = useState([])
  const [brandList, setBrandList] = useState([])
  const [latestLunchesProduct, setLatestLunchesProduct] = useState([])
  const [monsoonSpecialDeals, setMonsoonSpecialDeals] = useState([])

  const fetch_banner = async () => {
    const response = await getData("userInterface/userinterface_fetch_banner")
    if (response?.status) {
      setBanner(response.data)
    }
    else {
      alert("There is Error")
    }
  }

  const fetchCategory = async () => {
    const response = await getData("userInterface/userinterface_fetch_category")
    if (response?.status) {
      setCategory(response.data)
    }
    else {
      alert("There is Error")
    }
  }

  // Function to fetch Single image ad list from API
  const fetchAds = async () => {
    const response = await postData("userInterface/userinterface_fetch_ads", { imageNumber: 1 })
    if (response?.status) {
      setSingleImageAds(response.data)
    }
  }

  const fetchtwoAds = async () => {
    const response = await postData("userInterface/userinterface_fetch_ads", { imageNumber: 2 })
    if (response?.status) {
      setTwoImageAds(response.data)
    }
  }
  // Function to fetch brand list from API
  const fetchBrandList = async () => {
    const response = await getData("userinterface/userinterface_fetch_brands")
    if (response.status) {
      setBrandList(response.data)
    } else {
      alert("not fetched")
    }
  }

  // Function to fetch products based on their status
  const fetchProductByStatus = async (status) => {
    const response = await postData("userinterface/userinterface_fetch_productdetail_by_status", { status })
    if (response.status) {
      switch (status) {
        case "latest launches":
          setLatestLunchesProduct(response.data)
          break;
        case "Monsoon Special Deals":
          setMonsoonSpecialDeals(response.data)
          break;
      }
    } else {
      alert("not fetched")
    }
  }



  // Initial data fetching on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          fetch_banner(),
          fetchCategory(),
          fetchAds(),
          fetchtwoAds(),
          fetchBrandList(),
          fetchProductByStatus("latest launches"),
          fetchProductByStatus("Monsoon Special Deals")
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
     window.scrollTo(0, 0)
  }, [])


  return (
    <div>
      {/* Main slider and login container */}
      <div style={{ width: "100%", boxSizing: "border-box" }}>
        <MainSlider data={banner} />
      </div>

      {/* Main content container with all product sections */}
      <div style={{
        maxWidth: "1300px",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        color: "white",
        marginTop: 10,
        boxSizing: "border-box",
        marginBottom: 10
      }}>
        {/* Category section */}
        <CategoryCard data={category} />

        {/*Single Image Advertisement  sections */}
        <ShowAdvertisment data={singleImageAds[0]} />

        {/* Deals section */}
        <Scroller title={"Monsoon Special Deals"} data={monsoonSpecialDeals} />

        {/* Multiple advertisement sections */}
        <ShowMultipleAds data={towImageAds[0]} />

        {/* Latest products section */}
        <Scroller title={"Latest Lunches"} data={latestLunchesProduct} />

        {/*Single Image Advertisement  sections */}
        <ShowAdvertisment data={singleImageAds[1]} />

        {/* Additional advertisement sections */}
        <FourAds />

        {/* Brand showcase section */}
        <BrandSlider data={brandList} />
      </div>
    </div>
  )
}
