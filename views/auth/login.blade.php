@extends('auth.layout')

@section('title')
Login
@stop

@section('form')
    <fieldset>
        <legend>Login</legend>
        {{ Form::open(['action' => 'UsersController@doLogin']) }}
            {{ ControlGroup::generate(
                Form::label('email', 'Username or Email', ['class' => 'sr-only']),
                Form::text('email', Input::old('email'), ['required', 'placeholder' => 'Username or Email'])
            ) }}

            {{ ControlGroup::generate(
                Form::label('password', 'Password', ['class' => 'sr-only']),
                Form::password('password', ['required', 'placeholder' => 'Password']),
                HTML::link(URL::action('UsersController@forgotPassword'), 'Forgot Your Password?')
            ) }}

            {{ Button::primary('Submit')->submit() }}
        {{ Form::close() }}
    </fieldset>
@stop
