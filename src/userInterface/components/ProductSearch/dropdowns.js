import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DropDownBox from './DropDownBox';
import SortDropDownBox from './SortDropDownBox';
import AllFilter from './AllFilter';

export default function DropDowns() {
  const [openBox, setOpenBox] = useState(null)
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.down('lg'));
  var categoryData = [" Android Phones", "I phones", "Mac Book", "Windows Laptop"]
  var brandData = ["Samsung", "OnePlus", "Vivo", "Realme", "Oppo", "Nothing", "Google", "Apple", "Xiaomi", "Dell", "HP", "Apple", "Asus"]
  var priceData = ["₹5,000 - ₹10,000", "₹10,001 - ₹15,000", "₹15,001 - ₹20,000", "₹20,001 - ₹30,000", "₹30,001 - ₹40,000", "₹40,001 - ₹50,000", "₹50,001 - ₹75,000", "₹75,001 - ₹1,00,000", "₹1,00,000 and above"]
  var storageData = ["8GB", "16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB"]
  var deliveryData = ["Home Delevery", "Take In"]
  var sortData = ["Lattest Arrival", "Discount(Descending)", "Featured", "Price(Highest First)", "Top Rated", "Price(Lowest First)"]

  return (

    <div style={{ height: '90px', paddingBottom: 20, width: large ? '95%' : "1135px", gap: 20, background: 'red', flexDirection: 'column', display: 'flex', justifyContent: 'space-between', background: '#191919', padding: '10px' }}>
      <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', width: large ? '100%' : '1135px', justifyContent: large ? '' : 'space-between' }}>
        <div style={{ gap: 20, display: 'flex' }}>
          <DropDownBox title={"Category"} data={categoryData} isOpen={openBox == "Category"} onOpen={(state) => setOpenBox(state)} />
          <DropDownBox title={"Brands"} data={brandData} isOpen={openBox == "Brands"} onOpen={(state) => setOpenBox(state)} />
          <DropDownBox title={"Price Range"} data={priceData} isOpen={openBox == "Price Range"} onOpen={(state) => setOpenBox(state)} />
          <DropDownBox title={"Storage"} data={storageData} isOpen={openBox == "Storage"} onOpen={(state) => setOpenBox(state)} />
          <DropDownBox title={"Delivery Type"} data={deliveryData} isOpen={openBox == "Delivery Type"} onOpen={(state) => setOpenBox(state)} />
          <AllFilter onOpen={(state) => setOpenBox(state)} />
        </div>
        <div>
          <SortDropDownBox title={"Sort By"} data={sortData} onOpen={(state) => setOpenBox(state)} />
        </div>

      </div>

    </div>
  )

}