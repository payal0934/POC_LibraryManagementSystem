package com.sb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.sb.EntityManager.BookEntity;
import com.sb.EntityManager.LibraryEntity;

@Repository
public interface LibraryRepository extends JpaRepository<LibraryEntity, Integer> {

    // Find a specific borrowed book (for returning)
    Optional<LibraryEntity> findByBook_BookIdAndUser_UserIdAndReturnedFalse(int bookId, int userId);

    // Find borrowed books for a user (only not returned ones)
    @Query("SELECT l.book FROM LibraryEntity l WHERE l.user.userId = :userId AND l.returned = false")
    List<BookEntity> findBorrowedBooksByUser(@Param("userId") int userId);

    // Find all borrowed (not returned) books for a user
    List<LibraryEntity> findByUser_UserIdAndReturnedFalse(int userId);

    // Find all borrow records of a user (returned + not returned)
    List<LibraryEntity> findByUser_UserId(int userId);

    // Count how many times a book is borrowed but not returned
    long countByBook_BookIdAndReturnedFalse(int bookId);

    // Find the borrow record if not yet returned
    LibraryEntity findByUser_UserIdAndBook_BookIdAndReturnedFalse(int userId, int bookId);

    // Check if a user already borrowed a book and hasn’t returned it
    boolean existsByBookBookIdAndUserUserIdAndReturnedFalse(int bookId, int userId);
}
