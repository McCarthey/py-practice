class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

class UpdateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

export { CreateCatDto, UpdateCatDto };
