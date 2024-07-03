import Container from "@/components/Container";
import Header from "@/components/Header";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

function AppLayout() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/auth';
  return (
    <>
    <Header/>
    <Container>

      <main className={`${!isLoginRoute && "min-h-screen"}`} >
        <Outlet />
      </main>
    </Container>

      <div className={` ${isLoginRoute && "fixed bottom-0 w-full left-0 right-0"} p-3 text-center shadow-md shadow-white mt-5 `}>
        <p className="p-3">Made with ❤️ by Nitin yadav</p>
      </div>
    </>
  );
}

export default AppLayout;
