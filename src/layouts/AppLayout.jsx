import Container from "@/components/Container";
import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <>
    <Header/>
    <Container>

      <main className="min-h-screen" >
        <Outlet />
      </main>
    </Container>

      <div className="p-3 text-center bg-gray-900 mt-5 ">
        Made with ❤️ by Nitin yadav
      </div>
    </>
  );
}

export default AppLayout;
