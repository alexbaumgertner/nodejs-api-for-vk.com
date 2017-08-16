/**
 * @task 1
 *
 * сделать nodejs сервер, который по любому адресу отдает файл index.html
 *
 * @docs
 * — https://nodejs.org/dist/latest-v8.x/docs/api/http.html
 *
 * Методы http.createServer
 *
 */

// Подключаем встроенный в nodejs модуль http
const http = require('http')

// Подключаем встроенный в nodejs модуль fs (для работы с файловой системой)
const fs = require('fs')

// настройки
const hostname = process.env.IP || 'localhost'
const port = process.env.PORT || 8888

// создаем сервер (он пока еще не запущен)
const server = http.createServer()

// Добавляем обработчики событий

/**
 * @see https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_event_request
 */
server.on('request', function (request, response) {
  // request
  // @see https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_class_http_clientrequest
  // https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_class_http_incomingmessage
  request

  // response
  // @see https://nodejs.org/dist/latest-v8.x/docs/api/http.html#http_class_http_serverresponse

  let data
  let contentType

  if (/\/api/.test(request.url)) {
    switch (request.url) {
      case '/api/auth':

        if (request.method === 'GET') {

        }
        break
      default:
        data = JSON.stringify({ message: 'api method not found' })
    }

    contentType = 'application/json'
  } else {
    data = fs.readFileSync('index.html', 'utf-8')
    contentType = 'text/html'
  }

  response.writeHead(200, {'Content-Type': contentType})

  response.end(data)
})

/**
 * Запускаем сервер
 * @example
 * server.listen([port][, hostname][, backlog][, callback])
 * backlog is the maximum length of the queue of pending connections
 *
 */
server.listen(port, hostname, function () {
  console.log('Server started on hostname ' + hostname + ' and port ' + port)
})

// Запустить проект — меню Run => Run With => NodeJS
// открыть в браузере ссылку http://nodejs-api-for-vkcom-alexbaumgertner.c9users.io:8080
