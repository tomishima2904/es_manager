package chibainfo5.es_manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import chibainfo5.es_manager.domain.QuestionsEntity;
import chibainfo5.es_manager.domain.QuestionsKey;

import java.util.List;

@Repository
public interface QuestionsRepository extends JpaRepository<QuestionsEntity, QuestionsKey>{
    public List<QuestionsEntity> findByUserIdAndEsId(Long userId, Long esId);
    public List<QuestionsEntity> findByEsId(Long esId);
}
