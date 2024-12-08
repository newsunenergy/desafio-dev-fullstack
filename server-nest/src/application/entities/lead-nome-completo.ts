export class NomeCompleto {
  private readonly nomeCompleto: string;

  get value(): string {
    return this.nomeCompleto;
  }

  private validateFullName(nomeCompleto: string): boolean {
    const nomeParts = nomeCompleto.trim().split(/\s+/);
    return (
      nomeParts.length >= 2 &&
      nomeParts.every((part) => /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(part))
    );
  }

  constructor(nomeCompleto: string) {
    const isNameCompletoValid = this.validateFullName(nomeCompleto);

    if (!isNameCompletoValid) {
      throw new Error('The full name must contain at least two valid names.');
    }

    this.nomeCompleto = nomeCompleto;
  }
}
