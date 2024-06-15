import QueueAnim from 'rc-queue-anim';
import { OverPack } from 'rc-scroll-anim';
import Texty from 'rc-texty';
import TweenOne from 'rc-tween-one';
import React, { useEffect, useState } from "react";
import courtsManagementApi from "../../apis/courtsManagementApi";
import areaManagementApi from "../../apis/areaManagementApi";

import triangleTopRight from "../../assets/icon/Triangle-Top-Right.svg";
import service10 from "../../assets/image/service/service10.png";
import service6 from "../../assets/image/service/service6.png";
import service7 from "../../assets/image/service/service7.png";
import service8 from "../../assets/image/service/service8.png";
import service9 from "../../assets/image/service/service9.png";
import "../Home/home.css";

import { RightOutlined } from '@ant-design/icons';
import { BackTop, Card, Carousel, Col, Row, Spin } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { useHistory } from 'react-router-dom';
import { numberWithCommas } from "../../utils/common";


const Home = () => {

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);


    const history = useHistory();


    const handleReadMore = (id) => {
        console.log(id);
        history.push("product-detail/" + id)
    }

    const handleCategoryDetails = (id) => {
        console.log(id);
        history.push("product-list/" + id)
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await courtsManagementApi.getAllCourts({ page: 1, limit: 10 });
                // Lọc dữ liệu có approval_status khác "pending"
                const filteredResponse = response.filter(item => item.approval_status !== "pending");
                setProductList(filteredResponse);
                setLoading(false);
            } catch (error) {
                console.log('Failed to fetch event list:' + error);
            }

            try {
                const response = await areaManagementApi.getAllAreas();
                console.log(response);
                setCategories(response);
            } catch (error) {
                console.log(error);
            }
        })();
    }, [])


    return (
        <Spin spinning={false}>

            <div style={{ background: "#FFFFFF", overflowX: "hidden", overflowY: "hidden", paddingTop: 15, }} className="home">
                <div style={{ background: "#FFFFFF" }} className="container-home container banner-promotion">
                    <Row justify="center" align="top" key="1" style={{ display: 'flex' }}>
                        <Col span={4} style={{ height: '100%' }}>
                            <ul className="menu-tree" style={{ height: '100%' }}>
                                {categories.map((category) => (
                                    <li key={category.id} onClick={() => handleCategoryDetails(category.id)} style={{ height: '100%' }}>
                                        <div className="menu-category" style={{ height: '100%' }}>
                                            {category.name}
                                            <RightOutlined />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Col>
                        <Col span={15} style={{ height: '100%' }}>
                            <Carousel autoplay className="carousel-image" style={{ height: '100%' }}>
                                <div className="img">
                                    <img style={{ width: '100%', height: 300, objectFit: 'cover' }} src="https://img.thegioithethao.vn/thumbs/san-bong-da/ha-noi/tay-ho/san-dai-phat/san-bong-dai-phat-7_thumb_720.webp" alt="" />
                                </div>
                                <div className="img">
                                    <img style={{ width: '100%', height: 300, objectFit: 'cover' }} src="https://img.thegioithethao.vn/thumbs/san-bong-da/ha-noi/tay-ho/san-dai-phat/san-bong-dai-phat-8_thumb_720.webp" alt="" />
                                </div>
                                <div className="img">
                                    <img style={{ width: '100%', height: 300, objectFit: 'cover' }} src="https://img.thegioithethao.vn/thumbs/san-bong-da/ha-noi/tay-ho/san-dai-phat/san-bong-dai-phat-3_thumb_720.webp" alt="" />
                                </div>
                                <div className="img">
                                    <img style={{ width: '100%', height: 300, objectFit: 'cover' }} src="https://img.thegioithethao.vn/thumbs/san-bong-da/ha-noi/tay-ho/san-dai-phat/san-bong-dai-phat-4_thumb_720.webp" alt="" />
                                </div>
                            </Carousel>
                            <div className="product-promotion" style={{ height: '100%' }}>
                                <div class="product-card">
                                    <div class="product-image">
                                        <img src="https://img.thegioithethao.vn/thumbs/thuong-hieu/avg-1982_thumb_150.png" alt="Sản phẩm 1" />
                                    </div>
                                    <div class="product-name">Mặt sân cao cấp</div>
                                </div>
                                <div class="product-card">
                                    <div class="product-image">
                                        <img src="https://img.thegioithethao.vn/thumbs/thuong-hieu/kamito-logo_thumb_150.png" alt="Sản phẩm 2" />
                                    </div>
                                    <div class="product-name">Hệ thống chiếu sáng tốt</div>
                                </div>
                                <div class="product-card">
                                    <div class="product-image">
                                        <img src="https://img.thegioithethao.vn/thumbs/thuong-hieu/molten-logo_thumb_150.png" alt="Sản phẩm 3" />
                                    </div>
                                    <div class="product-name">Đa dạng lịch sân</div>
                                </div>
                            </div>
                        </Col>
                        <Col span={5} style={{ height: '100%' }}>
                            <div class="right-banner image-promotion" style={{ height: '100%' }}>
                                <a href="#" class="right-banner__item">
                                    <img src="https://sanbongconhantao.com.vn/wp-content/uploads/2019/01/Co-nhan-tao-san-bong.jpg" loading="lazy" class="right-banner__img" />
                                </a>
                                <a href="#" class="right-banner__item">
                                    <img src="https://sanbongconhantao.com.vn/wp-content/uploads/2019/09/th%E1%BA%A3m-s%C3%A0n-%C4%91%C6%B0%E1%BB%9Dng-ch%E1%BA%A1y-cao-su-32-1-Copy-min.jpg" loading="lazy" class="right-banner__img" />
                                </a>
                                <a href="#" class="right-banner__item">
                                    <img src="https://sanbongconhantao.com.vn/wp-content/uploads/2019/01/Phu-kien-san-bong.jpg" loading="lazy" class="right-banner__img" />
                                </a>
                                <a href="#" class="right-banner__item">
                                    <img src="https://sanbongconhantao.com.vn/wp-content/uploads/2021/08/du-an-tieu-bieu-1024x323-1.png" loading="lazy" class="right-banner__img" />
                                </a>
                            </div>
                        </Col>
                    </Row>

                </div >

                <div className="container-home container" style={{ marginTop: 40 }}>
                    <img src="https://img.thegioithethao.vn/media/banner/banner-ban-muon-biet.png" className="promotion1"></img>
                </div>

                <div className="image-one">
                    <div className="texty-demo">
                        <Texty>Sân Mới</Texty>
                    </div>
                    <div className="texty-title">
                        <p>Trải Nghiệm <strong style={{ color: "#3b1d82" }}>Ngay</strong></p>
                    </div>

                    <div className="list-products container" key="1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gridGap: '25px' }}>
                        {productList.slice(0, 20).map((item) => (
                            <div
                                className='col-product'
                                onClick={() => handleReadMore(item.id)}
                                key={item.id}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="show-product">
                                    {item.image ? (
                                        <img
                                            className='image-product'
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    ) : (
                                        <img
                                            className='image-product'
                                            src={require('../../assets/image/NoImageAvailable.jpg')}
                                            alt="No Image Available"
                                        />
                                    )}
                                    <div className='wrapper-products'>
                                        <Paragraph
                                            className='title-product overflow-ellipsis overflow-hidden whitespace-nowrap'
                                        >
                                            {item.name}
                                        </Paragraph>

                                        <div className="truncate">Khu vực: {item.area}</div>
                                        <div className="truncate">Loại sân: {item.field_type}</div>

                                        <div className="price-amount">
                                            <Paragraph className='price-product'>
                                                {numberWithCommas(Number(item.price))}đ/giờ
                                            </Paragraph>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>


                <div className="heading_slogan">
                    <div>Tại sao</div>
                    <div>bạn nên chọn chúng tôi</div>
                </div>
                <div className="card_wrap container-home container flex justify-center">
                    <div>
                        <Card bordered={false} className="card_suggest card_why card_slogan flex flex-col items-center">
                            <img src={service6} alt="Sân bóng tiện ích" className="mx-auto"></img>
                            <p className="card-text mt-3 fw-bold text-center">Tiện ích đầy đủ <br /> và hiện đại</p>
                        </Card>
                    </div>
                    <div>
                        <Card bordered={false} className="card_suggest card_why card_slogan flex flex-col items-center">
                            <img src={service7} alt="Chất lượng sân bóng" className="mx-auto"></img>
                            <p className="card-text mt-3 fw-bold text-center">Chất lượng sân bóng <br /> tốt nhất</p>
                        </Card>
                    </div>
                    <div>
                        <Card bordered={false} className="card_suggest card_why card_slogan flex flex-col items-center">
                            <img src={service8} alt="Dịch vụ chuyên nghiệp" className="mx-auto"></img>
                            <p className="card-text mt-3 fw-bold text-center">Dịch vụ chuyên nghiệp <br /> và thân thiện</p>
                        </Card>
                    </div>
                    <div>
                        <Card bordered={false} className="card_suggest card_why card_slogan flex flex-col items-center">
                            <img src={service9} alt="Đặt lịch linh hoạt" className="mx-auto"></img>
                            <p className="card-text mt-3 fw-bold text-center">Đặt lịch linh hoạt <br /> và nhanh chóng</p>
                        </Card>
                    </div>
                    <div>
                        <Card bordered={false} className="card_suggest card_why card_slogan flex flex-col items-center">
                            <img src={service10} alt="Hỗ trợ 24/7" className="mx-auto"></img>
                            <p className="card-text mt-3 fw-bold text-center">Hỗ trợ 24/7 <br /> đảm bảo trải nghiệm <br /> tốt nhất</p>
                        </Card>
                    </div>
                </div>

                <div className="image-footer">
                    <OverPack style={{ overflow: 'hidden', height: 800, marginTop: 20 }} >
                        <TweenOne key="0" animation={{ opacity: 1 }}
                            className="code-box-shape"
                            style={{ opacity: 0 }}
                        />
                        <QueueAnim key="queue"
                            animConfig={[
                                { opacity: [1, 0], translateY: [0, 50] },
                                { opacity: [1, 0], translateY: [0, -50] }
                            ]}
                        >
                            <div className="texty-demo-footer">
                                <Texty>NHANH LÊN! </Texty>
                            </div>
                            <div className="texty-title-footer">
                                <p>Tham Dự Buổi <strong>Ra Mắt Sân Bóng Mới</strong></p>
                            </div>
                            <Row justify="center" style={{ marginBottom: 40, fill: "#FFFFFF" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="71px" height="11px"> <path fill-rule="evenodd" d="M59.669,10.710 L49.164,3.306 L39.428,10.681 L29.714,3.322 L20.006,10.682 L10.295,3.322 L1.185,10.228 L-0.010,8.578 L10.295,0.765 L20.006,8.125 L29.714,0.765 L39.428,8.125 L49.122,0.781 L59.680,8.223 L69.858,1.192 L70.982,2.895 L59.669,10.710 Z"></path></svg>
                            </Row>
                            <Row justify="center">
                                <a href="#" class="footer-button" role="button">
                                    <span>ĐĂNG KÝ NGAY</span>
                                </a>
                            </Row>
                        </QueueAnim>
                    </OverPack>
                </div>
            </div>

            <BackTop style={{ textAlign: 'right' }} />
        </Spin >
    );
};

export default Home;
