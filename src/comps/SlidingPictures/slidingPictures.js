import { Carousel } from 'antd';
import React from 'react';
import img1 from "../../assets/sliding/img1.jpeg";
import img2 from "../../assets/sliding/img2.jpeg";
import img3 from "../../assets/sliding/img3.jpeg";
import img4 from "../../assets/sliding/img4.jpeg";
import img5 from "../../assets/sliding/img5.jpeg";
import img6 from "../../assets/sliding/img6.jpeg";
import "./slidingPictures.css";

const contentStyle = {
    textAlign: 'center',
    borderRadius: "20px",
    border: "1px solid #aba180",
    width: "100%",
};

function SlidingPictures() {
    return (
        <div>
            <Carousel autoplay dots={false}>
                <div>
                    <img alt="meal  1" src={img1} style={contentStyle} />
                </div>
                <div>
                    <img alt="meal  2" src={img2} style={contentStyle} />
                </div>
                <div>
                    <img alt="meal  3" src={img3} style={contentStyle} />
                </div>
                <div>
                    <img alt="meal  4" src={img4} style={contentStyle} />
                </div>
                <div>
                    <img alt="meal  5" src={img5} style={contentStyle} />
                </div>
                <div>
                    <img alt="meal  6" src={img6} style={contentStyle} />
                </div>
            </Carousel>
        </div>
    )
}

export default SlidingPictures