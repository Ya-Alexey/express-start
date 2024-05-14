import { Router } from "express";

const router = Router();

router.post('/', function(req, res) {
    res.status(201)
       .json({ id: 1, mail: "test@mail.ru" })
});

export {
    router,
}