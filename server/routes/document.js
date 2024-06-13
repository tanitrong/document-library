const express = require("express");
const router = express.Router();
const { upload } = require("../multer");
const catchAsyncError = require("../middlewares/catchAsyncErrors");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");
const { cacheMiddleware } = require("../middlewares/cacheData");
const {
  createDoc,
  getAllDocs,
  getAllDocsOfUser,
  approveDocs,
  getDoc,
  getTopViewedDocumentsThisWeek,
  updateThumbnailDoc,
  getComments,
  createComments,
  getRelatedKeywords,
  getCategory,
  searchDocuments,
  purchasedDocuments,
  createCollection,
  addCollection,
  getCollection,
  incrementView,
  getUserStats,
  getTopDocumentsByViews,
  downloadDocument,
  deleteDocument,
} = require("../controllers/document");
const { chatWithPdf, getHistoryChatBot } = require("../controllers/chatboxDoc");

router.get("/search", searchDocuments);
router.post("/create-doc", createDoc);
router.get("/get-all-docs/:id", catchAsyncError(getAllDocsOfUser));
router.get("/get-all-docs", catchAsyncError(getAllDocs));
router.get("/get-doc/:id", catchAsyncError(getDoc));
router.put("/paid-document/:docId", catchAsyncError(purchasedDocuments));
router.get("/get-doc/:id/comments", catchAsyncError(getComments));
router.post("/create-collection/:userId", catchAsyncError(createCollection));
router.put("/add-collection/:collectionId", catchAsyncError(addCollection));
router.get("/get-collection/:userId", catchAsyncError(getCollection));
router.delete("/delete/:docId", catchAsyncError(deleteDocument));
router.put("/:docId/view", catchAsyncError(incrementView));
router.post("/download/:id", catchAsyncError(downloadDocument));
router.get("/stats/:userId", catchAsyncError(getUserStats));
// router.get("/search", catchAsyncError(searchDocumentsAdmin));
router.get(
  "/chatbox/history/:userId/:docId",
  catchAsyncError(getHistoryChatBot)
);
router.put("/chatbox/ask/:userId", catchAsyncError(chatWithPdf));

router.post(
  "/get-doc/:id/comments",
  isAuthenticated,
  catchAsyncError(createComments)
);
router.put("/update-thumbnail/:id", catchAsyncError(updateThumbnailDoc));
router.get(
  "/top-viewed-documents",

  catchAsyncError(getTopViewedDocumentsThisWeek)
);
router.put(
  "/approve-docs/:docId",
  isAuthenticated,
  isAdmin("admin"),
  catchAsyncError(approveDocs)
);
router.get("/:category", catchAsyncError(getCategory));

module.exports = router;
