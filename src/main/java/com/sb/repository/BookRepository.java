package com.sb.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sb.EntityManager.BookEntity;

public interface BookRepository extends JpaRepository<BookEntity, Integer> {
	List<BookEntity> findByBookCountGreaterThan(int count);
	List<BookEntity> findByBookCategory(String category);
	 List<BookEntity> findAllByOrderByCreatedAtDesc();
	 List<BookEntity> findAll();

}
