<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{

    public function run()
    {
        Eloquent::unguard();
        $user = new User([
            'username'  => 'pvadmin',
            'email'     => 'webmaster@planview.com',
            'password'  => 'password',
            'password_confirmation' => 'password',
            'confirmation_code'     => md5(uniqid(mt_rand(), true)),
        ]);

        if(! $user->save()) {
            Log::info('Unable to create user '.$user->username, (array)$user->errors());
        } else {
            $user->confirm();
            Log::info('Created user "'.$user->username.'" <'.$user->email.'>');
        }

        $faker = Faker::create();

        foreach(range(1, 10) as $index)
        {
            $password = $faker->slug;

            User::create([
                'username'  => $faker->userName,
                'email'     => $faker->email,
                'password'  => $password,
                'password_confirmation' => $password,
                'confirmation_code'     => md5(uniqid(mt_rand(), true)),
            ]);
        }

        Eloquent::reguard();
    }

}
