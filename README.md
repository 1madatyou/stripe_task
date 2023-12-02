# Django/Stripe technical task

## Конфигурация

Сперва необходимо создать файл .env, подобный .env.example, в корневой папке проекта.
Он содержит ключи Stripe, параметры БД, а так же данные для развертки на удаленных серверах.

## Запуск

Сначала необходимо запустить shell-скрипт, который запускает сборку docker-compose, осуществляет миграцию django
и загружает фикстуру с начальными объектами модели Item:
```
sh docker-compose-init.sh
```
Затем команда для "поднятия" инфраструктуры:
```
docker compose up
```

## Использование

При локальной разработке:

- React app доступно по адресу [127.0.0.1:3000](http://127.0.0.1:3000)
- Django app доступно по адресу [127.0.0.1:8000](http://127.0.0.1:8000)

На удаленном сервере:

- React app доступно по адресу $DOMAIN_NAME
- Django app доступно по адресу $API_DOMAIN NAME
  Переменные - из .env.

Доступ к админ-панели осуществляется через $API_DOMAIN NAME/admin

## API

- `GET /item/<int:item_id>` - Получить информацию об элементе по ID
- `GET /items` - Получить список всех элементов
- `POST /buy/<int:item_id>` - Купить элемент по его ID
- `POST /create_order` - Создать выплату для собранного заказа.

## Реализация

1. Django + Stripe бэкенд для создания PaymentIntent путем формирования Order и оплаты с помощью полученного client_secret.
2. React интерфейс для фомирования заказа (Order) и взаимодействия с API.
3. Docker-compose для prod, dev сред.

## Ссылки

Разместил сайт на удаленном сервере - [iloveyouall.store](http://iloveyouall.store) <br>
URL для входа в админ панель - [api.iloveyouall.store/admin](http://api.iloveyouall.store/admin) 

Данные для входа:

Username: admin <br>
Password: admin

