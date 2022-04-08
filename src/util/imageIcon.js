import React from 'react'
import { mainCourse, fries, soup, breakFast, dessert, salad, united,japan,india,mexico,thailand,china,italy } from "../images/icons/icon";

const Components  = {
  Breakfast: breakFast,
  MainCourse: mainCourse,
  Appetizer:fries,
  Soup:soup,
  Dessert:dessert,
  Salad:salad,
  American:united,
  Japanese:japan,
  Thai:thailand,
  Chinese:china,
  Mexican:mexico,
  Italian:italy,
  Indian:india
}
  
const ImageData = (props) => {
  const data = props.iconData;
  if (typeof Components[data.image] !== "undefined") {
    return React.createElement(Components[data.image], {
      className: data.style,
      fill: data.imageColor,
      stroke: data.strokeColor,
    });
  }
  return React.createElement(() => <div></div>);
};

  export default ImageData;