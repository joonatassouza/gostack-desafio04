import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const { transactions } = this;

    return transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc, curr) => {
        switch (curr.type) {
          case 'income':
            return {
              ...acc,
              income: acc.income + curr.value,
              total: acc.total + curr.value,
            };
          case 'outcome':
            return {
              ...acc,
              outcome: acc.outcome + curr.value,
              total: acc.total - curr.value,
            };
          default:
            return acc;
        }
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
