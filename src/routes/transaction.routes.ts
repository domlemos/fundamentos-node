import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
const transactionRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    return response.json({
      transactions: transactionRepository.all(),
      balance: transactionRepository.getBalance(),
    });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    // const repository = transactionRepository.create(title, value, type);
    const createTransaction = new CreateTransactionService(
      transactionRepository,
    );
    const data = createTransaction.execute({
      title,
      value,
      type,
    });

    return response.json(data);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
