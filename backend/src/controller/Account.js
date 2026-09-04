const TransactionDTO = require('../models/DetailedAccount')

class AccountController {
  constructor(di = {}) {
    this.di = Object.assign(
      {
        userRepository: require('../infra/mongoose/repository/userRepository'),
        accountRepository: require('../infra/mongoose/repository/accountRepository'),
        cardRepository: require('../infra/mongoose/repository/cardRepository'),
        transactionRepository: require('../infra/mongoose/repository/detailedAccountRepository'),

        saveCard: require('../feature/Card/saveCard'),
        salvarUsuario: require('../feature/User/salvarUsuario'),
        saveAccount: require('../feature/Account/saveAccount'),
        getUser: require('../feature/User/getUser'),
        getAccount: require('../feature/Account/getAccount'),
        saveTransaction: require('../feature/Transaction/saveTransaction'),
        getTransaction: require('../feature/Transaction/getTransaction'),
        updateTransaction: require('../feature/Transaction/updateTransaction'),
        deleteTransaction: require('../feature/Transaction/deleteTransaction'),
        getCard: require('../feature/Card/getCard')
      },
      di
    )
  }

  async find(req, res) {
    const {
      accountRepository,
      getAccount,
      getCard,
      getTransaction,
      transactionRepository,
      cardRepository
    } = this.di

    try {
      const userId = req.user.id
      const account = await getAccount({
        repository: accountRepository,
        filter: { userId }
      })
      const accountIds = account.map(({ id }) => id)
      const transactions = accountIds.length
        ? await getTransaction({
            filter: { accountId: { $in: accountIds } },
            repository: transactionRepository
          })
        : []
      const cards = accountIds.length
        ? await getCard({
            filter: { accountId: { $in: accountIds } },
            repository: cardRepository
          })
        : []

      res.status(200).json({
        message: 'Conta encontrada carregado com sucesso',
        result: {
          account,
          transactions,
          cards
        }
      })
    } catch (error) {
      res.status(500).json({
        message: 'Erro no servidor'
      })
    }
  }

  async createTransaction(req, res) {
    const {
      accountRepository,
      getAccount,
      saveTransaction,
      transactionRepository
    } = this.di
    const { accountId, value, type, from, to, anexo } = req.body

    if (
      !accountId ||
      !Number.isFinite(Number(value)) ||
      Number(value) <= 0 ||
      !['Debit', 'Credit', 'Transfer'].includes(type)
    ) {
      return res.status(400).json({ message: 'Dados da transação inválidos' })
    }

    let accounts
    try {
      accounts = await getAccount({
        repository: accountRepository,
        filter: { _id: accountId, userId: req.user.id }
      })
    } catch (error) {
      return res.status(400).json({ message: 'Conta inválida' })
    }
    if (!accounts?.[0]) {
      return res.status(404).json({ message: 'Conta não encontrada' })
    }

    const urlAnexo = req.body.urlAnexo ?? req.body.urlanexo ?? null
    const transactionDTO = new TransactionDTO({
      accountId,
      value: Number(value),
      from,
      to,
      anexo,
      urlAnexo,
      type,
      date: new Date()
    })

    try {
      const transaction = await saveTransaction({
        transaction: transactionDTO,
        repository: transactionRepository
      })

      res.status(201).json({
        message: 'Transação criada com sucesso',
        result: transaction
      })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar transação' })
    }
  }

