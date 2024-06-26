package it.PostAppRestaurant.Controller;

import it.PostAppRestaurant.Dto.OpzionaleDTO;
import it.PostAppRestaurant.Service.OpzionaleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/opzionali")
public class OpzionaleController {

  @Autowired
  private OpzionaleService opzionaleService;

  @GetMapping
  public List<OpzionaleDTO> getAllOpzionali() {
    return opzionaleService.getAllOpzionali();
  }

  @GetMapping("/{id}")
  public OpzionaleDTO getOpzionaleById(@PathVariable Long id) {
    return opzionaleService.getOpzionaleById(id);
  }

  @PostMapping
  public OpzionaleDTO saveOpzionale(@RequestBody @Validated OpzionaleDTO opzionaleDTO) {
    return opzionaleService.saveOpzionale(opzionaleDTO);
  }

  @PutMapping("/{id}")
  public OpzionaleDTO updateOpzionale(@PathVariable Long id, @RequestBody @Validated OpzionaleDTO opzionaleDTO) {
    return opzionaleService.updateOpzionale(id, opzionaleDTO);
  }

  @DeleteMapping("/{id}")
  public void deleteOpzionale(@PathVariable Long id) {
    opzionaleService.deleteOpzionale(id);
  }
}
