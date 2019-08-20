interface Console {
  log(message?: any, ...optionalParams: any[]): void;
}

declare var console: Console;
