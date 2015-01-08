<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class PermissionRoleTableSeeder extends Seeder {

	public function run()
	{
		$admin = Role::where('name', 'Admin')->firstOrFail();

        $admin->attachPermission(Permission::where('name', 'manage_users')->firstOrFail());
	}

}
