import {
  BanknoteCheckIcon,
  CarIcon,
  CircleEllipsisIcon,
  Gamepad2Icon,
  GraduationCapIcon,
  HandCoinsIcon,
  HeartPulseIcon,
  HouseHeartIcon,
  PiggyBankIcon,
  ShoppingCartIcon,
  type LucideIcon
} from 'lucide-react'

export const TRANSACTION_CATEGORIES: Record<
  string,
  {
    name: string
    icon: LucideIcon
  }
> = {
  EDUCATION: {
    name: 'Educação',
    icon: GraduationCapIcon
  },
  FOOD: {
    name: 'Alimentação',
    icon: ShoppingCartIcon
  },
  HEALTH: {
    name: 'Saúde',
    icon: HeartPulseIcon
  },
  HOUSE: {
    name: 'Casa',
    icon: HouseHeartIcon
  },
  INVESTIMENT: {
    name: 'Investimentos',
    icon: HandCoinsIcon
  },
  LEISURE: {
    name: 'Lazer',
    icon: Gamepad2Icon
  },
  OTHER: {
    name: 'Outros',
    icon: CircleEllipsisIcon
  },
  SALARY: {
    name: 'Salário',
    icon: BanknoteCheckIcon
  },
  SAVINGS: {
    name: 'Poupança',
    icon: PiggyBankIcon
  },
  TRANSPORT: {
    name: 'Transporte',
    icon: CarIcon
  }
}
