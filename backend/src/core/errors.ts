import { HttpException } from '@nestjs/common';

export type HttpErrorJSON = {
  name: string;
  message: string;
  action: string;
  status_code: number;
};

export class InternalServerError extends HttpException {
  public action: string;

  constructor({ message }: { cause?: unknown; message?: string }) {
    const errorMessage = message ?? 'Um erro não esperado ocorreu.';
    const action = 'Entre em contato com o suporte.';
    const status = 500;

    super(
      {
        name: 'InternalServerError',
        message: errorMessage,
        action,
        status_code: status,
      },
      status,
    );

    this.name = 'InternalServerError';
    this.action = action;
  }

  toJSON(): HttpErrorJSON {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.getStatus(),
    };
  }
}

export class ServiceError extends HttpException {
  public action: string;

  constructor({ message }: { cause?: unknown; message?: string }) {
    const errorMessage = message ?? 'Serviço indisponível no momento.';
    const action = 'Verifique se o serviço está disponível.';
    const status = 503;

    super(
      {
        name: 'ServiceError',
        message: errorMessage,
        action,
        status_code: status,
      },
      status,
    );

    this.name = 'ServiceError';
    this.action = action;
  }

  toJSON(): HttpErrorJSON {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.getStatus(),
    };
  }
}

export class ValidationError extends HttpException {
  public action: string;

  constructor({ message, action }: { message?: string; action?: string }) {
    const errorMessage = message ?? 'Um erro de validação ocorreu.';
    const errorAction = action ?? 'Ajuste os dados enviados e tente novamente.';

    super(
      {
        name: 'ValidationError',
        message: errorMessage,
        action: errorAction,
        status_code: 400,
      },
      400,
    );

    this.name = 'ValidationError';
    this.action = errorAction;
  }

  toJSON(): HttpErrorJSON {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.getStatus(),
    };
  }
}

export class NotFoundError extends HttpException {
  public action: string;

  constructor({ message, action }: { message?: string; action?: string }) {
    const errorMessage =
      message ?? 'Não foi possível localizar o que você deseja no sistema.';
    const errorAction =
      action ??
      'Verifique se os parâmetros enviados na consulta estão corretos.';

    super(
      {
        name: 'NotFoundError',
        message: errorMessage,
        action: errorAction,
        status_code: 404,
      },
      404,
    );

    this.name = 'NotFoundError';
    this.action = errorAction;
  }

  toJSON(): HttpErrorJSON {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.getStatus(),
    };
  }
}

export class ConfigError extends HttpException {
  public action: string;

  constructor({ message }: { message?: string }) {
    const errorMessage = message ?? 'Erro de configuração da aplicação.';
    const action = 'Verifique as variáveis de ambiente necessárias.';
    const status = 500;

    super(
      {
        name: 'ConfigError',
        message: errorMessage,
        action,
        status_code: status,
      },
      status,
    );

    this.name = 'ConfigError';
    this.action = action;
  }

  toJSON(): HttpErrorJSON {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.getStatus(),
    };
  }
}
