package com.sb.repository;

import java.util.List;
import java.util.Optional;
import com.sb.repository.UserRepository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sb.EntityManager.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    // Login: find user by username and password
	Optional<UserEntity> findByUserNameAndPassword(String userName, String password);

    // Find users by role (e.g., all admins or all normal users)
    List<UserEntity> findByRole(String role);

    // Optional: find user by username only
    Optional<UserEntity> findByUserName(String userName);
    Optional<UserEntity> findByUserNameAndPasswordAndRole(String userName, String password,String role);
}
