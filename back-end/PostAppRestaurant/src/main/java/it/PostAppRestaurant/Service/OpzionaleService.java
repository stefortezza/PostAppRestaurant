package it.PostAppRestaurant.Service;

import it.PostAppRestaurant.Dto.OpzionaleDTO;
import it.PostAppRestaurant.Entity.Opzionale;
import it.PostAppRestaurant.Repository.OpzionaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OpzionaleService {

  @Autowired
  private OpzionaleRepository opzionaleRepository;

  public List<OpzionaleDTO> getAllOpzionali() {
    List<Opzionale> opzionali = opzionaleRepository.findAll();
    return opzionali.stream()
      .map(this::mapToDTO)
      .collect(Collectors.toList());
  }

  public OpzionaleDTO getOpzionaleById(Long id) {
    Optional<Opzionale> optionalOpzionale = opzionaleRepository.findById(id);
    return optionalOpzionale.map(this::mapToDTO).orElse(null);
  }

  public OpzionaleDTO saveOpzionale(OpzionaleDTO opzionaleDTO) {
    Opzionale opzionale = new Opzionale();
    opzionale.setName(opzionaleDTO.getName());
    opzionale.setPriceOpzionale(opzionaleDTO.getPriceOpzionale());
    opzionale.setSelected(opzionaleDTO.isSelected());
    Opzionale savedOpzionale = opzionaleRepository.save(opzionale);
    return mapToDTO(savedOpzionale);
  }

  public OpzionaleDTO updateOpzionale(Long id, OpzionaleDTO opzionaleDTO) {
    Optional<Opzionale> optionalOpzionale = opzionaleRepository.findById(id);
    if (optionalOpzionale.isPresent()) {
      Opzionale opzionale = optionalOpzionale.get();
      opzionale.setName(opzionaleDTO.getName());
      opzionale.setPriceOpzionale(opzionaleDTO.getPriceOpzionale());
      opzionale.setSelected(opzionaleDTO.isSelected());
      Opzionale updatedOpzionale = opzionaleRepository.save(opzionale);
      return mapToDTO(updatedOpzionale);
    }
    return null;
  }

  public void deleteOpzionale(Long id) {
    opzionaleRepository.deleteById(id);
  }

  private OpzionaleDTO mapToDTO(Opzionale opzionale) {
    OpzionaleDTO dto = new OpzionaleDTO();
    dto.setName(opzionale.getName());
    dto.setPriceOpzionale(opzionale.getPriceOpzionale());
    dto.setSelected(opzionale.isSelected());
    return dto;
  }
}
