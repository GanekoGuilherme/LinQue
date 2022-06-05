declare namespace Express {
  interface Request {
    user: {
      id: string;
      dataId?: string;
    };
  }
}
