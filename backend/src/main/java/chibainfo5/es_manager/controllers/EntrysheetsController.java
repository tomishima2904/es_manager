package chibainfo5.es_manager.controllers;


import java.util.List;

import javax.annotation.PostConstruct;

// For WebFlux
import reactor.core.publisher.Mono;
// For Repository
import org.springframework.beans.factory.annotation.Autowired;
// For Controller
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import chibainfo5.es_manager.domain.EntrysheetsEntity;
import chibainfo5.es_manager.domain.EntrysheetsResponse;
import chibainfo5.es_manager.repositories.EntrysheetsRepository;
import chibainfo5.es_manager.services.EntrysheetsService;

import java.time.LocalDateTime;


@RestController
public class EntrysheetsController {
    
    // データベースアクセスのために必要なリポジトリを定義
    @Autowired
    private EntrysheetsRepository entrysheetsRepository;

    // データベースに新規ESのレコードを追加するためのサービス
    @Autowired
    private EntrysheetsService entrysheetsService;

    // アプリ起動時にダミーデータをデータベース内に登録
    @PostConstruct
    public void init(){
        EntrysheetsEntity entrysheet1 = new EntrysheetsEntity(0L, 0L, "A株式会社", "エンジニア", "本選考", null, false);
        EntrysheetsEntity entrysheet2 = new EntrysheetsEntity(1L, 0L, "C株式会社", "データサイエンティスト", "冬インターン", null, false);
        EntrysheetsEntity entrysheet3 = new EntrysheetsEntity(0L, 1L, "B株式会社", "総合職", "夏インターン", null, true);
        entrysheetsRepository.saveAndFlush(entrysheet1);
        entrysheetsRepository.saveAndFlush(entrysheet2);
        entrysheetsRepository.saveAndFlush(entrysheet3);
    }

    // ユーザー毎のエントリーシートリストのページ. 任意のユーザーIDのエントリーシート情報を取得する.
    @GetMapping("/{userId}/entrysheets")
    public Mono<EntrysheetsResponse> getUserEntrysheets(@PathVariable Long userId) {

        // 条件に合うuserIdのデータをデータベースから取得
        List<EntrysheetsEntity> entrysheets = entrysheetsRepository.findByUserId(userId);

        // 配列をそのまま返すとJSONインジェクションの可能性があるためJSONでレスポンスデータを包む
        EntrysheetsResponse response = new EntrysheetsResponse(entrysheets);

        return Mono.just(response);
    }

    // 新規ES作成. 下記コマンドで実行を確認できる
    // curl -X POST http://localhost:8001/{userId}/entrysheets
    @PostMapping("/{userId}/entrysheets")
    public EntrysheetsEntity createNewEntrysheet(@PathVariable Long userId) {
        // 新規ES作成時の初期値
        String company = "会社XX";  // 空欄はダメなので
        String job = "";
        String event = "";
        LocalDateTime deadline = null;
        Boolean isReleased = false;

        return entrysheetsService.createNewEntrysheetWithIncrementedEsId(
            userId, company, job, event, deadline, isReleased);
    }

}
