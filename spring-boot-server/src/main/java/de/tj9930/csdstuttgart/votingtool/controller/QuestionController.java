package de.tj9930.csdstuttgart.votingtool.controller;

import de.tj9930.csdstuttgart.votingtool.model.Question;
import de.tj9930.csdstuttgart.votingtool.model.QuestionRequest;
import de.tj9930.csdstuttgart.votingtool.repository.QuestionRepository;
import de.tj9930.csdstuttgart.votingtool.model.User;
import de.tj9930.csdstuttgart.votingtool.repository.UserRepository;
import de.tj9930.csdstuttgart.votingtool.services.VerifyUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    Logger logger = LoggerFactory.getLogger(QuestionController.class);

    @Autowired
    UserRepository userRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    VerifyUserService verifyUserService;

    @PostMapping("/add")
    public ResponseEntity<Question> addQuestion(@RequestBody QuestionRequest questionRequest) {
        try {
            User user = questionRequest.getUser();
            Question question = questionRequest.getQuestion();
            if (user == null || question == null){
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (verifyUserService.verifyUser(user, 50)){
                questionRepository.save(question);
                return new ResponseEntity<>(question, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/open")
    public ResponseEntity<Question> openQuestion(@RequestBody QuestionRequest questionRequest) {
        try {
            User user = questionRequest.getUser();
            Question question = questionRequest.getQuestion();
            if (user == null || question == null){
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (verifyUserService.verifyUser(user, 50)){
                List<Question> questions = questionRepository.findAll();
                for (Question currQuestion: questions) {
                    if(currQuestion.isOpen()){
                        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
                    }
                }
                Question currQuestion = questionRepository.findById(question.getId()).get();
                currQuestion.setOpen(true);
                questionRepository.save(currQuestion);
                logger.info("Question: [" + currQuestion.toString() + "] was opened by " + user.getMail());
                return new ResponseEntity<>(currQuestion, HttpStatus.OK);
            }else {
                logger.info("Question: [" + question.toString() + "] could not be opened by " + user.getMail() + ": forbidden!!");
                return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/close")
    public ResponseEntity<Question> closeQuestion(@RequestBody QuestionRequest questionRequest) {
        try {
            User user = questionRequest.getUser();
            Question question = questionRequest.getQuestion();
            if (user == null || question == null){
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (verifyUserService.verifyUser(user, 50)){
                Question currQuestion = questionRepository.findById(question.getId()).get();
                currQuestion.setOpen(false);
                questionRepository.save(currQuestion);
                logger.info("Question: [" + currQuestion.toString() + "] was closed by " + user.getMail());
                return new ResponseEntity<>(currQuestion, HttpStatus.OK);
            }else {
                logger.info("Question: " + question.getId() + " could not be closed by " + user.getMail() + ": forbidden!!");
                return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Question>> getAllQuestion() {
        try {
            List<Question> questions = questionRepository.findAll();
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all/{isOpen}")
    public ResponseEntity<List<Question>> getAllQuestion(@PathVariable(value = "isOpen", required = true) boolean isOpen) {
        try {
            List<Question> questions = questionRepository.findByIsOpen(isOpen);
            return new ResponseEntity<>(questions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
