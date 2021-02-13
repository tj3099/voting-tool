package de.tj9930.csdstuttgart.votingtool.controller;

import de.tj9930.csdstuttgart.votingtool.model.Question;
import de.tj9930.csdstuttgart.votingtool.model.User;
import de.tj9930.csdstuttgart.votingtool.model.Vote;
import de.tj9930.csdstuttgart.votingtool.model.VoteRequestModel;
import de.tj9930.csdstuttgart.votingtool.repository.QuestionRepository;
import de.tj9930.csdstuttgart.votingtool.repository.UserRepository;
import de.tj9930.csdstuttgart.votingtool.services.VerifyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/api/votes")
public class VoteController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    VerifyUserService verifyUserService;

    @PostMapping("/vote")
    public ResponseEntity<Boolean> vote(@RequestBody VoteRequestModel voteRequestModel) {
        try {
            User user = voteRequestModel.getUser();
            Vote vote = voteRequestModel.getVote();
            User requestedUser = userRepository.findByMail(user.getMail());
            if (user == null || vote == null){
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            // User with higher rights then 0 are not allowed to vote
            if (verifyUserService.verifyUser(user, 0) && !requestedUser.isHasVoted() && !verifyUserService.verifyUser(user, 50)){
                Optional<Question> question = questionRepository.findById(vote.getId());
                if (!question.isPresent() || !question.get().isOpen()) {
                    return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
                }
                switch (vote.getVote()){
                    case ("yes"): question.get().addVoteYes(); break;
                    case ("no"): question.get().addVoteNo(); break;
                    case ("abstention"): question.get().addNoVote(); break;
                    default: return new ResponseEntity<>(false, HttpStatus.NOT_ACCEPTABLE);
                }
                requestedUser.setHasVoted(true);
                userRepository.save(requestedUser);
                questionRepository.save(question.get());
                user.setHasVoted(true);
                return new ResponseEntity<>(user.isHasVoted(), HttpStatus.OK);
            }else {
                return new ResponseEntity<>(false, HttpStatus.FORBIDDEN);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
