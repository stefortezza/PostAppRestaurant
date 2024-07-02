package it.PostAppRestaurant.Dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class CategoryDTO {
  private String title;
  private BigDecimal price;
  private String image;
  private String link;
  private List<IngredientDTO> ingredienti;
  private List<OpzionaleDTO> opzionali;
}
