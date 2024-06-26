package it.PostAppRestaurant.Dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class OpzionaleDTO {
  private String name;
  private BigDecimal priceOpzionale;
  private boolean selected;
}
