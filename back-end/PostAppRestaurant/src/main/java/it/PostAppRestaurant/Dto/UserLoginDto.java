package it.PostAppRestaurant.Dto;

import jakarta.validation.constraints.Email;
import lombok.Data;

@Data
public class UserLoginDto {
    @Email
    private String email;
    private String password;
}
