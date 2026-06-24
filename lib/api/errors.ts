export class MyErrors extends Error {
  status = 500;

  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

export class ForbiddenError extends MyErrors {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

export class UnauthorizedError extends MyErrors {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

export class NotFoundError extends MyErrors {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

export class BadRequestError extends MyErrors {
	constructor(message = "Bad Request") {
		super(message, 400);
	}
}
