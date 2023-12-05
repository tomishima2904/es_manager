package chibainfo5.es_manager.controllers;

import chibainfo5.es_manager.domain.EntrysheetsEntity;
import chibainfo5.es_manager.domain.QuestionsEntity;
import chibainfo5.es_manager.repositories.EntrysheetsRepository;
import chibainfo5.es_manager.repositories.QuestionsRepository;
import chibainfo5.es_manager.services.EntrysheetsService;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;


@RestController
public class EntrysheetsController {
    
    // データベースアクセスのために必要なリポジトリを定義
    @Autowired
    private EntrysheetsRepository entrysheetsRepository;

    // 新規ESの質問を作成するために必要なリポジトリを定義
    @Autowired
    private QuestionsRepository questionsRepository;

    // データベースに新規ESのレコードを追加するためのサービス
    @Autowired
    private EntrysheetsService entrysheetsService;

    // アプリ起動時にダミーデータをデータベース内に登録
    @PostConstruct
    public void init(){
        EntrysheetsEntity entrysheet1 = new EntrysheetsEntity(1, 1, "A株式会社", "エンジニア", "本選考", LocalDateTime.of(2023, 7, 31, 12, 0, 0), false);
        EntrysheetsEntity entrysheet2 = new EntrysheetsEntity(2, 1, "C株式会社", "DS", "冬インターン", LocalDateTime.of(2023, 8, 25, 12, 45, 0), false);
        EntrysheetsEntity entrysheet3 = new EntrysheetsEntity(1, 2, "B株式会社", "総合職", "夏インターン", LocalDateTime.of(2023, 9, 25, 12, 45, 0), true);
        entrysheetsRepository.saveAndFlush(entrysheet1);
        entrysheetsRepository.saveAndFlush(entrysheet2);
        entrysheetsRepository.saveAndFlush(entrysheet3);
    }

    // ユーザー毎のエントリーシートリストのページ. 任意のユーザーIDのエントリーシート情報を取得する.
    @GetMapping("/users/{userId}/entrysheets")
    @CrossOrigin(origins = {"http://localhost:3001"})
    public Mono<Map<Integer, EntrysheetsEntity>> getUserEntrysheets(@PathVariable int userId) {

        // 条件に合うuserIdのデータをデータベースから取得
        List<EntrysheetsEntity> entrysheets = entrysheetsRepository.findByUserId(userId);

        // esIdをキーに, 各entrysheetをバリューに持つようにresponseデータを変形
        Map<Integer, EntrysheetsEntity> response = new HashMap<>();
        for (EntrysheetsEntity entrysheet : entrysheets) {
            response.put(entrysheet.getEsId(), entrysheet);
        }

        return Mono.just(response);
    }

    // 新規ES作成. 下記コマンドで実行を確認できる
    // curl -X POST http://localhost:8001/{userId}/entrysheets
    @PostMapping("/users/{userId}/entrysheets")
    @CrossOrigin(origins = {"http://localhost:3001"})
    public Mono<EntrysheetsEntity> createNewEntrysheet(@PathVariable int userId) {
        // 新規ES作成時の初期値
        String company = "Untitled";  // 空欄はダメなので
        String job = "";
        String event = "";
        LocalDateTime deadline = null;
        Boolean isReleased = false;

        // 新規ES作成して保存
        int newEsId = entrysheetsService.createNewEntrysheetWithIncrementedEsId(
            userId, company, job, event, deadline, isReleased);

        // 新規ESの質問と解答も初期値を入れて作成
        QuestionsEntity newQuestions = new QuestionsEntity(userId, newEsId, 1, "", 400, 1, "");
        questionsRepository.saveAndFlush(newQuestions);

        // 新しく作成されたESentityを返す
        EntrysheetsEntity newEntrysheetEntity = new EntrysheetsEntity(userId, newEsId, company, job, event, deadline, isReleased);
        return Mono.just(newEntrysheetEntity);
    }

}
