package it.PostAppRestaurant.Entity;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Embeddable
@Data
public class Ingredient {
  private String name;
  private boolean selected;
}
