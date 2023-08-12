package chibainfo5.es_manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chibainfo5.es_manager.entity.EntrysheetsEntity;

@Repository
public interface EntrysheetsRepository extends JpaRepository<EntrysheetsEntity, Long> {
}
