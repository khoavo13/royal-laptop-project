import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PopularBrand() {
  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 2000,
      easing: "ease-out-cubic",
    });
  }, []);
  const categories = [
    {
      name: "Acer",
      products: 6,
      image: "acer-logo.png",
      link: "/product/laptop/Acer",
    },
    {
      name: "Asus",
      products: 6,
      image: "asus-logo.png",
      link: "/product/laptop/Asus",
    },
    {
      name: "Apple",
      products: 6,
      image: "apple-logo.png",
      link: "/product/mobile/Apple",
    },
    {
      name: "Samsung",
      products: 6,
      image: "samsung-logo.png",
      link: "/product/mobile/Samsung",
    },
    {
      name: "Oppo",
      products: 6,
      image: "oppo-logo.png",
      link: "/product/mobile/Oppo",
    },
     
  ];
  return (
    <Container
      maxWidth="lg"
      sx={{ margin: "40px auto" }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Thương hiệu phổ biến</Typography>
          <Typography variant="subtitle1">
          Sản phẩm bán chạy nhất được thêm vào danh sách hàng tuần
          </Typography>
        </Grid>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden", // Ensure the image stays within the card boundaries
                transition: "transform 0.3s ease-in-out",
                height: 140,
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              data-aos="zoom-in-up"
              data-aos-duration="3000"
            >
              <CardContent sx={{ flex: "1 1 auto", textAlign: "left" }}>
                <Typography variant="h6" component="div">
                  {category.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.products} Products
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <Link
                    to={category.link}
                    // target="_blank" // Chuyển sang tab khác
                    style={{
                      color: "#1976d2",
                      textDecoration: "none",
                      fontWeight: "bold",
                      transition: "color 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "#e74c3c")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "#1976d2")
                    }
                  >
                    Xem tất cả
                  </Link>
                </Typography>
              </CardContent>
              <CardMedia
                component="img"
                sx={{
                  width: 200,
                  objectFit: "cover",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)", // Slightly larger scale to prevent overflow issues
                  },
                }}
                image={require(`../../img/${category.image}`)}
                alt={category.name}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
