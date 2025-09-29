const validateTodoTask = (req, res, next) => {
    const { task } = req.body;

    if (!task || task.trim() === '') {
        return res.status(401).json({ message: 'task tidak boleh kosong'});
    }

    next();
}

const validateTodoStatus = (req, res, next) => {
    const { status } = req.body;

    if (!status || (status !== 'on progress' && status !== 'complete')) {
        return res.status(400).json({ message: 'Invalid status. Status harus "on progress" atau "complete".' });
    }

    next()
}

export { validateTodoStatus, validateTodoTask }