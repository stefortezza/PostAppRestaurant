package it.PostAppRestaurant.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Ingredient {
  @Id
  @GeneratedValue
  private Long id;

  private String name;
  private boolean selected;

  @ManyToOne
  @JoinColumn(name = "category_id")
  @JsonIgnore
  private Category category;
}
