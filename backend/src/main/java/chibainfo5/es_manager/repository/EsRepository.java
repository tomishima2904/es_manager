import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EsRepository extends JpaRepository<EsEntity, Integer> {
    // 必要なメソッドを追加予定（勉強中）
    List<EsEntity> findByFirstName(Int esId);
}
