import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { v1 as uuid } from "uuid";
import { removeCheckedAll } from "../../redux/cartSlide";

const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

const validatePhoneNumber = (phone) => {
  const re = /^[0-9]{10}$/;
  return re.test(String(phone));
};

export default function Order() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate();

  const onChangeFullName = (e) => {
    setName(e.target.value);
    if (e.target.value === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
    if (!validatePhoneNumber(e.target.value)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  // Handle address
  const [cityId, setCityId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [wardId, setWardId] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const [cities, setCities] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const url = "https://esgoo.net/api-tinhthanh";
  useEffect(() => {
    async function fetchCity() {
      try {
        const response = await axios.get(`${url}/1/0.htm`);
        setCities(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCity();
  }, []);

  useEffect(() => {
    async function fetchDistricts() {
      try {
        const response = await axios.get(`${url}/2/${cityId}.htm`);
        setDistricts(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (cityId) {
      fetchDistricts();
      // setDistricts(districtsData[city]);
      setDistrictId("");
      setWards([]);
    }
  }, [cityId]);

  useEffect(() => {
    async function fetchWards() {
      try {
        const response = await axios.get(`${url}/3/${districtId}.htm`);
        setWards(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    if (districtId) {
      fetchWards();
      // setWards(wardsData[district]);
      setWardId("");
    }
  }, [districtId]);

  // handle order info
  const { carts } = useSelector((state) => state.cart);
  const tempSubtotal = carts.reduce(
    (curr, item) => (item.checked ? curr + item.quantity * item.price : curr),
    0
  );
  const discount = 20;

  // handle emailjs
  const dispatch = useDispatch();

  const handleSendEmailOrder = async () => {
    if (nameError || phoneError || emailError || !name || !email || !phone) {
      Swal.fire({
        icon: "error",
        text: "Bạn đã điền thiếu thông tin!",
      });
    } 
    else if (cityId == "" || districtId == "" || wardId == "" || houseNumber == ""){
      Swal.fire({
        icon: "error",
        text: "Bạn đã điền thiếu địa chỉ!",
      });
    }
    else {
      console.log(email);
      const data = {
        service_id: "service_phfe9ip",
        template_id: "template_1it2knt",
        user_id: "krqQ55J_qPkmLb3l_",
        template_params: {
          to_email: email,
          to_name: name,
          order_time: new Date().toLocaleString(),
          order_id: uuid().toString(),
          phone: phone,
          price_total: tempSubtotal - discount,
        },
      };

      try {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Bạn đã đặt hàng thành công! Vui lòng kiểm tra email",
          showConfirmButton: false,
          timer: 3000,
        });
        dispatch(removeCheckedAll());
        navigate("/");
        const res = await axios.post(
          "https://api.emailjs.com/api/v1.0/email/send",
          data
        );
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "100px", marginBottom: "20px" }}>
      <Grid
        container
        spacing={3}
        style={{ padding: "20px",  }}
      >
        <Grid item xs={12} sm={6} md={7}>
          <Paper elevation={3} sx={{ padding: "20px", background: "#ecf0f1" }}>
            <Typography variant="h5" gutterBottom>
              Thông tin người nhận hàng
            </Typography>

            <Box mb={4} mt={4} width={"50%"}>
              <TextField
                required
                fullWidth
                label="Họ Tên"
                variant="standard"
                value={name}
                onChange={(e) => onChangeFullName(e)}
                error={nameError}
                helperText={nameError ? "Họ tên không được để trống" : ""}
              />
            </Box>
            <Box mb={4} mt={4} width={"50%"}>
              <TextField
                required
                fullWidth
                label="Số Điện Thoại"
                variant="standard"
                value={phone}
                onChange={(e) => onChangePhone(e)}
                error={phoneError}
                helperText={phoneError ? "Số điện thoại không hợp lệ" : ""}
              />
            </Box>
            <Box mb={4} mt={4} width={"50%"}>
              <TextField
                required
                fullWidth
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => onChangeEmail(e)}
                error={emailError}
                helperText={emailError ? "Email không hợp lệ" : ""}
              />
            </Box>
            <Divider component="div" sx={{ margin: "20px 0" }} />
            <Typography variant="h5" gutterBottom>
              Địa chỉ giao hàng
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl
                  sx={{ marginTop: 1, width: "50%" }}
                  variant="standard"
                >
                  <InputLabel>Tỉnh</InputLabel>
                  <Select
                    value={cityId}
                    onChange={(e) => setCityId(e.target.value)}
                  >
                    {cities?.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  sx={{ marginTop: 1, width: "50%" }}
                  variant="standard"
                  disabled={!cityId}
                >
                  <InputLabel>Quận/Huyện</InputLabel>
                  <Select
                    value={districtId}
                    onChange={(e) => setDistrictId(e.target.value)}
                  >
                    {districts?.map((district) => (
                      <MenuItem value={district.id}>{district.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  sx={{ marginTop: 1, width: "50%" }}
                  variant="standard"
                  disabled={!districtId}
                >
                  <InputLabel>Phường/Xã</InputLabel>
                  <Select
                    value={wardId}
                    onChange={(e) => setWardId(e.target.value)}
                  >
                    {wards?.map((ward) => (
                      <MenuItem value={ward.id}>{ward.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={!wardId}
                  fullWidth
                  label="Số Nhà"
                  variant="standard"
                  value={houseNumber}
                  onChange={(e) => setHouseNumber(e.target.value)}
                  sx={{ width: "50%", marginTop: 1 }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <Paper
            style={{
              padding: "20px",
              marginBottom: "20px",
              background: "#ecf0f1",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Thông tin đơn hàng
            </Typography>
            <Box>
              {carts.map((product, index) =>
                product.checked ? (
                  <Card
                    key={index}
                    sx={{
                      display: "flex",
                      mb: 2,
                      height: "150px", // Set fixed height for the card
                      p: "10px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: '100px',
                        height: "90%", // Make sure the image fills the height of the card
                        objectFit: "contain", // Ensure the image covers the area without distortion
                      }}
                      image={require(`../../img/product/${product.image}.png`)}
                      alt={product.name}
                    />
                    <Box
                      sx={{ display: "flex", flexDirection: "column", flex: 1 }}
                    >
                      <CardContent
                        sx={{ flex: "1 0 auto", overflow: "hidden" }}
                      >
                        <Typography
                          component="div"
                          variant="h1"
                          fontSize={"15px"}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          fontSize={"13px"}
                        >
                          Số lượng: {product.quantity}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                          fontSize={"13px"}
                        >
                          Đơn giá: ${product.price}
                        </Typography>
                      </CardContent>
                    </Box>
                  </Card>
                ) : (
                  <></>
                )
              )}
            </Box>
            <Link
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
              to={"/cart"}
            >
              <Button variant="outlined">Chỉnh sửa</Button>
            </Link>
          </Paper>

          <Paper style={{ padding: "20px", background: "#ecf0f1" }}>
            <Typography variant="h6" gutterBottom>
              Thanh toán
            </Typography>
            <Box sx={{ marginBottom: "10px" }}>
              <Typography variant="body1" style={{ marginBottom: "8px" }}>
                Tổng tạm tính: ${tempSubtotal.toLocaleString()}
              </Typography>
              <Typography
                variant="body1"
                style={{ marginBottom: "8px", color: "#2980b9" }}
              >
                Khuyến mãi: ${discount.toLocaleString()}
              </Typography>
              <Typography
                variant="body1"
                style={{ fontWeight: "bold", marginBottom: "8px" }}
              >
                Tổng giá: $
                {(tempSubtotal - discount <= 0
                  ? 0
                  : tempSubtotal - discount
                ).toLocaleString()}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendEmailOrder}
            >
              Đặt hàng
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
