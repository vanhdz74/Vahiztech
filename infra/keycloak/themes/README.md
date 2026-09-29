# Keycloak Themes Customization

Thư mục này lưu trữ các Theme tùy biến giao diện đăng nhập (Login), đăng ký (Register), quên mật khẩu, quản lý tài khoản theo bộ nhận diện thương hiệu của **Vahiztech**.

## Cấu trúc thư mục chuẩn Keycloak Theme:
```
themes/
└── vahiztech/
    ├── login/
    │   ├── theme.properties
    │   ├── template.ftl
    │   └── resources/
    │       ├── css/
    │       └── img/
    └── account/
```

## Cách kích hoạt:
1. Mount thư mục `./infra/keycloak/themes` vào container Keycloak tại `/opt/keycloak/themes`.
2. Trong Realm Settings -> Tab **Themes**, chọn **Login Theme: vahiztech**.
