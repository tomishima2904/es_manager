package chibainfo5.es_manager.domain;

import java.io.Serializable;
import lombok.Data;

@Data
public class QuestionsKey implements Serializable{
    private Long userId;
    private Long esId;
    private Integer qId;
    private Integer aId;
}
