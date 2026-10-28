package com.vahiztech.payment.api.controller;

import com.vahiztech.payment.api.dto.response.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/health")
@Tag(name = "Health Check", description = "Kiểm tra trạng thái hoạt động của Payment Hub")
public class HealthController {

    @GetMapping
    @Operation(summary = "Kiểm tra sức khỏe Payment Hub Service")
    public ResponseEntity<ApiResponse<Map<String, Object>>> checkHealth() {
        Map<String, Object> status = Map.of(
                "status", "UP",
                "service", "payment-hub",
                "version", "1.0.0-SNAPSHOT"
        );
        return ResponseEntity.ok(ApiResponse.ok(status));
    }
}
