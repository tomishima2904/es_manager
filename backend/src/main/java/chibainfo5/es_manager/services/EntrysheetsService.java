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
    public int createNewEntrysheetWithIncrementedEsId(
            String userId, String company, String job, String event,
            LocalDateTime deadline, Boolean isReleased) {

        // 指定したuserIdの最大のesIdをインクリメンタして新たなレコードを作成
        Long maxEsId = entrysheetsRepository.findMaxEsIdByUserId(userId);
        if (maxEsId == null) {
            maxEsId = 0L;
        }
        Long newEsId = maxEsId + 1;
        int maxEsId = entrysheetsRepository.findMaxEsIdByUserId(userId);
        int newEsId = maxEsId + 1;

        // 初期値を与えてインスタンスを作成し、そのレコードをDBに保存
        EntrysheetsEntity newEntry = new EntrysheetsEntity(userId, newEsId, company, job, event, deadline, isReleased);
        entrysheetsRepository.save(newEntry);

        return newEsId;
    }
}
