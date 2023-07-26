type ApiResponseType<T> = {
  timestamp: Date;
  code: number;
} & (
  | {
      status: "success";
      data: T;
    }
  | {
      status: "error";
      message: string;
    }
);

export default ApiResponseType;
