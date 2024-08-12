import React, { useEffect } from "react";
import { Grid, CardMedia, Typography, Container } from "@mui/material";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import Aos from "aos";

export default function StudentDiscount() {
  useEffect(() => {
    Aos.init({
      disable: "phone",
      duration: 2000,
      easing: "ease-out-cubic",
    });
  }, []);
  return (
    <Container maxWidth="lg" sx={{ margin: "50px auto" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Ưu đãi sinh viên</Typography>
        </Grid>
        {/* Cột 1 - Ảnh lớn */}
        <Grid item xs={12} md={8}>
          {/* <CardMedia
            component="img"
            image={require(`../../img/discount/discount-2.png`)}
            alt="Student Discount"
            sx={{
              width: "100%",
              height: "300px",
              borderRadius: "16px",
              objectFit: "cover", // Đảm bảo ảnh nằm gọn trong khung
              objectPosition: "center", // Định vị ảnh ở giữa
              overflow: "hidden",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.01)",
              },
            }}
          /> */}
          <Swiper
            spaceBetween={20}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay, Pagination]}
            data-aos="zoom-in-up"
            data-aos-duration="2000"
          >
            {[1, 2, 3, 4].map((item) => (
              <SwiperSlide className="swiper-slide-custom" key={item}>
                <CardMedia
                  component="img"
                  image={require(`../../img/discount/discount-${item}.png`)}
                  alt="Student Discount"
                  sx={{
                    width: "100%",
                    height: { xs: "150px", md: "320px" },
                    borderRadius: "16px",
                    objectFit: "cover", // Đảm bảo ảnh nằm gọn trong khung
                    objectPosition: "center", // Định vị ảnh ở giữa
                    overflow: "hidden",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.01)",
                    },
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>

        {/* Cột 2 - 2 Ảnh nhỏ xếp dọc */}
        <Grid
          item
          xs={12}
          md={4}
          container
          direction="column" // Đảm bảo xếp theo chiều dọc
          spacing={2}
          sx={{ height: "100%" }}
        >
          <Grid item sx={{ flex: 1 }}>
            <CardMedia
              component="img"
              image={require("../../img/discount/discount-5.png")} // Đường dẫn tới ảnh thứ hai
              alt="Student Offer 1"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                transition: "transform 0.3s ease",
                objectFit: "cover", // Đảm bảo ảnh nằm gọn trong khung
                objectPosition: "center", // Định vị ảnh ở giữa
                overflow: "hidden",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              data-aos="zoom-in-up"
              data-aos-duration="2000"
            />
          </Grid>
          <Grid item sx={{ flex: 1 }}>
            <CardMedia
              component="img"
              image={require("../../img/discount/discount-6.png")} // Đường dẫn tới ảnh thứ ba
              alt="Student Offer 2"
              sx={{
                width: "100%",
                height: "100%",
                borderRadius: "16px",
                transition: "transform 0.3s ease",
                objectFit: "cover", // Đảm bảo ảnh nằm gọn trong khung
                objectPosition: "center", // Định vị ảnh ở giữa
                overflow: "hidden",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              data-aos="zoom-in-up"
              data-aos-duration="2000"
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
