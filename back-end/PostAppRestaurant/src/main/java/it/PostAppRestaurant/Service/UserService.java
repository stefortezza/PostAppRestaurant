package it.PostAppRestaurant.Service;

import com.cloudinary.Cloudinary;
import it.PostAppRestaurant.Dto.UserDto;
import it.PostAppRestaurant.Entity.User;
import it.PostAppRestaurant.Enums.Role;
import it.PostAppRestaurant.Exceptions.UserNotFoundException;
import it.PostAppRestaurant.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private Cloudinary cloudinary;

    public User saveUser(UserDto userDto) {
        User user = new User();
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setRole(Role.USER);

        sendRegistrationMail(user);

        userRepository.save(user);
        System.out.println("User with id " + user.getUserId() + " correctly saved!");
        return user;
    }

    public Page<User> getAllUsers(int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return userRepository.findAll(pageable);
    }

    public User getUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found with id " + id));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email " + email));
    }


    public String updateUser(int id, UserDto userDto) {
        User user = getUserById(id);
        user.setUsername(userDto.getUsername());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());

        userRepository.save(user);

        return "User with id " + user.getUserId() + " correctly updated!";
    }

    public String deleteUser(int id) {
        User user = getUserById(id);
        userRepository.deleteById(id);
        return "User with id=" + id + " correctly deleted!";
    }


    private void sendRegistrationMail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Rest Service Registration");
        message.setText("Congratulations, " + user.getName() + " " + user.getSurname() + "! Successful registration to this rest service");

        javaMailSender.send(message);
    }
}

