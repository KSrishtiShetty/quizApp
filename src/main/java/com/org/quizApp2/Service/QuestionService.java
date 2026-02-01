package com.org.quizApp2.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.org.quizApp2.dao.QuestionDao;
import com.org.quizApp2.model.Question;

@Service
public class QuestionService {
	@Autowired
	QuestionDao questionDao;
	
	public ResponseEntity<List<Question>> getAllQuestions()
	{
		try {
		return new ResponseEntity<> (questionDao.findAll(),HttpStatus.OK);
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return new ResponseEntity<> (questionDao.findAll(),HttpStatus.BAD_REQUEST);
	}

	public ResponseEntity<List<Question>>  getQuestionsByCategory(String category) {
		
		try {
			return new ResponseEntity<>(questionDao.findByCategory(category),HttpStatus.OK);
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
			return new ResponseEntity<> (questionDao.findAll(),HttpStatus.BAD_REQUEST);
		
		
		// TODO Auto-generated method stub
		
	}

	public ResponseEntity<String> addQuestion(Question question) {
		// TODO Auto-generated method stub
		
			questionDao.save(question);
			return new ResponseEntity<> ("success",HttpStatus.CREATED);
	}

}
