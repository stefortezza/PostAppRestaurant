package it.PostAppRestaurant.Service;

import it.PostAppRestaurant.Dto.UserLoginDto;
import it.PostAppRestaurant.Entity.User;
import it.PostAppRestaurant.Exceptions.UnauthorizedException;
import it.PostAppRestaurant.Security.JwtTool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtTool jwtTool;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public String authenticateUserAndCreateToken(UserLoginDto userLoginDto) {
    User user = userService.getUserByEmail(userLoginDto.getEmail());

    if (passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) {
      return jwtTool.createToken(user);
    } else {
      throw new UnauthorizedException("Error in authorization, relogin!");
    }
  }
}
