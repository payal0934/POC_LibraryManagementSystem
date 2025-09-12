package com.sb.controller;


import com.sb.ApiResponse.ApiResponse;
import com.sb.DTO.LibraryDTO;
import com.sb.EntityManager.BookEntity;
import com.sb.EntityManager.LibraryEntity;
import com.sb.businesslogic.LibraryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/library")
public class LibraryController {

    private final LibraryService libraryService;

    @Autowired
    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    // Get borrowed books by user
    @GetMapping("/borrowed/{userId}")
    public ResponseEntity<ApiResponse<List<BookEntity>>> getBorrowedBooks(@PathVariable int userId) {
        List<BookEntity> borrowedBooks = libraryService.getBorrowedBooksByUser(userId);
        return ResponseEntity.ok(new ApiResponse<>("success", "Borrowed books fetched", borrowedBooks));
    }

    //  Borrow a book
//    @PostMapping("/borrow/{bookId}")
//    public ResponseEntity<String> borrowBook(@PathVariable int bookId, @RequestParam int userId) {
//        boolean success = libraryService.borrowBook(bookId, userId);
//        if (success) {
//            return ResponseEntity.ok("Book borrowed successfully!");
//        }
//        return ResponseEntity.badRequest().body("Book not available");
//    }
    @PostMapping("/borrow/{bookId}")
    public ResponseEntity<ApiResponse<String>> borrowBook(@PathVariable int bookId, @RequestParam int userId) {
        boolean success = libraryService.borrowBook(bookId, userId);
        if (success) {
            return ResponseEntity.ok(new ApiResponse<>("success", "Book borrowed successfully!", null));
        }
        return ResponseEntity.badRequest().body(new ApiResponse<>("error", "Book not available", null));
    }

 // Get borrow history by user
//    @GetMapping("/history/{userId}")
//    public ResponseEntity<List<LibraryDTO>> getBorrowHistory(@PathVariable int userId) {
//        return ResponseEntity.ok(libraryService.getBorrowHistoryByUserDto(userId));
//    }
    @GetMapping("/history/{userId}")
    public ResponseEntity<ApiResponse<List<LibraryDTO>>> getBorrowHistory(@PathVariable int userId) {
        List<LibraryDTO> history = libraryService.getBorrowHistoryByUserDto(userId);
        return ResponseEntity.ok(new ApiResponse<>("success", "Borrow history fetched", history));
    }


    
    
    //  Return a book
    @PostMapping("/return")
    public ResponseEntity<ApiResponse<String>> returnBook(@RequestParam int bookId, @RequestParam int userId) {
        boolean success = libraryService.returnBook(bookId, userId);
        if (success) {
            return ResponseEntity.ok(new ApiResponse<>("success", "Book returned successfully!", null));
        }
        return ResponseEntity.badRequest().body(new ApiResponse<>("error", "Book not found for user", null));
    }
}
