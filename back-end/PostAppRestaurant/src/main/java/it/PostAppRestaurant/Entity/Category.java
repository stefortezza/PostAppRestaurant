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
  private Long categoryId;

  private String title;
  private BigDecimal price;
  private String image;
  private String link;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "category_id", referencedColumnName = "categoryId")
  private List<Ingredient> ingredienti;

  @OneToMany(cascade = CascadeType.ALL)
  @JoinColumn(name = "category_id", referencedColumnName = "categoryId")
  private List<Opzionale> opzionali;
}


