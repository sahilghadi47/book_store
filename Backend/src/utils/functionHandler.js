const functionHandler = (requestHander) => {
    return (req, res, next) => {
        requestHander(req, res, next).catch((err) => next(err));
    };
};

export { functionHandler };
