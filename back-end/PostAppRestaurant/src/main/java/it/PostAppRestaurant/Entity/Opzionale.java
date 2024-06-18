package it.PostAppRestaurant.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;


@Embeddable
@Data
public class Opzionale {
  private String name;
  private BigDecimal priceOpzionale;
  private boolean selected;
}
