'use strict'

const Route = use('Route')

Route.resource('users', 'UserController').apiOnly()

Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('/files/:id', 'FileController.show')
Route.group(() => {
    Route.post('/files', 'FileController.store')

    Route.resource('products', 'ProductController').apiOnly()
})
