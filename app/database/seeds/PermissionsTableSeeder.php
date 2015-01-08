<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class PermissionsTableSeeder extends Seeder {

    public function run()
    {
        Eloquent::unguard();

        $manageUsers = new Permission([
            'name' => 'manage_users',
            'display_name' => 'Manage Users',
        ]);

        $manageUsers->save();

        Eloquent::reguard();
    }

}
