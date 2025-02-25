package com.javasingh.urlshortener.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.javasingh.urlshortener.models.UrlMapping;
import com.javasingh.urlshortener.models.User;

@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {
   UrlMapping findByShortUrl(String shortUrl);
   List<UrlMapping> findByUser(User user);
}
