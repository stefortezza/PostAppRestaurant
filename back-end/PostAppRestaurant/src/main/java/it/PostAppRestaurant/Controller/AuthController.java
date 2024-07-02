package it.PostAppRestaurant.Controller;

import it.PostAppRestaurant.Dto.UserDto;
import it.PostAppRestaurant.Dto.UserLoginDto;
import it.PostAppRestaurant.Exceptions.BadRequestException;
import it.PostAppRestaurant.Service.AuthService;
import it.PostAppRestaurant.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
  @Autowired
  private AuthService authService;
  @Autowired
  private UserService userService;

  @PostMapping("/auth/register")
  public void register(@RequestBody @Validated UserDto userDto, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      throw new BadRequestException(bindingResult.getAllErrors().stream().map(ObjectError::getDefaultMessage)
        .reduce("", (s, s2) -> s + s2));
    }
    userService.saveUser(userDto);
  }

  @PostMapping("/auth/login")
  public String login(@RequestBody @Validated UserLoginDto userLoginDto, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      throw new BadRequestException(bindingResult.getAllErrors().stream().map(ObjectError::getDefaultMessage)
        .reduce("", (s, s2) -> s + s2));
    }

    return authService.authenticateUserAndCreateToken(userLoginDto);
  }
}
