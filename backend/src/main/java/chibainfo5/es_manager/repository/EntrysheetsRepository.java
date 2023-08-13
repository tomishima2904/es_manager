package chibainfo5.es_manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chibainfo5.es_manager.domain.EntrysheetsEntity;
import chibainfo5.es_manager.domain.EntrysheetsKey;

import java.util.List;


@Repository
public interface EntrysheetsRepository extends JpaRepository<EntrysheetsEntity, EntrysheetsKey> {
    public List<EntrysheetsEntity> findByUserId(Long userId);
    public EntrysheetsEntity findByUserIdAndEsId(Long userId, Long esId);
}
