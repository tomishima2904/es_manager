package chibainfo5.es_manager.domain;

import java.io.Serializable;
import lombok.Data;

@Data
public class EntrysheetsKey implements Serializable {
    private Long userId;
    private Long esId;
}
