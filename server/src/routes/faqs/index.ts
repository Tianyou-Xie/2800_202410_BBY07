import { Handler } from "express";
import { authProtected } from "../../middlewares/auth-protected";
import { QuestionModel } from "../../models/question";
import { Resolve } from "../../utils/express";

export const get: Handler[] = [
    authProtected,
    async (req, res) => {
        const questions = await QuestionModel.find();
        Resolve(res).okWith(questions, 'All questions sent.');
    }
]