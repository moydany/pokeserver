export class CacheSingleton {
  private static instance: Map<string, any>;

  private constructor() {}

  public static getInstance(): Map<string, any> {
    if (!CacheSingleton.instance) {
      CacheSingleton.instance = new Map<string, any>();
    }
    return CacheSingleton.instance;
  }
}
