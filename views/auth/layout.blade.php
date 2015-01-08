<!DOCTYPE html>

<!--[if lt IE 9]>       <html class="no-js lt-ie9"> <![endif]-->
<!--[if gte IE 9]><!--> <html class="no-js">        <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>@yield('title')</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{ HTML::style('css/auth-build.css') }}
    </head>
    <body>

        <div class="container-slim auth-wrapper">
            @if (Session::has('error'))
                {{ Alert::danger(Session::get('error'))->close() }}
            @elseif (Session::has('notice'))
                {{ Alert::info(Session::get('notice'))->close() }}
            @endif
            <main class="auth-form">
                @yield('form')
            </main>
        </div>

        {{ HTML::script('bower_components/requirejs/require.js', ['data-main' => asset('/js/auth')]) }}

    </body>
</html>
