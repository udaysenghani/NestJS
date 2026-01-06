/*
Decorator → Declaration
Metadata → Stored meaning
NestJS → Executor
 */

/*
why NestJS ?
Modularity
decorators and metadata
pre-built dependancy Injection (DI)
auto-testing
*/

//nestJS internally used the expreess or fastify


//NestJs automatically send the HTTP code in response 
// also we can manage manually we can overwrite
// code : HttpCode
// label : HttpStatus //enumuration


/*****************************************************************************************
 NESTJS CORE CONCEPTS – COMPLETE THEORY + EXAMPLES IN ONE FILE
 Topics Covered:
 1. Dependency Injection (DI)
 2. Class as Dependency
 3. Value Providers
 4. Factory Providers (Dynamic & Async)
 5. Injection Scopes (DEFAULT, REQUEST, TRANSIENT)
 6. Services
 7. Modules
 8. Router Module
 9. Middleware
*****************************************************************************************/


/*****************************************************************************************
 1️⃣ DEPENDENCY INJECTION (DI)
 -----------------------------------------------------------------------------------------
 Dependency Injection means:
 ❌ Classes do NOT create their own dependencies
 ✅ NestJS creates and injects them automatically

 Benefits:
 - Loose coupling
 - Easy testing
 - Clean architecture
*****************************************************************************************/


/*****************************************************************************************
 2️⃣ SERVICE (BUSINESS LOGIC LAYER)
 -----------------------------------------------------------------------------------------
 - Services hold business logic
 - Marked with @Injectable()
 - Can be injected into Controllers or other Services
*****************************************************************************************/

import {
  Injectable,
  Scope,
  Module,
  Controller,
  Get,
  Inject,
  MiddlewareConsumer,
  NestModule,
  RequestMethod
} from "@nestjs/common";

/*****************************************************************************************
 DEFAULT SCOPE (Singleton)
 - One instance shared across entire application
*****************************************************************************************/

@Injectable()
class UserService {
  getUsers() {
    return ["Uday", "Rahul", "Amit"];
  }
}


/*****************************************************************************************
 3️⃣ CLASS AS DEPENDENCY
 -----------------------------------------------------------------------------------------
 - Injecting one class into another
 - NestJS resolves dependency automatically
*****************************************************************************************/

@Injectable()
class ProfileService {
  constructor(private readonly userService: UserService) {}

  getProfiles() {
    return this.userService.getUsers().map(user => ({
      name: user,
      profile: "ACTIVE"
    }));
  }
}


/*****************************************************************************************
 4️⃣ VALUE PROVIDERS
 -----------------------------------------------------------------------------------------
 - Used to inject constant/static values
 - Examples: ENV config, DB name, API keys
*****************************************************************************************/

const AppProviders = [
  {
    provide: "DATABASE_NAME",
    useValue: "NEST_APP_DB"
  },
  {
    provide: "APP_VERSION",
    useValue: "1.0.0"
  }
];


/*****************************************************************************************
 5️⃣ FACTORY PROVIDERS (DYNAMIC PROVIDER)
 -----------------------------------------------------------------------------------------
 - Used when value must be computed dynamically
 - Can depend on other providers
*****************************************************************************************/

const DynamicProvider = {
  provide: "FEATURE_FLAG",
  useFactory: () => {
    const hour = new Date().getHours();
    return hour > 12 ? "ENABLED" : "DISABLED";
  }
};


/*****************************************************************************************
 6️⃣ ASYNC FACTORY PROVIDER
 -----------------------------------------------------------------------------------------
 - Used when data comes from async sources
 - Example: DB config, API call, secrets manager
*****************************************************************************************/

const AsyncProvider = {
  provide: "ASYNC_CONFIG",
  useFactory: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { env: "DEV", port: 3000 };
  }
};


/*****************************************************************************************
 7️⃣ INJECTION SCOPES
 -----------------------------------------------------------------------------------------
 DEFAULT (Singleton) → One instance for entire app
 REQUEST → New instance per HTTP request
 TRANSIENT → New instance every injection
*****************************************************************************************/

/* REQUEST SCOPED */
@Injectable({ scope: Scope.REQUEST })
class RequestScopedService {
  getRequestId() {
    return Math.random();
  }
}

