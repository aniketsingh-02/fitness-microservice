package com.fitnesss.gateway;

import com.fitnesss.gateway.user.RegisterRequest;
import com.fitnesss.gateway.user.UserService;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@Slf4j
@RequiredArgsConstructor
public class KeycloakUserSyncFilter implements WebFilter {
    private final UserService userService;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");

        // ✅ If no token, skip filter
        if (token == null || !token.startsWith("Bearer ")) {
            return chain.filter(exchange);
        }

        RegisterRequest registerRequest = getUserDetails(token);

        // ✅ If token parsing failed, skip filter
        if (registerRequest == null || registerRequest.getKeycloakId() == null) {
            return chain.filter(exchange);
        }

        String userId = exchange.getRequest().getHeaders().getFirst("X-User-ID");
        if (userId == null) {
            userId = registerRequest.getKeycloakId();
        }

        String finalUserId = userId;

        return userService.validateUser(finalUserId)
                .flatMap(exist -> {
                    if (!exist) {
                        log.info("User not found, registering user: {}", registerRequest.getEmail());
                        return userService.registerUser(registerRequest)
                                .doOnSuccess(response -> log.info("User registered successfully: {}", response))
                                .then();
                    } else {
                        log.info("User already exists, skipping sync.");
                        // ✅ Still update keycloakId if missing
                        return userService.registerUser(registerRequest)
                                .doOnSuccess(response -> log.info("User sync completed: {}", response))
                                .then();
                    }
                })
                .onErrorResume(e -> {
                    log.error("Error during user sync: {}", e.getMessage());
                    return Mono.empty();
                })
                .then(Mono.defer(() -> {
                    ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                            .header("X-User-ID", finalUserId)
                            .build();
                    return chain.filter(exchange.mutate().request(mutatedRequest).build());
                }));
    }

    private RegisterRequest getUserDetails(String token) {
        try {
            String tokenWithoutBearer = token.replace("Bearer ", "").trim();
            SignedJWT signedJWT = SignedJWT.parse(tokenWithoutBearer);
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            RegisterRequest registerRequest = new RegisterRequest();
            registerRequest.setEmail(claims.getStringClaim("email"));
            registerRequest.setKeycloakId(claims.getStringClaim("sub"));
            registerRequest.setPassword("dummy@123123");
            registerRequest.setFirstName(claims.getStringClaim("given_name"));
            registerRequest.setLastName(claims.getStringClaim("family_name"));

            return registerRequest;
        } catch (Exception e) {
            log.error("Failed to parse JWT claims", e);
            return null;
        }
    }
}