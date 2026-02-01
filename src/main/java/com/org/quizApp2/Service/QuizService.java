package com.org.quizApp2.Service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.org.quizApp2.dao.QuestionDao;
import com.org.quizApp2.dao.QuizDao;
import com.org.quizApp2.model.Question;
import com.org.quizApp2.model.QuestionWrapper;
import com.org.quizApp2.model.Quiz;
import com.org.quizApp2.model.Response;

@Service
public class QuizService {

    @Autowired
    QuizDao quizDao;

    @Autowired
    QuestionDao questionDao;

    public ResponseEntity<String> createQuiz(String category, int numQ, String title) {

        Pageable pageable = PageRequest.of(0, numQ);

        List<Question> questions =
                questionDao.findRandomQuestionsByCategory(category, pageable);

        Quiz quiz = new Quiz();
        quiz.setTitle(title);
        quiz.setQuestion(questions);

        quizDao.save(quiz);

        return new ResponseEntity<>("success", HttpStatus.CREATED);
    }

	public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(Integer id) {
		Optional<Quiz> quiz = quizDao.findById(id);
		List<Question> questionsFromDb=quiz.get().getQuestion();
		List<QuestionWrapper> questionsForUser=new ArrayList<>();
		for(Question q:questionsFromDb)
		{
			QuestionWrapper qw=new QuestionWrapper(q.getId(),q.getQuestionTitle(),q.getOption1(),q.getOption2(),q.getOption3(),q.getOption4());
			questionsForUser.add(qw);
		}
		
		
		return new ResponseEntity<>(questionsForUser,HttpStatus.OK);
	}

	public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
		Quiz quiz=quizDao.findById(id).get();
		List<Question>questions=quiz.getQuestion();
		int right=0;
		int i=0;
		for(Response response: responses)
		{
			if(response.getResponse().equals(questions.get(i).getRightAnswer()))
				right++;
				
				i++;
		}
		return new ResponseEntity<>(right, HttpStatus.OK);
	}
	
	

}
