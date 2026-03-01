const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateWallet } = require('../utils/walletManager');

exports.register = async (req, res) => {
    try {
        const { email, password, role, profile } = req.body;

        // 1. Validation
        if (!email || !password || !role || !profile || !profile.name) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required including email, password, role, and profile name'
            });
        }

        // 2. Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ success: false, message: 'User already exists' });

        // 3. Generate unique blockchain wallet
        const walletData = generateWallet();
        const encryptedPrivateKey = User.encryptPrivateKey(walletData.privateKey);

        // 4. Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 5. Create user with wallet proof (Simulated Blockchain)
        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            profile: {
                name: profile.name,
                phone: profile.phone || '',
                specialty: profile.specialty || '',
                organization: profile.organization || '',
                diseaseCategory: profile.diseaseCategory || null,
                diseaseCategoryName: profile.diseaseCategoryName || ''
            },
            wallet: {
                address: walletData.address,
                encryptedPrivateKey: encryptedPrivateKey,
                createdAt: new Date()
            }
        });

        // 6. Save through Mongoose query
        await newUser.save();
        console.log(`✅ User registered: ${email} (${role})`);

        res.status(201).json({
            success: true,
            message: 'User registered successfully with blockchain wallet',
            user: {
                id: newUser._id,
                email: newUser.email,
                role: newUser.role,
                walletAddress: walletData.address
            }
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '7d' }
        );

        // Update last login timestamp
        user.lastLogin = new Date();
        await user.save();

        console.log(`🔑 User logged in: ${email}`);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                profile: user.profile,
                walletAddress: user.wallet?.address
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};
