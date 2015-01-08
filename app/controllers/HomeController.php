<?php

class HomeController extends BaseController {

    /*
    |--------------------------------------------------------------------------
    | Default Home Controller
    |--------------------------------------------------------------------------
    |
    | You may wish to use controllers instead of, or in addition to, Closure
    | based routes. That's great! Here is an example controller method to
    | get you started. To route to this controller, just add the route:
    |
    |   Route::get('/', 'HomeController@showWelcome');
    |
    */

    public function doHome()
    {
        if (OAuth::hasAccessToken('Projectplace')) {
            return $this->showHome();
        } elseif (OAuth::hasAccessInput()) {
            OAuth::useProvider('Projectplace')->fromInput();

            return $this->showHome();
        } else {
            return OAuth::authorizationRedirect('Projectplace');
        }
    }

    public function showHome()
    {
        return View::make('hello');
    }

}
