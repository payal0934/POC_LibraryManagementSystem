package com.sb.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sb.EntityManager.BookEntity;
import com.sb.EntityManager.LibraryEntity;
import com.sb.EntityManager.UserEntity;
@Repository
public interface LibraryRepository extends JpaRepository<LibraryEntity, Integer> {

    // Find a specific borrowed book (for returning)
    Optional<LibraryEntity> findByBook_BookIdAndUser_UserIdAndReturnedFalse(int bookId, int userId);
    @Query("SELECT l.book FROM LibraryEntity l WHERE l.user.userId = :userId AND l.returned = false")
    List<BookEntity> findBorrowedBooksByUser(@Param("userId") int userId);

    // Find all borrowed (not returned) books for a user
    List<LibraryEntity> findByUser_UserIdAndReturnedFalse(int userId);
    List<LibraryEntity> findByUser_UserId(int userId);
    long countByBook_BookIdAndReturnedFalse(int bookId);
    LibraryEntity findByUser_UserIdAndBook_BookIdAndReturnedFalse(int userId, int bookId);
    boolean existsByBookBookIdAndUserUserIdAndReturnedFalse(int bookId, int userId);
}
