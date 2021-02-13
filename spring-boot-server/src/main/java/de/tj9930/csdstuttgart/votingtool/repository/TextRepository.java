package de.tj9930.csdstuttgart.votingtool.repository;

import de.tj9930.csdstuttgart.votingtool.model.Text;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TextRepository extends JpaRepository<Text, Long> {
	Optional<Text> findByMandant(String mandant);

}
