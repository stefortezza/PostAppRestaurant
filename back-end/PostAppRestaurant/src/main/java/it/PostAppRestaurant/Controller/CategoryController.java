package it.PostAppRestaurant.Controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import it.PostAppRestaurant.Dto.CategoryDTO;
import it.PostAppRestaurant.Entity.Category;
import it.PostAppRestaurant.Exceptions.BadRequestException;
import it.PostAppRestaurant.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  private final Cloudinary cloudinary;

  @Autowired
  public CategoryController(Cloudinary cloudinary) {
    this.cloudinary = cloudinary;
  }

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

  @PostMapping("/categories/upload")
  @ResponseStatus(HttpStatus.CREATED)
  @PreAuthorize("hasAuthority('ADMIN')")
  public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
    Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
    return uploadResult.get("url").toString();
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
