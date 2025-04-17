> [for those who understand English](README.md)  

# Затравочка

> [!Tip]
> Этот плагин **работает корректно c выделением текста**
> в режиме VIM 
> - **VISUAL**
> - **VISUAL LINE**



# Хейло май френдсы

Есть куча плагинов которые делают похожее или даже то же, почему создан плагин? 

> Этот **плагин работает корректно** в режиме **vim VISUAL**. Можно настроить **vimrc** и через кнопку лидера настроить выделение слова **болдом**, *italic* и далее по ***списку команд***.

Если Вы не пользуетесь vim, то посмотрите что может плагин, он улучшает базовый функционал  форматирования текста.

# Не могём, а мо́гем
- Сделаны команды для выделения **bold - highlight - italic - strikethrough - code - comments**
- Объединить несколько выделений
- Снять выделение в выделенном блоке
- Удалить выделение
- Выделить слово в режиме `NORMAL`
- ... что забыл написать

## Это работает так

<p align="center">
  <img src="./assets/demo.gif" style="width: 80%" />
</p>


## В планах
- [ ] Правильная работа с выделением не vim моде
- [ ] команда `clear format`
- [ ] Перейти к следующему выделению
- [ ] Выделить выделение
- [ ] Выделить часть предложения, предложение
 
 

# Установка и применение

Для обычных пользователей плагин то же работает, нужно на команды плагина назначить горячие клавиши и наслаждаться процессом форматирования текста.

## For ❤️ Vimers ❤️ 

Плагин раскрывается если создать файл `.vimrc`, для этого нужно поставить плагин: 
> - **Vimrc Support** https://github.com/esm7/obsidian-vimrc-support Реализует алгоритм работы файла `.vimrc` По умолчанию файл должен быть тут `path/to/VaultName/.obsidian.vimrc` задается в настройках плагина Vimrc Support

**Нужно** создать на каждую команду текущего плагина **команду в vim**. 

Пример файла `.vimrc` для выделения текста болдом. Сделаем так чтобы в режиме **VISUAL**, **VISUAL LINE** нажать `!b` или `<Space>b` выделенный текст будет отформатирован жирным, а врежиме normal `<Space>efb`

``` vim
" bold 
exmap toggleBoldCommand obcommand vim-marker-sharpener:toggle-bold
map <Space>efb :toggleBoldCommand<CR>
vmap <Space>b :toggleBoldCommand<CR>
vmap !b :toggleBoldCommand<CR>
```

Теперь для всех команд предлагаю пример моего `.vimrc` 

``` vim
" bold 
exmap toggleBoldCommand obcommand vim-marker-sharpener:toggle-bold
map <Space>efb :toggleBoldCommand<CR>
vmap <Space>b :toggleBoldCommand<CR>
vmap !b :toggleBoldCommand<CR>

" highlight
exmap toggleHighlightCommand obcommand vim-marker-sharpener:toggle-highlight
map <Space>efh :toggleHighlightCommand<CR>
vmap !h :toggleHighlightCommand<CR>
vmap <Space>h :toggleHighlightCommand<CR>

" italic
exmap toggleItalicCommand obcommand vim-marker-sharpener:toggle-italic
map <Space>efi :toggleItalicCommand<CR>
vmap !i :toggleItalicCommand<CR>
vmap <Space>i :toggleItalicCommand<CR>

" strikethrough
exmap toggleStrikethroughCommand  obcommand vim-marker-sharpener:toggle-strikethrough
map <Space>efs :toggleStrikethroughCommand<CR>
vmap !s :toggleStrikethroughCommand<CR>
vmap <Space>s :toggleStrikethroughCommand<CR>

" code 
exmap toggleCodeCommand obcommand vim-marker-sharpener:toggle-code
map <Space>efc :toggleCodeCommand<CR>
vmap !c :toggleCodeCommand<CR>
vmap <Space>c :toggleCodeCommand<CR>

" comments
exmap toggleCommentComment obcommand vim-marker-sharpener:toggle-comment
map <Space>efm :toggleCommentComment<CR>
vmap !m :toggleCommentComment<CR>
vmap <Space>m :toggleCommentComment<CR>
```

# P.S.
> [!CAUTION]
> Выделения это то что отличает здоровых пользователей Obsidian от больных. #joke
 