module.exports = (express, app) => {
    const router = express.Router();
    const path = require('path');

    router.get('/favicon.ico', (req, res) => {
        res.sendFile(path.join(__dirname, '../../public/favicon.ico'));
    });


    app.use('/', router);
};