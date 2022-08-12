const router = require('./authRoutes');
const iconsController = require('../../controllers/iconsController');

router.get('/icons_categories', iconsController.icons_categories_get);

module.exports = router;