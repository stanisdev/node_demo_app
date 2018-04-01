const app = require(process.env.APP_PATH);
const db = app.get('db');

module.exports = {
  idIsNumber(req, res, next) {
    var id = req.params.id;
    if (typeof id != 'string' || isNaN(id)) {
      return next(new Error('Id must be a number'));
    }
    next();
  },
  async categoryExists(req, res, next) {
    const id = req.params.id;
    const category = await db.Category.findById(id);
    if (!(category instanceof Object)) {
      return res.json({
        message: 'Category not found'
      });
    }
    return next();
  }
}
