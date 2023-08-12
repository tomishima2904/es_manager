package chibainfo5.es_manager.entity;

import java.io.Serializable;
import lombok.Data;

@Data
public class EntrysheetsKey implements Serializable {
    private Long userId;
    private Long esId;
}
