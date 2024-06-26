package it.PostAppRestaurant.Controller;

import it.PostAppRestaurant.Dto.IngredientDTO;
import it.PostAppRestaurant.Service.IngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ingredients")
public class IngredientController {

  @Autowired
  private IngredientService ingredientService;

  @GetMapping
  public List<IngredientDTO> getAllIngredients() {
    return ingredientService.getAllIngredients();
  }

  @GetMapping("/{id}")
  public IngredientDTO getIngredientById(@PathVariable Long id) {
    return ingredientService.getIngredientById(id);
  }

  @PostMapping
  public IngredientDTO saveIngredient(@RequestBody @Validated IngredientDTO ingredientDTO) {
    return ingredientService.saveIngredient(ingredientDTO);
  }

  @PutMapping("/{id}")
  public IngredientDTO updateIngredient(@PathVariable Long id, @RequestBody @Validated IngredientDTO ingredientDTO) {
    return ingredientService.updateIngredient(id, ingredientDTO);
  }

  @DeleteMapping("/{id}")
  public void deleteIngredient(@PathVariable Long id) {
    ingredientService.deleteIngredient(id);
  }
}