  async createCard(req, res) {
    const { accountRepository, cardRepository, getAccount, saveCard } = this.di
    const { bank, nickname, limit } = req.body
    const parsedLimit = Number(String(limit).replace(',', '.'))

    if (
      !bank?.trim() ||
      !nickname?.trim() ||
      !Number.isFinite(parsedLimit) ||
      parsedLimit < 0
    ) {
      return res.status(400).json({ message: 'Dados do cartão inválidos' })
    }

    try {
      const accounts = await getAccount({
        repository: accountRepository,
        filter: { userId: req.user.id }
      })
      if (!accounts?.[0])
        return res.status(404).json({ message: 'Conta não encontrada' })

      const card = await saveCard({
        card: {
          bank: bank.trim(),
          nickname: nickname.trim(),
          limit: parsedLimit,
          name: nickname.trim(),
          type: 'Credit',
          accountId: accounts[0].id
        },
        repository: cardRepository
      })

      res.status(201).json({
        message: 'Cartão criado com sucesso',
        result: card
      })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar cartão' })
    }
  }

  async createAccount(req, res) {
    const { accountRepository, saveAccount } = this.di
    const { bank, nickname, type, balance } = req.body
    const parsedBalance = Number(String(balance ?? 0).replace(',', '.'))
    const accountTypes = ['Corrente', 'Poupança', 'Investimento']

    if (
      !bank?.trim() ||
      !nickname?.trim() ||
      !accountTypes.includes(type) ||
      !Number.isFinite(parsedBalance)
    ) {
      return res.status(400).json({ message: 'Dados da conta inválidos' })
    }

    try {
      const account = await saveAccount({
        account: {
          bank: bank.trim(),
          nickname: nickname.trim(),
          type,
          balance: parsedBalance,
          userId: req.user.id
        },
        repository: accountRepository
      })

      res.status(201).json({
        message: 'Conta criada com sucesso',
        result: account
      })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar conta' })
    }
  }

  async blockAccount(req, res) {
    const { accountRepository } = this.di

    try {
      const account = await accountRepository.block(req.params.id, req.user.id)
      if (!account)
        return res.status(404).json({ message: 'Conta não encontrada' })

      res.status(200).json({ message: 'Conta desativada com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao desativar conta' })
    }
  }

  async blockCard(req, res) {
    const { cardRepository } = this.di

    try {
      const card = await cardRepository.block(req.params.id, req.user.id)
      if (!card?.accountId)
        return res.status(404).json({ message: 'Cartão não encontrado' })

      res.status(200).json({ message: 'Cartão bloqueado com sucesso' })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao bloquear cartão' })
    }
  }

  async updateTransaction(req, res) {
    const { updateTransaction, transactionRepository } = this.di
    const { id } = req.params
    const { value, type, from, to, anexo } = req.body
    const urlAnexo = req.body.urlAnexo ?? req.body.urlanexo

    const updates = {
      value,
      type,
      from,
      to,
      anexo,
      urlAnexo
    }

    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    )

    try {
      const transaction = await updateTransaction({
        transactionId: id,
        updates,
        repository: transactionRepository
      })

      if (!transaction) {
        return res.status(404).json({ message: 'Transação não encontrada' })
      }

      res.status(200).json({
        message: 'Transação atualizada com sucesso',
        result: transaction
      })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar transação' })
    }
  }

  async deleteTransaction(req, res) {
    const { deleteTransaction, transactionRepository } = this.di
    const { id } = req.params

    try {
      const deleted = await deleteTransaction({
        transactionId: id,
        repository: transactionRepository
      })

      if (!deleted) {
        return res.status(404).json({ message: 'Transação não encontrada' })
      }

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar transação' })
    }
  }

  async getStatment(req, res) {
    const {
      accountRepository,
      getAccount,
      getTransaction,
      transactionRepository
    } = this.di

    const { accountId } = req.params

    try {
      const accounts = await getAccount({
        repository: accountRepository,
        filter: { _id: accountId, userId: req.user.id }
      })
      if (!accounts?.[0])
        return res.status(404).json({ message: 'Conta não encontrada' })

      const transactions = await getTransaction({
        filter: { accountId },
        repository: transactionRepository
      })
      res.status(201).json({
        message: 'Extrato carregado com sucesso',
        result: { transactions }
      })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao carregar extrato' })
    }
  }
}

module.exports = AccountController
