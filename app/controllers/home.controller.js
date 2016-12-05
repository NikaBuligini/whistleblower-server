module.exports = {
  dashboard(req, res) {
    res.render('./pages/home', {
      title: 'Dashboard',
    });
  },
};
