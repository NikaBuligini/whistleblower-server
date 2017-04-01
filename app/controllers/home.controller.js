export default function dashboard(req, res) {
  res.render('./pages/home', {
    title: 'Dashboard',
    user: req.user,
  });
}
