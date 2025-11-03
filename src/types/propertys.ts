export interface Property {
  id: number
  nom: string         // Name  // Type (rental/sale)
  proprietaire: string
  type: 'location' | 'vente' // Owner
  prix: number         // Price
  status: 'disponible' | 'vendu' | 'loué' // Status
  latitude: number
  longitude: number
}