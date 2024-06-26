package it.PostAppRestaurant.Repository;

import it.PostAppRestaurant.Entity.Opzionale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpzionaleRepository extends JpaRepository<Opzionale, Long> {
}
