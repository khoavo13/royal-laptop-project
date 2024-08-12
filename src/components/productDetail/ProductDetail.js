import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  styled,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {addItemCartByAmount } from "../../redux/cartSlide";
import Swal from "sweetalert2";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch()
  const product = products.find((item) => item.id == id);

  const ImageContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const DetailsContainer = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  }));

  const handleAddToCart = (item) =>{
    Swal.fire({
      icon: "success",
      title: "Success!",
    });
    dispatch(addItemCartByAmount({...item, quantity}))
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ margin: "100px auto 50px" }}>
      <Grid container spacing={2} sx={{ marginTop: 4 }}>
        <Grid item xs={12} md={5}>
          <ImageContainer>
            <img
              src={require(`../../img/product/${product.image}.png`)}
              alt={product.name}
              style={{ maxWidth: "100%" }}
            />
          </ImageContainer>
        </Grid>
        <Grid item xs={12} md={7}>
          <DetailsContainer>
            <Typography variant="h4" component="h1">
              {product.name}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Thương hiệu: {product.brand}
            </Typography>
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ marginTop: 2 }}
            >
              ${product.price}
            </Typography>
            
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              {product.description}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Số lượng:
              </Typography>
              <IconButton
                disabled={quantity <= 1}
                sx={{
                  width: "30px",
                  height: "30px",
                  color: "#e74c3c",
                  border: '1px solid #000'
                }}
                onClick={() => setQuantity(quantity - 1)}
              >
                <RemoveIcon />
              </IconButton>
              <TextField
                sx={{
                  
                  width: "50px",
                  margin: "0 5px",
                  textAlign: "center",
                  "& input": { textAlign: "center", fontSize: '13px', fontWeight: "800" },
                }}
                type="text"
                disabled={true}
                value={quantity}
              />
              <IconButton
                sx={{
                  width: "30px",
                  height: "30px",
                  color: "#2980b9",
                  border: '1px solid #000'
                }}
                onClick={() => setQuantity(quantity + 1)}
              >
                <AddIcon />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              color="error"
              sx={{
                marginTop: 4,
                "&:hover": {
                  color: "#000", 
                  background: "#fff"
                },
              }}
              onClick={()=>handleAddToCart(product)}
            >
              Add to Cart
            </Button>
          </DetailsContainer>
        </Grid>
      </Grid>
    </Container>
  );
}