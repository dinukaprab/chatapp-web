import { Box } from "@mui/material";
import ChatList from "/src/components/ChatList/ChatList";

export default function BaseLayout({ Content }) {
  return (
    <Box>
      {/* sidebar */}
      <Box
        sx={{
          position: "fixed",
          left: 0,
          width: "20%",
          height: "100%",
          borderRight: "2px solid rgb(209, 209, 209)",
        }}
      >
        <ChatList />
      </Box>
      <Box
        sx={{
          position: "relative",
          marginLeft: "20%",
        }}
      >
        {Content}
      </Box>
    </Box>
  );
}
