const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');

router.post('/', deviceController.create);
router.get('/', deviceController.getAll);
router.get('/item/:id', deviceController.getOne);
router.delete('/item/:id', deviceController.delete);
router.get('/search', deviceController.search);
router.put('/item/:id', deviceController.updateRating);

module.exports = router;
