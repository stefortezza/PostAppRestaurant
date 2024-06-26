//package it.PostAppRestaurant;
//
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.opencsv.exceptions.CsvException;
//import it.PostAppRestaurant.Entity.Category;
//import it.PostAppRestaurant.Repository.CategoryRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.core.io.ClassPathResource;
//import org.springframework.stereotype.Component;
//
//import java.io.IOException;
//import java.io.InputStream;
//import java.util.List;
//
//@Component
//public class DataLoader implements CommandLineRunner {
//
//  @Autowired
//  private CategoryRepository categoryRepository;
//
//  @Override
//  public void run(String... args) throws Exception {
//    // Carica i dati JSON dal file
//    ObjectMapper objectMapper = new ObjectMapper();
//    try (InputStream inputStream = new ClassPathResource("db.json").getInputStream()) {
//      JsonNode root = objectMapper.readTree(inputStream);
//      JsonNode categoriesNode = root.path("categories");
//      List<Category> categories = objectMapper.convertValue(categoriesNode, objectMapper.getTypeFactory().constructCollectionType(List.class, Category.class));
//      categoryRepository.saveAll(categories);
//    } catch (Exception e) {
//      System.out.println("Unable to save categories: " + e.getMessage());
//    }
//  }
//}
//
