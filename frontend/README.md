# Проектная работа "Mesto" с аутентификацией и авторизацией

Для начала работы необходимо:
* клонировать репозиторий
* находясь в папке с проектом ввести в терминал npm install\
(все пакеты из package.json будут установлены)

## Доступные команды

Находясь в директории приложения, вы можете запустить:

### `npm start`

Запуск приложения в development mode.\
Откроется адрес [http://localhost:3000](http://localhost:3000) в браузере.

Страница автоматически обновится после внесения изменений.

### `npm test`

Запускает средство запуска тестов в интерактивном режиме часов.

### `npm run build`

Собирает приложение для публикации в папку `build`.

Сборка минифицирована, а имена файлов включают хеши. \
Ваше приложение готово к развертыванию!

## Функционал

* используются HOC-компоненты для защиты роутинга
* регистрация, авторизация и аутентификация пользователя
* хранение токена пользователя в localStorage
* карточки и информация о пользователе загружаются с сервера
* ошибочное изображение карточки замещается заглушкой
* показывается loader, пока ожидается ответ сервера
* удаление/создание карточки
* подтверждение удаления карточки
* постановка/снятие лайка
* изменение информации о пользователе (name, about, avatar)
* валидация форм

## Стэк технологий

* React.js
* JavaScript
* HTML, JSX
* CSS
* REST API

## Посмотреть на gh-pages

[https://imjogan.github.io/react-mesto-auth/](https://imjogan.github.io/react-mesto-auth/)