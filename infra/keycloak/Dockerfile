FROM quay.io/keycloak/keycloak:25.0.6 as builder

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_FEATURES=organization
ENV KC_DB=postgres

WORKDIR /opt/keycloak
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:25.0.6
COPY --from=builder /opt/keycloak/ /opt/keycloak/

# Sao chép cấu hình Realm, Themes và Providers
COPY realms/ecosystem-realm.json /opt/keycloak/data/import/realm-config.json
COPY themes/ /opt/keycloak/themes/
COPY extensions/ /opt/keycloak/providers/

ENV KC_HTTP_ENABLED=true
ENV KC_HOSTNAME_STRICT=false
ENV KC_HOSTNAME_STRICT_HTTPS=false
ENV KC_PROXY_HEADERS=xforwarded

EXPOSE 8080

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start-dev", "--import-realm", "--features=organization"]
