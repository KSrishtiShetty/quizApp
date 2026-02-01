package com.org.quizApp2.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.org.quizApp2.Service.QuizService;
import com.org.quizApp2.model.QuestionWrapper;
import com.org.quizApp2.model.Response;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/quiz")

public class QuizConrtroller {
	
	@Autowired
	QuizService quizService;
	
	@PostMapping("create")
	public ResponseEntity<String>createQuiz(@RequestParam String category, @RequestParam int numQ,@RequestParam String title )
	{
		return quizService.createQuiz(category,numQ,title);
	}
	@GetMapping("get/{id}")
	public ResponseEntity<List<QuestionWrapper>> getQuizQUestions(@PathVariable Integer id)
	{
		return quizService.getQuizQuestions(id);
	}

	@PostMapping("/submit/{id}")
	public ResponseEntity<Integer>SubmitQuiz(@PathVariable Integer id, @RequestBody List<Response>responses)
	{
		return quizService.calculateResult(id,responses);
	}
	
}
