'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/** live results */
Route.get('/api/live', 'ApiController.live');
Route.get('/api/history', 'ApiController.history');
Route.get('/api/update-matches', 'ApiController.updateMatches');

/** matches */
Route.post('/match', 'MatchController.store');
Route.get('/matches', 'MatchController.list');
Route.get('/match/:id', 'MatchController.show');
Route.put('/match/:id', 'MatchController.update');
Route.delete('/match/:id', 'MatchController.delete');
