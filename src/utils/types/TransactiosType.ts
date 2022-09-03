interface Category {
  icon: string,
  key: string
}

export interface TransactionCardProps {
  title: string,
  amount: string,
  category: Category,
  date: string,
  type: string
}

export interface DataListProps extends TransactionCardProps {
  id: string
}