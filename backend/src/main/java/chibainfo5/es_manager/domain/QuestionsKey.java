package chibainfo5.es_manager.domain;

import java.io.Serializable;
import lombok.Data;

@Data
public class QuestionsKey implements Serializable{
    private int userId;
    private int esId;
    private int qId;
    private int aId;
}
