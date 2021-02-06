package de.tj9930.csdstuttgart.votingtool.controller;

import de.tj9930.csdstuttgart.votingtool.repository.UserRepository;
import de.tj9930.csdstuttgart.votingtool.model.User;
import de.tj9930.csdstuttgart.votingtool.model.UserForLogedinRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserRepository userRepository;

	@PutMapping("/user/getGrants")
	public ResponseEntity<Integer> getGrants(@RequestBody User user) {
		if(verifyUser(user, 0)){
			user = userRepository.findByMail(user.getMail());
		}

		return new ResponseEntity<Integer>(user.getGrants(), HttpStatus.OK);
	}

	@GetMapping("/init")
	public ResponseEntity<List<User>> getAllUsers() {
		User admin = new User("admin", "admin", false, 99);
		User user = new User("user", "user", false, 0);

		userRepository.save(admin);
		userRepository.save(user);
		return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
	}


	@PostMapping("/user/login")
	public ResponseEntity<User> loginUser(@RequestBody User user) {
		try {
			User requestedUser = userRepository.findByMail(user.getMail());
			if (requestedUser != null && requestedUser.getMail().equals(user.getMail()) && requestedUser.getSecretKey().equals(user.getSecretKey())){
				UUID uuid = UUID.randomUUID();
				user.setSessionId(uuid.toString());
				requestedUser.setSessionId(uuid.toString());
				userRepository.save(requestedUser);
				user.setGrants(requestedUser.getGrants());
				user.setHasVoted(requestedUser.isHasVoted());
				return new ResponseEntity<>(user, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/user/logout")
	public ResponseEntity<User> logoutUser(@RequestBody User user){
		try {
			User requestedUser = userRepository.findByMail(user.getMail());
			if (requestedUser != null && requestedUser.getSessionId().equals(user.getSessionId())){
				requestedUser.setSessionId(null);
				userRepository.save(requestedUser);
				return new ResponseEntity<>(null, HttpStatus.OK);
			}else {
				return new ResponseEntity<>(null,HttpStatus.FORBIDDEN);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/user")
	public ResponseEntity<List<User>> getAllUsers(@RequestBody User callingUser) {
		if(verifyUser(callingUser, 99)) {
			try {
				List<User> users = new ArrayList<User>();

				userRepository.findAll().forEach(users::add);

				if (users.isEmpty()) {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}

				return new ResponseEntity<>(users, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}else {
			return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
		}
	}

	@PutMapping("/getHasVoted")
	public ResponseEntity<Boolean> getHasVoted(@RequestBody User callingUser) {
		if(verifyUser(callingUser, 0)) {
			try {

				User user = userRepository.findByMail(callingUser.getMail());

				return new ResponseEntity<>(user.isHasVoted(), HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}else {
			return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
		}
	}

	@PutMapping("/user/{mail}")
	public ResponseEntity<User> getUserByMail(@PathVariable("mail") String mail, @RequestBody User callingUser) {
		if(verifyUser(callingUser, 99)) {
			User user = userRepository.findByMail(mail);
			if (user != null) {
				return new ResponseEntity<>(user, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
		}else {
			return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
		}
	}

	@PostMapping("/user/add")
	public ResponseEntity<User> createUser(@RequestBody UserForLogedinRequest userForLogedinRequest) {
		User callingUser = userForLogedinRequest.getCallingUser();
		if(verifyUser(callingUser, 99)) {
			try {
				User userToBeAdded = userForLogedinRequest.getUser();
				User _user;
				if (userToBeAdded.getGrants() != null) {
					_user = userRepository
							.save(new User(userToBeAdded.getMail(), userToBeAdded.getSecretKey(), false, userToBeAdded.getGrants()));

				} else {
					_user = userRepository
							.save(new User(userToBeAdded.getMail(), userToBeAdded.getSecretKey(), false));
				}
				return new ResponseEntity<>(_user, HttpStatus.CREATED);
			} catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}else {
			return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
		}
	}


	@PutMapping("/user/resetVoting/{hasVoted}")
	public ResponseEntity<String> updateVoting(@PathVariable("hasVoted")boolean hasVoted, @RequestBody User callingUser) {
		if(verifyUser(callingUser, 99)) {
			List<User> users = userRepository.findAll();

			for (User user : users) {
				user.setHasVoted(hasVoted);
			}
			userRepository.saveAll(users);
			return new ResponseEntity<>("Reseted Voting", HttpStatus.OK);
		}else {
			return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
		}
	}

	@GetMapping("/user/hasNotVoted")
	public ResponseEntity<List<User>> findByHasVoted(@RequestBody User callingUser) {
		if(verifyUser(callingUser, 99)) {
			try {
				List<User> users = userRepository.findByHasVoted(false);

				if (users.isEmpty()) {
					return new ResponseEntity<>(HttpStatus.NO_CONTENT);
				}
				return new ResponseEntity<>(users, HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}else {
			return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
		}
	}

	public boolean verifyUser(User user, int grants){
		User requestedUser = userRepository.findByMail(user.getMail());
		if (requestedUser != null && requestedUser.getMail().equals(user.getMail()) && requestedUser.getSessionId().equals(user.getSessionId())
				&& requestedUser.getGrants() >= grants){
			return true;
		}
		return false;
	}

}
