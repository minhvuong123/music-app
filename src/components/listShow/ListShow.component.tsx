import React from 'react';


// ant component
import {
  RightOutlined,
  LeftOutlined
} from '@ant-design/icons';

// antd css
import 'antd/dist/antd.css';

import './list-show-reset.scss';

// react slick css
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function ListShow({ children, responsive, title }: any) {

  function NextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, fontSize: 20, color: '#fff'}} onClick={onClick}>
          <RightOutlined /></div>
    );
  }
  
  function PrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, fontSize: 20, color: '#fff'}} onClick={onClick}>
        <LeftOutlined />
      </div>
    );
  }

  const settings = {
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    infinite: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: responsive
  };
  return (
    <>
      <h3 style={{fontSize: 18, color: '#fff'}}>{ title }</h3>
      <Slider {...settings}>
        { children.props.children }
      </Slider>
    </>
  );
}

export default ListShow;
