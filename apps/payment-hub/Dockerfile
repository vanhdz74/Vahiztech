# ==============================================================================
# Multi-stage Dockerfile cho Vahiztech Payment Hub (Spring Boot 3.3 / Java 21)
# ==============================================================================

# ----- Stage 1: Build Image -----
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /build

# Tối ưu Docker Cache: Tải dependencies trước
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy mã nguồn và đóng gói JAR
COPY src ./src
RUN mvn clean package -DskipTests -B

# ----- Stage 2: Runtime Image (Tối giản & Bảo mật) -----
FROM eclipse-temurin:21-jre AS runner
WORKDIR /app

# Tạo non-root user nhằm tuân thủ tiêu chuẩn bảo mật container
RUN groupadd -r spring && useradd -r -g spring spring

# Copy file .jar đã build từ Stage 1
COPY --from=builder /build/target/*.jar app.jar
RUN chown -R spring:spring /app

USER spring:spring
EXPOSE 8084

# Cấu hình tối ưu JVM trong container
ENTRYPOINT ["java", \
  "-XX:+UseContainerSupport", \
  "-XX:MaxRAMPercentage=75.0", \
  "-Djava.security.egd=file:/dev/./urandom", \
  "-jar", "app.jar"]
