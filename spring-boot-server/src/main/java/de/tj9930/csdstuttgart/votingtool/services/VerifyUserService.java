package de.tj9930.csdstuttgart.votingtool.services;

import de.tj9930.csdstuttgart.votingtool.model.User;
import de.tj9930.csdstuttgart.votingtool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VerifyUserService {

    @Autowired
    UserRepository userRepository;

    public boolean verifyUser(User user, int grants){
        User requestedUser = userRepository.findByMail(user.getMail());
        if (requestedUser != null && requestedUser.getMail().equals(user.getMail()) && requestedUser.getSessionId().equals(user.getSessionId())
                && requestedUser.getGrants() >= grants){
            return true;
        }
        return false;
    }

}
