package it.PostAppRestaurant.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Data
public class Category {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String title;

  @ElementCollection
  private List<Ingredient> ingredienti;

  @ElementCollection
  private List<Opzionale> opzionali;

  private String price;
  private String image;
  private String link;

}


