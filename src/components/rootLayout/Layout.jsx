import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box className="cc-container page-alignment">
      <Outlet />
    </Box>
  );
};

export default Layout;
