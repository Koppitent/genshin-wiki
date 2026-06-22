export class ForbiddenError extends Error {
  status = 403;
}

export class UnauthorizedError extends Error {
  status = 401;
}
