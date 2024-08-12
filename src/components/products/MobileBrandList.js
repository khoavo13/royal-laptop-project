import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Button,
  Pagination,
  Rating,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { fetchProducts } from "../../redux/productSlice";
import { addItemCart } from "../../redux/cartSlide";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function MobileBrandList() {
  const { brand } = useParams();
  const { mobiles } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const itemsPerPage = 12;

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortProducts = (products) => {
    const productsCopy = [...products]; // Create a copy of the products array

    switch (sortOption) {
      case "name-asc":
        return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return productsCopy.sort((a, b) => b.name.localeCompare(a.name));
      case "price-asc":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "price-desc":
        return productsCopy.sort((a, b) => b.price - a.price);
      default:
        return productsCopy;
    }
  };

  const filteredProducts = mobiles.filter((product) => product.brand === brand);

  const sortedProducts = sortProducts(filteredProducts);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 1000,
      easing: "ease-out-cubic",
    });
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  const handleAddToCart = (item) => {
    Swal.fire({
      icon: "success",
      title: "Success!",
    });
    dispatch(addItemCart(item));
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: "100px" }}>
      <Grid container spacing={2}>
        {/* Product Cards Section */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <Typography variant="h5">
              Danh sách điện thoại của {brand}
            </Typography>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              displayEmpty
              sx={{ width: "150px", height: "50px" }}
            >
              <MenuItem value="">Sắp xếp</MenuItem>
              <MenuItem value="name-asc">Tên: A-Z</MenuItem>
              <MenuItem value="name-desc">Tên: Z-A</MenuItem>
              <MenuItem value="price-asc">Giá: Tăng dần</MenuItem>
              <MenuItem value="price-desc">Giá: Giảm dần</MenuItem>
            </Select>
          </Box>

          <Grid container spacing={2}>
            {currentProducts.map((product) => (
              <Grid item xs={6} sm={3} md={3} key={product.id}>
                <Card
                  data-aos="fade-up"
                  data-aos-duration="2000"
                  raised
                  sx={{
                    margin: "0 0 20px",
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
                  <CardContent sx={{ padding: "20px" }}>
                    <Link
                      to={`/product/${product.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          WebkitLineClamp: 3, // Limit to 3 lines
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
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2,
                        mb: 2,
                      }}
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
              </Grid>
            ))}
          </Grid>
          {/* Pagination */}
          <Box sx={{ mt: 2, mb: 2, display: "flex", justifyContent: "center" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
