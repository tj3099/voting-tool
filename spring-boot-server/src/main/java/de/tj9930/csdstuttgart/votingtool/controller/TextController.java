package de.tj9930.csdstuttgart.votingtool.controller;

import de.tj9930.csdstuttgart.votingtool.model.Text;
import de.tj9930.csdstuttgart.votingtool.model.TextRequest;
import de.tj9930.csdstuttgart.votingtool.repository.TextRepository;
import de.tj9930.csdstuttgart.votingtool.services.VerifyUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/texts")
public class TextController {

    @Autowired
    TextRepository textRepository;

    @Autowired
    VerifyUserService verifyUserService;


    @GetMapping("/init/{mandant}")
    public ResponseEntity<String> init (@PathVariable("mandant") String mandant) {
        try {
                Text text;
                if (textRepository.findByMandant(mandant).isPresent()){
                    text = textRepository.findByMandant(mandant).get();
                    return new ResponseEntity<>(text.getText(), HttpStatus.OK);
                }
                    return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }catch (Exception e) {
                return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/setTexts")
    public ResponseEntity<String> setTexts (@RequestBody TextRequest textRequest) {
        try {
            if(verifyUserService.verifyUser(textRequest.getUser(), 99)){
                textRepository.save(textRequest.getText());
                Text text;
                if (textRepository.findByMandant(textRequest.getText().getMandant()).isPresent()){
                    text = textRepository.findByMandant(textRequest.getText().getMandant()).get();
                    return new ResponseEntity<>(text.getText(), HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
