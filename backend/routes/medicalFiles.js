const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// ─── Multer storage config ────────────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Preserve original extension; use timestamp as filename
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ─── Report upload + blockchain proof (Doctor → POST) ────────────────────────
// Called by DoctorCategoryView.tsx via api.reports.upload()
router.post('/upload', authMiddleware, upload.single('reportFile'), reportController.uploadReport);

// ─── Record a raw blockchain transfer entry ───────────────────────────────────
// Called by DoctorFileUpload.tsx → POST /api/reports/blockchain-transfer
router.post('/blockchain-transfer', authMiddleware, reportController.recordBlockchainTransfer);

// ─── Get all reports for a patient (by User._id) ─────────────────────────────
// Called by DoctorCategoryView.tsx / Dashboard via api.reports.getPatientReports(userId)
router.get('/patient/:patientId', authMiddleware, reportController.getPatientReports);

// ─── Download a report file by stored filename ───────────────────────────────
router.get('/download/:fileHash', authMiddleware, reportController.downloadReport);

// ─── Get all blockchain transfers received by a wallet address ───────────────
// Called by PatientFilesList.tsx → GET /api/reports/transfers/:walletAddress
router.get('/transfers/:walletAddress', authMiddleware, reportController.getTransfersByWallet);

// ─── Verify a file's blockchain integrity by fileId / fileHash ───────────────
// Called by PatientFileDownload.tsx → GET /api/reports/verify-integrity/:fileId
router.get('/verify-integrity/:fileId', authMiddleware, reportController.verifyIntegrity);

module.exports = router;
