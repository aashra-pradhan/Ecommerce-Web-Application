import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css"; // Make sure to import the styles
// import banner1 from "../assets/banner1.png";
// import banner2 from "../assets/banner2.jpeg";
// import banner3 from "../assets/banner3.jpg";

const BannerCarousel = ({ banner1, banner2, banner3, images }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  //   breakpoint: This property defines the range of screen sizes at which this configuration should apply. It specifies a range between a minimum and maximum screen width. In this case:

  // max: The maximum screen width where this configuration applies is 3000 pixels.
  // min: The minimum screen width where this configuration applies is 1024 pixels.
  // This means that the configuration within this block will be applied when the screen width is between 1024px and 3000px, which typically represents a desktop-sized screen.

  // items: This property specifies the number of items to be displayed simultaneously in the carousel. In this case, it's set to 3, meaning three items will be visible simultaneously on the carousel.

  // slidesToSlide: This property defines how many items should move when the carousel slides to the next or previous set of items. In this case, it's set to 3, which means when the carousel slides, it will move three items at a time. This property essentially controls the sliding behavior of the carousel.
  //
  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={3000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={1000}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {/* swipeable: This property determines whether users can swipe to navigate the carousel. When set to false, users won't be able to swipe to navigate.

draggable: Similar to swipeable, this property determines whether users can drag the carousel to navigate. When set to false, users won't be able to drag the carousel.

showDots: When set to true, it displays navigation dots at the bottom of the carousel, indicating the current slide.

responsive: This property specifies the responsive configuration object we defined earlier. It determines how many items are visible at once and how many items should move on slide transition for different screen sizes.

ssr: Stands for "Server Side Rendering". When set to true, it ensures that the carousel renders correctly on the server side before sending HTML to the client. Useful for server-rendered React applications.

infinite: When set to true, it enables infinite looping of the carousel. After reaching the last slide, it loops back to the first slide.

autoPlay: Determines whether the carousel should automatically play slides. In this case, it's conditionally set based on the props.deviceType. If the device is not a mobile device, auto-play is enabled.

autoPlaySpeed: Specifies the duration (in milliseconds) between each auto-play transition.

keyBoardControl: Enables keyboard navigation for the carousel. Users can use keyboard arrow keys to navigate between slides.

customTransition: Specifies the CSS transition property for slide transitions. In this case, it's set to "all .5", which means all properties will transition with a duration of 0.5s.

transitionDuration: Specifies the duration (in milliseconds) of slide transitions.

containerClass: Defines the class name to be applied to the carousel container. You can use this to style the container.

removeArrowOnDeviceType: An array specifying device types for which the arrow navigation should be removed. In this case, arrow navigation is removed for "tablet" and "mobile" devices.

deviceType: Passes the device type as a prop to the carousel. This is used to determine the device type within the carousel for conditional rendering or configuration.

dotListClass: Defines the class name to be applied to the navigation dots.

itemClass: Defines the class name to be applied to each carousel item. You can use this to style individual items in the carousel.

Finally, within the Carousel component, there are <div> elements representing the slides/items in the carousel. The first slide contains an <img> element displaying the banner1 image, followed by three placeholder items labeled "Item 2", "Item 3", and "Item 4". These represent the content of the carousel slides. */}
      {/* {images.map((img) => { */}
      {/* return ( */}
      <img
        className="w-full object-cover h-[500px]"
        // src={img.url}
        src="https://source.unsplash.com/1519x500/?cosmetics,makeup"
      />
      <img
        className="w-full object-cover h-[500px]"
        // src={img.url}
        src="https://source.unsplash.com/1519x500/?music,clothes"
      />
      <img
        className="w-full object-cover h-[500px]"
        // src={img.url}
        src="https://source.unsplash.com/1519x500/?fastfood,shops"
      />
      <img
        className="w-full object-cover h-[500px]"
        // src={img.url}
        src="https://source.unsplash.com/1519x500/?wine,alcohol"
      />
      {/* ); */}
      {/* })} */}
    </Carousel>
  );
};

export default BannerCarousel;
