package com.bezkoder.spring.datajpa.repository;

import com.bezkoder.spring.datajpa.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
	Optional<Question> findById(Long id);
	List<Question> findByIsOpen(boolean isOpen);
}
