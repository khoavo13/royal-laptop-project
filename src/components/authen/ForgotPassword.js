import { Container, Button, Box, Typography, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
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
          Quên Mật Khẩu
        </Typography>
        <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={(e) => {
            e.preventDefault();
            // Handle password reset here
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
          <Link to="/" sx={{ textDecoration: "none", color: "inherit" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, py: 1.5 }}
            >
              Gửi Yêu Cầu
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
}
