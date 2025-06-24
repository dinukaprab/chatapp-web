import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Typography,
  Badge,
} from "@mui/material";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";

import { lastSeenTimeFormat } from "/src/utils/timeFormat";
import { OnlineBadge } from "/src/components/StyledBadge/StyledBadge";

const users = [
  {
    userId: 1,
    username: "remy",
    name: "Remy Sharp",
    lastMessage: "Hey, how are you?",
    lastMessageTime: "2025-06-15T00:58:00",
    lastSeen: "2025-06-16T00:58:00",
    avatar: "/static/images/avatar/1.jpg",
    isOnline: true,
    unreadMessages: 3,
  },
  {
    userId: 2,
    username: "alex",
    name: "Alex Doe",
    lastMessage: "Let's meet at 5",
    lastMessageTime: "2025-06-13T00:58:00",
    lastSeen: "2025-06-13T00:58:00",
    avatar: "/static/images/avatar/2.jpg",
    isOnline: true,
    unreadMessages: 0,
  },
  {
    userId: 3,
    username: "jane",
    name: "Jane Miller",
    lastMessage: "On my way!",
    lastMessageTime: "2025-06-16T08:12:00",
    lastSeen: "2025-06-16T08:12:00",
    avatar: "/static/images/avatar/3.jpg",
    isOnline: false,
    unreadMessages: 5,
  },
  {
    userId: 4,
    username: "mark",
    name: "Mark Lee",
    lastMessage: "Send me the file",
    lastMessageTime: "2025-06-14T20:33:00",
    lastSeen: "2025-06-14T20:33:00",
    avatar: "/static/images/avatar/4.jpg",
    isOnline: true,
    unreadMessages: 1,
  },
  {
    userId: 5,
    username: "sophia",
    name: "Sophia Brown",
    lastMessage: "Thanks!",
    lastMessageTime: "2025-06-15T12:45:00",
    lastSeen: "2025-06-15T12:45:00",
    avatar: "/static/images/avatar/5.jpg",
    isOnline: false,
    unreadMessages: 0,
  },
  {
    userId: 6,
    username: "liam",
    name: "Liam Johnson",
    lastMessage: "Okay cool",
    lastMessageTime: "2025-06-12T18:22:00",
    lastSeen: "2025-06-12T18:22:00",
    avatar: "/static/images/avatar/6.jpg",
    isOnline: false,
    unreadMessages: 7,
  },
  {
    userId: 7,
    username: "emma",
    name: "Emma Davis",
    lastMessage: "Just finished it",
    lastMessageTime: "2025-06-16T07:05:00",
    lastSeen: "2025-06-16T07:05:00",
    avatar: "/static/images/avatar/7.jpg",
    isOnline: false,
    unreadMessages: 0,
  },
  {
    userId: 8,
    username: "noah",
    name: "Noah Wilson",
    lastMessage: "What time exactly?",
    lastMessageTime: "2025-06-15T23:59:00",
    lastSeen: "2025-06-15T23:59:00",
    avatar: "/static/images/avatar/8.jpg",
    isOnline: true,
    unreadMessages: 2,
  },
  {
    userId: 9,
    username: "olivia",
    name: "Olivia Garcia",
    lastMessage: "Good night",
    lastMessageTime: "2025-06-11T22:10:00",
    lastSeen: "2025-06-11T22:10:00",
    avatar: "/static/images/avatar/9.jpg",
    isOnline: false,
    unreadMessages: 0,
  },
  {
    userId: 10,
    username: "james",
    name: "James Martinez",
    lastMessage: "On it!",
    lastMessageTime: "2025-06-10T14:00:00",
    lastSeen: "2025-06-10T14:00:00",
    avatar: "/static/images/avatar/10.jpg",
    isOnline: false,
    unreadMessages: 4,
  },
];

export default function ChatList() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const currentUsername = Number(location.pathname.slice(1));

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          margin: 0.5,
          gap: 1,
        }}
      >
        <IconButton>
          <ReviewsOutlinedIcon />
        </IconButton>
        <IconButton>
          <FilterListIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          margin: 2,
          marginTop: 0,
          borderRadius: 1,
          border: "2px solid rgb(209, 209, 209)",
        }}
      >
        <TextField
          id="searchbar"
          variant="standard"
          placeholder="search a name"
          fullWidth
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          InputProps={{
            disableUnderline: true,
            spellCheck: false,
            style: {
              userSelect: "none",
              fontFamily: "Roboto, sans-serif",
              fontOpticalSizing: "auto",
              fontStyle: "normal",
              fontVariationSettings: "wdth 100",
              color: "#1E201E",
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ marginLeft: 1 }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box
        sx={{
          marginTop: 2,
          height: "calc(100vh - 160px)",
          overflowY: "auto",
           overflowX: "hidden",
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
        {filteredUsers.map((user) => {
          const isSelected = user.username === currentUsername;
          return (
            <Box
              key={user.username}
              onClick={() => navigate(`/${user.username}`)}
              sx={{
                height: "7vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingX: 2,
                marginX: 1,
                borderRadius: 1,
                cursor: "pointer",
                userSelect: "none",
                backgroundColor: isSelected
                  ? "rgba(128, 128, 128, 0.2)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: isSelected
                    ? "rgba(128, 128, 128, 0.2)"
                    : "rgba(128, 128, 128, 0.4)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {user.isOnline ? (
                  <OnlineBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar src={user.avatar} sx={{ cursor: "pointer" }} />
                  </OnlineBadge>
                ) : (
                  <Avatar src={user.avatar} sx={{ cursor: "pointer" }} />
                )}

                <Box sx={{ marginLeft: 2 }}>
                  <Typography
                    fontWeight="bold"
                    noWrap
                    sx={{
                      maxWidth: 180,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    noWrap
                    sx={{
                      maxWidth: 180,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.lastMessage}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 80,
                  gap: 2,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ lineHeight: 1 }}
                >
                  {lastSeenTimeFormat(user.lastSeen)}
                </Typography>
                <Badge
                  badgeContent={user.unreadMessages}
                  color="secondary"
                  size="small"
                  sx={{ fontSize: 10, height: 18 }}
                />
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
