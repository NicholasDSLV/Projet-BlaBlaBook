import 'dotenv/config';

export function localsUser (req, res, next) {
    // user
    req.session?.user
    res.locals.user = req.session.user || null;

    // flash message (1 seul fois)
    res.locals.flash = req.session?.flash || null;
    delete req.session.flash;
  next();
}
