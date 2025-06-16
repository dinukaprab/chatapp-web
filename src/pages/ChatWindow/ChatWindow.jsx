import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
import CallIcon from "@mui/icons-material/Call";
import SearchIcon from "@mui/icons-material/Search";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import AttachmentIcon from "@mui/icons-material/Attachment";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import ChecklistIcon from "@mui/icons-material/Checklist";

export default function ChatWindow() {
  const lastMsgRef = useRef(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatMenu, setChatMenu] = useState(null);

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatRightClick = (event) => {
    event.preventDefault();
    setChatMenu(
      chatMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleCloseChatMenu = () => {
    setChatMenu(null);
  };

  const handleCloseChat = () => {
    handleCloseChatMenu();
    navigate("/");
  };

  const handleSend = () => {
    if (message.trim() === "") return;
    setMessages((prev) => [...prev, message]);
    setMessage("");
  };

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          width: "80%",
          height: "7vh",
          top: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 1,
          paddingLeft: 2,
          paddingRight: 2,
          borderBottom: "2px solid rgb(209, 209, 209)",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Avatar
            src={"/static/images/avatar/3.jpg"}
            sx={{ cursor: "pointer" }}
          />
          <Box
            sx={{
              marginLeft: 2,
            }}
          >
            <Typography
              fontWeight="bold"
              noWrap
              sx={{
                maxWidth: 180,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              name
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              noWrap
              sx={{
                fontSize: 12,
                maxWidth: 180,
                overflow: "hidden",
                fontWeight: 600,
                textOverflow: "ellipsis",
              }}
            >
              Online
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 1,
              border: "2px solid rgb(209, 209, 209)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                borderRight: "2px solid rgb(209, 209, 209)",
              }}
            >
              <IconButton>
                <VideocamIcon />
              </IconButton>
            </Box>
            <Box>
              <IconButton>
                <CallIcon />
              </IconButton>
            </Box>
          </Box>

          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <Box
        onContextMenu={handleChatRightClick}
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          top: "7vh",
          width: "100%",
          height: "86vh",
          padding: 2,
          overflowY: "auto",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#bdbdbd",
            borderRadius: "4px",
          },
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            ref={index === messages.length - 1 ? lastMsgRef : null}
            sx={{
              backgroundColor: "#f0f0f0",
              padding: 1,
              borderRadius: 1,
              maxWidth: "70%",
              mb: 1,
              alignSelf: "flex-end",
              ml: "auto",
            }}
          >
            <Typography>{msg}</Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          position: "fixed",
          width: "80%",
          height: "7vh",
          bottom: 0,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          padding: 1,
          paddingLeft: 2,
          paddingRight: 2,
          borderTop: "2px solid rgb(209, 209, 209)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton>
            <SentimentSatisfiedOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachmentIcon />
          </IconButton>
        </Box>
        <Box sx={{ marginLeft: 2, width: "100%" }}>
          <TextField
            variant="standard"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message"
            InputProps={{
              disableUnderline: true,
              spellCheck: false,
              style: {
                fontFamily: "Roboto, sans-serif",
                fontStyle: "normal",
                color: "#1E201E",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton>
            <SendIcon onClick={handleSend} />
          </IconButton>
        </Box>
      </Box>
      <Menu
        open={chatMenu !== null}
        onClose={handleCloseChatMenu}
        anchorReference="anchorPosition"
        MenuListProps={{ autoFocusItem: false }}
        anchorPosition={
          chatMenu !== null
            ? { top: chatMenu.mouseY, left: chatMenu.mouseX }
            : undefined
        }
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 1,
            marginTop: theme.spacing(1),
            minWidth: 180,
            color: "rgb(55, 65, 81)",
            boxShadow:
              "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
            "& .MuiMenu-list": {
              padding: "4px 0",
            },
          },
          "& .MuiMenu-list": {
            padding: "2px 0",
          },
        }}
      >
        <MenuItem
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <ChecklistIcon />
          <Typography>select messages</Typography>
        </MenuItem>
        <MenuItem
          onClick={handleCloseChat}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CloseIcon />
          <Typography>close chat</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
