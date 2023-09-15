package chibainfo5.es_manager.services;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.userdetails.MapReactiveUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.web.server.SecurityWebFilterChain;


@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {
    // 管理者ユーザーのユーザー名とパスワードを事前登録
    // 参考: https://spring.pleiades.io/spring-security/reference/reactive/configuration/webflux.html
    // TODO: インメモリユーザーではなくDBで管理したい
    @Bean
    public MapReactiveUserDetailsService userDetailsManager(){
        // 環境変数で管理者用のユーザーとパスワードを読み込む
        String username = System.getenv("APP_USER");
        String password = System.getenv("APP_PASSWORD");

        UserDetails user = User.withUsername(username)
            .password(
                PasswordEncoderFactories
                    .createDelegatingPasswordEncoder()
                    .encode(password)
            )
            .roles("USER")
            .build();
        return new MapReactiveUserDetailsService(user);
    }

    // 認証・認可を制御
    @Bean
    public SecurityWebFilterChain filterChain(ServerHttpSecurity http)
        throws Exception {
            http
                // 各urlに対してどのような認可を設定するか
                .authorizeExchange((exchanges) -> exchanges
                    .anyExchange().permitAll()  // 全て認可し、メソッドセキュリティで制御
                )
                // フォーム基本認証  カスタマイズしたいかも
                .formLogin(withDefaults());
		    return http.build();
        }
}
