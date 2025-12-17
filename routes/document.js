const express = require('express');
const router = express.Router();
const multer = require('multer');

const authMiddleware = require('../middleware/authMiddleware');
const Document = require('../models/Document');

// configure multer for file uploads
const upload = multer({
    dest : "uploads/"
});

// upload document
router.post(
    "/documents",
    authMiddleware,
    upload.single('file'),
    async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
    }
    const doc = await Document.create({
        filename : req.file.filename,
        originalName : req.file.originalname,
        owner : req.user.id,
        path : req.file.path,
        size : req.file.size,
    });
    
    res.status(201).json({
        message : "Document uploaded successfully",
        documentId : doc._id,
    });
    }
)

router.get(
    "/documents/:id",
    authMiddleware,
    async (req, res) => {
        const doc = await Document.findOne({
            _id : req.params.id,
            owner : req.user.id,
        });

        if (!doc) {
            return res.status(404).json({ error: 'Document not found' });
        }

        return res.sendFile(doc.path, { root: process.cwd() });
    }
);

module.exports = router;