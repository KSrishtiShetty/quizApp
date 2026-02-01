package com.org.quizApp2.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.org.quizApp2.model.Quiz;

public interface QuizDao extends JpaRepository<Quiz, Integer> {

}
