import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { JobsModule } from "./jobs/jobs.module";
import { AdminModule } from "./admin/admin.module";
import { AdminOfficesModule } from "./admin/offices/admin-offices.module";
import { AdminUsersModule } from "./admin/users/admin-users.module";
import { AppRoutingModule } from "./app-routing.module";

// const ROUTES = [
//   {
//     path: 'jobs',
//     module: JobsModule,
//   },
//   {
//     path: 'admin',
//     module: AdminModule,
//     children: [
//       {
//         path: 'offices',
//         module: AdminOfficesModule,
//       },
//       {
//         path: 'users',
//         module: AdminUsersModule,
//       },
//     ],
//   },
// ];

@Module({
  imports: [
    JobsModule,
    AdminModule,
    AppRoutingModule
  ],
})
export class AppModule {}
