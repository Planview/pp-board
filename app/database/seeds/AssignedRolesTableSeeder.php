<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class AssignedRolesTableSeeder extends Seeder {

    public function run()
    {
        $admin = User::where('username', 'pvadmin')->firstOrfail();

        $admin->attachRole(Role::where('name', 'Admin')->firstOrfail());
    }

}
