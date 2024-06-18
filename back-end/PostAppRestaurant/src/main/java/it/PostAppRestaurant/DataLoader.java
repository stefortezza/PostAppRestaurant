package it.PostAppRestaurant;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.exceptions.CsvException;
import it.PostAppRestaurant.Entity.Category;
import it.PostAppRestaurant.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

  @Autowired
  private CategoryRepository categoryRepository;

  @Override
  public void run(String... args) throws Exception {
    ObjectMapper objectMapper = new ObjectMapper();
    try (InputStream inputStream = new ClassPathResource("db.json").getInputStream()) {
      TypeReference<List<Category>> typeReference = new TypeReference<List<Category>>() {};
      List<Category> categories = objectMapper.readValue(inputStream, typeReference);
      categoryRepository.saveAll(categories);
    } catch (IOException e) {
      System.out.println("Unable to save categories: " + e.getMessage());
    }
  }
}

