export interface Pokemon {
    id: number;
    name: string;
    picture: string;
    life: number;
    damage: number;
    types: [string, string?, string?];
    created: Date;
  }
  
  export type PokemonList = Pokemon[];

  export function getPokemonColor(type: string) {
    switch (type) {
      case 'Feu':
        return '#EF5350';
      case 'Eau':
        return '#42A5F5';
      case 'Plante':
        return '#66BB6A';
      case 'Insecte':
        return '#8d6e63';
      case 'Vol':
        return '#90CAF9';
      case 'Poison':
        return '#b388ff';
      case 'Fée':
        return '#f8bbd0';
      case 'Electrik':
        return '#f4ff81';
      default:
        return '#303030';
    }
  }