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
    const { accountRepository, getAccount, getCard, cardRepository } = this.di

    try {
      const userId = req.user.id
      const account = await getAccount({
        repository: accountRepository,
        filter: { userId }
      })
      const accountIds = account.map(({ id }) => id)
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
      cardRepository,
      getAccount,
      saveTransaction,
      transactionRepository
    } = this.di
    const {
      accountId,
      sourceId,
      destinationId,
      value,
      type: requestedType,
      description,
      from,
      to,
      category,
      anexo,
      date
    } = req.body
    const sourceSelection = sourceId || accountId
    const sourceParts = String(sourceSelection).split(':')
    const sourceKind = sourceParts.length > 1 ? sourceParts[0] : 'account'
    const source = sourceParts.length > 1 ? sourceParts[1] : sourceParts[0]
    const destinationSelection = destinationId
    const destinationParts = String(destinationSelection || '').split(':')
    const destinationKind = destinationParts.length > 1 ? destinationParts[0] : 'account'
    const destination = destinationParts.length > 1 ? destinationParts[1] : destinationParts[0]
    const valueText = String(value)
    const normalizedValue = valueText.includes(',')
      ? valueText.replace(/\./g, '').replace(',', '.')
      : valueText
    const parsedValue = Number(normalizedValue)
    const type = String(requestedType).toUpperCase()

    if (
      !source ||
      !Number.isFinite(parsedValue) ||
      parsedValue <= 0 ||
      !['DEBIT', 'CREDIT', 'TRANSFER'].includes(type)
    ) {
      return res.status(400).json({ message: 'Dados da transação inválidos' })
    }

    let sourceAccount
    let sourceCard
    let destinationAccount
    try {
      if (sourceKind === 'account') {
        const accounts = await getAccount({
          repository: accountRepository,
          filter: { _id: source, userId: req.user.id }
        })
        sourceAccount = accounts?.[0]
      }

      if (!sourceAccount && sourceKind === 'card') {
        const cards = await cardRepository.get({ _id: source })
        sourceCard = cards?.[0]
        if (!sourceCard) throw new Error('Origem não encontrada')

        const ownerAccounts = await getAccount({
          repository: accountRepository,
          filter: { _id: sourceCard.accountId, userId: req.user.id }
        })
        if (!ownerAccounts?.[0]) throw new Error('Cartão não pertence ao usuário')
      }

      if (type === 'CREDIT' && sourceAccount) {
        destinationAccount = sourceAccount
      } else if (
        (type === 'CREDIT' || type === 'TRANSFER') &&
        destinationKind === 'account'
      ) {
        const destinations = await getAccount({
          repository: accountRepository,
          filter: { _id: destination, userId: req.user.id }
        })
        destinationAccount = destinations?.[0]
        if (!destinationAccount) throw new Error('Destino inválido')
      }
    } catch (error) {
      return res.status(400).json({ message: 'Origem ou destino inválido' })
    }

    const urlAnexo = req.body.urlAnexo ?? req.body.urlanexo ?? null
    const transactionDTO = new TransactionDTO({
      accountId: sourceAccount?.id || sourceCard?.accountId,
      value: parsedValue,
      description,
      from,
      to,
      category,
      anexo,
      urlAnexo,
      type,
      date: date ? new Date(date) : new Date()
    })

    try {
      if (type === 'DEBIT' && sourceCard) {
        await cardRepository.updateSpent(sourceCard._id, parsedValue)
      } else if (type === 'DEBIT' && sourceAccount) {
        await accountRepository.updateBalance(sourceAccount.id, -parsedValue)
      } else if (type === 'CREDIT' && destinationAccount) {
        await accountRepository.updateBalance(destinationAccount.id, parsedValue)
      } else if (type === 'TRANSFER' && sourceAccount && destinationAccount) {
        await accountRepository.updateBalance(sourceAccount.id, -parsedValue)
        await accountRepository.updateBalance(destinationAccount.id, parsedValue)
      } else {
        return res.status(400).json({
          message: 'Cartões só podem ser usados como origem de despesas'
        })
      }

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

  async getTransactions(req, res) {
    const { accountRepository, getAccount, getTransaction, transactionRepository } = this.di

    try {
      const accounts = await getAccount({
        repository: accountRepository,
        filter: { userId: req.user.id }
      })
      const accountIds = accounts.map((account) => account.id)
      const transactions = accountIds.length
        ? await getTransaction({
            filter: { accountId: { $in: accountIds } },
            repository: transactionRepository
          })
        : []

      res.status(200).json({
        message: 'Transações carregadas com sucesso',
        result: { transactions }
      })
    } catch (error) {
      res.status(500).json({ message: 'Erro ao carregar transações' })
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
          spent: 0,
          available: parsedLimit,
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
    const accountTypes = ['CURRENT', 'SAVINGS', 'INVESTMENT']

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
    const { value, type, description, from, to, category, anexo } = req.body
    const urlAnexo = req.body.urlAnexo ?? req.body.urlanexo

    const updates = {
      value,
      type: type ? String(type).toUpperCase() : type,
      description,
      from,
      to,
      category,
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
