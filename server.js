// require('dotenv').config();
// const express = require('express');
// const bodyParser = require('body-parser');
// // const fetch = require('node-fetch');
// // const uuid = require('uuid');
// const logger = require('morgan');
// // const User = require('../models/user.model');

// // const User = require('./models/user.model');
// const cors = require('cors');
// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(logger('dev'));


// const {userRouter} = require('./router/user.router');
// app.use('/user', userRouter);

// const{eventRouter}=require('./router/event.router');
// app.use('/event',eventRouter);





// app.use(bodyParser.json());





// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });


require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const cors = require('cors');
// const { User } = require('./Server/models/user.model'); // Import your User model
const { User } = require('./server/models/user.model');

const app = express();
app.use(cors());
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(bodyParser.json());


// const {userRouter} = require('./server/router/user.router');
// app.use('/user', userRouter);

const { userRouter } = require('./server/router/user.router');
app.use('/user', userRouter);

const { eventRouter } = require('./server/router/event.router');
app.use('/event', eventRouter);

const { walkieRouter } = require('./server/router/walkie.router');
app.use('/walkie', walkieRouter);

app.post('/user', async (req, res) => {
    const { id_use, password } = req.body;

    try {
        console.log('Received login request with id_use:', id_use);

        const user = await User.findOne({ id_use });

        console.log('Data retrieved from MongoDB:', user);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            return res.json({ success: true, message: 'Login successful', user });
        } else {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// let recordedAudio = null;

// app.post('/startRecording', (req, res) => {
//     console.log('Recording started...');
//     res.sendStatus(200);
// });

// app.post('/startRecording', (req, res) => {
//     console.log('Recording started...');
//     res.sendStatus(200);
// });

// app.post('/stopRecording', (req, res) => {
//     console.log('Recording stopped.');
//     recordedAudio = req.body.audioData;
//     res.sendStatus(200);
// });

// app.get('/getRecordedAudio', (req, res) => {
//     if (recordedAudio) {
//         res.send({ audioData: recordedAudio });
//     } else {
//         res.status(404).send('No recorded audio available');
//     }
// });

// app.post('/sendAudioMessage', async (req, res) => {
//     const { channelId, authToken } = req.body;
//     const audioData = recordedAudio; // Get recorded audio data from the previous requests

//     if (!channelId || !authToken || !audioData) {
//         return res.status(400).send('Missing channelId, authToken, or audioData');
//     }

//     try {
//         const response = await fetch('https://api.zellowork.com/v1/channels/' + channelId + '/audio_message', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'audio/x-wav',
//                 'Authorization': 'Bearer ' + authToken
//             },
//             body: audioData
//         });

//         if (response.ok) {
//             res.sendStatus(200);
//         } else {
//             const data = await response.json();
//             res.status(response.status).send(data);
//         }
//     } catch (error) {
//         console.error('Failed to send audio message:', error);
//         res.status(500).send('Failed to send audio message');
//     }
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

