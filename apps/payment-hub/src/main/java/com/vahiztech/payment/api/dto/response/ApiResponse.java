package com.vahiztech.payment.api.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {

    @Builder.Default
    private boolean success = true;

    private T data;

    private String error;

    @Builder.Default
    private OffsetDateTime timestamp = OffsetDateTime.now(ZoneOffset.UTC);

    @Builder.Default
    private String traceId = UUID.randomUUID().toString();

    public static <T> ApiResponse<T> ok(T data) {
        return ApiResponse.<T>builder()
                .success(true)
                .data(data)
                .timestamp(OffsetDateTime.now(ZoneOffset.UTC))
                .traceId(UUID.randomUUID().toString())
                .build();
    }

    public static <T> ApiResponse<T> fail(String errorMessage) {
        return ApiResponse.<T>builder()
                .success(false)
                .error(errorMessage)
                .timestamp(OffsetDateTime.now(ZoneOffset.UTC))
                .traceId(UUID.randomUUID().toString())
                .build();
    }
}
