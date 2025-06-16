import { Routes, Route } from "react-router-dom";
import BaseLayout from "/src/components/Layouts/BaseLayout";
import Home from "/src/pages/Home/Home";
import ChatWindow from "/src/pages/ChatWindow/ChatWindow";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<BaseLayout Content={<Home />} />} />
      <Route
        path="/:username"
        element={<BaseLayout Content={<ChatWindow />} />}
      />
    </Routes>
  );
}
