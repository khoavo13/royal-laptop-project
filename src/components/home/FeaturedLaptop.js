import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Stack,
  Container,
  CardMedia,
  Grid,
  Rating,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { addItemCart } from "../../redux/cartSlide";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "./featured.css";

export default function FeaturedLaptop() {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const [selectedBrand, setSelectedBrand] = useState("");
  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  const handleFilterChange = (brand) => {
    setSelectedBrand(brand);
  };

  const filteredLaptops = selectedBrand
    ? products.filter(
        (laptop) => laptop.brand === selectedBrand && laptop.type === "laptop"
      )
    : products.filter((laptop) => laptop.type === "laptop");

  const handleAddToCart = (item) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
    });
    dispatch(addItemCart(item));
  };
  return (
    <Container maxWidth="lg" className="featured">
      <Typography variant="h4" component="h1" gutterBottom>
        Laptop nổi bật
      </Typography>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2, fontSize: "13px" }}>
          <Button
            variant={selectedBrand === "" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("")}
          >
            Tất cả
          </Button>
          <Button
            variant={selectedBrand === "Acer" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("Acer")}
          >
            Acer
          </Button>
          <Button
            variant={selectedBrand === "Asus" ? "contained" : "outlined"}
            onClick={() => handleFilterChange("Asus")}
          >
            Asus
          </Button>
        </Stack>

        <Swiper
          modules={[Navigation, Pagination]}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            960: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            1460: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          navigation
          loop={true}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {filteredLaptops.map((product, index) => (
            <SwiperSlide key={index}>
              <Card
                raised
                sx={{
                  margin: "20px 0",
                  height: "440px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  height="200px"
                  image={require(`../../img/product/${product.image}.png`)}
                  alt={product.name}
                  sx={{
                    padding: "20px 0",
                    objectFit: "contain",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)", // Slightly larger scale to prevent overflow issues
                    },
                  }}
                />
                <CardContent sx={{ padding: "20px", flexGrow: 1 }}>
                  <Link to={`/product/${product.id}`} style={{textDecoration: "none", color: "inherit"}}>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 3, // Limit to 4 lines
                        height: "4.2em", // Approximately 4 lines of text height
                        lineHeight: "1.4em", // Line height for text
                        fontWeight: "bold",
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price}
                  </Typography>
                  <Box
                    sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}
                  >
                    <Rating
                      name="product-rating"
                      value={product.rating}
                      readOnly
                      precision={0.5}
                      size="small"
                      sx={{ color: "gold" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "10px",
                    }}
                  >
                    <Grid container spacing={1}>
                      <Grid item sm={12}>
                        <Link
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                          to={`/product/${product.id}`}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{
                              fontSize: "12px",
                              p: "3px 6px",
                              width: "100%",
                              float: "right",
                              height: "100%",
                              textTransform: "none",
                            }}
                          >
                            Chi tiết
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item sm={12}>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleAddToCart(product)}
                          sx={{
                            fontSize: "12px",
                            p: "3px 6px",
                            width: "100%",
                            marginRight: "5px",
                            textTransform: "none",
                          }}
                        >
                          Thêm vào giỏ
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
}
