import { SubmitFeedbackUseCase } from "./submitFeedbackUseCase"

const createFeedbackSpy = jest.fn();
const sendFeedbackSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendFeedbackSpy }
)

describe('Submit feedback', () => {

    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: 'exemple comment',
            screenshot: 'data:image/png;base64,a'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendFeedbackSpy).toHaveBeenCalled()
    })

    it('should not be able if screenshot not have base64 format', async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: 'exemple comment',
            screenshot: 'teste.png'
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback without type', async () => {

        await expect(submitFeedback.execute({
            type: "",
            comment: 'exemple comment',
            screenshot: 'teste.png'
        })).rejects.toThrow();
    })

    it('should not be able to submit feedback without comment', async () => {

        await expect(submitFeedback.execute({
            type: "BUG",
            comment: '',
            screenshot: 'teste.png'
        })).rejects.toThrow();
    })


})