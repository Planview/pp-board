<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class RolesTableSeeder extends Seeder {

    public function run()
    {
        Eloquent::unguard();

        $admin = new Role(['name' => 'Admin']);

        if ($admin->save()) {
            Log::info('Created role: "'.$admin->name.'"');
        } else {
            Log::info('Unable to create role '.$admin->name, (array)$admin->errors());
        }

        Eloquent::reguard();
    }

}
