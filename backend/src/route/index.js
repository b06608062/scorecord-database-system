import express from 'express';
import { saveUser, deleteDB, queryName, querySubject } from './api/accessDatabase';

const router = express.Router();

router.delete('/clear-db', async (_, res) => {
    try {
        await deleteDB();
        console.log("Database deleted");
        res.json({ message: "Database cleared", isFailed: false });
    } catch {
        console.log("Please check that your db has connected");
        res.json({ message: "Please check that your db has connected", isFailed: true });
    }
});

router.post('/create-card', async (req, res) => {
    try {
        const { name, subject, score } = req.body;
        const { isUpdate, messages } = await saveUser(name, subject, score);
        if (isUpdate) {
            res.json({ message: `Updating(${name}, ${subject}, ${score})`, card: messages })
        } else {
            res.json({ message: `Adding(${name}, ${subject}, ${score})`, card: messages })
        }
    } catch {
        console.log("Please check that your db has connected");
        res.json({ message: "Please check that your db has connected", isFailed: true });        
    }
});

router.get('/query-cards', async (req, res) => {
    try {
        const { type, queryString } = req.query;
        const messages = type === "name" ? await queryName(queryString) : await querySubject(queryString);
        console.log(messages);
        if (messages.length !== 0) {
            res.json({ messages: messages.map((m) => `Found card with ${type}: (${m.name}, ${m.subject}, ${m.score})`), card: messages });
        } else {
            res.json({ message: `${type === "name" ? "Name" : "Subject"} ${queryString} not found!` });
        }
    } catch {
        console.log("Please check that your db has connected");
        res.json({ message: "Please check that your db has connected" });         
    }
});

export default router;