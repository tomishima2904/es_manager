package chibainfo5.es_manager.controllers;

// For WebFlux
import reactor.core.publisher.Mono;
// For Controller
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class HelloController {

    // トップページ
    @GetMapping("/")  // 指定したURLに対してGETメソッドを行う
    public Mono<String> index() {
        return Mono.just("Hello Spring!");
    }

}
