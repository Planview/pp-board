<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', [
    'uses'      => 'HomeController@doHome',
    'before'    => 'auth'
]);
//

// Confide routes

Route::group(['prefix' => 'auth'], function () {
    Route::get('login', 'UsersController@login');
    Route::get('confirm/{code}', 'UsersController@confirm');
    Route::get('forgot_password', 'UsersController@forgotPassword');
    Route::get('reset_password/{token}', 'UsersController@resetPassword');
    Route::get('logout', 'UsersController@logout');

    Route::group(['before' => 'csrf'], function () {
        Route::post('login', 'UsersController@doLogin');
        Route::post('forgot_password', 'UsersController@doForgotPassword');
        Route::post('reset_password', 'UsersController@doResetPassword');
    });
});


