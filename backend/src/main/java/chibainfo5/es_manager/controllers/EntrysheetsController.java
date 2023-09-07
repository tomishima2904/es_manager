package chibainfo5.es_manager.controllers;

import chibainfo5.es_manager.domain.EntrysheetsEntity;
import chibainfo5.es_manager.domain.EntrysheetsResponse;
import chibainfo5.es_manager.domain.QuestionsEntity;
import chibainfo5.es_manager.repositories.EntrysheetsRepository;
import chibainfo5.es_manager.repositories.QuestionsRepository;
import chibainfo5.es_manager.services.EntrysheetsService;

import java.time.LocalDateTime;
import java.util.List;
import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
        EntrysheetsEntity entrysheet1 = new EntrysheetsEntity("tomi", 0, "A株式会社", "エンジニア", "本選考", LocalDateTime.of(2023, 7, 31, 12, 0, 0), false);
        EntrysheetsEntity entrysheet2 = new EntrysheetsEntity("wara", 0, "C株式会社", "DS", "冬インターン", LocalDateTime.of(2023, 8, 25, 12, 45, 0), false);
        EntrysheetsEntity entrysheet3 = new EntrysheetsEntity("tomi", 1, "B株式会社", "総合職", "夏インターン", LocalDateTime.of(2023, 9, 25, 12, 45, 0), true);
        entrysheetsRepository.saveAndFlush(entrysheet1);
        entrysheetsRepository.saveAndFlush(entrysheet2);
        entrysheetsRepository.saveAndFlush(entrysheet3);
    }

    // ユーザー毎のエントリーシートリストのページ. 任意のユーザーIDのエントリーシート情報を取得する.
    @GetMapping("/users/self/entrysheets")
    @CrossOrigin(origins = {"http://localhost:3001"})
    public Mono<EntrysheetsResponse> getUserEntrysheets(@AuthenticationPrincipal UserDetails userDetails) {

        String userId = userDetails.getUsername();

        // 条件に合うuserIdのデータをデータベースから取得
        List<EntrysheetsEntity> entrysheets = entrysheetsRepository.findByUserId(userId);

        // 配列をそのまま返すとJSONインジェクションの可能性があるためJSONでレスポンスデータを包む
        EntrysheetsResponse response = new EntrysheetsResponse(entrysheets);

        return Mono.just(response);
    }

    // 新規ES作成. 下記コマンドで実行を確認できる
    // curl -X POST http://localhost:8001/{userId}/entrysheets
    @PostMapping("/users/self/entrysheets")
    @CrossOrigin(origins = {"http://localhost:3001"})
    public Mono<ResponseEntity<String>> createNewEntrysheet(@AuthenticationPrincipal UserDetails userDetails) {

        String userId = userDetails.getUsername();

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
        QuestionsEntity newQuestions = new QuestionsEntity(userId, newEsId, 0, "", 400, 0, "");
        questionsRepository.saveAndFlush(newQuestions);

        // 新規で作成したESの編集画面のエンドポイントへリダイレクト
        String redirectUrl = String.format("/%d/entrysheets/%d", userId, newEsId);
        return Mono.just(ResponseEntity.status(HttpStatus.SEE_OTHER)
            .header("Location", redirectUrl)
            .body("Redirecting to " + redirectUrl));
    }

}
