package it.PostAppRestaurant.Service;

import it.PostAppRestaurant.Dto.CategoryDTO;
import it.PostAppRestaurant.Dto.IngredientDTO;
import it.PostAppRestaurant.Dto.OpzionaleDTO;
import it.PostAppRestaurant.Entity.Category;
import it.PostAppRestaurant.Entity.Ingredient;
import it.PostAppRestaurant.Entity.Opzionale;
import it.PostAppRestaurant.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  public Category saveCategory(CategoryDTO categoryDTO) {
    Category category = mapToEntity(categoryDTO);
    category.getIngredienti().forEach(ingrediente -> ingrediente.setCategory(category));
    category.getOpzionali().forEach(opzionale -> opzionale.setCategory(category));
    return categoryRepository.save(category);
  }

  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }

  public Category getCategoryById(Long categoryId) {
    return categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));
  }

  public Category updateCategory(Long categoryId, CategoryDTO categoryDTO) {
    Category category = categoryRepository.findById(categoryId).orElseThrow(() -> new RuntimeException("Category not found"));
    category.setTitle(categoryDTO.getTitle());
    category.setPrice(categoryDTO.getPrice());
    category.setImage(categoryDTO.getImage());
    category.setLink(categoryDTO.getLink());

    // Clear existing ingredients and opzionali
    category.getIngredienti().clear();
    category.getOpzionali().clear();

    List<Ingredient> ingredienti = categoryDTO.getIngredienti().stream().map(this::mapToEntity).collect(Collectors.toList());
    ingredienti.forEach(ingrediente -> ingrediente.setCategory(category));
    category.setIngredienti(ingredienti);

    List<Opzionale> opzionali = categoryDTO.getOpzionali().stream().map(this::mapToEntity).collect(Collectors.toList());
    opzionali.forEach(opzionale -> opzionale.setCategory(category));
    category.setOpzionali(opzionali);

    return categoryRepository.save(category);
  }

  public void deleteCategory(Long categoryId) {
    categoryRepository.deleteById(categoryId);
  }

  private Category mapToEntity(CategoryDTO categoryDTO) {
    Category category = new Category();
    category.setTitle(categoryDTO.getTitle());
    category.setPrice(categoryDTO.getPrice());
    category.setImage(categoryDTO.getImage());
    category.setLink(categoryDTO.getLink());

    if (categoryDTO.getIngredienti() != null) {
      List<Ingredient> ingredienti = categoryDTO.getIngredienti().stream().map(this::mapToEntity).collect(Collectors.toList());
      category.setIngredienti(ingredienti);
    }

    if (categoryDTO.getOpzionali() != null) {
      List<Opzionale> opzionali = categoryDTO.getOpzionali().stream().map(this::mapToEntity).collect(Collectors.toList());
      category.setOpzionali(opzionali);
    }

    return category;
  }

  private Ingredient mapToEntity(IngredientDTO ingredientDTO) {
    Ingredient ingredient = new Ingredient();
    ingredient.setName(ingredientDTO.getName());
    ingredient.setSelected(ingredientDTO.isSelected());
    return ingredient;
  }

  private Opzionale mapToEntity(OpzionaleDTO opzionaleDTO) {
    Opzionale opzionale = new Opzionale();
    opzionale.setName(opzionaleDTO.getName());
    opzionale.setPriceOpzionale(opzionaleDTO.getPriceOpzionale());
    opzionale.setSelected(opzionaleDTO.isSelected());
    return opzionale;
  }
}
