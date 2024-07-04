package it.PostAppRestaurant.Controller;

import it.PostAppRestaurant.Dto.CategoryDTO;
import it.PostAppRestaurant.Entity.Category;
import it.PostAppRestaurant.Exceptions.BadRequestException;
import it.PostAppRestaurant.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @PostMapping("/categories")
  @ResponseStatus(HttpStatus.CREATED)
  @PreAuthorize("hasAuthority('ADMIN')")
  public Category createCategory(@RequestBody @Validated CategoryDTO categoryDTO, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      throw new BadRequestException(bindingResult.getAllErrors().stream()
        .map(objectError -> objectError.getDefaultMessage())
        .reduce("", (s, s2) -> s + s2));
    }
    return categoryService.saveCategory(categoryDTO);
  }

  @GetMapping("/categories")
  public List<Category> getAllCategories() {
    return categoryService.getAllCategories();
  }

  @GetMapping("/categories/{categoryId}")
  public Category getCategoryById(@PathVariable Long categoryId) {
    return categoryService.getCategoryById(categoryId);
  }

  @PutMapping("/categories/{categoryId}")
  @PreAuthorize("hasAuthority('ADMIN')")
  public Category updateCategory(@PathVariable Long categoryId, @RequestBody @Validated CategoryDTO categoryDTO, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      throw new BadRequestException(bindingResult.getAllErrors().stream()
        .map(objectError -> objectError.getDefaultMessage())
        .reduce("", (s, s2) -> s + s2));
    }
    return categoryService.updateCategory(categoryId, categoryDTO);
  }

  @DeleteMapping("/categories/{categoryId}")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteCategory(@PathVariable Long categoryId) {
    categoryService.deleteCategory(categoryId);
  }
}
