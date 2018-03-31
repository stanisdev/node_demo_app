module.exports = {
  idIsNumber(req, res, next) {
    var id = req.params.id;
    if (typeof id != 'string' || isNaN(id)) {
      return next(new Error('Id must be a number'));
    }
    next();
  }
}
