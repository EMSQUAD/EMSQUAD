// const express = require('express');
// const bcrypt = require('bcrypt');
// const router = express.Router();
// const User = require('../Server/models/user.model'); // Import your User model
// const rateLimit = require('express-rate-limit');


// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, //15 min
//   max: 5, 
//   message: 'Too many login attempts from this IP, please try again later'
// });

// router.post('/user', limiter, async (req, res) => {
//   const { id_use, password } = req.body;

//   try {
//     const user = await User.findOne({ id_use });

//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }

//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (passwordMatch) {
//       const { password, ...userData } = user.toObject();
//       return res.json({ success: true, message: 'Login successful', user: userData });
//     } else {
//       return res.status(401).json({ success: false, message: 'Incorrect password' });
//     }
//   } catch (error) {
//     console.error('Error during authentication:', error);
//     return res.status(500).json({ success: false, message: 'Internal Server Error' });
//   }
// });

// module.exports = router;




const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../Server/models/user.model');
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 min
  max: 5, 
  message: 'Too many login attempts from this IP, please try again later'
});

router.post('/user', limiter, async (req, res) => {
  const { id_use, password } = req.body;

  try {
    const user = await User.findOne({ id_use });

    console.log('User data from MongoDB:', user); // Log user data from MongoDB

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const { password, ...userData } = user.toObject();
      return res.json({ success: true, message: 'Login successful', user: userData });
    } else {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error during authentication:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});


module.exports = router;