/* TRANSIENT SCOPED */
@Injectable({ scope: Scope.TRANSIENT })
class TransientService {
  getInstanceId() {
    return Math.random();
  }
}


/*****************************************************************************************
 8️⃣ CONTROLLER (REQUEST HANDLING)
 -----------------------------------------------------------------------------------------
 - Controllers handle HTTP requests
 - Inject services and providers here
*****************************************************************************************/

@Controller("users")
class UserController {
  constructor(
    private readonly profileService: ProfileService,

    @Inject("DATABASE_NAME")
    private readonly dbName: string,

    @Inject("FEATURE_FLAG")
    private readonly featureFlag: string,

    private readonly requestService: RequestScopedService,
    private readonly transientService: TransientService
  ) {}

  @Get()
  getAll() {
    return {
      db: this.dbName,
      feature: this.featureFlag,
      requestId: this.requestService.getRequestId(),
      transientId: this.transientService.getInstanceId(),
      data: this.profileService.getProfiles()
    };
  }
}


/*****************************************************************************************
 9️⃣ MODULE
 -----------------------------------------------------------------------------------------
 - Modules organize the application
 - Register controllers, providers, imports, exports
*****************************************************************************************/

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    ProfileService,
    RequestScopedService,
    TransientService,
    ...AppProviders,
    DynamicProvider,
    AsyncProvider
  ]
})
class UserModule {}


/*****************************************************************************************
 🔟 ROUTER MODULE
 -----------------------------------------------------------------------------------------
 - Used to group modules under a route prefix
 - Useful for large applications
*****************************************************************************************/

import { RouterModule } from "@nestjs/core";

@Module({
  imports: [
    UserModule,
    RouterModule.register([
      {
        path: "api",
        module: UserModule
      }
    ])
  ]
})
class AppRoutingModule {}


/*****************************************************************************************
 1️⃣1️⃣ MIDDLEWARE
 -----------------------------------------------------------------------------------------
 - Runs BEFORE controller
 - Used for logging, auth, request modification
*****************************************************************************************/

import { Request, Response, NextFunction } from "express";

class LoggerMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Request URL:", req.url);
    next();
  }
}


/*****************************************************************************************
 1️⃣2️⃣ APPLYING MIDDLEWARE USING MODULE
*****************************************************************************************/

@Module({
  imports: [AppRoutingModule]
})
class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}


/*****************************************************************************************
 ✅ FINAL SUMMARY
 -----------------------------------------------------------------------------------------
 ✔ Dependency Injection → Core of NestJS
 ✔ Services → Business logic
 ✔ Providers → Value, Factory, Async
 ✔ Injection Scopes → Control lifecycle
 ✔ Modules → Structure app
 ✔ Router Module → Route grouping
 ✔ Middleware → Pre-request processing
*****************************************************************************************/



@Module({
  controllers: [UsersController, AlbumController,ServiceController],
  providers: [{ provide: UsersStore, useClass: UsersStore},UsersService
              // {provide: 'DATABASE_NAME', useValue: 'MOON_KNIGHT'},
              // {provide: 'MAIL', useValue: ['admin@gmail.com','user@gmail.com']},
              // {provide: 'ENV_CONFIG', useValue:{type: 'DEV', node: '17'}},
              // {provide: 'Event', useFactory: (config: EnvConfig,limit:number)=>{
              //   console.log(limit);
              //   console.log(config);
              //   if(val>5){
              //     return "yes";
              //   }else{return "No"};
              // },
              //   inject : [EnvConfig,'LIMIT'],
              // },
              // EnvConfig,
              // {provide: 'LIMIT', useValue:23},

              // {provide: 'DATABSE_CONNECTION', useFactory: async()=>{     
              //   return "connected";
              //   },
              // // inject:[],
              // }
            ],
  imports: [ServiceModule],
  // providers: [UsersStore]; short syntax saame as above if both name is same
  //{name, which class} register
})
export class AppModule implements NestMiddleware{
  use(req: any, res: any, next: (error?: any) => void) {
    throw new error('Method not implemented.');
  }
  configure(consumer: MiddlewareConsumer){
    consumer.apply(middleware1,middleware3).exclude().forRoutes(ServiceController); //also define conroller as route
  }
}