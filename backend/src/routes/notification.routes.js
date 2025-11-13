// backend/routes/notification.routes.js
import express from "express";
import { Message } from "../models/message.model.js";
const router = express.Router();

// Get new/unread messages for a user
router.get("/messages/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const unseenMessages = await Message.find({
      receiverId: userId,
      seen: false,
    })
      .populate("senderId", "fullName profilePic")
      .sort({ createdAt: -1 });

    res.json({ unseenMessages });
  } catch (error) {
    console.error("Error fetching message notifications:", error);
    res.status(500).json({ error: "Failed to fetch message notifications" });
  }
});

export default router;
