export const getBankPatterns = {
  BANCO_BRASIL: {
    background: 'bg-[#F9DD16]',
    border: 'border-t-[#F9DD16]',
    name: 'Banco do Brasil'
  },
  ITAU: {
    background: 'bg-[#FF6200]',
    border: 'border-t-[#FF6200]',
    name: 'Itaú'
  },
  NUBANK: {
    background: 'bg-[#820AD1]',
    border: 'border-t-[#820AD1]',
    name: 'Nubank'
  },
  SANTANDER: {
    background: 'bg-[#ec0000]',
    border: 'border-t-[#ec0000]',
    name: 'Santander'
  },
  CAIXA: {
    background: 'bg-[#005ca9]',
    border: 'border-t-[#005ca9]',
    name: 'Caixa Econômica Federal'
  },
  BRADESCO: {
    background: 'bg-[#CC092F]',
    border: 'border-t-[#CC092F]',
    name: 'Bradesco'
  },
  INTER: {
    background: 'bg-[#FF5000]',
    border: 'border-t-[#FF5000]',
    name: 'Banco Inter'
  },
  C6: {
    background: 'bg-black',
    border: 'border-t-black',
    name: 'C6 Bank'
  },
  BTG: {
    background: 'bg-[#001E62]',
    border: 'border-t-[#001E62]',
    name: 'BTG Pactual'
  },
  SICREDI: {
    background: 'bg-[#3FA110]',
    border: 'border-t-[#3FA110]',
    name: 'Sicredi'
  }
} as const

export type Bank = keyof typeof getBankPatterns

export const bankOptions = Object.entries(getBankPatterns) as [
  Bank,
  (typeof getBankPatterns)[Bank]
][]

export const getBankPattern = (bank: string) =>
  getBankPatterns[bank as Bank] ?? {
    background: 'bg-foreground',
    border: 'border-t-foreground',
    name: bank
  }
