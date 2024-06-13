const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../model/User");
const cloudinary = require("../config/cloudinary");
const Document = require("../model/Document");
const Collection = require("../model/Collection");
const Comment = require("../model/Comment");
const Message = require("../model/Message");
const ESclient = require("../config/elastic");
const { cache } = require("../middlewares/cacheData");

module.exports.createDoc = async (req, res, next) => {
  try {
    const {
      name,
      category,
      description,
      uploadedBy,
      price,
      preview,
      keyWord,
      pdfUrl,
    } = req.body;

    const user = await User.findById({ _id: uploadedBy });
    const existingDocument = await Document.findOne({ name });
    if (!user) {
      return next(new ErrorHandler("upload by Id is invalid!", 400));
    }
    if (existingDocument) {
      return next(
        new ErrorHandler("Document with this name already exists", 400)
      );
    }

    const userUpload = await User.findById(uploadedBy);
    const newDocument = new Document({
      name,
      category,
      description,
      preview,
      keyWord,
      uploadedBy,
      nameUser: userUpload.name,
      price,
      pdfUrl,
    });
    const savedDocument = await newDocument.save();
    res.status(200).json({
      success: true,
      savedDocument,
      message: "Upload tai lieu thanh cong, xin cho phe duyet",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
};

// get all docs
module.exports.getAllDocs = async (req, res, next) => {
  try {
    const { status } = req.query;
    let filter = {};
    status === "All" ? "" : (filter.status = status);
    const data = await Document.find(filter).sort({
      createdAt: -1,
    });
    cache.set("allDoc", data);
    res.status(202).json({
      success: true,
      documents: data,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};
// get all docs of a user
module.exports.getCategory = async (req, res, next) => {
  const { category } = req.params;
  try {
    const docs = await Document.find({ category }).limit(12);

    res.status(201).json({
      success: true,
      docs,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//get document
module.exports.getDoc = async (req, res, next) => {
  try {
    const docId = req.params.id;
    const doc = await Document.findById({ _id: docId });
    if (!doc) {
      return res.status(404).json({ message: "Bài viết không tồn tại" });
    }

    // tim kiem relate
    const relatedDocs = await Document.find(
      {
        $text: { $search: doc.name },
        _id: { $ne: doc._id },
      },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(5)
      .lean();
    res.status(201).json({
      success: true,
      doc,
      relatedDocs,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};
// create commments
module.exports.createComments = async (req, res, next) => {
  try {
    const docId = req.params.id;
    const { comment } = req.body;
    const authUserId = req.user._id;
    const doc = await Document.findById(docId);
    if (!doc) {
      return next(new ErrorHandler("documment is not exsist", 400));
    }
    const newComment = new Comment({
      comment,
      userReviewId: authUserId,
      documentId: docId,
    });

    if (newComment && doc.reviews) {
      doc.reviews.push(newComment._id);
    }
    await Promise.all([newComment.save(), doc.save()]);

    res.status(201).json({
      success: true,
      message: "post comment successfully",
      newComment,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};
// get commments
module.exports.getComments = async (req, res, next) => {
  try {
    const docId = req.params.id;
    const comments = await Comment.find({ documentId: docId })
      .populate("userReviewId", ["name", "avatar"])
      .sort({ createdAt: -1 });
    res.status(201).json(comments);
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

// get all docs of a user
module.exports.getAllDocsOfUser = async (req, res, next) => {
  try {
    const docs = await Document.find({ uploadedBy: req.params.id });

    res.status(201).json({
      success: true,
      docs,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//search documents with elasticsearch
module.exports.searchDocuments = async (req, res, next) => {
  const searchText = req.query.q;
  console.log("searchText", searchText);
  // try {
  //   const response = await ESclient.search({
  //     index: "name_search",
  //     body: {
  //       query: {
  //         multi_match: {
  //           query: searchText,
  //           fields: ["name", "description"],
  //           fuzziness: "AUTO",
  //         },
  //       },
  //     },
  //   });

  //   const hits = response.hits.hits;

  //   res.status(200).json(hits);
  // } catch (error) {
  //   return next(new ErrorHandler(error, 400));
  // }
  try {
    const searchResult = await Document.find(
      { $text: { $search: searchText } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
    res.status(200).json(searchResult);
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

// docs approved by admin
module.exports.approveDocs = async (req, res, next) => {
  try {
    const docId = req.params.docId;
    const { firstImage } = req.body;

    cloudinary.uploader.upload(
      firstImage,
      {
        folder: "datn",
        transformation: [{ quality: "auto" }, { max_bytes: 500000 }],
      },
      async (error, result) => {
        if (error) {
          console.error("Error uploading image:", error);
        } else {
          await Document.findOneAndUpdate(
            { _id: docId, status: "Processing" },
            { $set: { status: "Approved", thumbnail: result.secure_url } },
            { new: true }
          );
        }
      }
    );

    return res
      .status(200)
      .json({ success: true, message: "updated doc successfully" });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};
//get Top Viewed Documents ThisWeek
module.exports.getTopViewedDocumentsThisWeek = async (req, res, next) => {
  try {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek.getTime());
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    const getTopViewedDocuments = await Document.aggregate([
      {
        $match: {
          $and: [
            // {
            //   $or: [
            //     { createdAt: { $gte: startOfWeek, $lte: endOfWeek } },
            //     { uploadedBy: { $gte: startOfWeek, $lte: endOfWeek } },
            //   ],
            // },
            { status: "Approved" },
          ],
        },
      },
      { $sort: { views: -1 } },
      { $limit: 12 },
    ]);

    return res
      .status(200)
      .json({ success: true, cache: false, getTopViewedDocuments });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//get tai liệu nổi bật
module.exports.getTopDocumentsByViews = async (req, res, next) => {
  try {
    const topDocuments = await Document.find()
      .sort({ views: -1 }) // Sắp xếp theo views giảm dần
      .limit(12); // Giới hạn kết quả trả về là 12

    res.status(200).json({
      success: true,
      data: topDocuments,
    });
  } catch (err) {
    return next(new ErrorHandler(err, 400));
  }
};

//handle buy documents
module.exports.purchasedDocuments = async (req, res, next) => {
  try {
    const { docId } = req.params;
    const { purchaseUserId, priceDoc } = req.body;
    // const purchaseUser = await ;
    const [purchaseUser, document] = await Promise.all([
      User.findById(purchaseUserId),
      Document.findById(docId),
    ]);
    const uploader = await User.findById(document.uploadedBy);
    if (!purchaseUser) {
      new ErrorHandler("purchaseUser not found!", 400);
    }
    if (purchaseUser.balance >= priceDoc) {
      purchaseUser.balance -= priceDoc;
      purchaseUser.purchasedDocuments.push(docId);
      uploader.balance += priceDoc;
      await Promise.all([purchaseUser.save(), uploader.save()]);
    } else {
      return next(
        new ErrorHandler("Số dư không đủ để thanh toán, vui lòng nạp thêm", 400)
      );
    }
    res.status(200).json({ message: "Mua thành công", success: true });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

//get collection
module.exports.getCollection = async (req, res, next) => {
  try {
    let collection = await Collection.find({ userId: req.params.userId });

    if (!collection) collection = [];
    res.json(collection);
  } catch (error) {
    return next(new ErrorHandler(err, 400));
  }
};

//handle create a collection
module.exports.createCollection = async (req, res, next) => {
  const { userId } = req.params;
  const { name, description } = req.body;

  try {
    const newCollection = new Collection({
      userId,
      name,
      description,
      documents: [],
    });

    await newCollection.save();

    res.status(201).json(newCollection);
  } catch (err) {
    return next(new ErrorHandler(err, 400));
  }
};

//handle add document to collection
module.exports.addCollection = async (req, res, next) => {
  const { collectionId } = req.params;
  const { documentId } = req.body;
  console.log("collectionId", collectionId, "documentId", documentId);

  try {
    const collection = await Collection.findById(collectionId);

    const documentExists = collection.documents.includes(documentId);
    if (documentExists) {
      return next(
        new ErrorHandler("Document already exists in the collection", 400)
      );
    }

    collection.documents.push(documentId);
    await collection.save();

    res.json({ message: "Document added to the collection successfully" });
  } catch (err) {
    console.log("err", err);
    return next(new ErrorHandler(err, 400));
  }
};

//handle delete doc for user
module.exports.deleteDocument = async (req, res, next) => {
  const { docId } = req.params;

  try {
    await Document.findByIdAndDelete(
      { _id: docId },
      {
        new: true,
      }
    );

    res.json({ message: "Đã xóa thành công" });
  } catch (err) {
    return next(new ErrorHandler(err, 400));
  }
};

//caculate view for document
module.exports.incrementView = async (req, res, next) => {
  const { docId } = req.params;
  try {
    const document = await Document.findByIdAndUpdate(
      { _id: docId },
      { $inc: { views: 1 } },
      { new: true } // Return the updated document
    );
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }
    res.json({ message: "View count updated", document });
  } catch (error) {
    return next(new ErrorHandler(err, 400));
  }
};

//get user stats
module.exports.getUserStats = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Kiểm tra xem người dùng có tồn tại không
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Tìm tất cả tài liệu của người dùng
    const documents = await Document.find({ uploadedBy: userId });

    // Tính tổng số tài liệu và tổng số lượt download
    const totalDocuments = documents.length;
    const totalDownloads = documents.reduce(
      (sum, document) => sum + document.downloads,
      0
    );

    res.status(200).json({
      success: true,
      data: {
        follower: user.followers.length,
        totalDocuments,
        totalDownloads,
      },
    });
  } catch (err) {
    return next(new ErrorHandler(err, 400));
  }
};

//download increases
module.exports.downloadDocument = async (req, res, next) => {
  try {
    const documentId = req.params.id;
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }
    document.downloads += 1;
    await document.save();
    res.status(200).json({
      success: true,
      message: "Document downloaded successfully",
    });
  } catch (err) {
    return next(new ErrorHandler(err, 400));
  }
};
//followers function
module.exports.followers = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const followId = req.params.id;

    const userToFollow = await User.findById(followId);
    if (!userToFollow) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Kiểm tra xem người dùng hiện tại có đang theo dõi người này không
    const currentUser = await User.findById(userId);
    if (currentUser.following.includes(followId)) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user",
      });
    }

    // Thêm userId vào danh sách followers của user cần theo dõi
    userToFollow.followers.push(userId);
    await userToFollow.save();

    res.status(200).json({
      success: true,
      message: "Successfully followed the user",
    });
  } catch (err) {
    return next(new ErrorHandler(err, 400));
  }
};
