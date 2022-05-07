import express from 'express'

import { PrismaFeedbacksRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { NodemailerMailService } from './services/nodemailer/nodemailerSend';
import { SubmitFeedbackUseCase } from './useCases/submitFeedbackUseCase';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {

    const { type, comment, screenshot } = req.body

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailService = new NodemailerMailService()


    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository, 
        nodemailerMailService
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot
    })

    return res.status(201).send()
})

