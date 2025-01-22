export class AppRoutes {
  static readonly ROOT = '/';
  static readonly PUBLIC = class {
    static readonly AUTH = {
      LOGIN: '/login',
      REGISTER: '/register',
      FORGOT_PASSWORD: '/forgot-password',
      RESET_PASSWORD: '/reset-password',
    };
  };
  static readonly PRIVATE = class {
    static readonly DASHBOARD = '/dashboard';
    static readonly USERS = '/users';
    static readonly ACCOUNTS = '/accounts';
    static readonly THROW_ERROR = '/throw-error';
    static readonly PROFILE = '/profile';
    static readonly LOGOUT = '/logout';
  };
}
