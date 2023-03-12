### Разработка мессенджера в рамках Яндекс Практикума.

[Прототип в Figma](https://www.figma.com/file/jF5fFFzgGOxQeB4CmKWTiE/Chat_external_link?node-id=0%3A1&t=su5VSzsBrbf6Bau6-0)  
[Развёрнутый сайт в Netlify](https://steady-shortbread-41a498.netlify.app/)  
Реализованные шаблоны немного отличаются от макетов в фигме.

#### Команды для запуска:
- <b>npm run start</b> - запуск сервера для раздачи статики из папки dist. Порт по умолчанию 3000.
- <b>npm run dev</b> - сборка и запуск parcel в режиме вотчера для разработки.
- <b>npm run build</b> - сборка проекта, проект собирается в папку dist.

#### Маршрутизация по сайту:
- <b>/</b> - страница авторизации
- <b>/login</b> - страница авторизации
- <b>/registration</b> - страница регистрации
- <b>/chats</b> - чаты с замоканными данными
- <b>/profile</b> - профиль пользователя
- <b>/profile/edit</b> - страница редактирования профиля пользователя
- <b>/404</b> - Ошибка: старница не найдена
- <b>/500</b> - Ошибка: внутренняя ошибка

Т.к. в данном спринте были реализованы шаблоны, то не на все страницы можно перейти (на страницу чатов можно перейти только введя '/chats' в браузерную строку, аналогично с страницей 'Внутренняя ошибка': '/500'). 
Все остальные переходы реализованы через соответствующие кнопки-ссылки.

#### Структура проекта:
- ssrc/components - отдельные самостоятельные компоненты, не относящиеся к конкретной странице (могут содержать бизнес-логику);
- src/core - ядро основополагающих компонентов (Block, EventBus, renderDOM);
- src/layouts -  шаблоны страниц;
- src/pages - конкретные страницы;
- src/ui - будет формироваться библиотека независимых переиспользуемых компонентов;
- src/utils - утилиты;
- static - статичные файлы (index.html, изображения, шрифты и т.д.);

#### Валидация форм:
- страница `Авторизации` - валидируются инпуты на `blur` и `focus`, а также все инпуты по нажатию
на кнопку `Авторизоваться`. Инпуты подсвечиваются красным бордером и под ними выводится описание ошибки;
- страница `Регистраниция` - аналогичная работа, как и в `Авторизации`;
- страница `Чаты` - инпут отправки сообщения срабатывает на `blur`, `focus` и при нажатии на отправку сообщения, 
инпут подсвечивается красным бордером при пустом сообщении;
- страница `Редактирование пользователя` - валидируются инпуты на `blur`, `focus` и при нажатии на кнопку `Сохранить`,
инпуты подсвечиваются красной заливкой фона, а под инпутом отображается текст ошибки. 
В случае, если текст не влезает в отведенное пространство, то он обрезается, а при наведении на текст, появляется системый тултип с текстом ошибки.
Валидируются все инпуты, за исключением `Имя в чате` (нет требований к этому инпуту).
