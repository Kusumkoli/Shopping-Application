exports.(req,res,next) => {        
    res.status(404).render('404', {pageTitle: 'Page Not Found'}) //setting 4040 error page
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
}