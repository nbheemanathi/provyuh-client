import React from 'react'
import { mainCourse, fries, soup, breakFast, dessert, salad } from "../images/icons/icon";

const Components  = {
  BreakFast: breakFast,
  MainCourse: mainCourse,
  Fries:fries,
  Soup:soup,
  Dessert:dessert,
  Salad:salad,
}
  const ImageData = (props) => {
    const data = props.iconData;
    if (typeof Components[data.image] !== "undefined") {
      return React.createElement(Components[data.image], {
        key: data._id,
        width:"40px",
        height:"40px",
        fill:data.imageColor
      });
    }
    return React.createElement(
      () => <div></div>,
      { key: data._id }
    );
  };

  export default ImageData;