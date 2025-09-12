package com.sb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sb.ApiResponse.ApiResponse;
import com.sb.DTO.UserDTO;
import com.sb.EntityManager.UserEntity;
import com.sb.businesslogic.UserService;
import com.sb.repository.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
// @CrossOrigin(origins = "http://localhost:3000")  
public class UserController {

    private final UserService userService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    	
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<Void>> signup(@RequestParam String userName,
                                                   @RequestParam String password,
                                                   @RequestParam String role) {
        if (userRepository.findByUserName(userName).isPresent()) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Username already exists!"));
        }

        UserEntity newUser = new UserEntity(userName, password, role);
        userRepository.save(newUser);

        return ResponseEntity.ok(ApiResponse.success("User registered successfully!", null));
    }

    

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<Object>> login(@RequestParam String userName,
                                                     @RequestParam String password,
                                                     @RequestParam String role) {
        Optional<UserEntity> user = userRepository.findByUserNameAndPasswordAndRole(userName, password, role);

        if (user.isPresent()) {
            UserEntity u = user.get();
            HashMap<String, Object> safeUser = new HashMap<>() {{
                put("userId", u.getUserId());
                put("userName", u.getUserName());
                put("role", u.getRole());
            }};
            return ResponseEntity.ok(new ApiResponse<>("success", "Login successful", safeUser));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse<>("error", "Invalid credentials", null));
        }
    }

    // ✅ Get all users as DTOs
//    @GetMapping
//    public ResponseEntity<List<UserDTO>> getAllUsers() {
//        List<UserDTO> userDTOs = userService.getAllUsers().stream()
//                                    .map(userService::convertToDTO)
//                                    .collect(Collectors.toList());
//        return ResponseEntity.ok(userDTOs);
//    }
//
//    // ✅ Get user by id as DTO
//    @GetMapping("/{id}")
//    public ResponseEntity<UserDTO> getUserById(@PathVariable int id) {
//        UserEntity user = userService.getUserById(id)
//                                     .orElseThrow(() -> new RuntimeException("User not found"));
//        return ResponseEntity.ok(userService.convertToDTO(user));
//    }
    
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<UserDTO>>> getAllUsers() {
        List<UserDTO> userDTOs = userService.getAllUsers().stream()
                .map(userService::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(new ApiResponse<>("success", "Users fetched successfully", userDTOs));
    }

    // ✅ Get user by id
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<UserDTO>> getUserById(@PathVariable int id) {
        UserEntity user = userService.getUserById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(new ApiResponse<>("success", "User found", userService.convertToDTO(user)));
    }
}
