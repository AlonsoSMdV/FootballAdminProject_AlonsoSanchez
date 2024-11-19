export interface Player{
  id: string;
  name: string;
  firstSurname: string;
  secondSurname: string;
  birthdate: Date;
  nationality: string;
  dorsal: number;
  position: string;
  teamId?: string;
}