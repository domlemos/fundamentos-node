import Transaction from '../models/Transaction';

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
    return this.transactions;
  }

  public getBalance(): Balance {
    return {
      income: this.getIncome(),
      outcome: this.getOutcome(),
      total: this.getTotal(),
    };
  }

  public create(
    title: string,
    value: number,
    type: 'income' | 'outcome',
  ): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(transaction);

    return transaction;
  }

  private getIncome(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, current) => {
        return total + current.value;
      }, 0);
  }

  private getOutcome(): number {
    return this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((total, current) => {
        return total + current.value;
      }, 0);
  }

  private getTotal(): number {
    return this.getIncome() - this.getOutcome();
  }
}

export default TransactionsRepository;
