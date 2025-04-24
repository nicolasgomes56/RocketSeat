import type { Answer } from "../entities/answer";
import type { AnswersRepository } from "../repositories/answers-repository";
import { AnswerQuestionUseCase } from "./answer-question";

const fakeAnswersRepository: AnswersRepository = {
	create: async (answer: Answer) => {
		return;
	},
};

test("create an answer", async () => {
	const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository);

	const answer = await answerQuestion.execute({
		instructorId: "instructor-1",
		questionId: "question-1",
		content: "This is an answer",
	});

	expect(answer.content).toEqual("This is an answer");
});
