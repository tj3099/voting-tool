package com.bezkoder.spring.datajpa.controller;

import com.bezkoder.spring.datajpa.model.Question;
import com.bezkoder.spring.datajpa.model.User;
import com.bezkoder.spring.datajpa.model.Vote;
import com.bezkoder.spring.datajpa.model.VoteRequestModel;
import com.bezkoder.spring.datajpa.repository.UserRepository;
import com.bezkoder.spring.datajpa.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/votes")
public class VoteController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    QuestionRepository questionRepository;

    @PostMapping("/vote")
    public ResponseEntity<User> loginUser(@RequestBody VoteRequestModel voteRequestModel) {
        try {
            User user = voteRequestModel.getUser();
            Vote vote = voteRequestModel.getVote();
            if (user != null || vote != null){
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            User requestedUser = userRepository.findByMail(user.getMail());
            if (requestedUser != null && requestedUser.getMail().equals(user.getMail()) && requestedUser.getSessionId().equals(user.getSessionId())){
                Optional<Question> question = questionRepository.findById(vote.getId());
                if (!question.isPresent()) {
                    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
                }
                if (vote.getNoVotes()){
                    question.get().addNoVote();
                }else if (vote.getVotesYes()){
                    question.get().addVoteYes();
                }else if (vote.getVotesNo()){
                    question.get().addVoteNo();
                }

                requestedUser.setHasVoted(true);
                userRepository.save(requestedUser);
                questionRepository.save(question.get());
                return new ResponseEntity<>(user, HttpStatus.OK);
            }else {
                return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
