export class Constants {
  static readonly APP_NAME = 'Vite React App';
  static readonly API_TOKEN_KEY = 'API_APP_AT';
  static readonly API_REFRESH_TOKEN_KEY = 'API_APP_RT';
  static readonly API_ROLE = 'API_APP_ROLE';

  static readonly ROLES = class {
    static readonly ADMIN = {
      name: 'Admin',
      value: 'admin',
    };
    static readonly USER = {
      name: 'User',
      value: 'user',
    };
  };
}
