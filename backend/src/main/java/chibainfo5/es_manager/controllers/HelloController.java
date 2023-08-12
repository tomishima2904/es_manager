package chibainfo5.es_manager.controllers;

import chibainfo5.es_manager.domain.EntrysheetsEntity;
import chibainfo5.es_manager.domain.EntrysheetsResponse;
import chibainfo5.es_manager.repositories.EntrysheetsRepository;

// For WebFlux
import reactor.core.publisher.Mono;
import javax.annotation.PostConstruct;

// For Controller
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

// For Repository
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class HelloController {

    // データベースアクセスのために必要なリポジトリを定義
    @Autowired
    private EntrysheetsRepository entrysheetsRepository;

    // アプリ起動時にダミーデータをデータベース内に登録
    @PostConstruct
    public void init(){
        EntrysheetsEntity entrysheet1 = new EntrysheetsEntity(0L, 0L, "A株式会社", "エンジニア", null, "本選考", false);
        EntrysheetsEntity entrysheet2 = new EntrysheetsEntity(1L, 0L, "C株式会社", "データサイエンティスト", null, "冬インターン", false);
        EntrysheetsEntity entrysheet3 = new EntrysheetsEntity(0L, 1L, "B株式会社", "総合職", null, "夏インターン", true);
        entrysheetsRepository.saveAndFlush(entrysheet1);
        entrysheetsRepository.saveAndFlush(entrysheet2);
        entrysheetsRepository.saveAndFlush(entrysheet3);
    }

    // トップページ
    @GetMapping("/")  // 指定したURLに対してGETメソッドを行う
    public Mono<String> index() {
        return Mono.just("Hello Spring!");
    }

    // ユーザー毎のエントリーシートリストのページ. 任意のユーザーIDのエントリーシート情報を取得する.
    @GetMapping("/{userId}")
    public Mono<EntrysheetsResponse> getUserEntrysheets(@PathVariable Long userId) {

        // 条件に合うuserIdのデータをデータベースから取得
        List<EntrysheetsEntity> entrysheets = entrysheetsRepository.findByUserId(userId);

        // 配列をそのまま返すとJSONインジェクションの可能性があるためJSONでレスポンスデータを包む
        EntrysheetsResponse response = new EntrysheetsResponse(entrysheets);

        return Mono.just(response);
    }
}
