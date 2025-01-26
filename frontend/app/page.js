"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import { Container } from "@components/StyledComponents";
import { Box, Button } from "@node_modules/@mui/material";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => router.push("/login")}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}
