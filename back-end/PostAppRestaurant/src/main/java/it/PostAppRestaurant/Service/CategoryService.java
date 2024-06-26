package it.PostAppRestaurant.Service;

import it.PostAppRestaurant.Dto.CategoryDTO;
import it.PostAppRestaurant.Entity.Category;
import it.PostAppRestaurant.Entity.Ingredient;
import it.PostAppRestaurant.Entity.Opzionale;
import it.PostAppRestaurant.Exceptions.CategoryNotFoundException;
import it.PostAppRestaurant.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CategoryService {

  @Autowired
  private CategoryRepository categoryRepository;

  public Category saveCategory(CategoryDTO categoryDTO) {
    Category category = mapToEntity(categoryDTO);
    return categoryRepository.save(category);
  }

  public List<Category> getAllCategories() {
    return categoryRepository.findAll();
  }

  public Category getCategoryById(Long id) {
    return categoryRepository.findById(id)
      .orElseThrow(() -> new CategoryNotFoundException("Category not found with id " + id));
  }

  public Category updateCategory(Long id, CategoryDTO categoryDTO) {
    Category category = categoryRepository.findById(id)
      .orElseThrow(() -> new CategoryNotFoundException("Category not found with id " + id));

    updateCategoryFromDTO(category, categoryDTO);
    return categoryRepository.save(category);
  }

  public void deleteCategory(Long id) {
    if (!categoryRepository.existsById(id)) {
      throw new CategoryNotFoundException("Category not found with id " + id);
    }
    categoryRepository.deleteById(id);
  }

  private Category mapToEntity(CategoryDTO categoryDTO) {
    Category category = new Category();
    category.setTitle(categoryDTO.getTitle());
    category.setPrice(categoryDTO.getPrice());
    category.setImage(categoryDTO.getImage());
    category.setLink(categoryDTO.getLink());

    List<Ingredient> ingredienti = categoryDTO.getIngredienti().stream()
      .map(dto -> {
        Ingredient ingredient = new Ingredient();
        ingredient.setName(dto.getName());
        ingredient.setSelected(dto.isSelected());
        return ingredient;
      }).collect(Collectors.toList());
    category.setIngredienti(ingredienti);

    List<Opzionale> opzionali = categoryDTO.getOpzionali().stream()
      .map(dto -> {
        Opzionale opzionale = new Opzionale();
        opzionale.setName(dto.getName());
        opzionale.setPriceOpzionale(dto.getPriceOpzionale());
        opzionale.setSelected(dto.isSelected());
        return opzionale;
      }).collect(Collectors.toList());
    category.setOpzionali(opzionali);

    return category;
  }

  private void updateCategoryFromDTO(Category category, CategoryDTO categoryDTO) {
    category.setTitle(categoryDTO.getTitle());
    category.setPrice(categoryDTO.getPrice());
    category.setImage(categoryDTO.getImage());
    category.setLink(categoryDTO.getLink());

    List<Ingredient> ingredienti = categoryDTO.getIngredienti().stream()
      .map(dto -> {
        Ingredient ingredient = new Ingredient();
        ingredient.setName(dto.getName());
        ingredient.setSelected(dto.isSelected());
        return ingredient;
      }).collect(Collectors.toList());
    category.setIngredienti(ingredienti);

    List<Opzionale> opzionali = categoryDTO.getOpzionali().stream()
      .map(dto -> {
        Opzionale opzionale = new Opzionale();
        opzionale.setName(dto.getName());
        opzionale.setPriceOpzionale(dto.getPriceOpzionale());
        opzionale.setSelected(dto.isSelected());
        return opzionale;
      }).collect(Collectors.toList());
    category.setOpzionali(opzionali);
  }
}
