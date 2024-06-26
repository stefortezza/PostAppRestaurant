package it.PostAppRestaurant.Service;

import it.PostAppRestaurant.Dto.IngredientDTO;
import it.PostAppRestaurant.Entity.Ingredient;
import it.PostAppRestaurant.Repository.IngredientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class IngredientService {

  @Autowired
  private IngredientRepository ingredientRepository;

  public List<IngredientDTO> getAllIngredients() {
    List<Ingredient> ingredients = ingredientRepository.findAll();
    return ingredients.stream()
      .map(this::mapToDTO)
      .collect(Collectors.toList());
  }

  public IngredientDTO getIngredientById(Long id) {
    Optional<Ingredient> optionalIngredient = ingredientRepository.findById(id);
    return optionalIngredient.map(this::mapToDTO).orElse(null);
  }

  public IngredientDTO saveIngredient(IngredientDTO ingredientDTO) {
    Ingredient ingredient = new Ingredient();
    ingredient.setName(ingredientDTO.getName());
    ingredient.setSelected(ingredientDTO.isSelected());
    Ingredient savedIngredient = ingredientRepository.save(ingredient);
    return mapToDTO(savedIngredient);
  }

  public IngredientDTO updateIngredient(Long id, IngredientDTO ingredientDTO) {
    Optional<Ingredient> optionalIngredient = ingredientRepository.findById(id);
    if (optionalIngredient.isPresent()) {
      Ingredient ingredient = optionalIngredient.get();
      ingredient.setName(ingredientDTO.getName());
      ingredient.setSelected(ingredientDTO.isSelected());
      Ingredient updatedIngredient = ingredientRepository.save(ingredient);
      return mapToDTO(updatedIngredient);
    }
    return null;
  }

  public void deleteIngredient(Long id) {
    ingredientRepository.deleteById(id);
  }

  private IngredientDTO mapToDTO(Ingredient ingredient) {
    IngredientDTO dto = new IngredientDTO();
    dto.setName(ingredient.getName());
    dto.setSelected(ingredient.isSelected());
    return dto;
  }
}
