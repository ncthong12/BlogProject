import React from "react";
import "./category.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

const PublicFlo = "http://localhost:5000/";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <MdNavigateNext className="icon" />
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <GrFormPrevious className="icon" />
      </button>
    </div>
  );
};
export const Category = ({ cats }) => {
  const settings = {
    useTransform: false,
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <section className="category">
        <div className="content">
          <Slider {...settings}>
            {cats.map((item) => (
              // <div className="boxs">
                <div className="box" key={item.id}>
                  <img src={PublicFlo + item.cover} alt="cover" />
                  <div className="overlay">
                    {/* TODO
                    item.name
                    */}
                    <Link to={`/?cat=${item.category}`} className="link">
                      <h4>{item.category}</h4>
                    </Link>
                    <p>{item.title}</p>
                  </div>
                </div>
              // </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};
