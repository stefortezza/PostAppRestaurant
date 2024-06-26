package it.PostAppRestaurant.Security;
import it.PostAppRestaurant.Entity.User;
import it.PostAppRestaurant.Exceptions.UnauthorizedException;
import it.PostAppRestaurant.Exceptions.UserNotFoundException;
import it.PostAppRestaurant.Service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JetFilter extends OncePerRequestFilter {


    @Autowired
    private JwtTool jwtTool;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Error in authorization, Token missing!");
        }

        String token = authHeader.substring(7);

        jwtTool.verifyToken(token);

        //aggiunta di questa sezione per recuperare lo user che ha l'id che si trova nel token. Serve
        //per creare un oggetto di tipo authentication che contiene i ruoli dell'utente e inserirli nel contesto della
        //sicurezza!
        int userId = jwtTool.getIdFromToken(token);

        User user = userService.getUserById(userId);
        if (user != null) {

            Authentication authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } else {
            throw new UserNotFoundException("User with id=" + userId + " not found!");
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return new AntPathMatcher().match("/auth/**", request.getServletPath());
    }
}
