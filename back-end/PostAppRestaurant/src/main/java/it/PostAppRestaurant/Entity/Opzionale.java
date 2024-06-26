package it.PostAppRestaurant.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
public class Opzionale {
  @Id
  @GeneratedValue
  private Long id;

  private String name;
  private BigDecimal priceOpzionale;
  private boolean selected;

  @ManyToOne
  @JoinColumn(name = "category_id")
  @JsonIgnore
  private Category category;
}
