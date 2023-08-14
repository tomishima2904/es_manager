package chibainfo5.es_manager.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import chibainfo5.es_manager.repositories.EntrysheetsRepository;
import chibainfo5.es_manager.domain.EntrysheetsEntity;

import java.time.LocalDateTime;


@Service
public class EntrysheetsService {

    @Autowired
    private EntrysheetsRepository entrysheetsRepository;

    // `POST http://localhost:8001/{userId}/entrysheets`で新規ESを作成するメソッド
    public EntrysheetsEntity createNewEntrysheetWithIncrementedEsId(
            Long userId, String company, String job, String event,
            LocalDateTime deadline, Boolean isReleased) {

        // 指定したuserIdの最大のesIdをインクリメンタして新たなレコードを作成
        Long maxEsId = entrysheetsRepository.findMaxEsIdByUserId(userId);
        if (maxEsId == null) {
            maxEsId = 0L;
        }
        Long newEsId = maxEsId + 1;

        EntrysheetsEntity newEntry = new EntrysheetsEntity(userId, newEsId, company, job, event, deadline, isReleased);
        return entrysheetsRepository.save(newEntry);
    }
}
