import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";

const router = Router();

router.get('/test', (request: Request, response: Response) => {
    return response.json({ ok: true });
});

// Rotas de usuário
router.post('/user', new CreateUserController().handle);

export { router };