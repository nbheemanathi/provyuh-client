import React from 'react'
import { mainCourse, fries, soup, breakFast, dessert, salad,calories } from "../images/icons/icon";

const Components  = {
  BreakFast: breakFast,
  MainCourse: mainCourse,
  Fries:fries,
  Soup:soup,
  Dessert:dessert,
  Salad:salad,
}
  export default ImageData = () => {
    if (typeof Components[ImageData.image] !== "undefined") {
      return React.createElement(Components[ImageData.image], {
        key: ImageData._id,
        width:"40px",
        height:"40px",
        fill:ImageData.imageColor
      });
    }
    return React.createElement(
      () => <div></div>,
      { key: ImageData._id }
    );
  };