import User from '../../models/ScoreCard';

const saveUser = async (name, subject, score) => {
    const isUpdate = await User.findOne({ name, subject });
    if (!isUpdate) {
        const newUser = new User({ name, subject, score });
        await newUser.save();
    } else {
        await User.updateOne(isUpdate, { $set: { score } });
    }
    const messages = await User.find({ name });
    return { isUpdate, messages };
};

const deleteDB = async () => {
    await User.deleteMany({});
};

const queryName = async (name) => {
     return await User.find({ name: name });
};

const querySubject = async (subject) =>{
    return await User.find({ subject: subject });
};

export { saveUser, deleteDB, queryName, querySubject };