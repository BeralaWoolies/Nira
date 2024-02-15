export type StatusResponse =
  | {
      success: string;
      error?: undefined;
    }
  | {
      error: string;
      success?: undefined;
    };
