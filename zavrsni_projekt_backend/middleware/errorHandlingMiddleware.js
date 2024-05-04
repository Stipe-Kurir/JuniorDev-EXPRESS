const errorHandlingMiddleware = (err, req, res, next) => {

    console.error(err.stack);

    // Odgovor u produkciji
    if (process.env.NODE_ENV === 'production') {
        return res.status(500).send('Dogodila se pogreška');
    }
    // Odgovor u razvojnom okruženju
    res.status(500).send(err.stack);
};

module.exports = errorHandlingMiddleware;
