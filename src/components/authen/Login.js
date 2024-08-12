import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <Container component="main" maxWidth="md" sx={{ marginTop: "100px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 8,
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: "#fff",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Đăng Nhập
        </Typography>
        <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={(e) => {
            e.preventDefault();
            // Handle login here
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Mật Khẩu"
            type="password"
            name="password"
            autoComplete="current-password"
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2} sx={{ marginBottom: "5px" }}>
            <Grid item xs>
              <Link to="/forgot-password" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary">
                  Quên Mật Khẩu?
                </Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <Typography variant="body2" color="primary">
                  Đăng Ký
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Link to="/" sx={{ textDecoration: "none", color: "inherit" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mb: 2, py: 1.5 }}
            >
              Đăng Nhập
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
