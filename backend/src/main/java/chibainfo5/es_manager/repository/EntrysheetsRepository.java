package chibainfo5.es_manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import chibainfo5.es_manager.domain.EntrysheetsEntity;
import chibainfo5.es_manager.domain.EntrysheetsKey;

import java.util.List;


@Repository
public interface EntrysheetsRepository extends JpaRepository<EntrysheetsEntity, EntrysheetsKey> {
    public List<EntrysheetsEntity> findByUserId(Long userId);

    public EntrysheetsEntity findByUserIdAndEsId(Long userId, Long esId);

    @Query(value = "SELECT MAX(es_id) FROM entrysheets WHERE user_id = :userId", nativeQuery = true)
    public Long findMaxEsIdByUserId(@Param("userId") Long userId);
}
