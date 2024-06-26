package it.PostAppRestaurant.Dto;


import it.PostAppRestaurant.Enums.Role;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserDto {

  @NotBlank(message = "Username can not be null or empty!")
  @Size(min = 4, max = 55)
  private String username;
  @NotBlank
  @Email
  @Size(min = 2, max = 50)
  private String email;
  @NotBlank(message = "Password can not be null or empty!")
  @Size(min = 3, max = 55)
  private String password;
  @NotBlank(message = "Name can not be null or empty!")
  @Size(min = 2, max = 50)
  private String name;
  @NotBlank(message = "Surname can not be null or empty!")
  @Size(min = 1, max = 55)
  private String surname;
  @Enumerated(EnumType.STRING)
  private Role role;
}
