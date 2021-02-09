import React from 'react';

// components
import BlockSong from 'components/blockSong/BlockSong.component';

// antd css
import 'antd/dist/antd.css';

// react slick css
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// styles scss
import styles from './slide-show.module.scss';

function SlideShow() {

  const settings = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: false,
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
        <BlockSong />
      </div>
      <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
        <BlockSong />
      </div>
      <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
        <BlockSong />
      </div>
      <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
        <BlockSong />
      </div>
      <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
        <BlockSong />
      </div>
      <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
        <BlockSong />
      </div>
      <div className={[styles.padding_left_10, styles.padding_right_10].join(' ')}>
        <BlockSong />
      </div>
    </Slider>
  );
}

export default SlideShow;
