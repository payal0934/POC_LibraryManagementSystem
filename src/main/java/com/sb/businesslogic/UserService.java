package com.sb.businesslogic;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;

import com.sb.DTO.UserDTO;
import com.sb.EntityManager.UserEntity;
import com.sb.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository; 
    }

    // Add a new user
    public UserEntity addUser(UserEntity user) {
        return userRepository.save(user);
    }

    // Get all users
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<UserEntity> getUserById(int id) {
        return userRepository.findById(id);
    }

    // Delete user by ID
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public boolean validateUser(String username, String password) {
        return userRepository.findByUserNameAndPassword(username, password).isPresent();
    }

    // Find user by username and password (for login)
    public Optional<UserEntity> findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUserNameAndPassword(username, password);
    }
    
 // Signup (register new user)
    public UserEntity signup(UserEntity user) {
        return userRepository.save(user);
    }

    // Login (validate username + password)
    public boolean login(String userName, String password) {
        return userRepository.findByUserNameAndPassword(userName, password).isPresent();
    }

    
    
    public UserDTO convertToDTO(UserEntity user)
    {
    	UserDTO dto=new UserDTO();
    	dto.setUserId(user.getUserId());
    	dto.setUserName(user.getUserName());
    	dto.setRole(user.getRole());
    	return dto;
    }
    
    
}
