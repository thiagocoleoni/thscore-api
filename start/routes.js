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

// -------------------------------------------------------------------
/**                 Layback - Dados Crisp */
// -------------------------------------------------------------------

/** suport */
Route.get('/suport/operators', 'SuportController.saveOperators');
Route.get('/suport/people', 'SuportController.savePeople');
Route.get('/suport/people/:page', 'SuportController.savePeople');
Route.get('/suport/conversations', 'SuportController.saveConversations');
Route.get('/suport/conversations/:page', 'SuportController.saveConversations');
Route.get('/suport/messages/:conversation', 'SuportController.saveMessages');

/** operator */
Route.post('/operator', 'OperatorController.store');
Route.get('/operators', 'OperatorController.list');
Route.get('/operator/:id', 'OperatorController.show');
Route.put('/operator/:id', 'OperatorController.update');
Route.delete('/operator/:id', 'OperatorController.delete');

/** person */
Route.post('/person', 'PersonController.store');
Route.get('/people', 'PersonController.list');
Route.get('/person/:id', 'PersonController.show');
Route.put('/person/:id', 'PersonController.update');
Route.delete('/person/:id', 'PersonController.delete');

/** conversation */
Route.post('/conversation', 'ConversationController.store');
Route.get('/conversations', 'ConversationController.list');
Route.get('/conversation/:id', 'ConversationController.show');
Route.put('/conversation/:id', 'ConversationController.update');
Route.delete('/conversation/:id', 'ConversationController.delete');

/** message */
Route.post('/message', 'MessageController.store');
Route.get('/messages', 'MessageController.list');
Route.get('/messages/:session_id', 'MessageController.show');
Route.put('/message/:id', 'MessageController.update');
Route.delete('/message/:id', 'MessageController.delete');