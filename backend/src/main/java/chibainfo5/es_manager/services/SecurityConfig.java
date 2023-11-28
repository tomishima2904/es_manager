package chibainfo5.es_manager.services;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.server.SecurityWebFilterChain;


@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    @Autowired
    private DataSource dataSource;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // データベースにあらかじめ登録しておくユーザー
    @Bean
    public UserDetailsManager userDetailsManager() {
        JdbcUserDetailsManager user = new JdbcUserDetailsManager(this.dataSource);
        if (user.userExists("tomi")) user.deleteUser("tomi");
        user.createUser(makeUser("tomi", "tomi", "ADMIN"));
        if (user.userExists("wara")) user.deleteUser("wara");
        user.createUser(makeUser("wara", "wara", "USER"));
        if (user.userExists("yuma")) user.deleteUser("yuma");
        user.createUser(makeUser("yuma", "yuma", "USER"));
        return user;
    }
    
    // 参考: https://zenn.dev/peishim/articles/6946f72e15affa
    private UserDetails makeUser(String user, String pass, String role) {
        return User.withUsername(user)
                .password(passwordEncoder().encode(pass))
                .roles(role)
                .disabled(true)  // XXX: mysql側では`enabled`というカラム名で登録されている
                .build();
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
